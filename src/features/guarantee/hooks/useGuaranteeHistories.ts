"use client";

import { useQuery } from "@tanstack/react-query";
import guaranteeService from "../services/guarantee.service";
import type { ProcessingHistory, ApiErrorResponse } from "../types/guarantee";

export const GUARANTEE_HISTORIES_QUERY_KEY = "guarantee_histories";

export const useGuaranteeHistories = (id: string) => {
  return useQuery<ProcessingHistory[], ApiErrorResponse>({
    queryKey: [GUARANTEE_HISTORIES_QUERY_KEY, id],
    queryFn: () => guaranteeService.getGuaranteeHistories(id),
    enabled: Boolean(id),
  });
};

export default useGuaranteeHistories;
