import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Tooltip, Popconfirm } from "antd";
import { type UiTableColumnsType } from "@/components/ui/atoms/UiTable";
import UiTag from "@/components/ui/atoms/UiTag";
import type {
  GuaranteeListItem,
  GuaranteeStatus,
  GuaranteeType,
  UserRole,
} from "../../types/guarantee";
import {
  GUARANTEE_STATUS_LABELS,
  GUARANTEE_STATUS_TAG_CLASS,
  GUARANTEE_TYPE_LABELS,
} from "../../constants/guarantee";
import { formatCurrency } from "@/utils/format";
import { withLocale } from "@/shared/i18n/path";

export type SortableGuaranteeField =
  "createdDate" | "guaranteeAmount" | "customerName";

export interface GuaranteeColumnOptions {
  sortBy?: SortableGuaranteeField;
  sortDirection?: "asc" | "desc";
  role?: UserRole;
  onDelete?: (record: GuaranteeListItem) => void;
  t?: (key: string, params?: Record<string, any>) => string;
  tType?: (key: string) => string;
  tStatus?: (key: string) => string;
  locale?: string;
}

export const getGuaranteeColumns = (
  options?: GuaranteeColumnOptions,
): UiTableColumnsType<GuaranteeListItem> => {
  const {
    sortBy,
    sortDirection,
    role = "MAKER",
    onDelete,
    t,
    tType,
    tStatus,
    locale = "vi",
  } = options || {};

  const getSortOrder = (field: SortableGuaranteeField) => {
    if (sortBy !== field) return null;
    return sortDirection === "asc" ? "ascend" : "descend";
  };

  const getStatusLabel = (status: GuaranteeStatus) => {
    if (tStatus) {
      try {
        return tStatus(status);
      } catch {
        return GUARANTEE_STATUS_LABELS[status] ?? status;
      }
    }
    return GUARANTEE_STATUS_LABELS[status] ?? status;
  };

  const getTypeLabel = (type: GuaranteeType) => {
    if (tType) {
      try {
        return tType(type);
      } catch {
        return GUARANTEE_TYPE_LABELS[type] ?? type;
      }
    }
    return GUARANTEE_TYPE_LABELS[type] ?? type;
  };

  return [
    {
      title: t ? t("table.columns.id") : "Mã yêu cầu",
      dataIndex: "id",
      key: "id",
    },
    {
      title: t ? t("table.columns.customer") : "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      sorter: true,
      sortOrder: getSortOrder("customerName"),
      showSorterTooltip: {
        title: t
          ? t("table.columns.customer")
          : "Nhấp để sắp xếp theo tên khách hàng",
      },
    },
    {
      title: t ? t("table.columns.cif") : "CIF",
      dataIndex: "customerCif",
      key: "customerCif",
      className: "text-gray-700",
    },
    {
      title: t ? t("table.columns.guaranteeType") : "Loại bảo lãnh",
      dataIndex: "guaranteeType",
      key: "guaranteeType",
      render: (type: GuaranteeType) => getTypeLabel(type),
    },
    {
      title: t ? t("table.columns.amount") : "Số tiền",
      dataIndex: "guaranteeAmount",
      key: "guaranteeAmount",
      sorter: true,
      sortOrder: getSortOrder("guaranteeAmount"),
      showSorterTooltip: {
        title: t ? t("table.columns.amount") : "Nhấp để sắp xếp theo số tiền",
      },
      render: (amount: number, record: GuaranteeListItem) =>
        formatCurrency(amount, record.currency),
    },
    {
      title: t ? t("table.columns.createdDate") : "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      sorter: true,
      sortOrder: getSortOrder("createdDate"),
      showSorterTooltip: {
        title: t
          ? t("table.columns.createdDate")
          : "Nhấp để sắp xếp theo ngày tạo",
      },
      render: (date: string) => (
        <span className="text-gray-700">
          {dayjs(date).format("DD/MM/YYYY")}
        </span>
      ),
    },
    {
      title: t ? t("table.columns.status") : "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: GuaranteeStatus) => (
        <UiTag
          color={GUARANTEE_STATUS_TAG_CLASS[status]}
          variant="solid"
          className={`rounded-md w-24 text-${GUARANTEE_STATUS_TAG_CLASS[status]}`}
          style={{ textAlign: "center" }}
        >
          {getStatusLabel(status)}
        </UiTag>
      ),
    },
    {
      title: t ? t("table.columns.actions") : "Thao tác",
      key: "action",
      align: "center",
      width: 130,
      render: (_, record) => {
        const isMaker = role === "MAKER";
        const isDraft = record.status === "DRAFT";
        const isRejected = record.status === "REJECTED";

        // Phân quyền theo Assignment:
        // 1. View: Cả Maker và Checker đều được xem ở mọi status
        const canView = true;
        // 2. Edit: Chỉ Maker và khi status là DRAFT hoặc REJECTED
        const canEdit = isMaker && (isDraft || isRejected);
        // 3. Delete: Chỉ Maker và khi status là DRAFT (bắt buộc confirmation)
        const canDelete = isMaker && isDraft;

        return (
          <div className="flex items-center justify-center gap-1.5">
            {canView && (
              <Tooltip title={t ? t("table.tooltips.view") : "Xem chi tiết"}>
                <Link
                  href={withLocale(`/guarantees/${record.id}`, locale)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                >
                  <EyeOutlined className="text-base" />
                </Link>
              </Tooltip>
            )}

            {canEdit && (
              <Tooltip title={t ? t("table.tooltips.edit") : "Chỉnh sửa"}>
                <Link
                  href={withLocale(`/guarantees/${record.id}/edit`, locale)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  <EditOutlined className="text-base" />
                </Link>
              </Tooltip>
            )}

            {canDelete && (
              <Popconfirm
                title={
                  t
                    ? t("table.confirmDelete.title")
                    : "Xác nhận xóa yêu cầu"
                }
                description={
                  t
                    ? t("table.confirmDelete.description", { id: record.id })
                    : `Bạn có chắc chắn muốn xóa yêu cầu ${record.id}?`
                }
                onConfirm={() => onDelete?.(record)}
                okText={t ? t("table.confirmDelete.ok") : "Xóa"}
                cancelText={t ? t("table.confirmDelete.cancel") : "Hủy"}
                okButtonProps={{ danger: true }}
              >
                <Tooltip
                  title={t ? t("table.tooltips.delete") : "Xóa yêu cầu"}
                >
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <DeleteOutlined className="text-base" />
                  </button>
                </Tooltip>
              </Popconfirm>
            )}
          </div>
        );
      },
    },
  ];
};

export const guaranteeColumns = getGuaranteeColumns();
export const guaranteeColumn = guaranteeColumns;
export default guaranteeColumns;
