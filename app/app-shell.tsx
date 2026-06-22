"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";
import { useAuth } from "@/hooks/use-auth";

/**
 * 인증된 영역의 공통 레이아웃: 좌측 사이드바 + 상단 네비게이션 + 본문.
 * 세션 복구(부트스트랩) 중에는 로딩을 표시한다.
 * 미인증 접근 차단은 middleware.ts 가 1차로 담당한다.
 */
export default function AppShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-muted/50 text-sm text-muted-foreground">
        세션 확인 중…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/50 text-foreground">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
