import React from "react";
import AppHeader from "../ui/organisms/AppHeader";
import AppSidebar from "../ui/organisms/AppSidebar";

const MainTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      <AppHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <div className="flex-1 ">{children}</div>
      </div>
    </div>
  );
};

export default MainTemplate;
