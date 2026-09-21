"use client";

import React from "react";
import { Modal } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import UiButton from "@/components/ui/atoms/UiButton";
import type { Customer } from "../../types/customer";

export interface CustomerDetailModalProps {
  open: boolean;
  customer?: Customer | null;
  onClose: () => void;
  onEdit?: (customer: Customer) => void;
}

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  open,
  customer,
  onClose,
  onEdit,
}) => {
  if (!customer) return null;

  return (
    <Modal
      open={open}
      title={
        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
            <UserOutlined />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 leading-none">
              Chi tiết khách hàng
            </h3>
            <p className="text-xs text-gray-500 mt-1 font-mono">
              CIF: {customer.cif}
            </p>
          </div>
        </div>
      }
      onCancel={onClose}
      footer={
        <div className="flex justify-end gap-3 pt-2">
          <UiButton color="default" variant="outlined" onClick={onClose}>
            Đóng
          </UiButton>
          <UiButton
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              onClose();
              onEdit?.(customer);
            }}
          >
            Chỉnh sửa
          </UiButton>
        </div>
      }
      centered
      width={540}
    >
      <div className="py-4 space-y-4">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 grid grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-gray-500 font-medium block">
              Mã CIF
            </span>
            <span className="text-base font-semibold text-blue-600 font-mono">
              {customer.cif}
            </span>
          </div>

          <div>
            <span className="text-xs text-gray-500 font-medium block">
              Mã số thuế
            </span>
            <span className="text-base font-semibold text-gray-800 font-mono">
              {customer.taxCode || "-"}
            </span>
          </div>
        </div>

        <div className="space-y-3 px-1">
          <div>
            <span className="text-xs text-gray-500 font-medium block">
              Tên khách hàng
            </span>
            <span className="text-base font-medium text-gray-900">
              {customer.customerName}
            </span>
          </div>

          <div>
            <span className="text-xs text-gray-500 font-medium block">
              Địa chỉ
            </span>
            <span className="text-sm text-gray-700">
              {customer.address || "Chưa có thông tin địa chỉ"}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomerDetailModal;
