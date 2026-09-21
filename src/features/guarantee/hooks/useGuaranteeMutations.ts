import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import {
  CreateGuaranteePayload,
  RejectGuaranteePayload,
} from "../types/guarantee";
import guaranteeService from "../services/guarantee.service";

export const useGuaranteeMutations = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  const invalidate = (id?: string) => {
    queryClient.invalidateQueries({ queryKey: ["guarantees"] });
    if (id) {
      queryClient.invalidateQueries({ queryKey: ["guarantee", id] });
      queryClient.invalidateQueries({ queryKey: ["guarantee-histories", id] });
    }
  };

  const createMutation = useMutation({
    mutationFn: (payload: CreateGuaranteePayload) =>
      guaranteeService.createGuarantee(payload),
    onSuccess: () => {
      message.success("Tạo hồ sơ bảo lãnh thành công (DRAFT)");
      invalidate();
    },
    onError: (err: Error) => message.error(err.message || "Lỗi khi tạo hồ sơ"),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<CreateGuaranteePayload>;
    }) => guaranteeService.updateGuarantee(id, payload),
    onSuccess: (_, { id }) => {
      message.success("Cập nhật hồ sơ thành công");
      invalidate(id);
    },
    onError: (err: Error) =>
      message.error(err.message || "Lỗi khi cập nhật hồ sơ"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => guaranteeService.deleteGuarantee(id),
    onSuccess: () => {
      message.success("Xóa hồ sơ thành công");
      invalidate();
    },
    onError: (err: Error) => message.error(err.message || "Lỗi khi xóa hồ sơ"),
  });

  const submitMutation = useMutation({
    mutationFn: (id: string) => guaranteeService.submitGuarantee(id),
    onSuccess: (_, id) => {
      message.success("Gửi phê duyệt hồ sơ thành công");
      invalidate(id);
    },
    onError: (err: Error) =>
      message.error(err.message || "Lỗi khi gửi phê duyệt"),
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => guaranteeService.approveGuarantee(id),
    onSuccess: (_, id) => {
      message.success("Phê duyệt hồ sơ thành công (APPROVED)");
      invalidate(id);
    },
    onError: (err: Error) =>
      message.error(err.message || "Lỗi khi phê duyệt hồ sơ"),
  });

  const rejectMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: RejectGuaranteePayload;
    }) => guaranteeService.rejectGuarantee(id, payload),
    onSuccess: (_, { id }) => {
      message.success("Đã từ chối hồ sơ bảo lãnh (REJECTED)");
      invalidate(id);
    },
    onError: (err: Error) =>
      message.error(err.message || "Lỗi khi từ chối hồ sơ"),
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    submitMutation,
    approveMutation,
    rejectMutation,
  };
};

// hook để lấy danh sách khách hàng
export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const data = await guaranteeService.getCustomers();
      return data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });
};
