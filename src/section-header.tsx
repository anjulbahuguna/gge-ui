import * as React from "react";
import { cn } from "./lib/cn";

// Section / group label. OQ-1 reference (Cortex look): neutral `text-foreground`,
// `font-medium`, sans — no brand tint, no `font-display`. Sentence case; precedes
// a card/list. Tint via `className` (e.g. text-primary) only where a product opts in.
export function SectionHeader({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      data-slot="section-header"
      className={cn("text-[15px] font-medium text-foreground", className)}
      {...props}
    />
  );
}
