import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  type,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "h-10 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition-colors file:mr-4 file:rounded-md file:border-0 file:bg-slate-950 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white focus:border-slate-950 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
        type === "file" && "h-auto border-dashed bg-slate-50 px-4 py-6",
        className,
      )}
      {...props}
    />
  );
}
