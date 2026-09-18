import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { ApiErrorResponse } from "@/features/guarantee/types/guarantee";
import { getFallbackErrorMessage } from "@/utils/error";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    console.error("[API Request Error]:", error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "Unknown URL";
    const method = error.config?.method?.toUpperCase() || "GET";

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
      // Lỗi Network hoặc Server không phản hồi
      apiError = {
        timestamp: new Date().toISOString(),
        status: status || 500,
        code: status ? `HTTP_${status}` : "NETWORK_ERROR",
        message: getFallbackErrorMessage(status) || error.message,
      };
    }

    // Xử lý 401: Xóa token khi hết hạn phiên đăng nhập
    if (status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }

    // Log chi tiết lỗi ra console phục vụ kiểm tra và debug
    console.error(
      `[API Error] [${method}] ${requestUrl} - Status ${apiError.status} (${apiError.code}):`,
      apiError.message,
      apiError.errors || "",
    );

    return Promise.reject(apiError);
  },
);

export default apiClient;
