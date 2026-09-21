export interface Customer {
  cif: string;
  customerName: string;
  taxCode: string;
  address?: string;
}

export interface CustomerCreationRequest {
  cif: string;
  customerName: string;
  taxCode: string;
  address?: string;
}

export interface CustomerUpdateRequest {
  cif: string;
  customerName: string;
  taxCode: string;
  address?: string;
}

export interface CustomerQueryParams {
  keyword?: string;
  page?: number;
  size?: number;
  sortBy?: "cif" | "customerName" | "taxCode";
  sortDirection?: "asc" | "desc";
}

export interface CustomerPageData {
  content: Customer[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface CustomerListResult {
  items: Customer[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
  last: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  code?: string;
  message: string;
  data: T;
  timestamp: string;
}
