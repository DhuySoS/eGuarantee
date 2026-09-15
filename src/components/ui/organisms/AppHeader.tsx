"use client";
import { Dropdown, Space } from "antd";
import UserMiniProfile from "../molecules/UserMiniProfile";
import { BellOutlined, DownOutlined } from "@ant-design/icons";

const AppHeader = () => {
  return (
    <div className="flex py-4 px-8 justify-between items-center bg-gray-100 border-b border-b-gray-200">
      <div className="text-lg font-bold">Guarantee Portal</div>
      <div className="flex items-center gap-6">
        <BellOutlined style={{ fontSize: "20px" }} />
        <UserMiniProfile
          name="Nguyễn Văn A"
          role="Maker"
          avatarText="NA"
          showRole={false}
        />
        <Dropdown
          menu={{
            items: [
              {
                label: "Đăng xuất",
                key: "0",
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
