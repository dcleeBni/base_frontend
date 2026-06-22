"use client";

import { useAuthContext } from "@/providers/auth-provider";

/** 인증 상태/액션 접근용 훅. */
export function useAuth() {
  return useAuthContext();
}
