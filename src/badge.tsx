import * as React from "react";
import { cn } from "./lib/cn";

// Status badge — shared tones for entity statuses across both consoles.
const TONES: Record<string, string> = {
  green: "bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-300",
  amber: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300",
  red: "bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-300",
  orange: "bg-orange-100 text-orange-900 dark:bg-orange-900/30 dark:text-orange-300",
  blue: "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300",
  purple: "bg-purple-100 text-purple-900 dark:bg-purple-900/30 dark:text-purple-300",
  neutral: "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-300",
  gold: "bg-gge-gold text-gge-green",
};

export function Badge({ tone = "neutral", className, ...props }:
  React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof TONES }) {
  return <span className={cn("inline-flex items-center rounded px-2 py-0.5 text-xs", TONES[tone], className)} {...props} />;
}
