"use client";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import authService from "../services/auth.service";
import type { RegisterPayload, RegisterResponseData } from "../types/auth";
import type { ApiErrorResponse } from "@/features/guarantee/types/guarantee";

interface UseRegisterOptions {
  onSuccess?: (data: RegisterResponseData) => void;
}

export const useRegister = (options?: UseRegisterOptions) => {
  const { message } = App.useApp();

  return useMutation<RegisterResponseData, ApiErrorResponse, RegisterPayload>({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (data) => {
      message.success("Đăng ký tài khoản thành công! Vui lòng đăng nhập.");
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      message.error(error.message || "Đăng ký thất bại. Vui lòng thử lại!");
    },
  });
};

export default useRegister;
