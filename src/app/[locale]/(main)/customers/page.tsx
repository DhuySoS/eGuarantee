"use client";

import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import UiButton from "@/components/ui/atoms/UiButton";
import PageContainer from "@/components/ui/organisms/PageContainer";
import CustomerListView from "@/features/customer/components/list/CustomerListView";
import CustomerFormModal from "@/features/customer/components/modal/CustomerFormModal";
import { useCustomerMutations } from "@/features/customer/hooks/useCustomerMutations";
import type { CustomerFormData } from "@/features/customer/schemas/customer.schema";

import { useTranslations } from "next-intl";

const CustomerPage = () => {
  const t = useTranslations("customers");
  const tCommon = useTranslations("common");
  const [createOpen, setCreateOpen] = useState(false);
  const { createMutation } = useCustomerMutations();

  const handleCreate = (data: CustomerFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setCreateOpen(false);
      },
    });
  };

  return (
    <PageContainer
      title={t("list.title")}
      subTitle={t("list.subTitle")}
      extra={
        <UiButton
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => setCreateOpen(true)}
        >
          {t("list.createButton")}
        </UiButton>
      }
      breadcrumbs={[
        { title: tCommon("breadcrumbs.home") },
        {
          title: tCommon("breadcrumbs.customers"),
          href: "/customers",
        },
      ]}
    >
      <CustomerListView />

      {/* Modal Thêm mới nhanh từ header */}
      <CustomerFormModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
        loading={createMutation.isPending}
      />
    </PageContainer>
  );
};

export default CustomerPage;
