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
export function PageShell({
  className,
  children,
  ...props
}: React.ComponentProps<"main"> & { className?: string }) {
  return (
    <main data-slot="page-shell" className="min-h-screen bg-background p-8" {...props}>
      <div className={cn("mx-auto max-w-6xl space-y-6", className)}>{children}</div>
    </main>
  );
}
