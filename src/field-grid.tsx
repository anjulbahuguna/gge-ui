import * as React from "react";
import { cn } from "./lib/cn";

// Read-mode label/value display for a section. ReadField is one label+value;
// FieldGrid lays them out in a responsive two-column grid.
export function FieldGrid({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="field-grid"
      className={cn("grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2", className)}
      {...props}
    />
  );
}

export function ReadField({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-slot="read-field" className={cn("min-w-0", className)}>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm text-foreground">{value ?? "—"}</dd>
    </div>
  );
}
