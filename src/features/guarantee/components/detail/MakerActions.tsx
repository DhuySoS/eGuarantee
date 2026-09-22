"use client";

import { Button, Popconfirm, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SendOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { withLocale } from "@/shared/i18n/path";
import type { Guarantee } from "../../types/guarantee";

interface MakerActionsProps {
  guarantee: Guarantee;
  onDelete?: () => void;
  onSubmit?: () => void;
  isDeleting?: boolean;
  isSubmitting?: boolean;
}

export default function MakerActions({
  guarantee,
  onDelete,
  onSubmit,
  isDeleting = false,
  isSubmitting = false,
}: MakerActionsProps) {
  const locale = useLocale();
  const t = useTranslations("guarantees");
  const tCommon = useTranslations("common");

  const canEdit =
    guarantee.status === "DRAFT" ||
    guarantee.status === "REJECTED";

  const canDelete =
    guarantee.status === "DRAFT";

  const canSubmit =
    guarantee.status === "DRAFT";

  return (
    <Space wrap>
      {/* ================= EDIT ================= */}
      {canEdit && (
        <Link href={withLocale(`/guarantees/${guarantee.id}/edit`, locale)}>
          <Button icon={<EditOutlined />}>
            {t("detail.actions.edit")}
          </Button>
        </Link>
      )}

      {/* ================= DELETE ================= */}
      {canDelete && (
        <Popconfirm
          title={t("detail.actions.confirmDeleteTitle")}
          description={t("detail.actions.confirmDeleteDesc")}
          okText={t("detail.actions.delete")}
          cancelText={tCommon("buttons.cancel")}
          okButtonProps={{
            danger: true,
            loading: isDeleting,
          }}
          onConfirm={onDelete}
        >
          <Button
            danger
            icon={<DeleteOutlined />}
            loading={isDeleting}
          >
            {t("detail.actions.delete")}
          </Button>
        </Popconfirm>
      )}

      {/* ================= SUBMIT ================= */}
      {canSubmit && (
        <Popconfirm
          title={t("detail.actions.confirmSubmitTitle")}
          description={t("detail.actions.confirmSubmitDesc")}
          okText={t("detail.actions.submitApproval")}
          cancelText={tCommon("buttons.cancel")}
          okButtonProps={{
            type: "primary",
            loading: isSubmitting,
          }}
          onConfirm={onSubmit}
        >
          <Button
            type="primary"
            icon={<SendOutlined />}
            loading={isSubmitting}
          >
            {t("detail.actions.submitApproval")}
          </Button>
        </Popconfirm>
      )}
    </Space>
  );
}