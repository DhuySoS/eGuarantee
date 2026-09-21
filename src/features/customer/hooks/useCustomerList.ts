"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import customerService from "../services/customer.service";
import type { CustomerQueryParams, CustomerListResult } from "../types/customer";

export const CUSTOMERS_QUERY_KEY = "customers";

export const useCustomerList = (params?: CustomerQueryParams) => {
  return useQuery<CustomerListResult, Error>({
    queryKey: [CUSTOMERS_QUERY_KEY, params],
    queryFn: () => customerService.getCustomers(params),
    placeholderData: keepPreviousData,
  });
};

export default useCustomerList;
