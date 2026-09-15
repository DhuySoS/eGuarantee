import PageContainer from "@/components/ui/organisms/PageContainer";
import React from "react";

const GuaranteeEditPage = () => {
  return (
    <PageContainer
      title="Chỉnh sửa yêu cầu bảo lãnh"
      subTitle="Cập nhật và chỉnh sửa thông tin yêu cầu bảo lãnh."
      extra={<div className="flex gap-4">Lưu thay đổi</div>}
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
      <p>Content</p>
    </PageContainer>
  );
};

export default GuaranteeEditPage;

