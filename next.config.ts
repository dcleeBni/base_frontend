import type { NextConfig } from "next";

// 백엔드(Nest) 주소. 배포 시 환경변수로 주입.
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3001";

const nextConfig: NextConfig = {
  /**
   * /api/* 요청을 Nest 백엔드로 프록시한다.
   * 프론트(3000)와 동일 출처가 되므로 httpOnly refresh 쿠키가
   * 1st-party 로 저장되고 middleware 에서 읽을 수 있다.
   */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
