"use client";

import { useQuery } from "@tanstack/react-query";
import guaranteeService from "../services/guarantee.service";
import type { GuaranteeQueryParams, GuaranteeTabKey } from "../types/guarantee";

export const GUARANTEE_STATUS_COUNTS_QUERY_KEY = "guarantee-status-counts";

export const useGuaranteeStatusCounts = (
  params?: Omit<GuaranteeQueryParams, "status" | "page" | "size">,
) => {
  return useQuery<Partial<Record<GuaranteeTabKey, number>>>({
    queryKey: [GUARANTEE_STATUS_COUNTS_QUERY_KEY, params],
    queryFn: async () => {
      const counts = await guaranteeService.getStatusCounts(params);
      return counts as Partial<Record<GuaranteeTabKey, number>>;
    },
  });
};

export default useGuaranteeStatusCounts;
