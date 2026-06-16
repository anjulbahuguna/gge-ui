"use client";

import * as React from "react";
import { cn } from "./lib/cn";

// Checkbox — a big-tap-target check-off for the board (a groom marking a task
// done with one tap). Renders as a role=checkbox button so the whole control
// (box + label) is the target. Controlled.

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Checkbox({ checked, onChange, label, className }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      data-slot="checkbox"
      onClick={() => onChange(!checked)}
      className={cn("inline-flex items-center gap-2", className)}
    >
      <span
        aria-hidden
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-md border transition-colors",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-input bg-background",
        )}
      >
        {checked && (
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M3.5 8.5l3 3 6-6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </button>
  );
}
