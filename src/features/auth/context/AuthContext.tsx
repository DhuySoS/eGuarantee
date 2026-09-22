"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/features/guarantee/types/guarantee";
import { getUserFromToken, isTokenValid } from "../utils/token";
import { withLocale, getLocaleFromPath } from "@/shared/i18n/path";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Kiểm tra token khi ứng dụng khởi động hoặc reload
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");

      if (token && isTokenValid(token)) {
        const userData = getUserFromToken(token);
        setUser(userData);
      } else {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (accessToken: string, refreshToken?: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", accessToken);
      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }
    }
    const userData = getUserFromToken(accessToken);
    setUser(userData);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
    setUser(null);
    const locale =
      typeof window !== "undefined"
        ? getLocaleFromPath(window.location.pathname)
        : "vi";
    router.replace(withLocale("/auth", locale));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }
  return context;
};

export default AuthContext;
