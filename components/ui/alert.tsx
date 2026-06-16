import * as React from "react";
import { cn } from "@/lib/utils";

type AlertVariant = "warning" | "danger" | "default";

const variants: Record<AlertVariant, string> = {
  default: "border-slate-200 bg-slate-50 text-slate-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  danger: "border-rose-200 bg-rose-50 text-rose-900",
};

export function Alert({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
}) {
  return (
    <div
      className={cn("rounded-md border p-4 text-sm", variants[variant], className)}
      {...props}
    />
  );
}
