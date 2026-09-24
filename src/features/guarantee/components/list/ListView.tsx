"use client";

import React from "react";
import { App, Alert } from "antd";
import { useMutation } from "@tanstack/react-query";
import UiButton from "@/components/ui/atoms/UiButton";
import GuaranteeTable from "./GuaranteeTable";
import Filter from "./Filter";
import { useGuaranteeList } from "../../hooks/useGuaranteeList";
import useGuaranteeStatusCounts from "../../hooks/useGuaranteeStatusCounts";
import {
  useGuaranteeQueryParams,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "../../hooks/useGuaranteeQueryParams";
import guaranteeService from "../../services/guarantee.service";
import { useRole } from "@/features/auth/hooks/useRole";
import { useTranslations } from "next-intl";
import type { GuaranteeListItem } from "../../types/guarantee";

const ListView = () => {
  const t = useTranslations("guarantees.list");
  const tCommon = useTranslations("common");
  const { message } = App.useApp();
  const { role } = useRole();

  const {
    queryParams,
    activeTab,
    handlePageChange,
    handleFilterSubmit,
    handleFilterReset,
    handleSortChange,
    handleTabChange,
  } = useGuaranteeQueryParams();

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGuaranteeList(queryParams);

  // Lấy số lượng thống kê theo từng trạng thái từ backend API
  const { data: statusCounts, refetch: refetchStatusCounts } =
    useGuaranteeStatusCounts({
      keyword: queryParams.keyword,
      guaranteeType: queryParams.guaranteeType,
      createdFrom: queryParams.createdFrom,
      createdTo: queryParams.createdTo,
    });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => guaranteeService.deleteGuarantee(id),
    onSuccess: () => {
      message.success(t("messages.deleteSuccess"));
      refetch();
      refetchStatusCounts();
    },
    onError: (err: any) => {
      message.error(err?.message || t("messages.deleteFailed"));
    },
  });

  const handleDelete = (record: GuaranteeListItem) => {
    deleteMutation.mutate(record.id);
  };

  return (
    <div className="space-y-6">
      <Filter
        initialValues={{
          keyword: queryParams.keyword,
          status: queryParams.status,
          guaranteeType: queryParams.guaranteeType,
          createdFrom: queryParams.createdFrom,
          createdTo: queryParams.createdTo,
        }}
        onSearch={handleFilterSubmit}
        onReset={handleFilterReset}
        loading={isLoading || isFetching}
      />

      {isError && (
        <Alert
          type="error"
          showIcon
          title={t("messages.loadErrorTitle")}
          description={
            <div className="flex items-center justify-between mt-1">
              <span>{error?.message || t("messages.loadErrorDesc")}</span>
              <UiButton
                size="small"
                danger
                variant="outlined"
                onClick={() => refetch()}
              >
                {tCommon("buttons.retry")}
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
        activeTab={activeTab}
        tabCounts={statusCounts}
        onTabChange={handleTabChange}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default ListView;
