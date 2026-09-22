import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import type { ApiErrorResponse } from "@/features/guarantee/types/guarantee";
import { getFallbackErrorMessage } from "@/utils/error";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Kiểm tra token sắp hết hạn (trước 60 giây) hoặc đã hết hạn
const isTokenExpiringSoon = (token: string, bufferSeconds = 60): boolean => {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    if (!decoded.exp) return true;
    return decoded.exp * 1000 - bufferSeconds * 1000 < Date.now();
  } catch {
    return true;
  }
};

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      let accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      const isAuthUrl =
        config.url?.includes("/auth/login") ||
        config.url?.includes("/auth/refresh-token") ||
        config.url?.includes("/auth/register");

      // Nếu token sắp hết hạn trong 60 giây tới, tự động refresh trước khi gửi request
      if (
        accessToken &&
        refreshToken &&
        !isAuthUrl &&
        isTokenExpiringSoon(accessToken)
      ) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
            { refreshToken },
          );
          const data = res.data?.data ?? res.data;
          if (data?.accessToken) {
            accessToken = data.accessToken;
            localStorage.setItem("access_token", data.accessToken);
            if (data.refreshToken) {
              localStorage.setItem("refresh_token", data.refreshToken);
            }
          }
        } catch {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
      }

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;

    let apiError: ApiErrorResponse;

    if (error.response?.data && typeof error.response.data === "object") {
      apiError = {
        timestamp: error.response.data.timestamp || new Date().toISOString(),
        status: status || 500,
        code: error.response.data.code || "API_ERROR",
        message: error.response.data.message || getFallbackErrorMessage(status),
        errors: error.response.data.errors,
      };
    } else {
      apiError = {
        timestamp: new Date().toISOString(),
        status: status || 500,
        code: status ? `HTTP_${status}` : "NETWORK_ERROR",
        message: getFallbackErrorMessage(status) || error.message,
      };
    }

    // Xử lý 401: Xóa token khi hết hạn phiên đăng nhập (bỏ qua nếu là request auth hoặc đang ở trang auth)
    const isAuthUrl =
      error.config?.url?.includes("/auth/login") ||
      error.config?.url?.includes("/auth/register");

    if (status === 401 && !isAuthUrl && typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      if (!window.location.pathname.includes("/auth")) {
        window.location.href = "/auth";
      }
    }

    return Promise.reject(apiError);
  },
);

export default apiClient;
