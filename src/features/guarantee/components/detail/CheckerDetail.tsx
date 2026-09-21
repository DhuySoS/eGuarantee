"use client";

import { Card, Col, Descriptions, Row, Tag, Timeline } from "antd";
import { GUARANTEE_STATUS_TAG_CLASS } from "../../constants/guarantee";
import type { Guarantee, ProcessingHistory } from "../../types/guarantee";

import CheckerActions from "./CheckerActions";
import dayjs from "dayjs";

interface CheckerDetailProps {
  guarantee: Guarantee;
  histories: ProcessingHistory[];

  onApprove?: () => void;
  onReject?: (reason: string) => void;

  isApproving?: boolean;
  isRejecting?: boolean;
}

const GUARANTEE_TYPE_LABELS: Record<Guarantee["guaranteeType"], string> = {
  BID_BOND: "Bảo lãnh dự thầu",
  PERFORMANCE: "Bảo lãnh thực hiện hợp đồng",
  ADVANCE_PAYMENT: "Bảo lãnh tạm ứng",
  PAYMENT: "Bảo lãnh thanh toán",
  OTHER: "Khác",
};

const STATUS_LABELS: Record<Guarantee["status"], string> = {
  DRAFT: "Nháp",
  PENDING_APPROVAL: "Chờ duyệt",
  APPROVED: "Đã duyệt",
  REJECTED: "Từ chối",
};

const ROLE_LABELS: Record<string, string> = {
  MAKER: "Maker",
  CHECKER: "Checker",
};

const CARD_STYLES = {
  header: {
    backgroundColor: "#f3f4f6",
    padding: "12px 16px",
  },
  body: {
    padding: "16px",
  },
};

const CARD_STYLE = {
  width: "auto",
};

const DESCRIPTION_STYLES = {
  label: {
    width: "260px",
    paddingRight: "8px",
    paddingLeft: "10px",
    fontWeight: 500,
  },
  content: {
    paddingLeft: "4px",
  },
};

