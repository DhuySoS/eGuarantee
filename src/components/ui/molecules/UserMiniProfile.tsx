import { Avatar } from "antd";
import React from "react";

interface UserMiniProfileProps {
  name?: string;
  role?: string;
  avatarText?: string;
  showRole?: boolean;
  className?: string;
}

const UserMiniProfile: React.FC<UserMiniProfileProps> = ({
  name = "Nguyễn Văn A",
  role = "Maker",
  avatarText = "NA",
  showRole = true,
  className = "",
}) => {
  return (
    <div className={`flex gap-4 items-center w-full ${className}`}>
      <Avatar size={40} style={{ backgroundColor: "#60a5fa" }}>
        {avatarText}
      </Avatar>
      <div className="space-y-1">
        <div className="text-sm font-semibold">{name}</div>
        {showRole && <div className="text-xs ">{role}</div>}
      </div>
    </div>
  );
};

export default UserMiniProfile;
