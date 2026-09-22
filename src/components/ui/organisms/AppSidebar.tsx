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
import { useLocale, useTranslations } from "next-intl";
import { stripLocale, withLocale } from "@/shared/i18n/path";
import React, { useState } from "react";
import UserMiniProfile from "../molecules/UserMiniProfile";
import UiButton from "../atoms/UiButton";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useRole } from "@/features/auth/hooks/useRole";
import type { UserRole } from "@/features/guarantee/types/guarantee";

interface NavItem {
  key: string;
  labelKey: "guarantees" | "create" | "customers" | "categories" | "users";
  href?: string;
  icon: React.ReactNode;
  roles?: UserRole[];
}

const NAV_ITEMS: NavItem[] = [
  {
    key: "guarantees",
    labelKey: "guarantees",
    href: "/guarantees",
    icon: <FileTextOutlined />,
  },
  {
    key: "create",
    labelKey: "create",
    href: "/guarantees/create",
    icon: <PlusCircleOutlined />,
    roles: ["MAKER"],
  },
  {
    key: "customers",
    labelKey: "customers",
    href: "/customers",
    icon: <TeamOutlined />,
  },
  {
    key: "categories",
    labelKey: "categories",
    icon: <ReadOutlined />,
  },
  {
    key: "users",
    labelKey: "users",
    icon: <UserOutlined />,
  },
];

const AppSidebar = () => {
  const rawPathname = usePathname();
  const locale = useLocale();
  const pathname = stripLocale(rawPathname);
  const tCommon = useTranslations("common");
  const [collapsed, setCollapsed] = useState(false);

  const { user } = useAuth();
  const { hasRole } = useRole();

  const visibleNavItems = NAV_ITEMS.filter(
    (item) => !item.roles || hasRole(item.roles),
  );

  return (
    <aside
      className={`h-full shrink-0 flex flex-col justify-between bg-gray-100 dark:bg-gray-900 border-r border-r-gray-200 dark:border-r-gray-800 transition-all duration-300 ease-in-out py-8 ${
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

          const label = tCommon(`sidebar.${item.labelKey}`);

          return (
            <Link
              key={item.key}
              href={item.href ? withLocale(item.href, locale) : ""}
              title={collapsed ? label : undefined}
              className={`relative flex items-center ${
                collapsed ? "justify-center px-0" : "gap-3 px-3"
              } py-3.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              {isActive && (
                <div
                  className={`absolute top-0 h-full w-1 bg-blue-600 dark:bg-blue-500 rounded-r ${
                    collapsed ? "left-0" : "-left-4"
                  }`}
                />
              )}
              <span
                className={`shrink-0 text-xl ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.icon}
              </span>
              {!collapsed && (
                <span
                  className={`truncate ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer: User Profile & Toggle Collapse Button */}
      <div
        className={`flex items-center pt-4 border-t border-gray-200 dark:border-gray-800 transition-all ${
          collapsed ? "flex-col gap-3 justify-center" : "justify-between px-1"
        }`}
      >
        <UserMiniProfile
          name={user?.username || tCommon("labels.user")}
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
