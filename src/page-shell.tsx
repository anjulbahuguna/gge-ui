import * as React from "react";
import { cn } from "./lib/cn";

// Shared content shell — anatomy ④ container. The neutral page surface +
// centered column + page padding, defined ONCE so neither console owns its page
// background or width. (This is the gap where divergence crept in: each app set
// its own page bg → Cortex white vs Paddock cream. With a shared shell, an app
// can't render a cream content surface — it doesn't own the background.)
// Always neutral; brand differs only via --primary + the rail.
//
// Usage: <PageShell><DetailHeader …/>{/* ④ content */}</PageShell>
// Width: `max` picks the centered column width — "6xl" (default, tables/lists/dashboards)
// down to "2xl" (forms). Full static class names (Tailwind-scannable). Two-column: pass
// `aside` for a content sidebar (anatomy ④, NOT the nav rail ②) — content left, ~288px
// aside right; collapses below `lg`. The app owns no width or sidebar layout — no divergence.

export type PageShellMax = "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
const MAX_W: Record<PageShellMax, string> = {
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
};

export function PageShell({
  className,
  children,
  aside,
  max = "6xl",
  ...props
}: React.ComponentProps<"main"> & { className?: string; aside?: React.ReactNode; max?: PageShellMax }) {
  const width = MAX_W[max];
  return (
    <main data-slot="page-shell" className="min-h-screen bg-background p-8" {...props}>
      {aside ? (
        <div className={cn("mx-auto flex flex-col gap-6 lg:flex-row", width)}>
          <div className={cn("min-w-0 flex-1 space-y-6", className)}>{children}</div>
          <aside data-slot="page-aside" className="space-y-6 lg:w-72 lg:shrink-0">
            {aside}
          </aside>
        </div>
      ) : (
        <div className={cn("mx-auto space-y-6", width, className)}>{children}</div>
      )}
    </main>
  );
}
