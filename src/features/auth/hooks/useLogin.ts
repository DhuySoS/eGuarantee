"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { App } from "antd";
import authService from "../services/auth.service";
import type { LoginPayload, AuthTokens } from "../types/auth";
import type { ApiErrorResponse } from "@/features/guarantee/types/guarantee";
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
  const router = useRouter();
  const { login: setAuthLogin } = useAuth();
  const { message } = App.useApp();

  return useMutation<AuthTokens, ApiErrorResponse, LoginPayload>({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      setAuthLogin(data.accessToken, data.refreshToken);
      message.success("Đăng nhập thành công!");
      router.push("/guarantees");
    },
    onError: (error) => {
      message.error(error.message || "Đăng nhập thất bại. Vui lòng thử lại!");
    },
  });
};

export default useLogin;
