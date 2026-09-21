import type { User, UserRole } from "@/features/guarantee/types/guarantee";

export type { User, UserRole };

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginResponseData extends AuthTokens {
  user?: User;
}

export interface RegisterPayload {
  username: string;
  password: string;
  fullName: string;
}

export interface RegisterResponseData {
  id: number;
}
