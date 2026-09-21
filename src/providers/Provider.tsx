"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { App } from "antd";
import { AuthProvider } from "@/features/auth/context/AuthContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <AntdRegistry>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App>{children}</App>
        </AuthProvider>
      </QueryClientProvider>
    </AntdRegistry>
  );
};

export default Provider;
