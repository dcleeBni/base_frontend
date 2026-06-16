import Link from "next/link";
import { Alert } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generatedSql, workHistory } from "../../data";

const analysis = [
  ["프로그램", "PO_STATUS_LIST"],
  ["검색 조건", "발주일자, 거래처"],
  ["그리드 필드", "발주번호, 거래처, 발주일자, 금액"],
  ["버튼 정책", "조회, 엑셀, 초기화"],
];

export default async function UiReviewPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const job = workHistory.find((item) => item.id === jobId) ?? workHistory[0];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-medium uppercase text-slate-500">
              Step 2 / {job.displayId}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-normal">
              UI 생성 검토
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Link
              href="/automation/new"
              className={buttonVariants({ variant: "outline" })}
            >
              이전
            </Link>
            <Button variant="outline">UI 쿼리 재생성</Button>
            <Link
              href="/automation/history"
              className={buttonVariants()}
            >
              DB 반영
            </Link>
          </div>
        </div>
      </header>

      <div className="grid gap-6 p-5 sm:p-8">
        <section className="grid gap-4 md:grid-cols-4">
          {analysis.map(([label, value]) => (
            <Card key={label} className="p-4">
              <div className="text-xs font-medium text-slate-500">{label}</div>
              <div className="mt-2 min-h-10 text-sm font-semibold leading-5">
                {value}
              </div>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <Card>
            <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-base font-semibold">UI SQL 미리보기</h2>
                <div className="mt-1 text-sm text-slate-500">
                  화면 메타 테이블에 입력되는 쿼리 / 대상 DB: {job.database}
                </div>
              </div>
              <Button variant="outline">복사</Button>
            </div>
            <pre className="max-h-[560px] overflow-auto p-5 text-xs leading-6 text-slate-800">
              <code>{generatedSql}</code>
            </pre>
          </Card>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>작업 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid gap-4 text-sm">
                {[
                  ["프로그램", job.program],
                  ["서비스", job.service],
                  ["SP", job.sp],
                  ["상태", job.status],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs font-medium text-slate-500">
                      {label}
                    </dt>
                    <dd className="mt-1 break-all font-semibold">{value}</dd>
                  </div>
                ))}
                </dl>
              </CardContent>
            </Card>

            <Alert variant="warning">
              이 페이지는 화면을 그리기 위한 UI 메타 쿼리 검토 단계입니다.
              ERP 업무 로직 SP는 별도의 쿼리 생성 페이지에서 만듭니다.
            </Alert>
          </div>
        </section>
      </div>
    </div>
  );
}
