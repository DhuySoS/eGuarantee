"use client";

import React, { forwardRef, useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export interface UiInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix"
> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  hasError?: boolean;
  wrapperClassName?: string;
}

export const UiInput = forwardRef<HTMLInputElement, UiInputProps>(
  (
    {
      type = "text",
      prefixIcon,
      suffixIcon,
      hasError = false,
      disabled = false,
      className,
      wrapperClassName,
      onFocus,
      onBlur,
      ...restProps
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordType = type === "password";
    const actualType = isPasswordType && showPassword ? "text" : type;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const wrapperClasses = [
      "flex items-center w-full relative bg-white border rounded-[10px] px-[14px] transition-all duration-200 ease-in-out box-border",
      disabled
        ? "bg-[#f3f3f3] cursor-not-allowed opacity-70 border-[#e0e0e0]"
        : "hover:border-[#959595]",
      hasError
        ? isFocused
          ? "border-[#e53935] shadow-[0_0_0_2px_rgba(229,57,53,0.15)]"
          : "border-[#e53935]"
        : isFocused
          ? "border-[#008047] shadow-[0_0_0_2px_rgba(0,128,71,0.15)]"
          : !disabled && "border-[#e0e0e0]",
      wrapperClassName,
    ]
      .filter(Boolean)
      .join(" ");

    const inputClasses = [
      "flex-1 w-full h-[44px] bg-transparent border-none outline-none text-sm text-[#262626] placeholder:text-[#959595] placeholder:text-sm disabled:cursor-not-allowed box-border",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={wrapperClasses}>
        {prefixIcon && (
          <span className="inline-flex items-center justify-center mr-2.5 text-[#959595] text-base shrink-0">
            {prefixIcon}
          </span>
        )}

        <input
          ref={ref}
          type={actualType}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputClasses}
          {...restProps}
        />

        {isPasswordType ? (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            className="bg-transparent border-none p-0 cursor-pointer inline-flex items-center justify-center text-[#959595] hover:text-[#262626] text-base transition-colors duration-200 ml-2.5 shrink-0"
            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </button>
        ) : (
          suffixIcon && (
            <span className="inline-flex items-center justify-center ml-2.5 text-[#959595] text-base shrink-0">
              {suffixIcon}
            </span>
          )
        )}
      </div>
    );
  },
);

UiInput.displayName = "UiInput";

export default UiInput;
