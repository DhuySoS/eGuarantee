"use client";
import {
  FileTextOutlined,
  PlusCircleOutlined,
  ReadOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import UserMiniProfile from "../molecules/UserMiniProfile";
import UiButton from "../atoms/UiButton";
interface NavItem {
  key: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
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
  },
  {
    key: "customers",
    label: "Quản lý khách hàng",
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
  return (
    <div className=" py-12 px-6 w-1/5 flex flex-col justify-between bg-gray-100 border-r border-r-gray-200">
      <nav className="flex flex-col gap-2">
        {NAV_ITEMS.map((item) => {
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
              className={`relative flex items-center gap-3 px-2 py-4 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600  "
              }`}
            >
              {isActive && (
                <div className="absolute -left-4 top-0 h-full w-0.5 bg-blue-600"></div>
              )}
              <span
                className={`shrink-0 text-lg ${isActive ? "text-blue-600" : "text-gray-500"}`}
              >
                {item.icon}
              </span>
              <span
                className={`truncate ${isActive ? "text-blue-600" : "text-gray-500"}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="flex justify-between items-center">
        <UserMiniProfile
          name="Nguyễn Văn A"
          role="Maker"
          avatarText="NA"
          showRole={true}
        />
        <UiButton color="danger" variant="solid">
          Đăng xuất
        </UiButton>
      </div>
    </div>
  );
};

export default AppSidebar;
