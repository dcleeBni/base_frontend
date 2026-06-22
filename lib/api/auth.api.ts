import { api, setAccessToken } from "./axios";
import type { AuthUser, LoginRequest, LoginResponse } from "@/types/auth";

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  setAccessToken(data.accessToken);
  return data;
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } finally {
    setAccessToken(null);
  }
}

/** refresh 쿠키로 access 토큰 재발급. 세션 복구(부트스트랩)에 사용. */
export async function refresh(): Promise<string | null> {
  try {
    const { data } = await api.post<{ accessToken: string }>("/auth/refresh");
    setAccessToken(data.accessToken);
    return data.accessToken;
  } catch {
    setAccessToken(null);
    return null;
  }
}

export async function fetchMe(): Promise<AuthUser> {
  const { data } = await api.get<AuthUser>("/auth/me");
  return data;
}
