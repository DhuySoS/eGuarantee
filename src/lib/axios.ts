import axios, { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/features/guarantee/types/guarantee';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Response Interceptor: chuẩn hóa lỗi về ApiErrorResponse nếu có
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    const fallbackError: ApiErrorResponse = {
      timestamp: new Date().toISOString(),
      status: error.response?.status || 500,
      code: 'NETWORK_ERROR',
      message: error.message || 'Đã xảy ra lỗi kết nối. Vui lòng thử lại.',
    };

    return Promise.reject(fallbackError);
  }
);
