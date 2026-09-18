import UiButton from "@/components/ui/atoms/UiButton";
import PageContainer from "@/components/ui/organisms/PageContainer";
import ListView from "@/features/guarantee/components/list/ListView";
import Link from "next/link";

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
      <ListView />
    </PageContainer>
  );
};

export default GuaranteeListPage;
