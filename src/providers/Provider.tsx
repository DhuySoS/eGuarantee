"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { App, ConfigProvider, theme as antdTheme } from "antd";
import viVN from "antd/locale/vi_VN";
import enUS from "antd/locale/en_US";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import ThemeProvider, { useTheme } from "./ThemeProvider";

const AntdConfigWrapper = ({
  children,
  antdLocale,
}: {
  children: React.ReactNode;
  antdLocale: any;
}) => {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      locale={antdLocale}
      theme={{
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 8,
        },
      }}
    >
      <AuthProvider>
        <App>{children}</App>
      </AuthProvider>
    </ConfigProvider>
  );
};

const Provider = ({
  children,
  messages,
  locale,
}: {
  children: React.ReactNode;
  messages?: AbstractIntlMessages;
  locale?: string;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  const antdLocale = locale === "en" ? enUS : viVN;
  if (locale === "vi") {
    dayjs.locale("vi");
  } else {
    dayjs.locale("en");
  }

  return (
    <AntdRegistry>
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <AntdConfigWrapper antdLocale={antdLocale}>
              {children}
            </AntdConfigWrapper>
          </ThemeProvider>
        </NextIntlClientProvider>
      </QueryClientProvider>
    </AntdRegistry>
  );
};

export default Provider;
