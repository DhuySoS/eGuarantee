import { z } from "zod";

export const customerFormSchema = z.object({
  cif: z
    .string()
    .trim()
    .nonempty("Mã CIF là bắt buộc")
    .regex(/^[0-9]{6,12}$/, "Mã CIF phải từ 6 đến 12 chữ số"),
  customerName: z
    .string({ message: "Tên khách hàng là bắt buộc" })
    .trim()
    .min(1, "Tên khách hàng là bắt buộc")
    .max(255, "Tối đa 255 ký tự"),
  taxCode: z
    .string({ message: "Mã số thuế là bắt buộc" })
    .trim()
    .min(1, "Mã số thuế là bắt buộc")
    .max(50, "Tối đa 50 ký tự"),
  address: z
    .string()
    .trim()
    .max(300, "Địa chỉ tối đa 300 ký tự")
    .optional()
    .or(z.literal("")),
});

export type CustomerFormData = z.infer<typeof customerFormSchema>;
