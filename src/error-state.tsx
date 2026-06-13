import * as React from "react";
import { cn } from "./lib/cn";

// ErrorState — the destructive-toned sibling of EmptyState (a "couldn't load"
// panel). Neutral surface + destructive accent; presentational.
export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
}
export function ErrorState({ title, description, action, className, ...props }: ErrorStateProps) {
  return (
    <div data-slot="error-state" className={cn("rounded-lg border border-destructive/30 bg-destructive/5 p-8 text-center", className)} {...props}>
      <p className="font-medium text-destructive">{title}</p>
      {description && <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
