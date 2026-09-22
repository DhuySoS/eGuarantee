import { z } from "zod";

export const createRegisterSchema = (t?: (key: string) => string) =>
  z.object({
    username: z
      .string()
      .min(
        1,
        t ? t("validation.usernameRequired") : "Vui lòng nhập tên đăng nhập"
      ),
    fullName: z
      .string()
      .min(
        1,
        t ? t("validation.fullNameRequired") : "Vui lòng nhập họ và tên"
      ),
    password: z
      .string()
      .min(
        1,
        t ? t("validation.passwordRequired") : "Vui lòng nhập mật khẩu"
      )
      .min(
        6,
        t
          ? t("validation.passwordMin")
          : "Mật khẩu phải có ít nhất 6 ký tự"
      ),
  });

export const registerSchema = createRegisterSchema();

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
