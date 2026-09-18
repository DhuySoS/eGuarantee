import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { EllipsisOutlined } from "@ant-design/icons";
import { type UiTableColumnsType } from "@/components/ui/atoms/UiTable";
import UiTag from "@/components/ui/atoms/UiTag";
import type {
  GuaranteeListItem,
  GuaranteeStatus,
  GuaranteeType,
} from "../../types/guarantee";
import {
  GUARANTEE_STATUS_LABELS,
  GUARANTEE_STATUS_TAG_CLASS,
  GUARANTEE_TYPE_LABELS,
} from "../../constants/guarantee";
import { formatCurrency } from "@/utils/format";

export const guaranteeColumns: UiTableColumnsType<GuaranteeListItem> = [
  {
    title: "Mã yêu cầu",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Khách hàng",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "CIF",
    dataIndex: "customerCif",
    key: "customerCif",
    className: "text-gray-700",
  },
  {
    title: "Loại bảo lãnh",
    dataIndex: "guaranteeType",
    key: "guaranteeType",
    render: (type: GuaranteeType) => GUARANTEE_TYPE_LABELS[type] ?? type,
  },
  {
    title: "Số tiền",
    dataIndex: "guaranteeAmount",
    key: "guaranteeAmount",
    render: (amount: number, record: GuaranteeListItem) =>
      formatCurrency(amount, record.currency),
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (date: string) => (
      <span className="text-gray-700">{dayjs(date).format("DD/MM/YYYY")}</span>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (status: GuaranteeStatus) => (
      <UiTag
        color={GUARANTEE_STATUS_TAG_CLASS[status]}
        variant="solid"
        className={`rounded-md w-24 text-${GUARANTEE_STATUS_TAG_CLASS[status]}`}
        style={{ textAlign: "center" }}
      >
        {GUARANTEE_STATUS_LABELS[status] ?? status}
      </UiTag>
    ),
  },
  {
    title: "Thao tác",
    key: "action",
    align: "center",
    render: (_, record) => (
      <button
        type="button"
        className="inline-flex items-center justify-center p-1.5 text-gray-500 hover:text-gray-800 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
        title="Thao tác"
      >
        <EllipsisOutlined className="text-lg" />
      </button>
    ),
  },
];

export const guaranteeColumn = guaranteeColumns;
export default guaranteeColumns;
