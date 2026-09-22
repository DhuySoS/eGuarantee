"use client";

import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "@/providers/ThemeProvider";
import { useTranslations } from "next-intl";

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const tCommon = useTranslations("common");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 opacity-0" />
    );
  }

  const isDark = theme === "dark";
  const tooltipTitle = isDark
    ? tCommon("header.themeLight")
    : tCommon("header.themeDark");

  return (
    <Tooltip title={tooltipTitle}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleTheme();
        }}
        aria-label={tooltipTitle}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-amber-400 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
      >
        {isDark ? (
          <SunOutlined className="text-lg text-amber-400 hover:rotate-45 transition-transform duration-300" />
        ) : (
          <MoonOutlined className="text-base text-gray-600 hover:-rotate-12 transition-transform duration-300" />
        )}
      </button>
    </Tooltip>
  );
};

export default ThemeSwitcher;
