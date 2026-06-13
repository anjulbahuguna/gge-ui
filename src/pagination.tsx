import * as React from "react";
import Link from "next/link";
import { cn } from "./lib/cn";

// Pagination — list prev/next + a "showing X–Y of Z" range. Link-based (works in
// server components): the app supplies hrefFor(page). Neutral; presentational.
export interface PaginationProps {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
  showing?: { from: number; to: number; total: number; noun?: string };
  className?: string;
}
const BTN = "rounded border px-2.5 py-1 text-sm transition-colors";
export function Pagination({ page, totalPages, hrefFor, showing, className }: PaginationProps) {
  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  return (
    <div data-slot="pagination" className={cn("flex items-center justify-between gap-4 text-sm", className)}>
      <span className="text-muted-foreground">
        {showing
          ? showing.total === 0
            ? `No ${showing.noun ?? "results"}`
            : `Showing ${showing.from}–${showing.to} of ${showing.total}${showing.noun ? " " + showing.noun : ""}`
          : `Page ${page} of ${totalPages}`}
      </span>
      <div className="flex items-center gap-2">
        {hasPrev
          ? <Link href={hrefFor(page - 1)} className={cn(BTN, "hover:bg-muted")}>&larr; Previous</Link>
          : <span className={cn(BTN, "opacity-50")}>&larr; Previous</span>}
        {hasNext
          ? <Link href={hrefFor(page + 1)} className={cn(BTN, "hover:bg-muted")}>Next &rarr;</Link>
          : <span className={cn(BTN, "opacity-50")}>Next &rarr;</span>}
      </div>
    </div>
  );
}
