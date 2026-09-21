"use client";

import React from "react";
import type { UserRole } from "@/features/guarantee/types/guarantee";
import { useRole, type UseRoleReturn } from "../hooks/useRole";

export interface RoleGateProps {
  roles?: UserRole | UserRole[];
  allowedRoles?: UserRole | UserRole[];
  fallback?: React.ReactNode;
  children: React.ReactNode | ((props: UseRoleReturn) => React.ReactNode);
}

export const RoleGate: React.FC<RoleGateProps> = ({
  roles,
  allowedRoles,
  fallback = null,
  children,
}) => {
  const roleContext = useRole();
  const targetRoles = roles ?? allowedRoles;

  // Nếu đang kiểm tra auth hoặc chưa xác định role
  if (roleContext.isLoading) {
    return null;
  }

  // Nếu không chỉ định roles thì mặc định hiển thị
  const isAllowed = targetRoles ? roleContext.hasRole(targetRoles) : true;

  if (!isAllowed) {
    return <>{fallback}</>;
  }

  if (typeof children === "function") {
    return <>{children(roleContext)}</>;
  }

  return <>{children}</>;
};

export default RoleGate;
