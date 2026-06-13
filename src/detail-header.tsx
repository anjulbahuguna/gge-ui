import * as React from "react";
import { cn } from "./lib/cn";
import { Avatar } from "./avatar";
import { Breadcrumbs, type Crumb } from "./breadcrumb";

// Entity detail header — composes the shared Breadcrumbs (the back-nav; do NOT
// build a second one) + avatar + title (font-display) + a status slot + an
// "at a glance" slot (e.g. reminders). Generic across entities.
export function DetailHeader({
  crumbs,
  title,
  subtitle,
  avatarName,
  status,
  actions,
  atAGlance,
  titleClassName,
  className,
}: {
  crumbs?: Crumb[];
  title: string;
  subtitle?: React.ReactNode;
  avatarName?: string;
  status?: React.ReactNode;
  actions?: React.ReactNode; // page-level action buttons (right of the header row)
  atAGlance?: React.ReactNode;
  titleClassName?: string; // override the title color (default = foreground, the
  // standard heading color; pass e.g. text-primary for a brand-tinted title)
  className?: string;
}) {
  return (
    <div data-slot="detail-header" className={cn("space-y-4", className)}>
      {crumbs && crumbs.length > 0 && <Breadcrumbs items={crumbs} />}
      <div className="flex items-center gap-4">
        {avatarName && <Avatar name={avatarName} className="size-12 text-sm" />}
        <div className="min-w-0">
          <h1 className={cn("font-display text-2xl font-semibold text-foreground", titleClassName)}>{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {(status || actions) && <div className="ml-auto flex items-center gap-2">{status}{actions}</div>}
      </div>
      {atAGlance && (
        <div className="rounded-lg bg-muted/50 px-3 py-2 text-sm text-foreground">{atAGlance}</div>
      )}
    </div>
  );
}
