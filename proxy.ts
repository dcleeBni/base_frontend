import { NextResponse, type NextRequest } from "next/server";

/** 로그인 없이 접근 가능한 경로. */
const PUBLIC_PATHS = ["/login"];

const REFRESH_COOKIE = "refresh_token";

/**
 * 1차 라우트 가드 (Next 16 Proxy = 구 middleware).
 * refresh httpOnly 쿠키 존재 여부로 보호 경로 접근을 막는다.
 * (토큰 유효성 최종 검증은 백엔드 + 클라이언트 AuthProvider 가 수행)
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = req.cookies.has(REFRESH_COOKIE);
  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  // 미인증 + 보호 경로 → 로그인으로
  if (!hasSession && !isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // 인증 상태에서 로그인 페이지 접근 → 대시보드로
  if (hasSession && isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // _next 정적 자원, api 프록시, 파일 요청 제외
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
