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

export type SortableGuaranteeField =
  "createdDate" | "guaranteeAmount" | "customerName";

export interface GuaranteeColumnOptions {
  sortBy?: SortableGuaranteeField;
  sortDirection?: "asc" | "desc";
  role?: UserRole;
  onDelete?: (record: GuaranteeListItem) => void;
}

export const getGuaranteeColumns = (
  options?: GuaranteeColumnOptions,
): UiTableColumnsType<GuaranteeListItem> => {
  const { sortBy, sortDirection, role = "MAKER", onDelete } = options || {};

  const getSortOrder = (field: SortableGuaranteeField) => {
    if (sortBy !== field) return null;
    return sortDirection === "asc" ? "ascend" : "descend";
  };

  return [
    {
      title: "Mã yêu cầu",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      sorter: true,
      sortOrder: getSortOrder("customerName"),
      showSorterTooltip: { title: "Nhấp để sắp xếp theo tên khách hàng" },
    },
    {
      title: "CIF",
      dataIndex: "customerCif",
      key: "customerCif",
      className: "text-gray-700",
    },
    {
      title: "Loại bảo lãnh",
      dataIndex: "guaranteeType",
      key: "guaranteeType",
      render: (type: GuaranteeType) => GUARANTEE_TYPE_LABELS[type] ?? type,
    },
    {
      title: "Số tiền",
      dataIndex: "guaranteeAmount",
      key: "guaranteeAmount",
      sorter: true,
      sortOrder: getSortOrder("guaranteeAmount"),
      showSorterTooltip: { title: "Nhấp để sắp xếp theo số tiền" },
      render: (amount: number, record: GuaranteeListItem) =>
        formatCurrency(amount, record.currency),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      sorter: true,
      sortOrder: getSortOrder("createdDate"),
      showSorterTooltip: { title: "Nhấp để sắp xếp theo ngày tạo" },
      render: (date: string) => (
        <span className="text-gray-700">
          {dayjs(date).format("DD/MM/YYYY")}
        </span>
      ),
    },
    {
      title: "Trạng thái",
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
          {GUARANTEE_STATUS_LABELS[status] ?? status}
        </UiTag>
      ),
    },
    {
      title: "Thao tác",
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
              <Tooltip title="Xem chi tiết">
                <Link
                  href={`/guarantees/${record.id}`}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                >
                  <EyeOutlined className="text-base" />
                </Link>
              </Tooltip>
            )}

            {canEdit && (
              <Tooltip title="Chỉnh sửa">
                <Link
                  href={`/guarantees/${record.id}/edit`}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  <EditOutlined className="text-base" />
                </Link>
              </Tooltip>
            )}

            {canDelete && (
              <Popconfirm
                title="Xác nhận xóa yêu cầu"
                description={`Bạn có chắc chắn muốn xóa yêu cầu ${record.id}?`}
                onConfirm={() => onDelete?.(record)}
                okText="Xóa"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
              >
                <Tooltip title="Xóa yêu cầu">
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
