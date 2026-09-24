import type { UserRole } from "@/features/guarantee/types/guarantee";

export interface RoutePermission {
  /** Biểu thức chính quy (Regex) khớp với đường dẫn URL (đã loại bỏ locale) */
  pattern: RegExp;
  /** Danh sách vai trò được phép truy cập */
  roles: UserRole[];
  /** Trang điều hướng về nếu không có quyền (mặc định: /guarantees) */
  redirectTo?: string;
  /** Thông báo lỗi hiển thị cho người dùng */
  errorMessage?: string;
}

/**
 * Danh sách cấu hình phân quyền tập trung cho toàn bộ hệ thống.
 * Sau này khi có thêm trang mới cần phân quyền, chỉ cần thêm 1 cấu hình vào mảng này.
 */
export const ROUTE_PERMISSIONS: RoutePermission[] = [
  // 1. Trang tạo mới bảo lãnh: Chỉ dành cho MAKER
  {
    pattern: /^\/guarantees\/create(?:\/.*)?$/,
    roles: ["MAKER"],
    redirectTo: "/guarantees",
    errorMessage: "Bạn không có quyền truy cập chức năng tạo mới bảo lãnh.",
  },
  // 2. Trang chỉnh sửa bảo lãnh: Chỉ dành cho MAKER
  {
    pattern: /^\/guarantees\/[^/]+\/edit(?:\/.*)?$/,
    roles: ["MAKER"],
    redirectTo: "/guarantees",
    errorMessage: "Bạn không có quyền truy cập chức năng chỉnh sửa bảo lãnh.",
  },
];

/**
 * Hàm kiểm tra quyền truy cập đường dẫn
 * @param cleanPath Đường dẫn sau khi đã bỏ locale (VD: /guarantees/create)
 * @param userRole Vai trò của người dùng hiện tại (MAKER / CHECKER)
 */
export const checkRoutePermission = (
  cleanPath: string,
  userRole?: UserRole,
): { isAllowed: boolean; matchedRule?: RoutePermission } => {
  const matchedRule = ROUTE_PERMISSIONS.find((rule) =>
    rule.pattern.test(cleanPath),
  );

  // Không nằm trong danh sách hạn chế -> cho phép
  if (!matchedRule) {
    return { isAllowed: true };
  }

  // Nếu người dùng có role hợp lệ trong danh sách cho phép
  if (userRole && matchedRule.roles.includes(userRole)) {
    return { isAllowed: true, matchedRule };
  }

  return { isAllowed: false, matchedRule };
};
