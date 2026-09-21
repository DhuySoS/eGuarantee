"use client";

import React, { useState } from "react";
import UiButton from "@/components/ui/atoms/UiButton";
import UiInput from "@/components/ui/atoms/UiInput";
import UiInputField from "@/components/ui/molecules/UiInputField";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

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
    <div className="p-5 bg-gray-50 rounded-2xl space-y-4 border border-gray-200">
      <p className="text-xl font-bold text-gray-800">Bộ lọc tìm kiếm</p>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <UiInputField label="Từ khóa tìm kiếm">
          <UiInput
            placeholder="Nhập mã CIF, tên khách hàng, mã số thuế..."
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
          Đặt lại
        </UiButton>
        <UiButton
          color="primary"
          size="large"
          variant="solid"
          icon={<SearchOutlined />}
          onClick={handleSearch}
          loading={loading}
        >
          Tìm kiếm
        </UiButton>
      </div>
    </div>
  );
};

export default CustomerFilter;
