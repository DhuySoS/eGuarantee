"use client";
import PageContainer from "@/components/ui/organisms/PageContainer";
import GuaranteeForm from "@/features/guarantee/components/form/GuaranteeForm";
import { useGuarantee } from "@/features/guarantee/hooks/useGuaranteeDetail";
import { useGuaranteeMutations } from "@/features/guarantee/hooks/useGuaranteeMutations";
import { GuaranteeFormData } from "@/features/guarantee/schemas/guarantee.schema";
import { useAppNavigation } from "@/shared/lib/navigation/useAppNavigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const GuaranteeEditPage = () => {
  const t = useTranslations("guarantees");
  const tCommon = useTranslations("common");
  const { push } = useAppNavigation();
  const urlParams = useParams();
  const id = urlParams?.id as string;
  const { data: guarantee } = useGuarantee(id);
  const { updateMutation, submitMutation } = useGuaranteeMutations();

  const handleSaveDraft = (data: GuaranteeFormData) => {
    updateMutation.mutate(
      { id, payload: data },
      {
        onSuccess: () => {
          push("/guarantees");
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
              push("/guarantees");
            },
          });
        },
      },
    );
  };

  return (
    <PageContainer
      title={t("edit.title")}
      subTitle={t("edit.subTitle")}
      breadcrumbs={[
        { title: tCommon("breadcrumbs.home") },
        {
          title: tCommon("breadcrumbs.guarantees"),
          href: "/guarantees",
        },
        {
          title: tCommon("breadcrumbs.edit"),
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
