import UiButton from "@/components/ui/atoms/UiButton";
import UiInput from "@/components/ui/atoms/UiInput";
import UiInputField from "@/components/ui/molecules/UiInputField";
import { IdcardOutlined, LockFilled, UserOutlined } from "@ant-design/icons";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createRegisterSchema,
  type RegisterFormData,
} from "@/features/auth/schemas/RegisterSchema";
import { useRegister } from "../hooks/useRegister";
import { useTranslations } from "next-intl";

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const t = useTranslations("auth.register");
  const registerSchema = createRegisterSchema(t);
  const { mutate: register, isPending } = useRegister({
    onSuccess: () => {
      onSwitchToLogin?.();
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      fullName: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    register(data);
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

      {/* Full Name Field */}
      <UiInputField label={t("fullNameLabel")} required error={errors.fullName?.message}>
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <UiInput
              {...field}
              type="text"
              prefix={<IdcardOutlined />}
              placeholder={t("fullNamePlaceholder")}
              hasError={Boolean(errors.fullName)}
              className="h-11"
            />
          )}
        />
      </UiInputField>

      {/* Password Field */}
      <UiInputField label={t("passwordLabel")} required error={errors.password?.message}>
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

      {/* Already have account prompt */}
      <div className="flex justify-center gap-1 mt-2 text-xs">
        <p className="font-medium text-gray-500">{t("hasAccountPrompt")}</p>
        <p
          onClick={onSwitchToLogin}
          className="font-bold text-blue-600 hover:underline cursor-pointer"
        >
          {t("loginNow")}
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
