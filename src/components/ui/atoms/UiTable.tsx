"use client";

import React from "react";
import {
  Table,
  ConfigProvider,
  type TableProps,
  type TableColumnsType,
  type TableColumnType,
} from "antd";

import { useTheme } from "@/providers/ThemeProvider";

export interface UiTableProps<RecordType = any> extends TableProps<RecordType> {
  className?: string;
  headerBg?: string;
  headerColor?: string;
}

export function UiTable<RecordType extends object = any>({
  className = "",
  headerBg,
  headerColor,
  ...props
}: UiTableProps<RecordType>) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const resolvedHeaderBg = headerBg ?? (isDark ? "#1f1f1f" : "#F4F7FB");
  const resolvedHeaderColor = headerColor ?? (isDark ? "#f3f4f6" : "#1F2937");
  const resolvedBorderColor = isDark ? "#303030" : "#E5E7EB";

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: resolvedHeaderBg,
            headerColor: resolvedHeaderColor,
            borderColor: resolvedBorderColor,
          },
        },
      }}
    >
      <Table<RecordType>
        className={["w-full", className].filter(Boolean).join(" ")}
        {...props}
      />
    </ConfigProvider>
  );
}

UiTable.Column = Table.Column;
UiTable.ColumnGroup = Table.ColumnGroup;
UiTable.Summary = Table.Summary;

export type {
  TableColumnsType as UiTableColumnsType,
  TableColumnType as UiTableColumnType,
};
export default UiTable;
