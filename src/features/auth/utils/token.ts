import { jwtDecode } from "jwt-decode";
import type { User, UserRole } from "@/features/guarantee/types/guarantee";

export interface DecodedToken {
  sub: string;
  roles?: string[];
  exp: number;
  type?: string;
  iat?: number;
  jti?: string;
  refreshJwtId?: string;
  [key: string]: any;
}

/**
 * Kiểm tra token có tồn tại và còn hạn không
 */
export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (!decoded.exp) return false;

    // exp tính theo giây, Date.now() tính theo mili-giây
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

/**
 * Trích xuất thông tin User từ token JWT (sub và roles)
 */
export const getUserFromToken = (token: string | null): User | null => {
  if (!token || !isTokenValid(token)) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    // Chuẩn hóa role từ roles array (ví dụ: ["MARKER"] hoặc ["CHECKER"])
    const rawRole = decoded.roles?.[0]?.toUpperCase() || "MAKER";
    const role: UserRole = rawRole.includes("CHECKER") ? "CHECKER" : "MAKER";

    return {
      username: decoded.sub,
      fullName: decoded.sub,
      role,
    };
  } catch {
    return null;
  }
};
