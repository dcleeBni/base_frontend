"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [username, setUsername] = useState("demo.user");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("ERP_DEV_MSSQL");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ username, password, database });
      router.replace(searchParams.get("redirect") ?? "/dashboard");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "로그인에 실패했습니다.";
      setError(Array.isArray(message) ? message.join(", ") : message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-muted/50 px-5 text-foreground">
      <Card className="w-full max-w-sm shadow-sm">
        <CardHeader className="border-b-0 pb-0">
          <div className="text-sm font-semibold">ERP Automation</div>
          <CardTitle className="mt-2 text-2xl">로그인</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {error ? (
              <Alert variant="warning">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <div className="grid gap-2">
              <Label htmlFor="username">아이디</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="database">기본 DB</Label>
              <Select value={database} onValueChange={setDatabase}>
                <SelectTrigger id="database" className="w-full">
                  <SelectValue placeholder="DB 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ERP_DEV_MSSQL">ERP_DEV_MSSQL</SelectItem>
                  <SelectItem value="ERP_TEST_MSSQL">ERP_TEST_MSSQL</SelectItem>
                  <SelectItem value="ERP_PROD_MSSQL">ERP_PROD_MSSQL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-10 w-full"
            >
              {loading ? "로그인 중…" : "로그인"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
