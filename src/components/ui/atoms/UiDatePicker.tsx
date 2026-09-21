"use client";

import React from "react";
import { DatePicker, type DatePickerProps, type GetRef } from "antd";

export type DatePickerRef = GetRef<typeof DatePicker>;

export interface UiDatePickerProps extends DatePickerProps {
  className?: string;
  isError?: boolean;
}

export const UiDatePicker = React.forwardRef<DatePickerRef, UiDatePickerProps>(
  ({ className = "", isError, status, ...props }, ref) => {
    return (
      <DatePicker
        ref={ref}
        status={isError ? "error" : status}
        className={["w-full", className].filter(Boolean).join(" ")}
        {...props}
      />
    );
  },
);

UiDatePicker.displayName = "UiDatePicker";

export default UiDatePicker;
