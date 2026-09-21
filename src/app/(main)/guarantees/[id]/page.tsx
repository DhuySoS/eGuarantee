"use client";
import PageContainer from "@/components/ui/organisms/PageContainer";
import React, { use } from "react";
import { Tag } from "antd";

import Actions from "@/features/guarantee/components/detail/Actions";
import {
  GUARANTEE_STATUS_COLORS,
  GUARANTEE_STATUS_TAG_CLASS,
} from "@/features/guarantee/constants/guarantee";
import type { Guarantee } from "@/features/guarantee/types/guarantee";
import { useGuarantee } from "@/features/guarantee/hooks/useGuaranteeDetail";
import { useParams } from "next/navigation";
import GuaranteeDetail from "@/features/guarantee/components/detail/GuaranteeDetail";
const GuaranteeDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const guaranteeQuery = useGuarantee(id);
  const STATUS_LABELS: Record<Guarantee["status"], string> = {
    DRAFT: "Nháp",
    PENDING_APPROVAL: "Chờ duyệt",
    APPROVED: "Đã duyệt",
    REJECTED: "Từ chối",
  };
  if (guaranteeQuery.isError || !guaranteeQuery.data) {
    return null;
  }
  const guarantee: Guarantee = guaranteeQuery.data;

  const statusLabel = STATUS_LABELS[guarantee.status];
  return (
    <PageContainer
      title="Chi tiết yêu cầu bảo lãnh"
      subTitle={
        <div className="flex gap-2">
          <span className="text-gray-900 font-bold">{id}</span>{" "}
          <Tag
            className="  font-bold "
            color={GUARANTEE_STATUS_TAG_CLASS[guarantee.status]}
          >
            {statusLabel}
          </Tag>
        </div>
      }
      extra={
        <div className="flex gap-4">
          <Actions id={id} />
        </div>
      }
      breadcrumbs={[
        { title: "Trang chủ" },
        {
          title: "Yêu cầu bảo lãnh",
          href: "/guarantees",
        },
        {
          title: "Chi tiết",
        },
      ]}
    >
      <div className="min-h-screen">
        <GuaranteeDetail id={id} />
      </div>
    </PageContainer>
  );
};

export default GuaranteeDetailPage;
