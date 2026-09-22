import React from "react";
export type UiInputFieldProps = {
  label: string;
  error?: string;
  extraRight?: React.ReactNode;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
};
const UiInputField = ({
  label,
  error,
  children,
  required,
  extraRight,
  className,
}: UiInputFieldProps) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {/* Hàng Label: Tiêu đề bên trái, extraRight (Quên mật khẩu?) bên phải */}
      <div className="flex justify-between items-center text-sm font-medium text-gray-700">
        <label>
          {label}
          {required && <span>*</span>}
        </label>
        {extraRight}
      </div>
      {/* Ô Input */}
      {children}
      {/* Dòng báo lỗi validation nếu có */}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};

export default UiInputField;
