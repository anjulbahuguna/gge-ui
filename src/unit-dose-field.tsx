"use client";

import * as React from "react";
import { cn } from "./lib/cn";

// UnitDoseField — a fast dose entry: a large numeric qty input + big-target unit
// chips. Built for quick stall-side entry. If `lockedUnit` is set (the supply
// dictates the unit) only that unit shows, as a static chip. Controlled.

const DEFAULT_UNITS = ["lb", "oz", "g", "mg", "ml", "cc", "IU"];

export interface UnitDoseFieldProps {
  qty: number | null;
  onQtyChange: (qty: number | null) => void;
  unit: string | null;
  onUnitChange: (unit: string) => void;
  units?: string[];
  lockedUnit?: string;
  className?: string;
}

export function UnitDoseField({
  qty,
  onQtyChange,
  unit,
  onUnitChange,
  units = DEFAULT_UNITS,
  lockedUnit,
  className,
}: UnitDoseFieldProps) {
  const options = lockedUnit ? [lockedUnit] : units;

  return (
    <div data-slot="unit-dose-field" className={cn("flex flex-col gap-2", className)}>
      <input
        type="text"
        inputMode="decimal"
        value={qty ?? ""}
        onChange={(e) => {
          const v = e.target.value.trim();
          if (v === "") return onQtyChange(null);
          const n = Number(v);
          onQtyChange(Number.isNaN(n) ? null : n);
        }}
        className="h-11 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
      />
      <div className="flex flex-wrap gap-1.5">
        {options.map((u) => {
          const active = !lockedUnit && u === unit;
          return (
            <button
              key={u}
              type="button"
              disabled={!!lockedUnit}
              onClick={() => onUnitChange(u)}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                lockedUnit
                  ? "border bg-muted text-muted-foreground"
                  : active
                    ? "bg-primary text-primary-foreground"
                    : "border bg-background hover:bg-muted",
              )}
            >
              {u}
            </button>
          );
        })}
      </div>
    </div>
  );
}
