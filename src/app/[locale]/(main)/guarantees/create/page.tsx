"use client";
import PageContainer from "@/components/ui/organisms/PageContainer";
import GuaranteeForm from "@/features/guarantee/components/form/GuaranteeForm";
import { useGuaranteeMutations } from "@/features/guarantee/hooks/useGuaranteeMutations";
import { GuaranteeFormData } from "@/features/guarantee/schemas/guarantee.schema";
import { useAppNavigation } from "@/shared/lib/navigation/useAppNavigation";
import { useTranslations } from "next-intl";

const GuaranteeCreatePage = () => {
  const t = useTranslations("guarantees");
  const tCommon = useTranslations("common");
  const { push } = useAppNavigation();
  const { createMutation, submitMutation } = useGuaranteeMutations();

  const handleSaveDraft = (data: GuaranteeFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        push("/guarantees");
      },
    });
  };

  const handleSubmitForApproval = (data: GuaranteeFormData) => {
    createMutation.mutate(data, {
      onSuccess: (newRecord) => {
        submitMutation.mutate(newRecord.id, {
          onSuccess: () => {
            push("/guarantees");
          },
        });
      },
    });
  };

  return (
    <PageContainer
      title={t("create.title")}
      subTitle={t("create.subTitle")}
      breadcrumbs={[
        { title: tCommon("breadcrumbs.home") },
        {
          title: tCommon("breadcrumbs.guarantees"),
          href: "/guarantees",
        },
        {
          title: tCommon("breadcrumbs.create"),
          href: "/guarantees/create",
        },
      ]}
    >
      <GuaranteeForm
        onSaveDraft={handleSaveDraft}
        onSubmitForApproval={handleSubmitForApproval}
        isLoading={createMutation.isPending || submitMutation.isPending}
      />
    </PageContainer>
  );
};

export default GuaranteeCreatePage;
