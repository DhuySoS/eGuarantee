"use client";

import React from "react";
import { useTranslations } from "next-intl";
import type { GuaranteeTabKey } from "../../types/guarantee";
import { GUARANTEE_STATUS_TABS } from "../../constants/guarantee";

export type { GuaranteeTabKey };

export interface GuaranteeStatusTabsProps {
  activeTab: GuaranteeTabKey;
  onChange?: (tab: GuaranteeTabKey) => void;
  counts?: Partial<Record<GuaranteeTabKey, number>>;
}

export const GuaranteeStatusTabs: React.FC<GuaranteeStatusTabsProps> = ({
  activeTab,
  onChange,
  counts = {},
}) => {
  const tCommon = useTranslations("common");
  const tStatus = useTranslations("guarantees.statuses");

  const getTabLabel = (key: GuaranteeTabKey, fallback: string) => {
    if (key === "ALL") {
      return tCommon("labels.all").toUpperCase();
    }
    return tStatus.has(key) ? tStatus(key).toUpperCase() : fallback;
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-800/80 border-b border-dashed border-[#0099ff]/70 dark:border-blue-500/50">
      <div className="flex items-stretch overflow-x-auto no-scrollbar">
        {GUARANTEE_STATUS_TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const count = counts[tab.key] ?? 0;
          const label = getTabLabel(tab.key, tab.label);

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange?.(tab.key)}
              className={`
                group relative flex items-center gap-2.5 px-6 py-3 text-sm font-bold tracking-wide transition-all duration-150 whitespace-nowrap cursor-pointer select-none border-r border-gray-200/80 dark:border-gray-700/80 last:border-r-0
                ${
                  isActive
                    ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 border-t-2 border-t-blue-600 dark:border-t-blue-500 shadow-xs"
                    : "bg-gray-50 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60"
                }
              `}
            >
              {/* Tab Label */}
              <span
                className={isActive ? "text-blue-600 dark:text-blue-400" : ""}
              >
                {label}
              </span>

              {/* Pill Count Badge */}
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold text-white bg-[#d32f2f] rounded-full shadow-xs">
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GuaranteeStatusTabs;
