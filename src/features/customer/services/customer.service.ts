import apiClient from "@/lib/axios";
import type {
  Customer,
  CustomerCreationRequest,
  CustomerUpdateRequest,
  CustomerQueryParams,
  CustomerListResult,
  ApiResponse,
} from "../types/customer";

export const customerService = {
  async getCustomers(
    params?: CustomerQueryParams,
  ): Promise<CustomerListResult> {
    const apiParams: Record<string, any> = {
      page: params?.page ?? 0,
      size: params?.size ?? 10,
    };

    const response = await apiClient.get<any>("/customers", {
      params: apiParams,
    });
    const res = response.data;

    let items: Customer[] = [];
    let total = 0;
    let page = apiParams.page;
    let size = apiParams.size;
    let totalPages = 1;
    let last = false;

    if (res?.data?.content && Array.isArray(res.data.content)) {
      items = res.data.content;
      total = res.data.totalElements ?? res.data.content.length;
      page = res.data.page ?? 0;
      size = res.data.size ?? 10;
      totalPages = res.data.totalPages ?? 1;
      last = res.data.last ?? false;
    } else if (Array.isArray(res?.data)) {
      items = res.data;
      total = items.length;
      totalPages = 1;
      last = true;
    }

    // Client-side search filtering if keyword is provided
    if (params?.keyword && params.keyword.trim()) {
      const q = params.keyword.trim().toLowerCase();
      const filtered = items.filter(
        (c) =>
          c.cif?.toLowerCase().includes(q) ||
          c.customerName?.toLowerCase().includes(q) ||
          c.taxCode?.toLowerCase().includes(q) ||
          c.address?.toLowerCase().includes(q),
      );
      return {
        items: filtered,
        total: filtered.length,
        page,
        size,
        totalPages: Math.ceil(filtered.length / size) || 1,
        last: true,
      };
    }

    return {
      items,
      total,
      page,
      size,
      totalPages,
      last,
    };
  },

  async getCustomerByCif(cif: string): Promise<Customer> {
    const encodedCif = encodeURIComponent(cif);
    const response = await apiClient.get<ApiResponse<Customer> | Customer>(
      `/customers/${encodedCif}`,
      {
        params: { cif },
      },
    );
    const resData = response.data as any;
    return resData?.data ?? resData;
  },

  async createCustomer(payload: CustomerCreationRequest): Promise<Customer> {
    const response = await apiClient.post<ApiResponse<Customer> | Customer>(
      "/customers",
      payload,
    );
    const resData = response.data as any;
    return resData?.data ?? resData;
  },

  async updateCustomer(
    cif: string,
    payload: CustomerUpdateRequest,
  ): Promise<Customer> {
    const encodedCif = encodeURIComponent(cif);
    const response = await apiClient.put<ApiResponse<Customer> | Customer>(
      `/customers/${encodedCif}`,
      payload,
      {
        params: { cif },
      },
    );
    const resData = response.data as any;
    return resData?.data ?? resData;
  },

  async deleteCustomer(cif: string): Promise<void> {
    const encodedCif = encodeURIComponent(cif);
    await apiClient.delete(`/customers/${encodedCif}`);
  },
};

export default customerService;
