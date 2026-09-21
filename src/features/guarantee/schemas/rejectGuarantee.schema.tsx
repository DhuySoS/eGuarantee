import { z } from "zod";

export const rejectGuaranteeSchema = z.object({
    reason: z
        .string()
        .trim()
        .min(10, "Lý do từ chối phải có ít nhất 10 ký tự.")
        .max(500, "Lý do từ chối không được vượt quá 500 ký tự."),
});

export type RejectGuaranteeFormValues = z.infer<
    typeof rejectGuaranteeSchema
>;