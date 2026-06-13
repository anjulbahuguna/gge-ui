import * as React from "react";
import { cn } from "./lib/cn";

// Section / group label. Uses the `font-display` token (Paddock serif / Cortex
// sans) and the brand primary color. Sentence case; precedes a card/list.
export function SectionHeader({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      data-slot="section-header"
      className={cn("font-display text-[15px] font-semibold text-primary", className)}
      {...props}
    />
  );
}
