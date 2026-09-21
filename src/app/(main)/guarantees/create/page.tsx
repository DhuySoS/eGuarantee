"use client";
import UiButton from "@/components/ui/atoms/UiButton";
import PageContainer from "@/components/ui/organisms/PageContainer";
import GuaranteeForm from "@/features/guarantee/components/form/GuaranteeForm";
import { useGuaranteeMutations } from "@/features/guarantee/hooks/useGuaranteeMutations";
import { GuaranteeFormData } from "@/features/guarantee/schemas/guarantee.schema";
import { useRouter } from "next/navigation";

const GuaranteeCreatePage = () => {
  const router = useRouter();
  const { createMutation, submitMutation } = useGuaranteeMutations();

  const handleSaveDraft = (data: GuaranteeFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        router.push("/guarantees");
      },
    });
  };

  const handleSubmitForApproval = (data: GuaranteeFormData) => {
    createMutation.mutate(data, {
      onSuccess: (newRecord) => {
        submitMutation.mutate(newRecord.id, {
          onSuccess: () => {
            router.push("/guarantees");
          },
        });
      },
    });
  };
  return (
    <PageContainer
      title="Tạo mới yêu cầu bảo lãnh"
      subTitle="Nhập thông tin để khởi tạo hồ sơ yêu cầu bảo lãnh điện tử."

      breadcrumbs={[
        { title: "Trang chủ" },
        {
          title: "Yêu cầu bảo lãnh",
          href: "/guarantees",
        },
        {
          title: "Tạo mới",
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
