"use client";

import React, { useState } from "react";
import { Alert } from "antd";
import UiButton from "@/components/ui/atoms/UiButton";
import CustomerFilter, { type CustomerFilterValues } from "./CustomerFilter";
import CustomerTable from "./CustomerTable";
import CustomerFormModal from "../modal/CustomerFormModal";
import CustomerDetailModal from "../detail/CustomerDetailModal";
import { useCustomerList } from "../../hooks/useCustomerList";
import { useCustomerMutations } from "../../hooks/useCustomerMutations";
import type {
  Customer,
  CustomerQueryParams,
} from "../../types/customer";
import type { CustomerFormData } from "../../schemas/customer.schema";
import type { SortableCustomerField } from "./customerColumns";

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 5;

export interface CustomerListViewProps {
  onOpenCreate?: (openFn: () => void) => void;
}

export const CustomerListView: React.FC<CustomerListViewProps> = () => {
  const [queryParams, setQueryParams] = useState<CustomerQueryParams>({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    sortBy: "cif",
    sortDirection: "desc",
  });

  // Modal states
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const { data, isLoading, isFetching, isError, error, refetch } =
    useCustomerList(queryParams);

  const { createMutation, updateMutation, deleteMutation } =
    useCustomerMutations();

  const handlePageChange = (uiPage: number, size: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page: Math.max(0, uiPage - 1),
      size,
    }));
  };

  const handleFilterSubmit = (filters: CustomerFilterValues) => {
    setQueryParams((prev) => ({
      ...prev,
      keyword: filters.keyword,
      page: DEFAULT_PAGE,
    }));
  };

  const handleFilterReset = () => {
    setQueryParams({
      page: DEFAULT_PAGE,
      size: DEFAULT_PAGE_SIZE,
      sortBy: "cif",
      sortDirection: "desc",
    });
  };

  const handleSortChange = (
    sortBy: SortableCustomerField,
    sortDirection: "asc" | "desc",
  ) => {
    setQueryParams((prev) => ({
      ...prev,
      sortBy,
      sortDirection,
      page: DEFAULT_PAGE,
    }));
  };

  const handleView = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDetailModalOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormModalOpen(true);
  };

  const handleDelete = (customer: Customer) => {
    deleteMutation.mutate(customer.cif);
  };

  const handleFormSubmit = (formData: CustomerFormData) => {
    if (selectedCustomer) {
      // Edit
      updateMutation.mutate(
        {
          cif: selectedCustomer.cif,
          payload: formData,
        },
        {
          onSuccess: () => {
            setFormModalOpen(false);
            setSelectedCustomer(null);
          },
        },
      );
    } else {
      // Create
      createMutation.mutate(formData, {
        onSuccess: () => {
          setFormModalOpen(false);
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <CustomerFilter
        onSearch={handleFilterSubmit}
        onReset={handleFilterReset}
        loading={isLoading || isFetching}
      />

      {isError && (
        <Alert
          type="error"
          showIcon
          title="Không thể tải danh sách khách hàng"
          description={
            <div className="flex items-center justify-between mt-1">
              <span>
                {error?.message ||
                  "Đã có lỗi xảy ra từ máy chủ. Vui lòng kiểm tra lại kết nối."}
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

      <CustomerTable
        data={data?.items || []}
        loading={
          isLoading ||
          isFetching ||
          deleteMutation.isPending ||
          createMutation.isPending ||
          updateMutation.isPending
        }
        total={data?.total || 0}
        currentPage={(queryParams.page ?? DEFAULT_PAGE) + 1}
        pageSize={queryParams.size || DEFAULT_PAGE_SIZE}
        sortBy={queryParams.sortBy}
        sortDirection={queryParams.sortDirection}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
      />

      {/* Form Modal (Create / Edit) */}
      <CustomerFormModal
        open={formModalOpen}
        initialData={selectedCustomer}
        onClose={() => {
          setFormModalOpen(false);
          setSelectedCustomer(null);
        }}
        onSubmit={handleFormSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
      />

      {/* Detail Modal */}
      <CustomerDetailModal
        open={detailModalOpen}
        customer={selectedCustomer}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedCustomer(null);
        }}
        onEdit={(customer) => {
          setSelectedCustomer(customer);
          setFormModalOpen(true);
        }}
      />
    </div>
  );
};

export default CustomerListView;
