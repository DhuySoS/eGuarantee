"use client";

import React from "react";
import { Pagination, type PaginationProps } from "antd";

export interface UiPaginationProps extends PaginationProps {
  className?: string;
}

export const UiPagination: React.FC<UiPaginationProps> = ({
  className = "",
  locale = { items_per_page: "/ trang" },
  showSizeChanger = true,
  pageSizeOptions = ["10", "20", "50"],
  ...props
}) => {
  return (
    <Pagination
      className={["flex items-center", className].filter(Boolean).join(" ")}
      locale={locale}
      showSizeChanger={showSizeChanger}
      pageSizeOptions={pageSizeOptions}
      {...props}
    />
  );
};

export default UiPagination;
