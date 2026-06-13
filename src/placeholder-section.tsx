import * as React from "react";
import { cn } from "./lib/cn";
import { SectionHeader } from "./section-header";

// A structured "coming soon" section — shows the architecture before the
// feature ships, so the page's shape is visible from day one.
export function PlaceholderSection({
  title,
  note = "Coming soon",
  className,
}: {
  title: string;
  note?: string;
  className?: string;
}) {
  return (
    <section data-slot="placeholder-section" className={cn("opacity-60", className)}>
      <div className="flex items-center justify-between">
        <SectionHeader>{title}</SectionHeader>
        <span className="text-xs uppercase tracking-wide text-muted-foreground">{note}</span>
      </div>
      <div className="rounded-lg border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
        Nothing here yet.
      </div>
    </section>
  );
}
