import Link from "next/link";
import { databases, steps } from "./automation/data";

export default function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const activeDatabase = databases.find((database) => database.active);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="grid min-h-screen grid-cols-1 lg:grid-cols-[272px_1fr]">
        <aside className="border-b border-slate-200 bg-white lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col">
            <div className="border-b border-slate-200 px-6 py-5">
              <Link href="/automation/new" className="block">
                <div className="text-sm font-semibold text-slate-950">
                  ERP Automation
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  화면/SP 자동화 콘솔
                </div>
              </Link>
            </div>

            <nav className="grid gap-1 p-3 text-sm">
              {steps.map((step, index) => (
                <Link
                  key={step.href}
                  href={step.href}
                  className="rounded-md px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
                >
                  <span className="mr-2 inline-flex size-5 items-center justify-center rounded bg-slate-900 text-xs text-white">
                    {index + 1}
                  </span>
                  {step.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="mt-3 rounded-md px-3 py-2 text-slate-500 hover:bg-slate-100"
              >
                로그인
              </Link>
            </nav>

            <div className="mt-auto border-t border-slate-200 p-4">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-medium text-slate-500">현재 DB</div>
                <div className="mt-1 break-all text-sm font-semibold">
                  {activeDatabase?.name}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{activeDatabase?.host}</span>
                  <span className="rounded bg-teal-50 px-2 py-1 font-medium text-teal-700">
                    {activeDatabase?.env}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0">{children}</div>
      </section>
    </main>
  );
}
