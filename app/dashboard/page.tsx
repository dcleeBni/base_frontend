"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-5 sm:p-8">
      <h1 className="text-2xl font-semibold">
        반갑습니다, {user?.displayName ?? user?.username ?? "사용자"}님
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        ERP 화면/SP 자동화 콘솔 대시보드입니다.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>화면 개발 작업</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground">
            엑셀/지시문 기반으로 화면과 SP 생성을 시작합니다.
            <Link
              href="/automation/new"
              className={buttonVariants({ className: "w-fit" })}
            >
              작업 생성
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>쿼리 생성</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground">
            저장 프로시저(SP) 초안을 생성하고 검토합니다.
            <Link
              href="/query-generation/new"
              className={buttonVariants({
                variant: "outline",
                className: "w-fit",
              })}
            >
              쿼리 생성
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>작업 이력</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground">
            진행/완료된 자동화 작업을 확인합니다.
            <Link
              href="/automation/history"
              className={buttonVariants({
                variant: "outline",
                className: "w-fit",
              })}
            >
              이력 보기
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
