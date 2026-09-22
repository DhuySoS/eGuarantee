import UiButton from "@/components/ui/atoms/UiButton";
import UiInput from "@/components/ui/atoms/UiInput";
import UiInputField from "@/components/ui/molecules/UiInputField";
import { LockFilled, UserOutlined } from "@ant-design/icons";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createLoginSchema,
  type LoginFormData,
} from "@/features/auth/schemas/LoginSchema";
import { useLogin } from "../hooks/useLogin";
import { useTranslations } from "next-intl";

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const t = useTranslations("auth.login");
  const loginSchema = createLoginSchema(t);
  const { mutate: login, isPending } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      {/* Username Field */}
      <UiInputField
        label={t("usernameLabel")}
        required
        error={errors.username?.message}
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <UiInput
              {...field}
              type="text"
              prefix={<UserOutlined />}
              placeholder={t("usernamePlaceholder")}
              hasError={Boolean(errors.username)}
              className="h-11"
            />
          )}
        />
      </UiInputField>

      {/* Password Field */}
      <UiInputField
        label={t("passwordLabel")}
        required
        error={errors.password?.message}
        extraRight={
          <p className="text-xs text-blue-600 hover:underline cursor-pointer">
            {t("forgotPassword")}
          </p>
        }
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <UiInput
              {...field}
              type="password"
              prefix={<LockFilled />}
              placeholder={t("passwordPlaceholder")}
              hasError={Boolean(errors.password)}
              className="h-11"
            />
          )}
        />
      </UiInputField>

      {/* Submit Button */}
      <UiButton
        type="primary"
        htmlType="submit"
        loading={isPending}
        className="w-full h-11 text-base font-semibold mt-2"
      >
        {isPending ? t("submitting") : t("submitButton")}
      </UiButton>

      {/* No Account Prompt */}
      <div className="flex justify-center gap-1 mt-2 text-xs">
        <p className="font-medium text-gray-500">{t("noAccountPrompt")}</p>
        <p
          onClick={onSwitchToRegister}
          className="font-bold text-blue-600 hover:underline cursor-pointer"
        >
          {t("createAccount")}
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
