/**
 * Message thông báo mặc định cho các mã HTTP quy định trong tài liệu Assignment (Mục 11.5)
 */
export const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: "Yêu cầu không hợp lệ. Vui lòng kiểm tra lại thông tin.",
  401: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
  403: "Bạn không có quyền thực hiện chức năng này.",
  404: "Không tìm thấy hồ sơ.",
  500: "Đã xảy ra lỗi hệ thống. Vui lòng thử lại.",
};

export const getFallbackErrorMessage = (status?: number): string => {
  if (!status) {
    return "Đã xảy ra lỗi hệ thống. Vui lòng thử lại.";
  }
  return (
    HTTP_ERROR_MESSAGES[status] || "Đã xảy ra lỗi hệ thống. Vui lòng thử lại."
  );
};
