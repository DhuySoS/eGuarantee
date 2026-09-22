"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import AuthTemplate from "@/components/templates/AuthTemplate";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useAppNavigation } from "@/shared/lib/navigation/useAppNavigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const { replace } = useAppNavigation();
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      replace("/guarantees");
    }
  }, [isLoading, isAuthenticated, replace]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  return <AuthTemplate>{children}</AuthTemplate>;
}
