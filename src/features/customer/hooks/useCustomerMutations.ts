"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { useTranslations } from "next-intl";
import customerService from "../services/customer.service";
import type {
  CustomerCreationRequest,
  CustomerUpdateRequest,
} from "../types/customer";
import { CUSTOMERS_QUERY_KEY } from "./useCustomerList";

export const useCustomerMutations = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const t = useTranslations("customers.messages");

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: [CUSTOMERS_QUERY_KEY] });
  };

  const createMutation = useMutation({
    mutationFn: (payload: CustomerCreationRequest) =>
      customerService.createCustomer(payload),
    onSuccess: () => {
      message.success(t("createSuccess"));
      invalidate();
    },
    onError: (err: any) => {
      message.error(err?.message || t("createFailed"));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      cif,
      payload,
    }: {
      cif: string;
      payload: CustomerUpdateRequest;
    }) => customerService.updateCustomer(cif, payload),
    onSuccess: () => {
      message.success(t("updateSuccess"));
      invalidate();
    },
    onError: (err: any) => {
      message.error(err?.message || t("updateFailed"));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (cif: string) => customerService.deleteCustomer(cif),
    onSuccess: () => {
      message.success(t("deleteSuccess"));
      invalidate();
    },
    onError: (err: any) => {
      message.error(err?.message || t("deleteFailed"));
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};

export default useCustomerMutations;
