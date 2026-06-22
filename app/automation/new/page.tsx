import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { databases } from "../data";

const references = [
  ["참조 SP", "USP_PUR_ORD_LIST_S"],
  ["참조 TB", "TB_PUR_ORDER, TB_VENDOR"],
  ["참조 프로그램", "PUR_ORD_001"],
];

export default function NewAutomationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-card px-5 py-4 sm:px-8">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Step 1
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-normal">
              화면 개발 작업 생성
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Button variant="outline">임시저장</Button>
            <Link
              href="/automation/sample-20260601-014/ui-review"
              className={buttonVariants()}
            >
              다음
            </Link>
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
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-input",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 break-all text-sm font-semibold">
                  {database.name}
                </div>
                <Badge
                  variant={database.active ? "default" : "secondary"}
                  className={database.active ? "bg-card text-foreground" : ""}
                >
                  {database.env}
                </Badge>
              </div>
              <div
                className={cn(
                  "mt-4 text-xs",
                  database.active ? "text-primary-foreground/70" : "text-muted-foreground",
                )}
              >
                {database.host} / {database.status}
              </div>
            </button>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="programName">프로그램 이름</Label>
                  <Input id="programName" defaultValue="발주현황조회" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="serviceName">비즈니스 서비스 이름</Label>
                  <Input
                    id="serviceName"
                    defaultValue="PurchaseOrderStatusService"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="spName">SP 이름</Label>
                  <Input id="spName" defaultValue="USP_PO_STATUS_LIST_S" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="policy">실행 정책</Label>
                  <Select defaultValue="preview">
                    <SelectTrigger id="policy" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preview">쿼리 생성 후 검토</SelectItem>
                      <SelectItem value="draft">임시저장</SelectItem>
                      <SelectItem value="approval">승인 요청</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="excelFile">엑셀 파일</Label>
                <Input id="excelFile" type="file" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="instruction">상세 지시명령</Label>
                <Textarea
                  id="instruction"
                  className="min-h-36"
                  defaultValue="참조 프로그램의 조회 화면 패턴을 유지하고, 발주일자 기간 검색과 거래처 검색을 상단 조건으로 배치한다. 그리드는 발주번호 기준 내림차순으로 표시한다."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>참조 정보</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {references.map(([label, value]) => (
                <div key={label} className="grid gap-2">
                  <Label>{label}</Label>
                  <Input defaultValue={value} />
                </div>
              ))}
              <Alert variant="warning" className="p-3">
                <AlertDescription>
                  운영 DB 반영은 검토 페이지 승인 이후에만 활성화됩니다.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
