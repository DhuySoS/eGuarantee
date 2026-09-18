"use client";

import React from "react";
import { Select, type SelectProps, type RefSelectProps } from "antd";

export interface UiSelectProps extends SelectProps {
  className?: string;
  isError?: boolean;
}

export const UiSelect = React.forwardRef<RefSelectProps, UiSelectProps>(
  ({ className = "", isError, ...props }, ref) => {
    return (
      <Select
        ref={ref}
        status={isError ? "error" : undefined}
        className={["w-full h-full", className].filter(Boolean).join(" ")}
        {...props}
      />
    );
  },
);

UiSelect.displayName = "UiSelect";

export default UiSelect;
