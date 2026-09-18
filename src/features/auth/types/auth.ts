import type { User } from "@/features/guarantee/types/guarantee";

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
