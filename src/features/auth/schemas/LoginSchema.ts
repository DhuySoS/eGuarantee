import { z } from "zod";

export const createLoginSchema = () =>
  z.object({
    username: z.string().min(1, "Vui lòng nhập tên đăng nhập"),
    password: z
      .string()
      .min(1, "Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  });

export const loginSchema = createLoginSchema();

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
