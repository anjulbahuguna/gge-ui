import * as React from "react";
import { cn } from "./lib/cn";
import { Badge } from "./badge";

// SupplyLevel — a one-line read-out of a tracked supply's on-hand amount, optional
// pack-equivalent, and its low threshold, plus a "Low" badge when at/under it.
// Presentational; the app computes `level`/`threshold`.

export interface SupplyLevelProps {
  level: number;
  threshold: number;
  unit: string;
  packSize?: number | null;
  className?: string;
}

export function SupplyLevel({
  level,
  threshold,
  unit,
  packSize,
  className,
}: SupplyLevelProps) {
  const low = level <= threshold;
  return (
    <span
      data-slot="supply-level"
      className={cn("inline-flex items-center gap-2 text-sm", className)}
    >
      <span className="text-foreground">
        {level} {unit}
      </span>
      <span className="text-muted-foreground">
        {packSize ? `· ~${(level / packSize).toFixed(1)} packs ` : ""}
        · low at {threshold} {unit}
      </span>
      {low && <Badge tone="amber">Low</Badge>}
    </span>
  );
}
