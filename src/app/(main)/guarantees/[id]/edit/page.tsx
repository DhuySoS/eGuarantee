"use client";
import PageContainer from "@/components/ui/organisms/PageContainer";
import GuaranteeForm from "@/features/guarantee/components/form/GuaranteeForm";
import { useGuarantee } from "@/features/guarantee/hooks/useGuaranteeDetail";
import { useGuaranteeMutations } from "@/features/guarantee/hooks/useGuaranteeMutations";
import { GuaranteeFormData } from "@/features/guarantee/schemas/guarantee.schema";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const GuaranteeEditPage = () => {
  const router = useRouter();
  const urlParams = useParams();
  const id = urlParams?.id as string;
  const { data: guarantee, isLoading } = useGuarantee(id);
  const { updateMutation, submitMutation } = useGuaranteeMutations();

  const handleSaveDraft = (data: GuaranteeFormData) => {
    updateMutation.mutate(
      { id, payload: data },
      {
        onSuccess: () => {
          router.push("/guarantees");
        },
      },
    );
  };

  const handleSubmitForApproval = (data: GuaranteeFormData) => {
    updateMutation.mutate(
      { id, payload: data },
      {
        onSuccess: () => {
          submitMutation.mutate(id, {
            onSuccess: () => {
              router.push("/guarantees");
            },
          });
        },
      },
    );
  };
  return (
    <PageContainer
      title="Chỉnh sửa yêu cầu bảo lãnh"
      subTitle="Cập nhật và chỉnh sửa thông tin yêu cầu bảo lãnh."
      breadcrumbs={[
        { title: "Trang chủ" },
        {
          title: "Yêu cầu bảo lãnh",
          href: "/guarantees",
        },
        {
          title: "Chỉnh sửa",
        },
      ]}
    >
      <GuaranteeForm
        initialData={guarantee}
        onSaveDraft={handleSaveDraft}
        onSubmitForApproval={handleSubmitForApproval}
        isLoading={updateMutation.isPending || submitMutation.isPending}
      />
    </PageContainer>
  );
};

export default GuaranteeEditPage;
