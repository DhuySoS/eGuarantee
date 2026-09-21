"use client";

import { useAuth } from "../context/AuthContext";
import type { UserRole } from "@/features/guarantee/types/guarantee";

export interface UseRoleReturn {
  role?: UserRole;
  isMaker: boolean;
  isChecker: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasRole: (requiredRoles: UserRole | UserRole[]) => boolean;
}

/**
 * Hook kiểm tra vai trò người dùng hiện tại (MAKER / CHECKER).
 * Dùng để phân quyền hiển thị UI, cho phép thao tác hoặc điều hướng.
 *
 * @example
 * const { isMaker, isChecker, hasRole } = useRole();
 * if (isMaker) { ... }
 * if (hasRole(["MAKER"])) { ... }
 */
export const useRole = (): UseRoleReturn => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const role = user?.role;

  const hasRole = (requiredRoles: UserRole | UserRole[]): boolean => {
    if (!role) return false;
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(role);
    }
    return role === requiredRoles;
  };

  return {
    role,
    isMaker: role === "MAKER",
    isChecker: role === "CHECKER",
    isLoading,
    isAuthenticated,
    hasRole,
  };
};

export default useRole;
