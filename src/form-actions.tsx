import * as React from "react";
import { cn } from "./lib/cn";

// FormActions — the save/cancel button row at the bottom of a create/edit form.
// The app puts <Button>s as children; this just standardizes spacing/placement.
export function FormActions({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="form-actions" className={cn("flex items-center gap-2 pt-2", className)} {...props}>
      {children}
    </div>
  );
}
