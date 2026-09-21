"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import customerService from "../services/customer.service";
import type {
  CustomerCreationRequest,
  CustomerUpdateRequest,
} from "../types/customer";
import { CUSTOMERS_QUERY_KEY } from "./useCustomerList";

export const useCustomerMutations = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: [CUSTOMERS_QUERY_KEY] });
  };

  const createMutation = useMutation({
    mutationFn: (payload: CustomerCreationRequest) =>
      customerService.createCustomer(payload),
    onSuccess: () => {
      message.success("Thêm mới khách hàng thành công!");
      invalidate();
    },
    onError: (err: any) => {
      message.error(err?.message || "Thêm mới khách hàng thất bại!");
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
      message.success("Cập nhật thông tin khách hàng thành công!");
      invalidate();
    },
    onError: (err: any) => {
      message.error(err?.message || "Cập nhật thông tin khách hàng thất bại!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (cif: string) => customerService.deleteCustomer(cif),
    onSuccess: () => {
      message.success("Xóa khách hàng thành công!");
      invalidate();
    },
    onError: (err: any) => {
      message.error(err?.message || "Xóa khách hàng thất bại!");
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};

export default useCustomerMutations;
