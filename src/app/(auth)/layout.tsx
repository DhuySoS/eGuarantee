import AuthTemplate from "@/components/templates/AuthTemplate";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthTemplate>{children}</AuthTemplate>;
}
