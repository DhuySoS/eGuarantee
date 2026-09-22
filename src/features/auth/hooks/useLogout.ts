"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import authService from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useTranslations } from "next-intl";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout: authContextLogout } = useAuth();
  const { message } = App.useApp();
  const t = useTranslations("auth.logout");
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      message.success(t("logoutSuccess"));
    },
    onError: (error: any) => {
      console.warn("Logout API warning:", error);
    },
    onSettled: () => {
      queryClient.clear();
      authContextLogout();
    },
  });
};

export default useLogout;
