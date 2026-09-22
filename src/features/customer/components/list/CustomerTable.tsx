"use client";

import React, { useMemo } from "react";
import UiTable from "@/components/ui/atoms/UiTable";
import UiPagination from "@/components/ui/atoms/UiPagination";
import type { TableProps } from "antd";
import type { Customer } from "../../types/customer";
import {
  getCustomerColumns,
  type SortableCustomerField,
} from "./customerColumns";
import { useTranslations } from "next-intl";

export interface CustomerTableProps {
  data?: Customer[];
  loading?: boolean;
  total?: number;
  currentPage?: number;
  pageSize?: number;
  sortBy?: SortableCustomerField;
  sortDirection?: "asc" | "desc";
  onView?: (record: Customer) => void;
  onEdit?: (record: Customer) => void;
  onDelete?: (record: Customer) => void;
  onPageChange?: (page: number, pageSize: number) => void;
  onSortChange?: (
    sortBy: SortableCustomerField,
    sortDirection: "asc" | "desc",
  ) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  data = [],
  loading = false,
  total = 0,
  currentPage = 1,
  pageSize = 5,
  sortBy,
  sortDirection,
  onView,
  onEdit,
  onDelete,
  onPageChange,
  onSortChange,
}) => {
  const t = useTranslations("customers");

  const columns = useMemo(
    () =>
      getCustomerColumns({
        sortBy,
        sortDirection,
        onView,
        onEdit,
        onDelete,
        t,
      }),
    [sortBy, sortDirection, onView, onEdit, onDelete, t],
  );

  const handleTableChange: TableProps<Customer>["onChange"] = (
    _pagination,
    _filters,
    sorter,
  ) => {
    const s = Array.isArray(sorter) ? sorter[0] : sorter;
    if (s && s.order && s.field) {
      const field = s.field as SortableCustomerField;
      const direction = s.order === "ascend" ? "asc" : "desc";
      onSortChange?.(field, direction);
    } else {
      onSortChange?.("cif", "desc");
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-base text-gray-800">
        {t.rich("table.total", {
          count: total,
          span: (chunks) => (
            <span className="font-semibold text-gray-900">{chunks}</span>
          ),
        })}
      </div>
      <div className="bg-white rounded-xl overflow-hidden shadow-xs border border-gray-100">
        <UiTable<Customer>
          rowKey="cif"
          columns={columns}
          dataSource={data}
          loading={loading}
          bordered
          pagination={false}
          scroll={{ x: 800 }}
          onChange={handleTableChange}
        />
      </div>

      {/* Phân trang */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex-1 flex justify-center">
          <UiPagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            showSizeChanger={false}
            disabled={loading}
            onChange={(page, pSize) => onPageChange?.(page, pSize)}
          />
        </div>
        <div className="shrink-0">
          <UiPagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            showSizeChanger={true}
            showQuickJumper={false}
            showLessItems
            simple={false}
            disabled={loading}
            itemRender={() => null}
            onChange={(page, pSize) => onPageChange?.(page, pSize)}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
