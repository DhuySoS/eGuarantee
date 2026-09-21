"use client";

import { Alert, Spin } from "antd";
import { useAuth } from "@/features/auth/context/AuthContext";

import MakerDetail from "./MakerDetail";
import CheckerDetail from "./CheckerDetail";
import {
  useGuarantee,
  useGuaranteeHistories,
} from "../../hooks/useGuaranteeDetail";

interface GuaranteeDetailPageProps {
  id: string;
}

export default function GuaranteeDetail({ id }: GuaranteeDetailPageProps) {
  const { user, isLoading: authLoading } = useAuth();
  const guaranteeQuery = useGuarantee(id);
  const historiesQuery = useGuaranteeHistories(id);

  if (authLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <Alert
        type="warning"
        message="Bạn chưa đăng nhập"
        description="Vui lòng đăng nhập để xem yêu cầu bảo lãnh."
        showIcon
      />
    );
  }

  if (guaranteeQuery.isLoading || historiesQuery.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (guaranteeQuery.isError) {
    return (
      <Alert
        type="error"
        message="Không thể tải thông tin yêu cầu bảo lãnh"
        description={guaranteeQuery.error.message}
        showIcon
      />
    );
  }

  if (historiesQuery.isError) {
    return (
      <Alert
        type="error"
        message="Không thể tải lịch sử xử lý"
        description={historiesQuery.error.message}
        showIcon
      />
    );
  }

  if (!guaranteeQuery.data) {
    return (
      <Alert
        type="warning"
        message="Không tìm thấy yêu cầu bảo lãnh"
        showIcon
      />
    );
  }

  if (user?.role === "MAKER") {
    return (
      <MakerDetail
        guarantee={guaranteeQuery.data}
        histories={historiesQuery.data ?? []}
      />
    );
  }

  if (user?.role === "CHECKER") {
    return (
      <CheckerDetail
        guarantee={guaranteeQuery.data}
        histories={historiesQuery.data ?? []}
      />
    );
  }
  return (
    <Alert
      type="error"
      message="Vai trò không hợp lệ"
      description="Tài khoản của bạn không có quyền truy cập chức năng này."
      showIcon
    />
  );
}
