import * as React from "react";
import { cn } from "./lib/cn";

// Status badge — the ONE shared status chip across both consoles (the former
// Paddock `Pill` reconciles into this). Tones are semantic surfaces. Shape is
// `rounded` (Cortex reference, OQ-1). `dot` is opt-in, OFF by default; pass it
// for a leading status dot (the "● Healthy" treatment) where a product wants it.
const TONES: Record<string, string> = {
  green: "bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-300",
  amber: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300",
  red: "bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-300",
  orange: "bg-orange-100 text-orange-900 dark:bg-orange-900/30 dark:text-orange-300",
  blue: "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300",
  purple: "bg-purple-100 text-purple-900 dark:bg-purple-900/30 dark:text-purple-300",
  neutral: "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-300",
  gold: "bg-gge-gold text-gge-green",
};

export function Badge({
  tone = "neutral",
  dot = false,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof TONES; dot?: boolean }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-2.5 py-0.5 text-xs font-medium",
        TONES[tone],
        className,
      )}
      {...props}
    >
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
