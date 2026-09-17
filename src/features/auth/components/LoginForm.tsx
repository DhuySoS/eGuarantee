import UiButton from "@/components/ui/atoms/UiButton";
import UiInput from "@/components/ui/atoms/UiInput";
import UiInputField from "@/components/ui/molecules/UiInputField";
import { LockFilled, UserOutlined } from "@ant-design/icons";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createLoginSchema,
  type LoginFormData,
} from "@/features/auth/schemas/LoginSchema";

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const loginSchema = createLoginSchema();

  const {
    register,
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
    console.log("Login data:", data);
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
        <UiInput
          type="text"
          prefixIcon={<UserOutlined />}
          placeholder="Nhập tên đăng nhập"
          hasError={Boolean(errors.username)}
          {...register("username")}
        />
      </UiInputField>

      {/* Password Field */}
      <UiInputField
        label="Mật khẩu"
        required
        error={errors.password?.message}
        extraRight={
          <p className="text-xs text-blue-600 hover:underline cursor-pointer">
            Quên mật khẩu?
          </p>
        }
      >
        <UiInput
          type="password"
          prefixIcon={<LockFilled />}
          placeholder="Nhập mật khẩu"
          hasError={Boolean(errors.password)}
          {...register("password")}
        />
      </UiInputField>

      {/* Submit Button */}
      <UiButton
        type="primary"
        htmlType="submit"
        className="w-full h-11 text-base font-semibold mt-2"
      >
        Đăng nhập
      </UiButton>

      {/* No Account Prompt */}
      <div className="flex justify-center gap-1 mt-2 text-xs">
        <p className="font-medium text-gray-500">Chưa có tài khoản?</p>
        <p
          onClick={onSwitchToRegister}
          className="font-bold text-blue-600 hover:underline cursor-pointer"
        >
          Tạo tài khoản
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
