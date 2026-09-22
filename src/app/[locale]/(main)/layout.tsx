"use client";

import React, { useEffect } from "react";
import { Spin } from "antd";
import MainTemplate from "@/components/templates/MainTemplate";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useAppNavigation } from "@/shared/lib/navigation/useAppNavigation";

import { useTranslations } from "next-intl";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tCommon = useTranslations("common");
  const { isAuthenticated, isLoading } = useAuth();
  const { replace } = useAppNavigation();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      replace("/auth");
    }
  }, [isLoading, isAuthenticated, replace]);

  // Đang kiểm tra token
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" description={tCommon("header.checkingSession")} />
      </div>
    );
  }

  // Chưa đăng nhập -> chặn không render MainTemplate
  if (!isAuthenticated) {
    return null;
  }

  return <MainTemplate>{children}</MainTemplate>;
}
