"use client";

import { Card, Col, Descriptions, Row, Tag, Timeline } from "antd";
import { GUARANTEE_STATUS_TAG_CLASS } from "../../constants/guarantee";
import type { Guarantee, ProcessingHistory } from "../../types/guarantee";

import MakerActions from "./MakerActions";
import dayjs from "dayjs";

interface GuaranteeDetailProps {
  guarantee: Guarantee;
  histories: ProcessingHistory[];
  onSubmit?: () => void;
  isSubmitting?: boolean;
  onDelete?: () => void;
  isDeleting?: boolean;
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
  margin: "0px 10px 0px 20px",
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

export default function MakerDetail({
  guarantee,
  histories,
  onSubmit,
  isSubmitting = false,
  onDelete,
  isDeleting = false,
}: GuaranteeDetailProps) {
  const guaranteeTypeLabel = GUARANTEE_TYPE_LABELS[guarantee.guaranteeType];

  const statusLabel = STATUS_LABELS[guarantee.status];

  return (
    <div className="min-h-screen ">
      {/* ================= CONTENT ================= */}

      <Row gutter={[24, 24]}>
        {/* ================= COLUMN 1 ================= */}

        <Col xs={24} lg={14}>
          <div className="flex flex-col gap-6">
            {/* Thông tin khách hàng */}

            <Card
              title="Thông tin khách hàng"
              variant="outlined"
              style={CARD_STYLE}
              styles={CARD_STYLES}
            >
              <Descriptions column={1} size="small" styles={DESCRIPTION_STYLES}>
                <Descriptions.Item label="Tên khách hàng">
                  {guarantee.customerName || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="CIF">
                  {guarantee.customerCif || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Mã số thuế">
                  {guarantee.taxCode || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Địa chỉ">
                  {guarantee.customerAddress || "-"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Thông tin bảo lãnh */}

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
                  <span className="font-semibold">
                    {guarantee.guaranteeAmount.toLocaleString("vi-VN")}{" "}
                    {guarantee.currency}
                  </span>
                </Descriptions.Item>

                <Descriptions.Item label="Ngày hiệu lực">
                  {guarantee.effectiveDate || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Ngày hết hạn">
                  {guarantee.expiryDate || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Số ngày bảo lãnh">
                  {guarantee.guaranteeDays} ngày
                </Descriptions.Item>

                <Descriptions.Item label="Số gói thầu">
                  {guarantee.tenderNumber || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Số hợp đồng liên quan">
                  {guarantee.relatedContractNumber || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Số tham chiếu">
                  {guarantee.referenceNumber || "-"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Thông tin bên thụ hưởng */}

            <Card
              title="Thông tin bên thụ hưởng"
              variant="outlined"
              style={CARD_STYLE}
              styles={CARD_STYLES}
            >
              <Descriptions column={1} size="small" styles={DESCRIPTION_STYLES}>
                <Descriptions.Item label="Tên bên thụ hưởng">
                  {guarantee.beneficiaryName || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Địa chỉ">
                  {guarantee.beneficiaryAddress || "-"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Thông tin liên hệ */}

            <Card
              title="Thông tin liên hệ"
              variant="outlined"
              style={CARD_STYLE}
              styles={CARD_STYLES}
            >
              <Descriptions column={1} size="small" styles={DESCRIPTION_STYLES}>
                <Descriptions.Item label="Email">
                  {guarantee.contactEmail || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Số điện thoại">
                  {guarantee.phoneNumber || "-"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Mục đích bảo lãnh */}

            <Card
              title="Mục đích bảo lãnh"
              variant="outlined"
              style={CARD_STYLE}
              styles={CARD_STYLES}
            >
              <div className="text-sm leading-6 text-gray-700">
                {guarantee.purpose || "-"}
              </div>
            </Card>
          </div>
        </Col>

        {/* ================= COLUMN 2 ================= */}

        <Col xs={24} lg={10}>
          <div className="flex flex-col gap-6">
            {/* Lịch sử xử lý */}

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
                        <div className="font-semibold text-gray-900">
                          {history.action}
                        </div>

                        <div className="mt-1 text-sm text-gray-600">
                          {history.performByFullName ||
                            history.performedBy ||
                            "-"}
                        </div>

                        <div className="text-xs text-gray-400">
                          {ROLE_LABELS[history.role] ?? history.role ?? "-"}
                        </div>

                        <div className="mt-1 text-xs text-gray-500">
                          {history.timestamp
                            ? dayjs(history.timestamp).format("DD/MM/YYYY")
                            : "-"}
                        </div>

                        {history.comment && (
                          <div className="mt-2 rounded bg-gray-50 p-2 text-sm text-gray-700">
                            {history.comment}
                          </div>
                        )}
                      </div>
                    ),
                  }))}
                />
              )}
            </Card>

            {/* Thông tin bổ sung */}

            <Card
              title="Thông tin bổ sung"
              variant="outlined"
              style={CARD_STYLE}
              styles={CARD_STYLES}
            >
              <Descriptions column={1} size="small" styles={DESCRIPTION_STYLES}>
                <Descriptions.Item label="Mã yêu cầu">
                  {guarantee.id}
                </Descriptions.Item>

                <Descriptions.Item label="Trạng thái">
                  <Tag>{statusLabel}</Tag>
                </Descriptions.Item>

                <Descriptions.Item label="Ngày tạo">
                  {dayjs(guarantee.createdDate).format("DD/MM/YYYY") || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Người tạo">
                  {guarantee.createdByFullName || guarantee.createdBy || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Cập nhật lần cuối">
                  {dayjs(guarantee.updatedDate).format("DD/MM/YYYY") || "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Người cập nhật">
                  {guarantee.updatedByFullName || guarantee.updatedBy || "-"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Lý do từ chối */}

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
