import { getAvatarText } from "@/utils/format";
import { Avatar } from "antd";
import React from "react";

interface UserMiniProfileProps {
  name?: string;
  role?: string;
  avatarText?: string;
  showRole?: boolean;
  collapsed?: boolean;
  className?: string;
}

const UserMiniProfile: React.FC<UserMiniProfileProps> = ({
  name = "Nguyễn Văn A",
  role = "Maker",
  avatarText = getAvatarText(name),
  showRole = true,
  collapsed = false,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center gap-3 ${
        collapsed ? "justify-center" : "w-full"
      } ${className}`}
      title={collapsed ? `${name} (${role})` : undefined}
    >
      <Avatar
        size={40}
        style={{ backgroundColor: "#60a5fa" }}
        className="shrink-0"
      >
        {avatarText}
      </Avatar>
      {!collapsed && (
        <div className="space-y-0.5 truncate">
          <div className="text-sm font-semibold truncate text-gray-900 dark:text-gray-100">
            {name}
          </div>
          {showRole && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {role}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMiniProfile;
