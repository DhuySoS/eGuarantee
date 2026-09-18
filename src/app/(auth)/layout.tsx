"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import AuthTemplate from "@/components/templates/AuthTemplate";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/guarantees");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  // Đã đăng nhập -> không render AuthTemplate để tránh nhấp nháy
  if (isAuthenticated) {
    return null;
  }

  return <AuthTemplate>{children}</AuthTemplate>;
}
