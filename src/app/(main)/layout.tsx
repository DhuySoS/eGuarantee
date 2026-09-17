import MainTemplate from "@/components/templates/MainTemplate";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainTemplate>{children}</MainTemplate>;
}
