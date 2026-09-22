import React from "react";
import AppHeader from "../ui/organisms/AppHeader";
import AppSidebar from "../ui/organisms/AppSidebar";

const MainTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <div className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-gray-950">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainTemplate;
