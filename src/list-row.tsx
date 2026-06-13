import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "./lib/cn";

// Rounded card that wraps a list of rows (hairline dividers between).
export function ListCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="list-card"
      className={cn("overflow-hidden rounded-2xl bg-card ring-1 ring-border", className)}
      {...props}
    >
      <div className="divide-y divide-border/70">{children}</div>
    </div>
  );
}

// The universal list row: leading slot + title + secondary + trailing. When
// `href` is set the whole row is a link (with a chevron).
export interface ListRowProps {
  title: React.ReactNode;
  secondary?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  href?: string;
  className?: string;
}

export function ListRow({ title, secondary, leading, trailing, href, className }: ListRowProps) {
  const inner = (
    <div className="flex items-center gap-3 px-4 py-3">
      {leading}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{title}</p>
        {secondary != null && (
          <p className="truncate text-sm text-muted-foreground">{secondary}</p>
        )}
      </div>
      {trailing}
      {href && <ChevronRight className="size-4 shrink-0 text-muted-foreground/50" />}
    </div>
  );
  return href ? (
    <Link href={href} data-slot="list-row" className={cn("block transition-colors hover:bg-muted/60", className)}>
      {inner}
    </Link>
  ) : (
    <div data-slot="list-row" className={className}>
      {inner}
    </div>
  );
}
