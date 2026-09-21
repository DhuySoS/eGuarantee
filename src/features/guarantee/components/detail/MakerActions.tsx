"use client";

import { Button, Popconfirm, Space } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    SendOutlined,
} from "@ant-design/icons";
import Link from "next/link";

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
                <Link
                    href={`/guarantees/${guarantee.id}/edit`}
                >
                    <Button
                        icon={<EditOutlined />}
                    >
                        Chỉnh sửa
                    </Button>
                </Link>
            )}

            {/* ================= DELETE ================= */}

            {canDelete && (
                <Popconfirm
                    title="Xóa yêu cầu bảo lãnh?"
                    description="Bạn có chắc chắn muốn xóa yêu cầu này?"
                    okText="Xóa"
                    cancelText="Hủy"
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
                        Xóa
                    </Button>
                </Popconfirm>
            )}

            {/* ================= SUBMIT ================= */}

            {canSubmit && (
                <Popconfirm
                    title="Gửi yêu cầu duyệt?"
                    description="Bạn có chắc chắn muốn gửi yêu cầu này để Checker duyệt?"
                    okText="Gửi duyệt"
                    cancelText="Hủy"
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
                        Gửi duyệt
                    </Button>
                </Popconfirm>
            )}
        </Space>
    );
}