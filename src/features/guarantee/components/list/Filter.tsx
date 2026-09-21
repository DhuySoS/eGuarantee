"use client";

import UiButton from "@/components/ui/atoms/UiButton";
import UiDatePicker from "@/components/ui/atoms/UiDatePicker";
import UiInput from "@/components/ui/atoms/UiInput";
import UiSelect from "@/components/ui/atoms/UiSelect";
import UiInputField from "@/components/ui/molecules/UiInputField";
import React, { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import {
  GUARANTEE_STATUS_OPTIONS,
  GUARANTEE_TYPE_OPTIONS,
} from "../../constants/guarantee";
import type { GuaranteeStatus, GuaranteeType } from "../../types/guarantee";

export interface FilterValues {
  keyword?: string;
  status?: GuaranteeStatus;
  guaranteeType?: GuaranteeType;
  createdFrom?: string;
  createdTo?: string;
}

export interface FilterProps {
  onSearch?: (values: FilterValues) => void;
  onReset?: () => void;
  loading?: boolean;
}

const Filter: React.FC<FilterProps> = ({
  onSearch,
  onReset,
  loading = false,
}) => {
  const [keyword, setKeyword] = useState<string>("");
  const [status, setStatus] = useState<GuaranteeStatus | undefined>(undefined);
  const [guaranteeType, setGuaranteeType] = useState<GuaranteeType | undefined>(
    undefined,
  );
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  // "Từ ngày": Không được chọn ngày ở quá khứ (chỉ được chọn từ hôm nay trở đi)
  // const disabledFromDate = (current: Dayjs) => {
  //   return !!current && current < dayjs().startOf("day");
  // };

  // "Đến ngày": Phải chọn từ ngày tạo trở đi (không được trước "Từ ngày")
  const disabledToDate = (current: Dayjs) => {
    if (!fromDate) return true;
    return !!current && current < fromDate.startOf("day");
  };

  const handleFromDateChange = (date: any) => {
    const selectedDate = (Array.isArray(date) ? date[0] : date) as Dayjs | null;
    setFromDate(selectedDate);
    if (!selectedDate) {
      setToDate(null);
    } else if (toDate && toDate.isBefore(selectedDate, "day")) {
      setToDate(null);
    }
  };

  const handleToDateChange = (date: any) => {
    const selectedDate = (Array.isArray(date) ? date[0] : date) as Dayjs | null;
    setToDate(selectedDate);
  };

  // Đặt lại toàn bộ filter và gọi callback onReset (đưa phân trang về mặc định)
  const handleReset = () => {
    setKeyword("");
    setStatus(undefined);
    setGuaranteeType(undefined);
    setFromDate(null);
    setToDate(null);
    onReset?.();
  };

  const handleSearch = () => {
    onSearch?.({
      keyword: keyword.trim() || undefined,
      status,
      guaranteeType,
      createdFrom: fromDate ? fromDate.format("YYYY-MM-DD") : undefined,
      createdTo: toDate ? toDate.format("YYYY-MM-DD") : undefined,
    });
  };

  return (
    <div className="p-4 bg-gray-50 rounded-2xl space-y-6 border border-gray-200">
      <p className="text-2xl font-bold">Bộ lọc</p>
      <div className="grid gap-6 grid-cols-3">
        <UiInputField label="Từ khóa">
          <UiInput
            placeholder="Nhập mã yêu cầu, tên khách hàng, CIF"
            className="h-10"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onPressEnter={handleSearch}
          />
        </UiInputField>
        <div className="flex gap-6">
          <UiInputField label="Trạng thái">
            <UiSelect
              placeholder="Tất cả"
              allowClear
              options={GUARANTEE_STATUS_OPTIONS}
              value={status}
              onChange={(val) => setStatus(val as GuaranteeStatus | undefined)}
            />
          </UiInputField>
          <UiInputField label="Loại bảo lãnh">
            <UiSelect
              placeholder="Tất cả"
              allowClear
              options={GUARANTEE_TYPE_OPTIONS}
              value={guaranteeType}
              onChange={(val) =>
                setGuaranteeType(val as GuaranteeType | undefined)
              }
            />
          </UiInputField>
        </div>
        <div className="flex gap-6">
          <UiInputField label="Ngày tạo">
            <div className="flex items-center gap-2">
              <UiDatePicker
                placeholder="Từ ngày"
                className="h-10"
                format="DD/MM/YYYY"
                value={fromDate}
                onChange={handleFromDateChange}
                // disabledDate={disabledFromDate}
              />
              <span className="text-gray-400 font-medium">-</span>
              <UiDatePicker
                placeholder="Đến ngày"
                className="h-10"
                format="DD/MM/YYYY"
                value={toDate}
                onChange={handleToDateChange}
                disabled={!fromDate}
                disabledDate={disabledToDate}
              />
            </div>
          </UiInputField>
        </div>
      </div>
      <div className="flex justify-end gap-5">
        <UiButton
          color="default"
          size="large"
          variant="outlined"
          onClick={handleReset}
          disabled={loading}
        >
          Đặt lại
        </UiButton>
        <UiButton
          color="primary"
          size="large"
          variant="solid"
          onClick={handleSearch}
          loading={loading}
        >
          Tìm kiếm
        </UiButton>
      </div>
    </div>
  );
};

export default Filter;
