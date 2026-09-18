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

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const registerSchema = createRegisterSchema();

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
      role: "MAKER",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Register data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      {/* Username Field */}
      <UiInputField
        label="Tên đăng nhập"
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
              placeholder="Nhập tên đăng nhập (vd: maker01)"
              hasError={Boolean(errors.username)}
              className="h-11"
            />
          )}
        />
      </UiInputField>

      {/* Full Name Field */}
      <UiInputField label="Họ và tên" required error={errors.fullName?.message}>
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <UiInput
              {...field}
              type="text"
              prefix={<IdcardOutlined />}
              placeholder="Nhập họ và tên (vd: Nguyen Van Maker)"
              hasError={Boolean(errors.fullName)}
              className="h-11"
            />
          )}
        />
      </UiInputField>

      {/* Password Field */}
      <UiInputField label="Mật khẩu" required error={errors.password?.message}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <UiInput
              {...field}
              type="password"
              prefix={<LockFilled />}
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
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
        className="w-full h-11 text-base font-semibold mt-2"
      >
        Đăng ký
      </UiButton>

      {/* Already have account prompt */}
      <div className="flex justify-center gap-1 mt-2 text-xs">
        <p className="font-medium text-gray-500">Đã có tài khoản?</p>
        <p
          onClick={onSwitchToLogin}
          className="font-bold text-blue-600 hover:underline cursor-pointer"
        >
          Đăng nhập ngay
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
