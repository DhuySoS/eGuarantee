"use client";

import React from "react";
import { Tag, type TagProps } from "antd";

export interface UiTagProps extends TagProps {
  className?: string;
}

export const UiTag: React.FC<UiTagProps> = ({ className = "", ...props }) => {
  return (
    <Tag
      className={["font-bold", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
};

export default UiTag;
