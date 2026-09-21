"use client";
import { useRouter } from "next/navigation";
import {
  useQuery,
  keepPreviousData,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import guaranteeService from "../services/guarantee.service";
import type {
  GuaranteeQueryParams,
  GuaranteeListResult,
  Guarantee,
  RejectGuaranteePayload,
} from "../types/guarantee";

export const GUARANTEES_QUERY_KEY = "guarantees";
export const GUARANTEE_QUERY_KEY = "guarantee";
export const GUARANTEE_HISTORIES_QUERY_KEY = "guarantee-histories";

export const useGuarantees = (params?: GuaranteeQueryParams) => {
  return useQuery<GuaranteeListResult>({
    queryKey: [GUARANTEES_QUERY_KEY, params],
    queryFn: () => guaranteeService.getGuarantees(params),
    placeholderData: keepPreviousData,
  });
};

export const useGuarantee = (id: string) => {
  return useQuery<Guarantee>({
    queryKey: [GUARANTEE_QUERY_KEY, id],
    queryFn: () => guaranteeService.getGuaranteeById(id),
    enabled: Boolean(id),
  });
};
export const useGuaranteeHistories = (id: string) => {
  return useQuery({
    queryKey: [GUARANTEE_HISTORIES_QUERY_KEY, id],
    queryFn: () => guaranteeService.getGuaranteeHistories(id),
    enabled: Boolean(id),
  });
};

export const useSubmitGuarantee = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => guaranteeService.submitGuarantee(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: [GUARANTEE_QUERY_KEY, id],
      });
      queryClient.removeQueries({
        queryKey: [GUARANTEE_HISTORIES_QUERY_KEY, id],
      });
      queryClient.invalidateQueries({
        queryKey: [GUARANTEES_QUERY_KEY],
      });
    },
  });
};

export const useDeleteGuarantee = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (id: string) => guaranteeService.deleteGuarantee(id),

    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: [GUARANTEE_QUERY_KEY, id],
      });

      queryClient.removeQueries({
        queryKey: [GUARANTEE_HISTORIES_QUERY_KEY, id],
      });

      queryClient.invalidateQueries({
        queryKey: [GUARANTEES_QUERY_KEY],
      });
      router.push("/guarantees");
    },
  });
};

export const useApproveGuarantee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => guaranteeService.approveGuarantee(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: [GUARANTEE_QUERY_KEY, id],
      });

      queryClient.invalidateQueries({
        queryKey: [GUARANTEE_HISTORIES_QUERY_KEY, id],
      });

      queryClient.invalidateQueries({
        queryKey: [GUARANTEES_QUERY_KEY],
      });
    },
  });
};

interface RejectGuaranteeVariables {
  id: string;
  payload: RejectGuaranteePayload;
}
export const useRejectGuarantee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: RejectGuaranteeVariables) =>
      guaranteeService.rejectGuarantee(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GUARANTEE_QUERY_KEY, variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: [GUARANTEE_HISTORIES_QUERY_KEY, variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: [GUARANTEES_QUERY_KEY],
      });
    },
  });
};
