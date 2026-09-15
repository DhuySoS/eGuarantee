"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <AntdRegistry>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AntdRegistry>
  );
};

export default Provider;
