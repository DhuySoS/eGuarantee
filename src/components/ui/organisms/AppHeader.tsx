"use client";
import { Dropdown, Space } from "antd";
import UserMiniProfile from "../molecules/UserMiniProfile";
import { BellOutlined, DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "@/features/auth/context/AuthContext";
import useLogout from "@/features/auth/hooks/useLogout";
import LocaleSwitcher from "@/components/locale-switcher/LocaleSwitcher";
import ThemeSwitcher from "@/components/theme-switcher/ThemeSwitcher";

import { useTranslations } from "next-intl";
import { useTheme } from "@/providers/ThemeProvider";

const AppHeader = () => {
  const tCommon = useTranslations("common");
  const { user } = useAuth();
  const { toggleTheme } = useTheme();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  return (
    <div className="flex py-4 px-8 justify-between items-center bg-gray-100 dark:bg-gray-900 border-b border-b-gray-200 dark:border-b-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="text-lg font-bold">{tCommon("header.title")}</div>
      <div className="flex items-center gap-6">
        <BellOutlined
          style={{ fontSize: "20px" }}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-500 cursor-pointer"
        />
        <UserMiniProfile
          name={user?.username || tCommon("labels.user")}
          role={user?.role || "MAKER"}
          showRole={false}
        />
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <div
                    className="flex items-center justify-between gap-4 py-1 cursor-pointer min-w-42.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTheme();
                    }}
                  >
                    <span className="text-sm font-medium">
                      {tCommon("header.theme")}
                    </span>
                    <ThemeSwitcher />
                  </div>
                ),
                key: "theme",
              },
              {
                label: (
                  <div
                    className="flex items-center justify-between gap-4 py-1 min-w-42.5"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <span className="text-sm font-medium">
                      {tCommon("header.language")}
                    </span>
                    <LocaleSwitcher />
                  </div>
                ),
                key: "locale",
              },
              {
                type: "divider",
              },
              {
                label: isLoggingOut
                  ? tCommon("header.loggingOut")
                  : tCommon("header.logout"),
                key: "logout",
                icon: <LogoutOutlined />,
                danger: true,
                disabled: isLoggingOut,
                onClick: () => logout(),
              },
            ],
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
            <Space>
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default AppHeader;
