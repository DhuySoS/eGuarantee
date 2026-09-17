import { z } from "zod";

export const createRegisterSchema = () =>
  z.object({
    username: z.string().min(1, "Vui lòng nhập tên đăng nhập"),
    fullName: z.string().min(1, "Vui lòng nhập họ và tên"),
    password: z
      .string()
      .min(1, "Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    role: z.enum(["MAKER", "CHECKER"]),
  });

export const registerSchema = createRegisterSchema();

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
