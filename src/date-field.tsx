import * as React from "react";
import { cn } from "./lib/cn";

// DateField — a styled <input type="date"> matching Input. Presentational; the
// app controls value/onChange. (FormField composes this for date fields.)
export function DateField({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type="date"
      data-slot="date-field"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
