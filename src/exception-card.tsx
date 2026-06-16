import * as React from "react";
import { cn } from "./lib/cn";
import { Badge } from "./badge";

// ExceptionCard — a names-not-counts dashboard card for the Care Board. Poses a
// question (`title`) and answers it with the exact rows that matter (e.g. "Who
// hasn't been fed?" → the horses + a status badge). Renders precisely what's
// passed; never aggregates into a number. Presentational; brand only via --primary.

// Semantic tone → Badge tone. The card speaks in product semantics; the Badge
// owns the surface colors.
const TONE_TO_BADGE: Record<string, "neutral" | "green" | "amber" | "red" | "blue"> = {
  neutral: "neutral",
  success: "green",
  warning: "amber",
  destructive: "red",
  info: "blue",
};

export interface ExceptionItem {
  name: string;
  status: string;
  tone?: "neutral" | "success" | "warning" | "destructive" | "info";
}

export interface ExceptionCardProps {
  title: string;
  items: ExceptionItem[];
  className?: string;
}

export function ExceptionCard({ title, items, className }: ExceptionCardProps) {
  return (
    <div
      data-slot="exception-card"
      className={cn("rounded-lg border bg-card p-4 text-card-foreground", className)}
    >
      <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
      <ul className="mt-2">
        {items.map((item, i) => (
          <li
            key={`${item.name}-${i}`}
            className="flex items-center justify-between py-1.5"
          >
            <span className="text-sm text-foreground">{item.name}</span>
            <Badge tone={TONE_TO_BADGE[item.tone ?? "neutral"]}>{item.status}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
