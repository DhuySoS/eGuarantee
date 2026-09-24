import apiClient from "@/lib/axios";
import type {
  Guarantee,
  GuaranteeListItem,
  GuaranteeListResult,
  GuaranteeQueryParams,
  CreateGuaranteePayload,
  UpdateGuaranteePayload,
  RejectGuaranteePayload,
  ProcessingHistory,
  PageData,
  ApiResponse,
  Customer,
} from "../types/guarantee";

export const guaranteeService = {
  async getGuarantees(
    params?: GuaranteeQueryParams,
  ): Promise<GuaranteeListResult> {
    const response = await apiClient.get<any>("/guarantees", { params });
    const res = response.data;

    if (res?.data?.content && Array.isArray(res.data.content)) {
      return {
        items: res.data.content,
        total: res.data.totalElements ?? res.data.content.length,
        page: res.data.page ?? 0,
        size: res.data.size ?? 10,
        totalPages: res.data.totalPages ?? 1,
        last: res.data.last ?? false,
      };
    }
    return {
      items: [],
      total: 0,
      page: 0,
      size: 10,
      totalPages: 0,
      last: true,
    };
  },

  async getGuaranteeById(id: string): Promise<Guarantee> {
    const response = await apiClient.get<ApiResponse<Guarantee> | Guarantee>(
      `/guarantees/${id}`,
    );
    const resData = response.data as any;
    return resData?.data ?? resData;
  },

  async createGuarantee(payload: CreateGuaranteePayload): Promise<Guarantee> {
    const response = await apiClient.post<ApiResponse<Guarantee> | Guarantee>(
      "/guarantees",
      payload,
    );
    const resData = response.data as any;
    return resData?.data ?? resData;
  },

  async updateGuarantee(
    id: string,
    payload: UpdateGuaranteePayload,
  ): Promise<Guarantee> {
    const response = await apiClient.put<ApiResponse<Guarantee> | Guarantee>(
      `/guarantees/${id}`,
      payload,
    );
    const resData = response.data as any;
    return resData?.data ?? resData;
  },

  async deleteGuarantee(id: string): Promise<void> {
    await apiClient.delete(`/guarantees/${id}`);
  },

  async submitGuarantee(id: string): Promise<Guarantee> {
    const response = await apiClient.post<ApiResponse<Guarantee> | Guarantee>(
      `/guarantees/${id}/submit`,
    );
    const resData = response.data as any;
    return resData?.data ?? resData;
  },

  async approveGuarantee(id: string): Promise<Guarantee> {
    const response = await apiClient.post<ApiResponse<Guarantee> | Guarantee>(
      `/guarantees/${id}/approve`,
    );
    const resData = response.data as any;
    return resData?.data ?? resData;
  },

  async rejectGuarantee(
    id: string,
    payload: RejectGuaranteePayload,
  ): Promise<Guarantee> {
    const response = await apiClient.post<ApiResponse<Guarantee> | Guarantee>(
      `/guarantees/${id}/reject`,
      payload,
    );
    const resData = response.data as any;
    return resData?.data ?? resData;
  },

  async getGuaranteeHistories(id: string): Promise<ProcessingHistory[]> {
    const response = await apiClient.get<
      ApiResponse<ProcessingHistory[]> | ProcessingHistory[]
    >(`/guarantees/${id}/histories`);
    const resData = response.data as any;
    return resData?.data ?? resData;
  },

  // api để lấy thông tin khách hàng
  getCustomers: async (params?: {
    page?: number;
    size?: number;
  }): Promise<Customer[]> => {
    try {
      const res: any = await apiClient.get("/customers", {
        params: {
          page: params?.page ?? 0,
          size: params?.size ?? 100,
        },
      });
      const content =
        res?.data?.data?.content ??
        res?.data?.content ??
        (Array.isArray(res?.data?.data) ? res.data.data : null) ??
        (Array.isArray(res?.data) ? res.data : null) ??
        [];
      return Array.isArray(content) ? content : [];
    } catch (error) {
      console.warn(
        "[customerService] Lỗi kết nối API /customers, sử dụng danh sách mẫu:",
        error,
      );
      return [];
    }
  },

  async getStatusCounts(
    params?: Omit<GuaranteeQueryParams, "status" | "page" | "size">,
  ): Promise<Record<string, number>> {
    const response = await apiClient.get<ApiResponse<Record<string, number>>>(
      "/guarantees/status-counts",
      { params },
    );
    const resData = response.data as any;
    return resData?.data ?? resData ?? {};
  },
};

export default guaranteeService;