export default function CheckerDetail({
  guarantee,
  histories,
}: CheckerDetailProps) {
  const guaranteeTypeLabel = GUARANTEE_TYPE_LABELS[guarantee.guaranteeType];

  const statusLabel = STATUS_LABELS[guarantee.status];

  return (
    <div className="min-h-screen ">
      {/* ================= CONTENT ================= */}

      <Row gutter={[24, 24]}>
        {/* ================= COLUMN 1 ================= */}

        <Col xs={24} lg={14}>
          <div className="flex flex-col gap-6">
            {/* Customer */}

            <Card
              title="Thông tin khách hàng"
              variant="outlined"
              style={CARD_STYLE}
              styles={CARD_STYLES}
            >
              <Descriptions column={1} size="small" styles={DESCRIPTION_STYLES}>
                <Descriptions.Item label="Tên khách hàng">
                  {guarantee.customerName}
                </Descriptions.Item>

                <Descriptions.Item label="CIF">
                  {guarantee.customerCif}
                </Descriptions.Item>

                <Descriptions.Item label="Mã số thuế">
                  {guarantee.taxCode || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Địa chỉ">
                  {guarantee.customerAddress || "-"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Guarantee */}

            <Card
              title="Thông tin bảo lãnh"
              variant="outlined"
              style={CARD_STYLE}
              styles={CARD_STYLES}
            >
              <Descriptions column={1} size="small" styles={DESCRIPTION_STYLES}>
                <Descriptions.Item label="Loại bảo lãnh">
                  {guaranteeTypeLabel}
                </Descriptions.Item>

                <Descriptions.Item label="Số tiền">
                  {guarantee.guaranteeAmount.toLocaleString("vi-VN")}
                </Descriptions.Item>

                <Descriptions.Item label="Loại tiền">
                  {guarantee.currency}
                </Descriptions.Item>

                <Descriptions.Item label="Ngày hiệu lực">
                  {guarantee.effectiveDate}
                </Descriptions.Item>

                <Descriptions.Item label="Ngày hết hạn">
                  {guarantee.expiryDate}
                </Descriptions.Item>

                <Descriptions.Item label="Số ngày bảo lãnh">
                  {guarantee.guaranteeDays}
                </Descriptions.Item>

                <Descriptions.Item label="Số dự thầu">
                  {guarantee.tenderNumber || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Số hợp đồng">
                  {guarantee.relatedContractNumber || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Số tham chiếu">
                  {guarantee.referenceNumber || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Mục đích">
                  {guarantee.purpose || "-"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Beneficiary */}

            <Card
              title="Thông tin bên thụ hưởng"
              variant="outlined"
              style={CARD_STYLE}
              styles={CARD_STYLES}
            >
              <Descriptions column={1} size="small" styles={DESCRIPTION_STYLES}>
                <Descriptions.Item label="Tên">
                  {guarantee.beneficiaryName}
                </Descriptions.Item>

                <Descriptions.Item label="Địa chỉ">
                  {guarantee.beneficiaryAddress || "-"}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>
        </Col>

        {/* ================= COLUMN 2 ================= */}

        <Col xs={24} lg={10}>
          <div className="flex flex-col gap-6">
            {/* History */}

            <Card
              title="Lịch sử xử lý"
              variant="outlined"
              style={CARD_STYLE}
              styles={CARD_STYLES}
            >
              {histories.length === 0 ? (
                <div className="py-4 text-sm text-gray-500">
                  Chưa có lịch sử xử lý.
                </div>
              ) : (
                <Timeline
                  items={histories.map((history) => ({
                    content: (
                      <div className="pb-4">
                        <div className="font-medium">{history.action}</div>

                        <div className="text-gray-600">
                          {history.performByFullName ||
                            history.performedBy ||
                            "-"}
                        </div>

                        <div className="text-gray-500">
                          {ROLE_LABELS[history.role] ?? history.role ?? "-"}
                        </div>

                        {history.timestamp
                          ? dayjs(history.timestamp).format("DD/MM/YYYY")
                          : "-"}

                        {history.comment && (
                          <div className="mt-1">{history.comment}</div>
                        )}
                      </div>
                    ),
                  }))}
                />
              )}
            </Card>

            {/* Additional information */}

            <Card
              title="Thông tin bổ sung"
              variant="outlined"
              style={CARD_STYLE}
              styles={CARD_STYLES}
            >
              <Descriptions column={1} size="small" styles={DESCRIPTION_STYLES}>
                <Descriptions.Item label="Request ID">
                  {guarantee.id}
                </Descriptions.Item>

                <Descriptions.Item label="Trạng thái">
                  {statusLabel}
                </Descriptions.Item>

                <Descriptions.Item label="Người tạo">
                  {guarantee.createdByFullName || guarantee.createdBy}
                </Descriptions.Item>

                <Descriptions.Item label="Ngày tạo">
                  {dayjs(guarantee.createdDate).format("DD/MM/YYYY")}
                </Descriptions.Item>

                <Descriptions.Item label="Người cập nhật">
                  {guarantee.updatedByFullName || guarantee.updatedBy || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Ngày cập nhật">
                  {dayjs(guarantee.updatedDate).format("DD/MM/YYYY") || "-"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Reject reason */}

            {guarantee.status === "REJECTED" && (
              <Card
                title="Lý do từ chối"
                variant="outlined"
                style={CARD_STYLE}
                styles={CARD_STYLES}
              >
                {(() => {
                  const rejectHistory = [...histories]
                    .reverse()
                    .find(
                      (history) =>
                        history.action === "REJECT" && history.comment,
                    );

                  return (
                    <div className="text-sm leading-6 text-gray-700">
                      {rejectHistory?.comment || "Không có lý do từ chối."}
                    </div>
                  );
                })()}
              </Card>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
