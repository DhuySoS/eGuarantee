"use client";

import React, { useMemo, useState } from "react";
import UiTable from "@/components/ui/atoms/UiTable";
import UiPagination from "@/components/ui/atoms/UiPagination";
import type { TableProps } from "antd";
import UiButton from "@/components/ui/atoms/UiButton";
import { WarningOutlined } from "@ant-design/icons";
import type {
  GuaranteeListItem,
  GuaranteeTabKey,
  UserRole,
} from "../../types/guarantee";
import {
  getGuaranteeColumns,
  type SortableGuaranteeField,
} from "./guaranteeColumn";
import GuaranteeStatusTabs from "./GuaranteeStatusTabs";

import { useLocale, useTranslations } from "next-intl";

export interface GuaranteeTableProps {
  data?: GuaranteeListItem[];
  loading?: boolean;
  total?: number;
  currentPage?: number;
  pageSize?: number;
  sortBy?: SortableGuaranteeField;
  sortDirection?: "asc" | "desc";
  role?: UserRole;
  activeTab?: GuaranteeTabKey;
  tabCounts?: Partial<Record<GuaranteeTabKey, number>>;
  onTabChange?: (tab: GuaranteeTabKey) => void;
  onDelete?: (record: GuaranteeListItem) => void;
  onPageChange?: (page: number, pageSize: number) => void;
  onSortChange?: (
    sortBy: SortableGuaranteeField,
    sortDirection: "asc" | "desc",
  ) => void;
}

const GuaranteeTable: React.FC<GuaranteeTableProps> = ({
  data = [],
  loading = false,
  total = 0,
  currentPage = 0,
  pageSize = 5,
  sortBy,
  sortDirection,
  role = "MAKER",
  activeTab,
  tabCounts,
  onTabChange,
  onDelete,
  onPageChange,
  onSortChange,
}) => {
  const [localActiveTab, setLocalActiveTab] = useState<GuaranteeTabKey>("ALL");
  const currentTab = activeTab ?? localActiveTab;

  const handleTabClick = (tab: GuaranteeTabKey) => {
    setLocalActiveTab(tab);
    onTabChange?.(tab);
  };
  const t = useTranslations("guarantees.list");
  const tType = useTranslations("guarantees.types");
  const tStatus = useTranslations("guarantees.statuses");
  const locale = useLocale();

  const columns = useMemo(
    () =>
      getGuaranteeColumns({
        sortBy,
        sortDirection,
        role,
        onDelete,
        t,
        tType,
        tStatus,
        locale,
      }),
    [sortBy, sortDirection, role, onDelete, t, tType, tStatus, locale],
  );

  const handleTableChange: TableProps<GuaranteeListItem>["onChange"] = (
    _pagination,
    _filters,
    sorter,
  ) => {
    const s = Array.isArray(sorter) ? sorter[0] : sorter;
    if (s && s.order && s.field) {
      const field = s.field as SortableGuaranteeField;
      const direction = s.order === "ascend" ? "asc" : "desc";
      onSortChange?.(field, direction);
    } else {
      // Khi click bỏ sort thì trở về sắp xếp mặc định theo ngày tạo mới nhất
      onSortChange?.("createdDate", "desc");
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-xs border border-gray-100 dark:border-gray-800">
        <GuaranteeStatusTabs
          activeTab={currentTab}
          onChange={handleTabClick}
          counts={{
            ALL: tabCounts?.ALL ?? total ?? 0,
            DRAFT: tabCounts?.DRAFT ?? 0,
            PENDING_APPROVAL: tabCounts?.PENDING_APPROVAL ?? 0,
            APPROVED: tabCounts?.APPROVED ?? 0,
            REJECTED: tabCounts?.REJECTED ?? 0,
          }}
        />
        <UiTable<GuaranteeListItem>
          rowKey="id"
          columns={columns}
          dataSource={data}
          loading={loading}
          bordered
          pagination={false}
          scroll={{ x: 900 }}
          onChange={handleTableChange}
        />
      </div>

      {/* Phân trang bên dưới */}
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

export default GuaranteeTable;
