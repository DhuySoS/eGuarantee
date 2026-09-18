"use client";

import React from "react";
import UiTable from "@/components/ui/atoms/UiTable";
import UiPagination from "@/components/ui/atoms/UiPagination";
import type { GuaranteeListItem } from "../../types/guarantee";
import { guaranteeColumns } from "./guaranteeColumn";

export interface GuaranteeTableProps {
  data?: GuaranteeListItem[];
  loading?: boolean;
  total?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;
}

const MOCK_DATA: GuaranteeListItem[] = [
  {
    id: "GR-2024-000001",
    customerCif: "0012345678",
    customerName: "Công ty TNHH ABC",
    status: "PENDING_APPROVAL",
    guaranteeType: "BID_BOND",
    guaranteeAmount: 5000000000,
    currency: "VND",
    createdDate: "2024-08-01T08:00:00.000Z",
  },
  {
    id: "GR-2024-000002",
    customerCif: "0008765432",
    customerName: "Công ty Cổ phần XYZ",
    status: "APPROVED",
    guaranteeType: "PERFORMANCE",
    guaranteeAmount: 10000000000,
    currency: "VND",
    createdDate: "2024-07-30T10:30:00.000Z",
  },
  {
    id: "GR-2024-000003",
    customerCif: "0011223344",
    customerName: "Công ty TNHH DEF",
    status: "REJECTED",
    guaranteeType: "ADVANCE_PAYMENT",
    guaranteeAmount: 3000000000,
    currency: "VND",
    createdDate: "2024-07-28T14:15:00.000Z",
  },
  {
    id: "GR-2024-000004",
    customerCif: "0055667788",
    customerName: "Công ty CP GHI",
    status: "DRAFT",
    guaranteeType: "PAYMENT",
    guaranteeAmount: 7500000000,
    currency: "VND",
    createdDate: "2024-07-25T09:20:00.000Z",
  },
  {
    id: "GR-2024-000005",
    customerCif: "0099001122",
    customerName: "Công ty TNHH KLM",
    status: "PENDING_APPROVAL",
    guaranteeType: "BID_BOND",
    guaranteeAmount: 2000000000,
    currency: "VND",
    createdDate: "2024-07-20T16:45:00.000Z",
  },
];

const GuaranteeTable: React.FC<GuaranteeTableProps> = ({
  data,
  loading = false,
  total = 24,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
}) => {
  const dataSource = data ?? MOCK_DATA;
  const totalCount = total ?? dataSource.length;

  return (
    <div className="space-y-4">
      <div className="text-base text-gray-800">
        Tổng số:{" "}
        <span className="font-semibold text-gray-900">{totalCount}</span> yêu
        cầu
      </div>
      <div className="bg-white rounded-xl overflow-hidden shadow-xs">
        <UiTable<GuaranteeListItem>
          rowKey="id"
          columns={guaranteeColumns}
          dataSource={dataSource}
          loading={loading}
          bordered
          pagination={false}
          scroll={{ x: 900 }}
        />
      </div>

      {/* Phân trang bên dưới */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex-1 flex justify-center">
          <UiPagination
            current={currentPage}
            pageSize={pageSize}
            total={totalCount}
            showSizeChanger={false}
            onChange={(page, pSize) => onPageChange?.(page, pSize)}
          />
        </div>
        <div className="shrink-0">
          <UiPagination
            current={currentPage}
            pageSize={pageSize}
            total={totalCount}
            showSizeChanger={true}
            showQuickJumper={false}
            showLessItems
            simple={false}
            itemRender={() => null}
            onChange={(page, pSize) => onPageChange?.(page, pSize)}
          />
        </div>
      </div>
    </div>
  );
};

export default GuaranteeTable;
