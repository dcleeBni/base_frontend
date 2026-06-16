import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { workHistory } from "../data";

export default function AutomationHistoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-medium uppercase text-slate-500">
              Step 3
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-normal">
              작업 이력 확인
            </h1>
          </div>
          <Link
            href="/automation/new"
            className={buttonVariants({ className: "w-fit" })}
          >
            새 작업
          </Link>
        </div>
      </header>

      <div className="grid gap-6 p-5 sm:p-8">
        <section className="grid gap-3 md:grid-cols-3">
          {[
            ["전체 작업", "28", "bg-white"],
            ["DB 반영완료", "12", "bg-teal-50"],
            ["검토 필요", "4", "bg-amber-50"],
          ].map(([label, value, color]) => (
            <Card
              key={label}
              className={`p-4 ${color}`}
            >
              <div className="text-sm font-medium text-slate-500">{label}</div>
              <div className="mt-2 text-3xl font-semibold">{value}</div>
            </Card>
          ))}
        </section>

        <section className="rounded-md border border-slate-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-base font-semibold">작업 목록</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <Input
                className="h-9 w-full sm:w-64"
                placeholder="프로그램, SP, 작업 ID"
              />
              <Select className="h-9">
                <option>전체 상태</option>
                <option>검토 대기</option>
                <option>쿼리 생성</option>
                <option>임시저장</option>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="min-w-[920px]">
              <TableHeader>
                <tr>
                  <TableHead>작업 ID</TableHead>
                  <TableHead>유형</TableHead>
                  <TableHead>프로그램</TableHead>
                  <TableHead>SP</TableHead>
                  <TableHead>DB</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>작업자</TableHead>
                  <TableHead>생성일시</TableHead>
                  <TableHead>액션</TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {workHistory.map((work) => (
                  <TableRow key={work.id}>
                    <TableCell className="font-mono text-xs">
                      {work.displayId}
                    </TableCell>
                    <TableCell>{work.type}</TableCell>
                    <TableCell className="font-medium">{work.program}</TableCell>
                    <TableCell className="font-mono text-xs">{work.sp}</TableCell>
                    <TableCell className="text-slate-600">
                      {work.database}
                    </TableCell>
                    <TableCell>
                      <Badge>{work.status}</Badge>
                    </TableCell>
                    <TableCell>{work.owner}</TableCell>
                    <TableCell className="text-slate-500">{work.time}</TableCell>
                    <TableCell>
                      <Link
                        href={`/automation/${work.id}/ui-review`}
                        className="font-medium text-slate-950 underline underline-offset-4"
                      >
                        상세
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </div>
  );
}
