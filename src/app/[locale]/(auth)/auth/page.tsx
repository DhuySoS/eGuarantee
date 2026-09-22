"use client";

import LocaleSwitcher from "@/components/locale-switcher/LocaleSwitcher";
import LoginForm from "@/features/auth/components/LoginForm";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const AuthContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tLogin = useTranslations("auth.login");
  const tRegister = useTranslations("auth.register");

  const currentTab =
    searchParams.get("tab") === "register" ? "register" : "login";
  const isLogin = currentTab === "login";

  const handleSwitchTab = (tab: "login" | "register") => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "register") {
      params.set("tab", "register");
    } else {
      params.delete("tab");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div
      className="flex gap-2 bg-no-repeat bg-center bg-cover w-screen h-screen"
      style={{
        backgroundImage: `url("/images/background-auth.webp")`,
      }}
    >
      <div className="hidden md:flex  w-[40%] flex-col h-full justify-between  px-8 py-10 lg:px-12 lg:py-16">
        {/* Góc trên: Logo / Brand */}
        <p className="text-2xl font-bold">{tLogin("hero.brand")}</p>

        {/* Ở giữa: Tiêu đề và mô tả */}
        <div className="flex flex-col gap-4 my-auto max-w-130">
          <p className="text-5xl font-bold leading-tight">
            {tLogin("hero.headline")}
          </p>
          <p className="text-lg font-medium">{tLogin("hero.subheadline")}</p>
        </div>

        {/* Góc dưới: Chừa trống để cân đối layout */}
      </div>
      <div className="flex-1 w-full h-screen bg-white rounded-l-[100px] border-l border-gray-100">
        <div className="absolute top-0 right-0 px-12 py-4">
          <LocaleSwitcher />
        </div>
        <div className="w-[60%] h-screen mx-auto flex flex-col justify-center items-start gap-4">
          <p className="text-sm font-medium">
            {isLogin ? tLogin("welcomeBack") : tRegister("getStarted")}
          </p>
          <p className="text-3xl font-semibold leading-tight">
            {isLogin ? tLogin("title") : tRegister("title")}
          </p>
          <p className="text-sm font-medium text-gray-500">
            {isLogin ? tLogin("subtitle") : tRegister("subtitle")}
          </p>

          {isLogin ? (
            <LoginForm onSwitchToRegister={() => handleSwitchTab("register")} />
          ) : (
            <RegisterForm onSwitchToLogin={() => handleSwitchTab("login")} />
          )}
        </div>
      </div>
    </div>
  );
};

const AuthPage = () => {
  return (
    <Suspense>
      <AuthContent />
    </Suspense>
  );
};

export default AuthPage;
