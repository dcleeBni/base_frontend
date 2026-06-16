import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { databases, spGeneratedSql } from "../../automation/data";

const referenceFields = [
  ["참조 SP", "USP_PUR_ORD_LIST_S"],
  ["참조 TB", "TB_PUR_ORDER, TB_PUR_ORDER_DETAIL, TB_VENDOR"],
  ["참조 프로그램", "PUR_ORD_001"],
  ["프로그램 이름", "발주현황조회"],
  ["비즈니스 서비스 이름", "PurchaseOrderStatusService"],
  ["생성할 SP 이름", "USP_PO_STATUS_LIST_S"],
];

const logicChecks = [
  "권한/사업장 조건 자동 포함",
  "삭제 데이터 제외",
  "기간 조건 포함",
  "ERP 공통 코드 조인 검토",
];

export default function QueryGenerationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-medium uppercase text-slate-500">
              SP Process
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-normal">
              쿼리 생성
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Button variant="outline">임시저장</Button>
            <Button>SP 쿼리 생성</Button>
          </div>
        </div>
      </header>

      <div className="grid gap-6 p-5 sm:p-8">
        <section className="grid gap-4 lg:grid-cols-3">
          {databases.map((database) => (
            <button
              key={database.name}
              className={cn(
                "min-h-28 rounded-md border p-4 text-left transition",
                database.active
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-950 hover:border-slate-300",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 break-all text-sm font-semibold">
                  {database.name}
                </div>
                <Badge
                  variant={database.active ? "default" : "secondary"}
                  className={database.active ? "bg-white text-slate-950" : ""}
                >
                  {database.env}
                </Badge>
              </div>
              <div
                className={cn(
                  "mt-4 text-xs",
                  database.active ? "text-slate-300" : "text-slate-500",
                )}
              >
                {database.host} / {database.status}
              </div>
            </button>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <Card>
            <CardHeader>
              <CardTitle>SP 생성 입력</CardTitle>
              <CardDescription>
                UI 메타가 아니라 ERP 업무 로직을 담은 저장 프로시저를 생성합니다.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-5">
              <div className="grid gap-4 md:grid-cols-2">
                {referenceFields.map(([label, value]) => (
                  <Label key={label}>
                    {label}
                    <Input defaultValue={value} />
                  </Label>
                ))}
              </div>

              <Label>
                엑셀 파일
                <Input type="file" />
              </Label>

              <Label>
                상세 지시사항
                <Textarea
                  className="min-h-40"
                  defaultValue="발주현황조회 화면에서 사용할 조회 SP를 생성한다. 사업장 권한, 발주일자 기간, 거래처 조건을 반영하고 발주 상세 금액을 집계한다. 삭제 데이터는 제외하고 승인상태를 함께 반환한다."
                />
              </Label>

              <div className="grid gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 md:grid-cols-2">
                {logicChecks.map((label) => (
                  <label key={label} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked />
                    {label}
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>생성 단계</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {[
                  ["1", "엑셀/폼 데이터 수집", "대기"],
                  ["2", "참조 SP/TB 구조 분석", "대기"],
                  ["3", "ERP 업무 규칙 반영", "대기"],
                  ["4", "SP 쿼리 생성 및 검토", "대기"],
                ].map(([step, title, status]) => (
                  <div key={step} className="flex gap-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-slate-950 text-xs font-semibold text-white">
                      {step}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{title}</div>
                      <div className="mt-1 text-xs text-slate-500">
                        {status}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SP SQL 미리보기</CardTitle>
              </CardHeader>
              <pre className="max-h-[360px] overflow-auto p-5 text-xs leading-6 text-slate-800">
                <code>{spGeneratedSql}</code>
              </pre>
            </Card>
          </div>
        </section>

        <div className="flex justify-end">
          <Link
            href="/automation/history"
            className={buttonVariants({ variant: "outline", className: "h-10 px-4" })}
          >
            작업 이력으로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}
