"use client";

import * as React from "react";
import { cn } from "./lib/cn";

// SupplyTypeAhead — a free-text supply field with a type-ahead that can link the
// typed label to a tracked supply (for stock draw-down). Typing always reports the
// raw label; an exact case-insensitive name match auto-links, otherwise the field
// is "label only". Controlled; the app owns `value` + the picked supply.

export interface Supply {
  id: string;
  name: string;
  unit: string;
}

export interface SupplyTypeAheadProps {
  value: string;
  onChange: (value: string) => void;
  supplies: Supply[];
  onPick: (supply: Supply | null) => void;
  placeholder?: string;
  className?: string;
}

export function SupplyTypeAhead({
  value,
  onChange,
  supplies,
  onPick,
  placeholder,
  className,
}: SupplyTypeAheadProps) {
  const [open, setOpen] = React.useState(false);

  const matches = React.useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];
    return supplies.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 6);
  }, [supplies, value]);

  const linked = React.useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return null;
    return supplies.find((s) => s.name.toLowerCase() === q) ?? null;
  }, [supplies, value]);

  function handleType(text: string) {
    onChange(text);
    const exact = supplies.find((s) => s.name.toLowerCase() === text.trim().toLowerCase()) ?? null;
    onPick(exact);
    setOpen(true);
  }

  function handlePick(supply: Supply) {
    onChange(supply.name);
    onPick(supply);
    setOpen(false);
  }

  return (
    <div data-slot="supply-type-ahead" className={cn("relative", className)}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleType(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
      />
      {open && value.trim() && matches.length > 0 && (
        <ul
          data-slot="supply-type-ahead-menu"
          className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border bg-card shadow"
        >
          {matches.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handlePick(s)}
                className="flex w-full items-center justify-between px-2.5 py-1.5 text-left text-sm text-foreground hover:bg-muted"
              >
                <span>{s.name}</span>
                <span className="text-xs text-muted-foreground">{s.unit}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-1 text-xs text-muted-foreground">
        {linked
          ? `→ draws from ${linked.name} (${linked.unit})`
          : "label only — no stock draw-down"}
      </p>
    </div>
  );
}
