import * as React from "react";
import { cn } from "./lib/cn";
import { Input } from "./input";
import { Label } from "./label";

// Edit-mode labeled field. Presentational only — option lists are passed in as
// props (`items` for select, `suggestions` for combobox); the consuming app
// does any data fetching (seeded app_settings, etc.). One component covers
// text/date inputs, native selects, and datalist comboboxes.
type Item = { value: string; label: string };

const controlCls =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50";

export interface FormFieldProps {
  label: string;
  name: string;
  as?: "input" | "select" | "combobox";
  items?: Item[]; // for as="select"
  suggestions?: string[]; // for as="combobox" (datalist)
  type?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  className?: string;
}

export function FormField({
  label,
  name,
  as = "input",
  items = [],
  suggestions = [],
  type,
  defaultValue,
  required,
  placeholder,
  hint,
  className,
}: FormFieldProps) {
  const id = `ff-${name}`;
  const listId = `${id}-list`;
  return (
    <div data-slot="form-field" className={cn("space-y-1", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>

      {as === "select" ? (
        <select id={id} name={name} defaultValue={defaultValue ?? ""} required={required} className={controlCls}>
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
      ) : as === "combobox" ? (
        <>
          <Input
            id={id}
            name={name}
            list={listId}
            defaultValue={defaultValue ?? ""}
            required={required}
            placeholder={placeholder}
            autoComplete="off"
          />
          <datalist id={listId}>
            {suggestions.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </>
      ) : (
        <Input
          id={id}
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          required={required}
          placeholder={placeholder}
        />
      )}

      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
