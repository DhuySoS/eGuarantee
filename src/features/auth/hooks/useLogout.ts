"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { App } from "antd";
import authService from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout: authContextLogout } = useAuth();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      message.success("Đăng xuất thành công!");
    },
    onError: (error: any) => {
      // Dù API logout có lỗi (ví dụ token hết hạn trước đó), ở client vẫn dọn dẹp phiên
      console.warn("Logout API warning:", error);
    },
    onSettled: () => {
      // Dọn dẹp cache của React Query để bảo mật dữ liệu
      queryClient.clear();
      // Xóa token và cập nhật AuthContext, chuyển hướng về /auth
      authContextLogout();
    },
  });
};

export default useLogout;
