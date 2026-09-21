import React from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip, Popconfirm } from "antd";
import { type UiTableColumnsType } from "@/components/ui/atoms/UiTable";
import type { Customer } from "../../types/customer";

export type SortableCustomerField = "cif" | "customerName" | "taxCode";

export interface CustomerColumnOptions {
  sortBy?: SortableCustomerField;
  sortDirection?: "asc" | "desc";
  onView?: (record: Customer) => void;
  onEdit?: (record: Customer) => void;
  onDelete?: (record: Customer) => void;
}

export const getCustomerColumns = (
  options?: CustomerColumnOptions,
): UiTableColumnsType<Customer> => {
  const { sortBy, sortDirection, onView, onEdit, onDelete } = options || {};

  const getSortOrder = (field: SortableCustomerField) => {
    if (sortBy !== field) return null;
    return sortDirection === "asc" ? "ascend" : "descend";
  };

  return [
    {
      title: "Mã CIF",
      dataIndex: "cif",
      key: "cif",
      width: 150,
      render: (cif: string) => (
        <span className="font-semibold text-blue-600 font-mono">{cif}</span>
      ),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      render: (name: string) => (
        <span className="font-medium text-gray-900">{name}</span>
      ),
    },
    {
      title: "Mã số thuế",
      dataIndex: "taxCode",
      key: "taxCode",
      width: 200,
      render: (taxCode: string) => (
        <span className="text-gray-700 font-mono text-sm">
          {taxCode || "-"}
        </span>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
      render: (address: string) => (
        <span className="text-gray-600">{address || "-"}</span>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      width: 130,
      render: (_, record) => {
        return (
          <div className="flex items-center justify-center gap-1.5">
            <Tooltip title="Xem chi tiết">
              <button
                type="button"
                onClick={() => onView?.(record)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <EyeOutlined className="text-base" />
              </button>
            </Tooltip>

            <Tooltip title="Chỉnh sửa">
              <button
                type="button"
                onClick={() => onEdit?.(record)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
              >
                <EditOutlined className="text-base" />
              </button>
            </Tooltip>

            <Popconfirm
              title="Xác nhận xóa khách hàng"
              description={`Bạn có chắc chắn muốn xóa khách hàng "${record.customerName}" (CIF: ${record.cif})?`}
              onConfirm={() => onDelete?.(record)}
              okText="Xóa"
              cancelText="Hủy"
              okButtonProps={{ danger: true }}
            >
              <Tooltip title="Xóa khách hàng">
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <DeleteOutlined className="text-base" />
                </button>
              </Tooltip>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
};

export default getCustomerColumns;
