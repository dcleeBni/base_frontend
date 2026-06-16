import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-5 text-slate-950">
      <Card className="w-full max-w-sm shadow-sm">
        <CardHeader className="border-b-0 pb-0">
          <div className="text-sm font-semibold">ERP Automation</div>
          <CardTitle className="mt-2 text-2xl">로그인</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4">
          <Label>
            아이디
            <Input defaultValue="demo.user" />
          </Label>
          <Label>
            비밀번호
            <Input type="password" defaultValue="password" />
          </Label>
          <Label>
            기본 DB
            <Select>
              <option>ERP_DEV_MSSQL</option>
              <option>ERP_TEST_MSSQL</option>
              <option>ERP_PROD_MSSQL</option>
            </Select>
          </Label>

          <Link
            href="/automation/new"
            className={buttonVariants({ className: "mt-2 h-10 w-full" })}
          >
            로그인
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
