"use client";

import React, { useEffect, useMemo } from "react";
import { Spin, App } from "antd";
import { usePathname } from "next/navigation";
import MainTemplate from "@/components/templates/MainTemplate";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useAppNavigation } from "@/shared/lib/navigation/useAppNavigation";
import { stripLocale } from "@/shared/i18n/path";
import { checkRoutePermission } from "@/shared/config/routePermissions";

import { useTranslations } from "next-intl";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tCommon = useTranslations("common");
  const { isAuthenticated, isLoading, user } = useAuth();
  const { replace } = useAppNavigation();
  const pathname = usePathname();
  const { message } = App.useApp();

  const cleanPath = useMemo(() => stripLocale(pathname), [pathname]);

  // 1. Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      replace("/auth");
    }
  }, [isLoading, isAuthenticated, replace]);

  // 2. Kiểm tra phân quyền truy cập route tập trung
  const permissionCheck = useMemo(() => {
    if (isLoading || !isAuthenticated) {
      return { isAllowed: false };
    }
    return checkRoutePermission(cleanPath, user?.role);
  }, [cleanPath, user?.role, isLoading, isAuthenticated]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && !permissionCheck.isAllowed) {
      const errorMsg =
        permissionCheck.matchedRule?.errorMessage ||
        "Bạn không có quyền truy cập trang này.";
      message.error(errorMsg);
      replace(permissionCheck.matchedRule?.redirectTo || "/guarantees");
    }
  }, [isLoading, isAuthenticated, permissionCheck, replace, message]);

  // Đang kiểm tra phiên đăng nhập
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Spin size="large" description={tCommon("header.checkingSession")} />
      </div>
    );
  }

  // Chưa đăng nhập hoặc không có quyền truy cập trang này -> chặn không render
  if (!isAuthenticated || !permissionCheck.isAllowed) {
    return null;
  }

  return <MainTemplate>{children}</MainTemplate>;
}
