"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { App } from "antd";
import authService from "../services/auth.service";
import type { LoginPayload, AuthTokens } from "../types/auth";
import type { ApiErrorResponse } from "@/features/guarantee/types/guarantee";
import { useAuth } from "../context/AuthContext";
import { useAppNavigation } from "@/shared/lib/navigation/useAppNavigation";
import { useTranslations } from "next-intl";

export const useLogin = () => {
  const { login: setAuthLogin } = useAuth();
  const { message } = App.useApp();
  const { push } = useAppNavigation();
  const t = useTranslations("auth.login");
  return useMutation<AuthTokens, ApiErrorResponse, LoginPayload>({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      setAuthLogin(data.accessToken, data.refreshToken);
      message.success(t("loginSuccess"));
      setTimeout(() => {
        push("/guarantees");
      }, 500);
    },
    onError: (error) => {
      message.error(error.message || t("loginFailed"));
    },
  });
};

export default useLogin;
