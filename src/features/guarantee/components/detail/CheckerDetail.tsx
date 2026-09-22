"use client";

import React, { useMemo } from "react";
import { Card, Col, Descriptions, Row, Tag, Timeline } from "antd";
import { GUARANTEE_STATUS_TAG_CLASS } from "../../constants/guarantee";
import type { Guarantee, ProcessingHistory } from "../../types/guarantee";
import CheckerActions from "./CheckerActions";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useTheme } from "@/providers/ThemeProvider";

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

const CARD_STYLE = {
  width: "auto",
};

export default function CheckerDetail({
  guarantee,
  histories,
}: CheckerDetailProps) {
  const t = useTranslations("guarantees");
  const tCommon = useTranslations("common");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const cardStyles = useMemo(
    () => ({
      header: {
        backgroundColor: isDark ? "#1f1f1f" : "#f3f4f6",
        borderBottom: isDark ? "1px solid #303030" : "1px solid #e5e7eb",
        padding: "12px 16px",
      },
      body: {
        padding: "16px",
      },
    }),
    [isDark],
  );

  const descriptionStyles = useMemo(
    () => ({
      label: {
        width: "260px",
        paddingRight: "8px",
        paddingLeft: "10px",
        fontWeight: 500,
        color: isDark ? "#9ca3af" : "#4b5563",
      },
      content: {
        paddingLeft: "4px",
        color: isDark ? "#f3f4f6" : "#111827",
      },
    }),
    [isDark],
  );

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
              styles={cardStyles}
            >
              <Descriptions column={1} size="small" styles={descriptionStyles}>
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
              styles={cardStyles}
            >
              <Descriptions column={1} size="small" styles={descriptionStyles}>
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
              styles={cardStyles}
            >
              <Descriptions column={1} size="small" styles={descriptionStyles}>
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
              styles={cardStyles}
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
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {history.action}
                        </div>

                        <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {history.performByFullName ||
                            history.performedBy ||
                            "-"}
                        </div>

                        <div className="text-xs text-gray-400">
                          {ROLE_LABELS[history.role] ?? history.role ?? "-"}
                        </div>

                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {history.timestamp
                            ? dayjs(history.timestamp).format(
                                "DD/MM/YYYY HH:mm:ss",
                              )
                            : "-"}
                        </div>

                        {history.comment && (
                          <div className="mt-2 rounded bg-gray-50 dark:bg-gray-800 p-2 text-sm text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700">
                            {history.comment}
                          </div>
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
              styles={cardStyles}
            >
              <Descriptions column={1} size="small" styles={descriptionStyles}>
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
                styles={cardStyles}
              >
                {(() => {
                  const rejectHistory = [...histories]
                    .reverse()
                    .find(
                      (history) =>
                        history.action === "REJECT" && history.comment,
                    );

                  return (
                    <div className="text-sm leading-6 text-gray-700 dark:text-gray-200">
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
