"use client";

import LoginForm from "@/features/auth/components/LoginForm";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { useState } from "react";

const AuthPage = () => {
  const [currentTab, setCurrentTab] = useState("login");

  const isLogin = currentTab === "login";

  return (
    <div
      className="flex gap-2 bg-no-repeat bg-center bg-cover w-screen h-screen"
      style={{
        backgroundImage: `url("/images/background-auth.webp")`,
      }}
    >
      <div className="hidden md:flex w-[40%] h-full flex-col justify-between px-8 py-10 lg:px-12 lg:py-16 box-border">
        {/* Góc trên: Logo / Brand */}
        <p className="text-2xl font-bold">eGuarantee-lite</p>

        {/* Ở giữa: Tiêu đề và mô tả */}
        <div className="flex flex-col gap-4 max-w-130">
          <p className="text-5xl font-bold leading-tight">
            Ý tưởng lớn bắt đầu từ đây.
          </p>
          <p className="text-lg font-medium">
            Một không gian tập trung để biến những suy nghĩ rời rạc thành công
            việc có ý nghĩa.
          </p>
        </div>

        {/* Góc dưới: Chừa trống để cân đối layout */}
        <div className="min-h-6" />
      </div>
      <div className="flex-1 w-full h-screen bg-white rounded-l-[100px] border-l border-gray-100">
        <div className="w-[60%] h-screen mx-auto flex flex-col justify-center items-start gap-4">
          <p className="text-sm font-medium">
            {isLogin ? "WELCOME BACK" : "GET STARTED"}
          </p>
          <p className="text-3xl font-semibold leading-tight">
            {isLogin
              ? "ĐĂNG NHẬP VÀO TÀI KHOẢN CỦA BẠN"
              : "ĐĂNG KÝ TÀI KHOẢN MỚI"}
          </p>
          <p className="text-sm font-medium text-gray-500">
            {isLogin
              ? "Nhập thông tin đăng nhập của bạn"
              : "Điền đầy đủ thông tin để khởi tạo tài khoản của bạn"}
          </p>

          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setCurrentTab("register")} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setCurrentTab("login")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
