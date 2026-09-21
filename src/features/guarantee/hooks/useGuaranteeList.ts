"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import guaranteeService from "../services/guarantee.service";
import type {
  GuaranteeQueryParams,
  GuaranteeListResult,
  ApiErrorResponse,
} from "../types/guarantee";

export const GUARANTEES_QUERY_KEY = "guarantees";

export const useGuaranteeList = (params?: GuaranteeQueryParams) => {
  return useQuery<GuaranteeListResult, ApiErrorResponse>({
    queryKey: [GUARANTEES_QUERY_KEY, params],
    queryFn: () => guaranteeService.getGuarantees(params),
    placeholderData: keepPreviousData,
  });
};

export default useGuaranteeList;
