"use client";

import React, { forwardRef } from "react";
import { Input, type InputProps, type InputRef } from "antd";
import type { PasswordProps } from "antd/es/input";

export interface UiInputProps extends InputProps {
  hasError?: boolean;
  isError?: boolean;
  visibilityToggle?: PasswordProps["visibilityToggle"];
}

type CompoundedUiInput = React.ForwardRefExoticComponent<
  UiInputProps & React.RefAttributes<InputRef>
> & {
  Password: typeof Input.Password;
  Search: typeof Input.Search;
  TextArea: typeof Input.TextArea;
};

export const UiInput = forwardRef<InputRef, UiInputProps>(
  (
    {
      type = "text",
      hasError = false,
      isError = false,
      status,
      className = "",
      ...restProps
    },
    ref,
  ) => {
    const mergedStatus = hasError || isError ? "error" : status;
    const mergedClassName = ["w-full rounded-[10px]", className]
      .filter(Boolean)
      .join(" ");

    if (type === "password") {
      return (
        <Input.Password
          ref={ref}
          status={mergedStatus}
          className={mergedClassName}
          {...(restProps as PasswordProps)}
        />
      );
    }

    return (
      <Input
        ref={ref}
        type={type}
        status={mergedStatus}
        className={mergedClassName}
        {...restProps}
      />
    );
  },
) as CompoundedUiInput;

UiInput.displayName = "UiInput";
UiInput.Password = Input.Password;
UiInput.Search = Input.Search;
UiInput.TextArea = Input.TextArea;

export type { InputRef as UiInputRef };
export default UiInput;
