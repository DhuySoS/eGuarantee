"use client";

import React from "react";
import { Modal } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import UiButton from "@/components/ui/atoms/UiButton";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("customers");

  if (!customer) return null;

  return (
    <Modal
      open={open}
      title={
        <div className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
            <UserOutlined />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-none">
              {t("detailModal.title")}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
              CIF: {customer.cif}
            </p>
          </div>
        </div>
      }
      onCancel={onClose}
      footer={
        <div className="flex justify-end gap-3 pt-2">
          <UiButton color="default" variant="outlined" onClick={onClose}>
            {t("detailModal.close")}
          </UiButton>
          <UiButton
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              onClose();
              onEdit?.(customer);
            }}
          >
            {t("detailModal.edit")}
          </UiButton>
        </div>
      }
      centered
      width={540}
    >
      <div className="py-4 space-y-4">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block">
              {t("formModal.fields.cif")}
            </span>
            <span className="text-base font-semibold text-blue-600 dark:text-blue-400 font-mono">
              {customer.cif}
            </span>
          </div>

          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block">
              {t("formModal.fields.taxCode")}
            </span>
            <span className="text-base font-semibold text-gray-800 dark:text-gray-200 font-mono">
              {customer.taxCode || "-"}
            </span>
          </div>
        </div>

        <div className="space-y-3 px-1">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block">
              {t("formModal.fields.customerName")}
            </span>
            <span className="text-base font-medium text-gray-900 dark:text-gray-100">
              {customer.customerName}
            </span>
          </div>

          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block">
              {t("formModal.fields.address")}
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {customer.address || t("detailModal.noAddress")}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomerDetailModal;
