"use client";
import { Dropdown, Space } from "antd";
import UserMiniProfile from "../molecules/UserMiniProfile";
import { BellOutlined, DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "@/features/auth/context/AuthContext";
import useLogout from "@/features/auth/hooks/useLogout";
import LocaleSwitcher from "@/components/locale-switcher/LocaleSwitcher";

import { useTranslations } from "next-intl";

const AppHeader = () => {
  const tCommon = useTranslations("common");
  const { user } = useAuth();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  return (
    <div className="flex py-4 px-8 justify-between items-center bg-gray-100 border-b border-b-gray-200">
      <div className="text-lg font-bold">{tCommon("header.title")}</div>
      <div className="flex items-center gap-6">
        <BellOutlined style={{ fontSize: "20px" }} />
        <UserMiniProfile
          name={user?.username || tCommon("labels.user")}
          role={user?.role || "MAKER"}
          showRole={false}
        />
        <Dropdown
          menu={{
            items: [
              {
                label: <LocaleSwitcher />,
                key: "locale",
                disabled: false,
              },
              {
                label: isLoggingOut
                  ? tCommon("header.loggingOut")
                  : tCommon("header.logout"),
                key: "logout",
                icon: <LogoutOutlined />,
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
