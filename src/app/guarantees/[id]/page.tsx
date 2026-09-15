import PageContainer from "@/components/ui/organisms/PageContainer";
import React from "react";

const GuaranteeDetailPage = () => {
  return (
    <PageContainer
      title="Chi tiết yêu cầu bảo lãnh"
      subTitle={
        <div className="flex gap-2">
          <p className="text-gray-900 font-bold">GR-2024-000001</p>{" "}
          <span>Chờ duyệt</span>
        </div>
      }
      extra={<div className="flex gap-4">Thao tác hồ sơ</div>}
      breadcrumbs={[
        { title: "Trang chủ" },
        {
          title: "Yêu cầu bảo lãnh",
          href: "/guarantees",
        },
        {
          title: "Chi tiết",
        },
      ]}
    >
      <p>Content</p>
    </PageContainer>
  );
};

export default GuaranteeDetailPage;
