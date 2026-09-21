"use client";

import React, { useState } from "react";
import { App, Alert } from "antd";
import { useMutation } from "@tanstack/react-query";
import UiButton from "@/components/ui/atoms/UiButton";
import GuaranteeTable from "./GuaranteeTable";
import Filter, { type FilterValues } from "./Filter";
import { useGuaranteeList } from "../../hooks/useGuaranteeList";
import guaranteeService from "../../services/guarantee.service";
import { useRole } from "@/features/auth/hooks/useRole";
import type {
  GuaranteeQueryParams,
  GuaranteeListItem,
} from "../../types/guarantee";

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 5;

const ListView = () => {
  const { message } = App.useApp();
  const { role } = useRole();

  const [queryParams, setQueryParams] = useState<GuaranteeQueryParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    sortBy: "createdDate",
    sortDirection: "desc",
  });

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGuaranteeList(queryParams);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => guaranteeService.deleteGuarantee(id),
    onSuccess: () => {
      message.success("Xóa yêu cầu bảo lãnh thành công!");
      refetch();
    },
    onError: (err: any) => {
      message.error(err?.message || "Xóa yêu cầu bảo lãnh thất bại!");
    },
  });

  const handleDelete = (record: GuaranteeListItem) => {
    deleteMutation.mutate(record.id);
  };

  const handlePageChange = (uiPage: number, size: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page: Math.max(0, uiPage - 1),
      size,
    }));
  };

  const handleFilterSubmit = (filters: FilterValues) => {
    setQueryParams((prev) => ({
      ...prev,
      ...filters,
      page: DEFAULT_PAGE,
    }));
  };

  const handleFilterReset = () => {
    setQueryParams({
      page: DEFAULT_PAGE,
      size: DEFAULT_PAGE_SIZE,
      sortBy: "createdDate",
      sortDirection: "desc",
    });
  };

  const handleSortChange = (
    sortBy: "createdDate" | "guaranteeAmount" | "customerName",
    sortDirection: "asc" | "desc",
  ) => {
    setQueryParams((prev) => ({
      ...prev,
      sortBy,
      sortDirection,
      page: DEFAULT_PAGE,
    }));
  };

  return (
    <div className="space-y-6">
      <Filter
        onSearch={handleFilterSubmit}
        onReset={handleFilterReset}
        loading={isLoading || isFetching}
      />

      {isError && (
        <Alert
          type="error"
          showIcon
          title="Không thể tải danh sách yêu cầu bảo lãnh"
          description={
            <div className="flex items-center justify-between mt-1">
              <span>
                {error?.message ||
                  "Đã có lỗi xảy ra từ hệ thống hoặc máy chủ. Vui lòng kiểm tra lại kết nối."}
              </span>
              <UiButton
                size="small"
                danger
                variant="outlined"
                onClick={() => refetch()}
              >
                Thử lại
              </UiButton>
            </div>
          }
          className="rounded-xl border border-red-200"
        />
      )}

      <GuaranteeTable
        data={data?.items || []}
        loading={isLoading || isFetching || deleteMutation.isPending}
        total={data?.total || 0}
        currentPage={(queryParams.page ?? DEFAULT_PAGE) + 1}
        pageSize={queryParams.size || DEFAULT_PAGE_SIZE}
        sortBy={queryParams.sortBy}
        sortDirection={queryParams.sortDirection}
        role={role}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default ListView;
