"use client";

import * as React from "react";
import { cn } from "./lib/cn";

// SlotChips — a multi-select chip group (e.g. the time slots a task applies to:
// AM / Noon / PM). Toggles an id in/out of `selected`. Controlled; the app owns
// the selection. Presentational; brand via --primary on the active chip.

export interface Slot {
  id: string;
  name: string;
}

export interface SlotChipsProps {
  slots: Slot[];
  selected: string[];
  onChange: (ids: string[]) => void;
  className?: string;
}

export function SlotChips({ slots, selected, onChange, className }: SlotChipsProps) {
  function toggle(id: string) {
    onChange(
      selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id],
    );
  }

  return (
    <div data-slot="slot-chips" className={cn("flex flex-wrap gap-1.5", className)}>
      {slots.map((slot) => {
        const active = selected.includes(slot.id);
        return (
          <button
            key={slot.id}
            type="button"
            aria-pressed={active}
            onClick={() => toggle(slot.id)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "border bg-background hover:bg-muted",
            )}
          >
            {slot.name}
          </button>
        );
      })}
    </div>
  );
}
