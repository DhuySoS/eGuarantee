"use client";

import React, { useEffect } from "react";
import { Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UiInput from "@/components/ui/atoms/UiInput";
import UiButton from "@/components/ui/atoms/UiButton";
import UiInputField from "@/components/ui/molecules/UiInputField";
import { useTranslations } from "next-intl";
import {
  customerFormSchema,
  type CustomerFormData,
} from "../../schemas/customer.schema";
import type { Customer } from "../../types/customer";

export interface CustomerFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CustomerFormData) => void;
  initialData?: Customer | null;
  loading?: boolean;
}

const CustomerFormModal: React.FC<CustomerFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  loading = false,
}) => {
  const t = useTranslations("customers.formModal");
  const isEdit = !!initialData;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      cif: "",
      customerName: "",
      taxCode: "",
      address: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          cif: initialData.cif,
          customerName: initialData.customerName,
          taxCode: initialData.taxCode,
          address: initialData.address || "",
        });
      } else {
        reset({
          cif: "",
          customerName: "",
          taxCode: "",
          address: "",
        });
      }
    }
  }, [open, initialData, reset]);

  const onFormSubmit = (values: CustomerFormData) => {
    onSubmit(values);
  };

  return (
    <Modal
      open={open}
      title={
        <div className="text-xl font-bold text-gray-900 dark:text-gray-100 pb-2 border-b border-gray-100 dark:border-gray-800">
          {isEdit ? t("editTitle") : t("createTitle")}
        </div>
      }
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      centered
      width={560}
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 pt-4">
        {/* CIF */}
        <Controller
          name="cif"
          control={control}
          render={({ field }) => (
            <UiInputField label={t("fields.cif")} required error={errors.cif?.message}>
              <UiInput
                {...field}
                placeholder={t("placeholders.cif")}
                disabled={isEdit}
                maxLength={12}
                className="h-10 font-mono"
              />
            </UiInputField>
          )}
        />

        {/* Tên khách hàng */}
        <Controller
          name="customerName"
          control={control}
          render={({ field }) => (
            <UiInputField
              label={t("fields.customerName")}
              required
              error={errors.customerName?.message}
            >
              <UiInput
                {...field}
                placeholder={t("placeholders.customerName")}
                maxLength={255}
                className="h-10"
              />
            </UiInputField>
          )}
        />

        {/* Mã số thuế */}
        <Controller
          name="taxCode"
          control={control}
          render={({ field }) => (
            <UiInputField
              label={t("fields.taxCode")}
              required
              error={errors.taxCode?.message}
            >
              <UiInput
                {...field}
                placeholder={t("placeholders.taxCode")}
                maxLength={50}
                className="h-10 font-mono"
              />
            </UiInputField>
          )}
        />

        {/* Địa chỉ */}
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <UiInputField label={t("fields.address")} error={errors.address?.message}>
              <UiInput.TextArea
                {...field}
                placeholder={t("placeholders.address")}
                rows={3}
                maxLength={300}
                showCount
              />
            </UiInputField>
          )}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <UiButton
            color="default"
            variant="outlined"
            onClick={onClose}
            disabled={loading}
          >
            {t("buttons.cancel")}
          </UiButton>
          <UiButton type="primary" htmlType="submit" loading={loading}>
            {isEdit ? t("buttons.submitEdit") : t("buttons.submitCreate")}
          </UiButton>
        </div>
      </form>
    </Modal>
  );
};

export default CustomerFormModal;
