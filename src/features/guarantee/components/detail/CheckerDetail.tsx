"use client";

import { Card, Col, Descriptions, Row, Tag, Timeline } from "antd";
import { GUARANTEE_STATUS_TAG_CLASS } from "../../constants/guarantee";
import type { Guarantee, ProcessingHistory } from "../../types/guarantee";
import CheckerActions from "./CheckerActions";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("guarantees");
  const tCommon = useTranslations("common");
  const guaranteeTypeLabel = t.has(`types.${guarantee.guaranteeType}`)
    ? t(`types.${guarantee.guaranteeType}`)
    : GUARANTEE_TYPE_LABELS[guarantee.guaranteeType] ?? guarantee.guaranteeType;
  const statusLabel = t.has(`statuses.${guarantee.status}`)
    ? t(`statuses.${guarantee.status}`)
    : STATUS_LABELS[guarantee.status] ?? guarantee.status;

  return (
    <div className="min-h-screen ">
      {/* ================= CONTENT ================= */}

      <Row gutter={[24, 24]}>
        {/* ================= COLUMN 1 ================= */}

        <Col xs={24} lg={14}>
          <div className="flex flex-col gap-6">
            {/* Customer */}

            <Card
              title={t("form.sections.customerInfo")}
              variant="outlined"
              style={CARD_STYLE}
              styles={CARD_STYLES}
            >
              <Descriptions column={1} size="small" styles={DESCRIPTION_STYLES}>
                <Descriptions.Item label={t("detail.labels.customerName")}>
                  {guarantee.customerName}
                </Descriptions.Item>

                <Descriptions.Item label={t("detail.labels.cif")}>
                  {guarantee.customerCif}
                </Descriptions.Item>

                <Descriptions.Item label={t("detail.labels.taxCode")}>
                  {guarantee.taxCode || "-"}
                </Descriptions.Item>

                <Descriptions.Item label={t("detail.labels.beneficiaryAddress")}>
                  {guarantee.customerAddress || "-"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Guarantee */}

            <Card
              title={t("form.sections.guaranteeInfo")}
              variant="outlined"
              style={CARD_STYLE}
              styles={CARD_STYLES}
            >
              <Descriptions column={1} size="small" styles={DESCRIPTION_STYLES}>
                <Descriptions.Item label={t("detail.labels.guaranteeType")}>
                  {guaranteeTypeLabel}
                </Descriptions.Item>

                <Descriptions.Item label={t("detail.labels.amount")}>
                  <span className="font-semibold">
                    {guarantee.guaranteeAmount.toLocaleString("vi-VN")}{" "}
                    {guarantee.currency}
                  </span>
                </Descriptions.Item>

                <Descriptions.Item label={t("form.fields.effectiveDate")}>
                  {guarantee.effectiveDate}
                </Descriptions.Item>

                <Descriptions.Item label={t("form.fields.expiryDate")}>
                  {guarantee.expiryDate}
                </Descriptions.Item>

                <Descriptions.Item label={t("detail.labels.validityPeriod")}>
                  {t("detail.labels.days", { days: guarantee.guaranteeDays })}
                </Descriptions.Item>

                <Descriptions.Item label={t("detail.labels.tenderNumber")}>
                  {guarantee.tenderNumber || "-"}
                </Descriptions.Item>

                <Descriptions.Item label={t("detail.labels.relatedContractNumber")}>
                  {guarantee.relatedContractNumber || "-"}
                </Descriptions.Item>

                <Descriptions.Item label={t("detail.labels.referenceNumber")}>
                  {guarantee.referenceNumber || "-"}
                </Descriptions.Item>

                <Descriptions.Item label={t("detail.labels.purpose")}>
                  {guarantee.purpose || "-"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Beneficiary */}

            <Card
              title={t("detail.sections.beneficiaryInfo")}
              variant="outlined"
              style={CARD_STYLE}
              styles={CARD_STYLES}
            >
              <Descriptions column={1} size="small" styles={DESCRIPTION_STYLES}>
                <Descriptions.Item label={t("detail.labels.beneficiaryName")}>
                  {guarantee.beneficiaryName}
                </Descriptions.Item>

                <Descriptions.Item label={t("detail.labels.beneficiaryAddress")}>
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
              title={t("detail.sections.history")}
              variant="outlined"
              style={CARD_STYLE}
              styles={CARD_STYLES}
            >
              {histories.length === 0 ? (
                <div className="py-4 text-sm text-gray-500">
                  {t("detail.labels.noHistory")}
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

                        <div className="mt-1 text-gray-500">
                          {history.timestamp
                            ? dayjs(history.timestamp).format(
                                "DD/MM/YYYY HH:mm:ss",
                              )
                            : "-"}
                        </div>

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
              title={t("detail.sections.generalInfo")}
              variant="outlined"
              style={CARD_STYLE}
              styles={CARD_STYLES}
            >
              <Descriptions column={1} size="small" styles={DESCRIPTION_STYLES}>
                <Descriptions.Item label={t("detail.labels.requestId")}>
                  {guarantee.id}
                </Descriptions.Item>

                <Descriptions.Item label={tCommon("labels.status")}>
                  <Tag color={GUARANTEE_STATUS_TAG_CLASS[guarantee.status]}>
                    {statusLabel}
                  </Tag>
                </Descriptions.Item>

                <Descriptions.Item label={tCommon("labels.createdAt")}>
                  {dayjs(guarantee.createdDate).format("DD/MM/YYYY HH:mm:ss")}
                </Descriptions.Item>

                <Descriptions.Item label={tCommon("labels.user")}>
                  {guarantee.createdByFullName || guarantee.createdBy || "-"}
                </Descriptions.Item>

                <Descriptions.Item label={tCommon("labels.updatedAt")}>
                  {dayjs(guarantee.updatedDate).format("DD/MM/YYYY HH:mm:ss") ||
                    "-"}
                </Descriptions.Item>

                <Descriptions.Item label={tCommon("labels.user")}>
                  {guarantee.updatedByFullName || guarantee.updatedBy || "-"}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Reject reason */}

            {guarantee.status === "REJECTED" && (
              <Card
                title={t("detail.labels.reason")}
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
                      {rejectHistory?.comment || "-"}
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
