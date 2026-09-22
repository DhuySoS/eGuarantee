"use client";

import { useEffect } from "react";
import { Spin } from "antd";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useAppNavigation } from "@/shared/lib/navigation/useAppNavigation";

export default function LocaleRootPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const { replace } = useAppNavigation();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        replace("/guarantees");
      } else {
        replace("/auth");
      }
    }
  }, [isLoading, isAuthenticated, replace]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <Spin size="large" />
    </div>
  );
}
