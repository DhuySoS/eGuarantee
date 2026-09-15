import UiButton from "@/components/ui/atoms/UiButton";
import PageContainer from "@/components/ui/organisms/PageContainer";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

const GuaranteeListPage = () => {
  return (
    <PageContainer
      title="Quản lý yêu cầu bảo lãnh"
      subTitle="Tìm kiếm, theo dõi và quản lý các yêu cầu bảo lãnh."
      extra={
        <Link href="/guarantees/create">
          <UiButton type="primary" size="large">
            Tạo yêu cầu bảo lãnh
          </UiButton>
        </Link>
      }
      breadcrumbs={[
        { title: "Trang chủ" },
        {
          title: "Yêu cầu bảo lãnh",
          href: "/guarantees",
        },
      ]}
    >
      <div className="min-h-screen">Content</div>
    </PageContainer>
  );
};

export default GuaranteeListPage;
