"use client";

import * as React from "react";
import { cn } from "./lib/cn";
import { Label } from "./label";

// Controlled select — the value/onChange counterpart to FormField's uncontrolled
// (name/defaultValue) one. Use this in client-state forms that never submit via
// FormData (eligibility, DisciplineDivision, SheetImport). Native <select> under
// the hood (accessible, no popover JS), styled to the same Input tokens. Label is
// optional: pass it for a labeled field, omit it to drop in for a bare <select>.
type Item = { value: string; label: string };

const controlCls =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 disabled:cursor-not-allowed";

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  items: Item[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hint?: string;
  id?: string;
  name?: string;
  className?: string;
}

export function Select({
  value,
  onChange,
  items,
  label,
  placeholder,
  required,
  disabled,
  hint,
  id,
  name,
  className,
}: SelectProps) {
  const control = (
    <select
      id={id}
      name={name}
      value={value}
      required={required}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={cn(controlCls, !label && className)}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {items.map((it) => (
        <option key={it.value} value={it.value}>
          {it.label}
        </option>
      ))}
    </select>
  );

  if (!label) return control;

  return (
    <div data-slot="select-field" className={cn("space-y-1", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {control}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
