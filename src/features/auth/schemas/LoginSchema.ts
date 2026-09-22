import { z } from "zod";

export const createLoginSchema = (t?: (key: string) => string) =>
  z.object({
    username: z
      .string()
      .min(
        1,
        t ? t("validation.usernameRequired") : "Vui lòng nhập tên đăng nhập"
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

export const loginSchema = createLoginSchema();

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
