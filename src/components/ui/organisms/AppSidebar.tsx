"use client";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  FileTextOutlined,
  PlusCircleOutlined,
  ReadOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import UserMiniProfile from "../molecules/UserMiniProfile";
import UiButton from "../atoms/UiButton";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useRole } from "@/features/auth/hooks/useRole";
import type { UserRole } from "@/features/guarantee/types/guarantee";

interface NavItem {
  key: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
  roles?: UserRole[];
}

const NAV_ITEMS: NavItem[] = [
  {
    key: "guarantees",
    label: "Yêu cầu bảo lãnh",
    href: "/guarantees",
    icon: <FileTextOutlined />,
  },
  {
    key: "create",
    label: "Tạo yêu cầu",
    href: "/guarantees/create",
    icon: <PlusCircleOutlined />,
    roles: ["MAKER"],
  },
  {
    key: "customers",
    label: "Quản lý khách hàng",
    href: "/customers",
    icon: <TeamOutlined />,
  },
  {
    key: "categories",
    label: "Danh mục",
    icon: <ReadOutlined />,
  },
  {
    key: "users",
    label: "Quản lý người dùng",
    icon: <UserOutlined />,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const { user } = useAuth();
  const { hasRole } = useRole();

  const visibleNavItems = NAV_ITEMS.filter(
    (item) => !item.roles || hasRole(item.roles)
  );

  return (
    <aside
      className={`h-full shrink-0 flex flex-col justify-between bg-gray-100 border-r border-r-gray-200 transition-all duration-300 ease-in-out py-8 ${
        collapsed ? "w-20 px-2" : "w-64 px-4"
      }`}
    >
      <nav className="flex flex-col gap-2">
        {visibleNavItems.map((item) => {
          const isCreateOrEdit =
            pathname === "/guarantees/create" || pathname.includes("/edit");

          const isActive =
            item.key === "create"
              ? isCreateOrEdit
              : item.key === "guarantees"
                ? pathname.startsWith("/guarantees") && !isCreateOrEdit
                : item.href
                  ? pathname.startsWith(item.href)
                  : false;

          return (
            <Link
              key={item.key}
              href={item.href || ""}
              title={collapsed ? item.label : undefined}
              className={`relative flex items-center ${
                collapsed ? "justify-center px-0" : "gap-3 px-3"
              } py-3.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {isActive && (
                <div
                  className={`absolute top-0 h-full w-1 bg-blue-600 rounded-r ${
                    collapsed ? "left-0" : "-left-4"
                  }`}
                />
              )}
              <span
                className={`shrink-0 text-xl ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {item.icon}
              </span>
              {!collapsed && (
                <span
                  className={`truncate ${
                    isActive ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer: User Profile & Toggle Collapse Button */}
      <div
        className={`flex items-center pt-4 border-t border-gray-200 transition-all ${
          collapsed ? "flex-col gap-3 justify-center" : "justify-between px-1"
        }`}
      >
        <UserMiniProfile
          name={user?.username || "Người dùng"}
          role={user?.role || "MAKER"}
          showRole={true}
          collapsed={collapsed}
        />
        <UiButton
          type="text"
          icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          onClick={() => setCollapsed((prev) => !prev)}
          className="text-gray-500 hover:text-gray-700 shrink-0"
        />
      </div>
    </aside>
  );
};

export default AppSidebar;
