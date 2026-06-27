import * as React from "react";
import { cn } from "./lib/cn";

// Status badge — the ONE shared status chip across both consoles (the former
// Paddock `Pill` reconciles into this). Shape is `rounded` (Cortex reference, OQ-1).
// `dot` is opt-in for the "● Healthy" treatment.
//
// Tones are SEMANTIC and token-backed (success/warning/error/info/neutral) — no
// hardcoded palette. Status tokens are brand-independent (theme.css), so a success
// is the same green on Cortex and Paddock. Prefer the semantic names; the literal
// color names are kept as deprecated aliases so existing callers don't break.
const SUCCESS = "bg-success/12 text-success dark:bg-success/20";
const WARNING = "bg-warning/15 text-warning dark:bg-warning/20";
const ERROR = "bg-destructive/12 text-destructive dark:bg-destructive/20";
const INFO = "bg-info/12 text-info dark:bg-info/20";
const NEUTRAL = "bg-muted text-muted-foreground";

const TONES: Record<string, string> = {
  // semantic (preferred)
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  info: INFO,
  neutral: NEUTRAL,
  gold: "bg-gge-gold text-gge-green",
  // deprecated color-name aliases → repointed to the semantic tokens (no palette)
  green: SUCCESS,
  amber: WARNING,
  red: ERROR,
  orange: WARNING,
  blue: INFO,
  purple: INFO,
};

export function Badge({
  tone = "neutral",
  dot = false,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof TONES; dot?: boolean }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-2.5 py-0.5 text-xs font-medium",
        TONES[tone],
        className,
      )}
      {...props}
    >
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
