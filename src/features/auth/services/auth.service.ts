import apiClient from "@/lib/axios";
import type { AuthTokens, LoginPayload } from "../types/auth";
import type { ApiResponse } from "@/features/guarantee/types/guarantee";

export const authService = {
  async login(payload: LoginPayload): Promise<AuthTokens> {
    const response = await apiClient.post<ApiResponse<AuthTokens>>(
      "/auth/login",
      payload,
    );
    return response.data.data;
  },

  async logout() {
    const response = await apiClient.post("/auth/logout", {
      token: this.getToken(),
    });
    return response.data;
  },

  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  },
};

export default authService;
