"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function AppTopbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-5 sm:px-8">
      <div className="text-sm font-medium text-muted-foreground">
        {user?.defaultDatabase ? (
          <span className="rounded bg-success/10 px-2 py-1 text-success">
            현재 DB · {user.defaultDatabase}
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-semibold text-foreground">
            {user?.displayName ?? user?.username ?? "사용자"}
          </div>
        </div>
        <Button variant="outline" onClick={logout} className="gap-1">
          <LogOut className="size-4" />
          로그아웃
        </Button>
      </div>
    </header>
  );
}
