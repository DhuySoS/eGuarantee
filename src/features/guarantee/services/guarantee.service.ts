import apiClient from "@/lib/axios";
import type {
  Guarantee,
  GuaranteeListItem,
  GuaranteeQueryParams,
  CreateGuaranteePayload,
  UpdateGuaranteePayload,
  RejectGuaranteePayload,
  ProcessingHistory,
  PageData,
  ApiResponse,
} from "../types/guarantee";

export const guaranteeService = {
  /**
   * 1. Tra cứu danh sách bảo lãnh kèm bộ lọc, sắp xếp và phân trang
   * GET /guarantees
   */
  async getGuarantees(
    params?: GuaranteeQueryParams,
  ): Promise<PageData<GuaranteeListItem>> {
    const response = await apiClient.get<
      ApiResponse<PageData<GuaranteeListItem>> | PageData<GuaranteeListItem>
    >("/guarantees", { params });

    const resData = response.data as any;
    return resData?.data ?? resData;
  },

  /**
   * 2. Xem chi tiết hồ sơ bảo lãnh theo ID
   * GET /guarantees/:id
   */
  async getGuaranteeById(id: string): Promise<Guarantee> {
    const response = await apiClient.get<ApiResponse<Guarantee> | Guarantee>(
      `/guarantees/${id}`,
    );
    const resData = response.data as any;
    return resData?.data ?? resData;
  },

  /**
   * 3. Khởi tạo yêu cầu bảo lãnh (DRAFT)
   * POST /guarantees
   */
  async createGuarantee(payload: CreateGuaranteePayload): Promise<Guarantee> {
    const response = await apiClient.post<ApiResponse<Guarantee> | Guarantee>(
      "/guarantees",
      payload,
    );
    const resData = response.data as any;
    return resData?.data ?? resData;
  },

  /**
   * 4. Cập nhật thông tin yêu cầu bảo lãnh (DRAFT / REJECTED)
   * PUT /guarantees/:id
   */
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

  /**
   * 5. Xóa yêu cầu bảo lãnh (Chỉ được xóa khi trạng thái là DRAFT)
   * DELETE /guarantees/:id
   */
  async deleteGuarantee(id: string): Promise<void> {
    await apiClient.delete(`/guarantees/${id}`);
  },

  /**
   * 6. Maker gửi yêu cầu sang Checker phê duyệt
   * POST /guarantees/:id/submit
   */
  async submitGuarantee(id: string): Promise<Guarantee> {
    const response = await apiClient.post<ApiResponse<Guarantee> | Guarantee>(
      `/guarantees/${id}/submit`,
    );
    const resData = response.data as any;
    return resData?.data ?? resData;
  },

  /**
   * 7. Checker phê duyệt yêu cầu (Chỉ khi status = PENDING_APPROVAL)
   * POST /guarantees/:id/approve
   */
  async approveGuarantee(id: string): Promise<Guarantee> {
    const response = await apiClient.post<ApiResponse<Guarantee> | Guarantee>(
      `/guarantees/${id}/approve`,
    );
    const resData = response.data as any;
    return resData?.data ?? resData;
  },

  /**
   * 8. Checker từ chối yêu cầu kèm lý do bắt buộc (10 - 500 ký tự)
   * POST /guarantees/:id/reject
   */
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

  /**
   * 9. Lấy lịch sử xử lý (Processing History) của hồ sơ bảo lãnh
   * GET /guarantees/:id/histories
   */
  async getGuaranteeHistories(id: string): Promise<ProcessingHistory[]> {
    const response = await apiClient.get<
      ApiResponse<ProcessingHistory[]> | ProcessingHistory[]
    >(`/guarantees/${id}/histories`);
    const resData = response.data as any;
    return resData?.data ?? resData;
  },
};

export default guaranteeService;
