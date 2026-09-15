import {
  GuaranteeStatus,
  GuaranteeType,
  Currency,
  UserRole,
  HistoryAction,
} from '../types/guarantee';

export const GUARANTEE_STATUS: Record<GuaranteeStatus, GuaranteeStatus> = {
  DRAFT: 'DRAFT',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const GUARANTEE_STATUS_LABELS: Record<GuaranteeStatus, string> = {
  DRAFT: 'Bản nháp',
  PENDING_APPROVAL: 'Chờ phê duyệt',
  APPROVED: 'Đã phê duyệt',
  REJECTED: 'Từ chối',
};

export const GUARANTEE_STATUS_COLORS: Record<GuaranteeStatus, string> = {
  DRAFT: 'default',
  PENDING_APPROVAL: 'processing',
  APPROVED: 'success',
  REJECTED: 'error',
};

export const GUARANTEE_TYPE: Record<GuaranteeType, GuaranteeType> = {
  BID_BOND: 'BID_BOND',
  PERFORMANCE: 'PERFORMANCE',
  ADVANCE_PAYMENT: 'ADVANCE_PAYMENT',
  PAYMENT: 'PAYMENT',
  OTHER: 'OTHER',
};

export const GUARANTEE_TYPE_LABELS: Record<GuaranteeType, string> = {
  BID_BOND: 'Bảo lãnh dự thầu',
  PERFORMANCE: 'Bảo lãnh thực hiện hợp đồng',
  ADVANCE_PAYMENT: 'Bảo lãnh tạm ứng',
  PAYMENT: 'Bảo lãnh thanh toán',
  OTHER: 'Bảo lãnh khác',
};

export const CURRENCY: Record<Currency, Currency> = {
  VND: 'VND',
  USD: 'USD',
};

export const USER_ROLE: Record<UserRole, UserRole> = {
  MAKER: 'MAKER',
  CHECKER: 'CHECKER',
};

export const HISTORY_ACTION: Record<HistoryAction, HistoryAction> = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  SUBMIT: 'SUBMIT',
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
};

export const HISTORY_ACTION_LABELS: Record<HistoryAction, string> = {
  CREATE: 'Khởi tạo',
  UPDATE: 'Chỉnh sửa',
  SUBMIT: 'Gửi phê duyệt',
  APPROVE: 'Phê duyệt',
  REJECT: 'Từ chối',
};
