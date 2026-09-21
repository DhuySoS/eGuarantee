"use client";

import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import UiButton from "@/components/ui/atoms/UiButton";
import PageContainer from "@/components/ui/organisms/PageContainer";
import CustomerListView from "@/features/customer/components/list/CustomerListView";
import CustomerFormModal from "@/features/customer/components/modal/CustomerFormModal";
import { useCustomerMutations } from "@/features/customer/hooks/useCustomerMutations";
import type { CustomerFormData } from "@/features/customer/schemas/customer.schema";

const CustomerPage = () => {
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
      title="Quản lý khách hàng"
      subTitle="Tìm kiếm, theo dõi và quản lý thông tin khách hàng doanh nghiệp."
      extra={
        <UiButton
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => setCreateOpen(true)}
        >
          Thêm mới khách hàng
        </UiButton>
      }
      breadcrumbs={[
        { title: "Trang chủ" },
        {
          title: "Quản lý khách hàng",
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
