import * as React from "react";
import { cn } from "./lib/cn";

// EmptyState — a calm "nothing here yet" panel (e.g. the Care Board's empty
// board, an unfiltered roster). Neutral; presentational. icon/action optional.
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}
export function EmptyState({ title, description, action, icon, className, ...props }: EmptyStateProps) {
  return (
    <div data-slot="empty-state" className={cn("rounded-lg border bg-muted/20 p-8 text-center", className)} {...props}>
      {icon && <div className="mb-3 flex justify-center text-muted-foreground">{icon}</div>}
      <p className="font-medium">{title}</p>
      {description && <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
