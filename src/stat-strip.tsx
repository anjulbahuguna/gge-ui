import * as React from "react";
import { cn } from "./lib/cn";

// StatStrip — a horizontal rollup row of metric chips (e.g. the Care Board's
// open / done / overdue / order-soon counts). Data-driven + presentational. Tone
// reuses the Badge semantic names and colors the value (neutral card otherwise),
// so the strip scans fast without shouting. Neutral; brand only via --primary.

const TONE_TEXT: Record<string, string> = {
  green: "text-green-700 dark:text-green-300",
  amber: "text-amber-600 dark:text-amber-300",
  red: "text-red-600 dark:text-red-300",
  orange: "text-orange-600 dark:text-orange-300",
  blue: "text-blue-700 dark:text-blue-300",
  purple: "text-purple-700 dark:text-purple-300",
  neutral: "text-foreground",
  gold: "text-gge-gold",
};

export interface Stat {
  label: string;
  value: React.ReactNode;
  tone?: keyof typeof TONE_TEXT;
}

export function StatStrip({
  items,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { items: Stat[] }) {
  return (
    <div data-slot="stat-strip" className={cn("flex flex-wrap gap-3", className)} {...props}>
      {items.map((s, i) => (
        <div
          key={`${s.label}-${i}`}
          data-slot="stat"
          className="min-w-[76px] rounded-lg border bg-card px-3 py-2 text-center"
        >
          <div className={cn("text-xl font-semibold leading-none", TONE_TEXT[s.tone ?? "neutral"])}>{s.value}</div>
          <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
