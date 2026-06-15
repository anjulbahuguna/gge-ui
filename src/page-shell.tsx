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
// Two-column: pass `aside` for a content sidebar (anatomy ④, NOT the nav rail ②) —
// board/content left, a ~288px aside right; collapses to one column below `lg`.
// The app owns no sidebar layout — it just fills the slot (no divergence room).
export function PageShell({
  className,
  children,
  aside,
  ...props
}: React.ComponentProps<"main"> & { className?: string; aside?: React.ReactNode }) {
  return (
    <main data-slot="page-shell" className="min-h-screen bg-background p-8" {...props}>
      {aside ? (
        <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row">
          <div className={cn("min-w-0 flex-1 space-y-6", className)}>{children}</div>
          <aside data-slot="page-aside" className="space-y-6 lg:w-72 lg:shrink-0">
            {aside}
          </aside>
        </div>
      ) : (
        <div className={cn("mx-auto max-w-6xl space-y-6", className)}>{children}</div>
      )}
    </main>
  );
}
