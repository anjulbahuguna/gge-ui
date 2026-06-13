"use client";

import * as React from "react";
import { cn } from "./lib/cn";

// Segmented — a segmented view switcher (e.g. the Care Board's Today / By-horse /
// By-assignee). Neutral control: a muted track with the active segment lifted to
// the surface (bg-background + shadow). Controlled; the app owns `value`/`onChange`.
// Presentational; brand only via --primary if a product wants to tint the active.

export interface SegmentOption {
  value: string;
  label: React.ReactNode;
}

export interface SegmentedProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Segmented({ options, value, onChange, className }: SegmentedProps) {
  return (
    <div data-slot="segmented" role="tablist" className={cn("inline-flex rounded-lg bg-muted p-0.5", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors",
              active
                ? "bg-background font-medium text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
