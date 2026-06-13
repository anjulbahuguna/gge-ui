import * as React from "react";
import { cn } from "./lib/cn";

// Circular initials avatar — brand-primary surface (wine / gold per app).
export function Avatar({
  name,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { name: string }) {
  const initials =
    (name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("") || "?").toUpperCase();
  return (
    <div
      data-slot="avatar"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground",
        className,
      )}
      {...props}
    >
      {initials}
    </div>
  );
}
