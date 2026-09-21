"use client";
import { useState } from "react";
import type { Guarantee } from "../../types/guarantee";
import { Button,Modal, Popconfirm, Space,Input  } from "antd";
import {
    CheckOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    rejectGuaranteeSchema,
    type RejectGuaranteeFormValues,
} from "../../schemas/rejectGuarantee.schema";
interface CheckerActionsProps {
    guarantee: Guarantee;
    onApprove?: () => void;
    onReject?: (reason: string) => void;
    isApproving?: boolean;
    isRejecting?: boolean;
}

export default function CheckerActions({
                                           guarantee,
                                           onApprove,
                                           onReject,
                                           isApproving = false,
                                           isRejecting = false,
                                       }: CheckerActionsProps) {
    const [open, setOpen] = useState(false);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RejectGuaranteeFormValues>({
        resolver: zodResolver(rejectGuaranteeSchema),
        defaultValues: {
            reason: "",
        },
    });
    const handleOpenRejectModal = () => {
        reset({
            reason: "",
        });

        setOpen(true);
    };
    const handleCloseRejectModal = () => {
        setOpen(false);

        reset({
            reason: "",
        });
    };
    const handleReject = (data: RejectGuaranteeFormValues) => {
        onReject?.(data.reason);

        setOpen(false);

        reset({
            reason: "",
        });
    };

    const canProcess = guarantee.status === "PENDING_APPROVAL";
    if (!canProcess) {
        return null;
    }
    return (
        <>
        <Space wrap>
            <Button
                danger
                icon={<CloseOutlined />}
                loading={isRejecting}
                onClick={handleOpenRejectModal}
            >
                Từ chối
            </Button>

            <Popconfirm
                title="Phê duyệt yêu cầu bảo lãnh?"
                description="Bạn có chắc chắn muốn phê duyệt yêu cầu này?"
                okText="Phê duyệt"
                cancelText="Hủy"
                okButtonProps={{
                    type: "primary",
                    loading: isApproving,
                }}
                onConfirm={onApprove}
            >
                <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    loading={isApproving}
                >
                    Phê duyệt
                </Button>
            </Popconfirm>
        </Space>
            <Modal
                title="Từ chối yêu cầu bảo lãnh"
                open={open}
                onCancel={handleCloseRejectModal}
                onOk={handleSubmit(handleReject)}
                okText="Từ chối"
                cancelText="Hủy"
                confirmLoading={isRejecting}
            >
                <Controller
                    name="reason"
                    control={control}
                    render={({ field }) => (
                        <Input.TextArea
                            {...field}
                            placeholder="Nhập lý do từ chối"
                            rows={5}
                            maxLength={500}
                            showCount
                        />
                    )}
                />
                {errors.reason && (
                    <div className="mt-1 text-sm text-red-500">
                        {errors.reason.message}
                    </div>
                )}
            </Modal>
            </>
    );
}