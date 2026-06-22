"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Workflow,
  Database,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "대시보드", href: "/dashboard", icon: LayoutDashboard },
  { label: "화면 자동화", href: "/automation/new", icon: Workflow },
  { label: "쿼리 생성", href: "/query-generation/new", icon: Database },
  { label: "작업 이력", href: "/automation/history", icon: History },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-border px-6 py-5">
          <Link href="/dashboard" className="block">
            <div className="text-sm font-semibold text-foreground">
              ERP Automation
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              화면/SP 자동화 콘솔
            </div>
          </Link>
        </div>

        <nav className="grid gap-1 p-3 text-sm">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(item.href.split("/").slice(0, 2).join("/"));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
