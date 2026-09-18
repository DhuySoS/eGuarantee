"use client";

import React from "react";
import {
  Table,
  ConfigProvider,
  type TableProps,
  type TableColumnsType,
  type TableColumnType,
} from "antd";

export interface UiTableProps<RecordType = any> extends TableProps<RecordType> {
  className?: string;
  headerBg?: string;
  headerColor?: string;
}

export function UiTable<RecordType extends object = any>({
  className = "",
  headerBg = "#F4F7FB",
  headerColor = "#1F2937",
  ...props
}: UiTableProps<RecordType>) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg,
            headerColor,
            borderColor: "#E5E7EB",
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
