import UiButton from "@/components/ui/atoms/UiButton";
import PageContainer from "@/components/ui/organisms/PageContainer";

const GuaranteeCreatePage = () => {
  return (
    <PageContainer
      title="Tạo mới yêu cầu bảo lãnh"
      subTitle="Nhập thông tin để khởi tạo hồ sơ yêu cầu bảo lãnh điện tử."
      extra={
        <div className="flex gap-2 ">
          <UiButton
            color="primary"
            variant="outlined"
            style={{ fontWeight: 500 }}
            size="large"
          >
            Chỉnh sửa
          </UiButton>
          <UiButton type="primary" style={{ fontWeight: 500 }} size="large">
            Gửi duyệt
          </UiButton>
        </div>
      }
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
      <p>Content</p>
    </PageContainer>
  );
};

export default GuaranteeCreatePage;
