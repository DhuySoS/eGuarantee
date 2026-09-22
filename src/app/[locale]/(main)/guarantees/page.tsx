import UiButton from "@/components/ui/atoms/UiButton";
import PageContainer from "@/components/ui/organisms/PageContainer";
import ListView from "@/features/guarantee/components/list/ListView";
import Link from "next/link";
import { RoleGate } from "@/features/auth/components/RoleGate";
import { getTranslations } from "next-intl/server";

export default async function GuaranteeListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("guarantees.list");
  const tCommon = await getTranslations("common");

  return (
    <PageContainer
      title={t("title")}
      subTitle={t("subTitle")}
      extra={
        <RoleGate roles="MAKER">
          <Link href={`/${locale}/guarantees/create`}>
            <UiButton type="primary" size="large">
              {t("createButton")}
            </UiButton>
          </Link>
        </RoleGate>
      }
      breadcrumbs={[
        { title: tCommon("breadcrumbs.home") },
        {
          title: tCommon("breadcrumbs.guarantees"),
          href: "/guarantees",
        },
      ]}
    >
      <ListView />
    </PageContainer>
  );
}
