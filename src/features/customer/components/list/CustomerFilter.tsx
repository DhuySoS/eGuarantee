"use client";

import React, { useState } from "react";
import UiButton from "@/components/ui/atoms/UiButton";
import UiInput from "@/components/ui/atoms/UiInput";
import UiInputField from "@/components/ui/molecules/UiInputField";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

export interface CustomerFilterValues {
  keyword?: string;
}

export interface CustomerFilterProps {
  onSearch?: (values: CustomerFilterValues) => void;
  onReset?: () => void;
  loading?: boolean;
}

const CustomerFilter: React.FC<CustomerFilterProps> = ({
  onSearch,
  onReset,
  loading = false,
}) => {
  const t = useTranslations("customers.filter");
  const [keyword, setKeyword] = useState<string>("");

  const handleReset = () => {
    setKeyword("");
    onReset?.();
  };

  const handleSearch = () => {
    onSearch?.({
      keyword: keyword.trim() || undefined,
    });
  };

  return (
    <div className="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl space-y-4 border border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{t("title")}</p>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <UiInputField label={t("keywordLabel")}>
          <UiInput
            placeholder={t("keywordPlaceholder")}
            className="h-10"
            value={keyword}
            allowClear
            onChange={(e) => setKeyword(e.target.value)}
            onPressEnter={handleSearch}
          />
        </UiInputField>
      </div>

      <div className="flex justify-end gap-3 pt-1">
        <UiButton
          color="default"
          size="large"
          variant="outlined"
          icon={<ReloadOutlined />}
          onClick={handleReset}
          disabled={loading}
        >
          {t("resetButton")}
        </UiButton>
        <UiButton
          color="primary"
          size="large"
          variant="solid"
          icon={<SearchOutlined />}
          onClick={handleSearch}
          loading={loading}
        >
          {t("searchButton")}
        </UiButton>
      </div>
    </div>
  );
};

export default CustomerFilter;
