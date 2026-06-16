"use client";

import * as React from "react";
import { cn } from "./lib/cn";
import { Avatar } from "./avatar";

// AssigneeControl — the inline trigger for who owns a task. Shows the assignee
// (avatar + name) or an "Unassigned" affordance, and fires `onReassign` on click;
// the app opens its own picker. Presentational trigger only.

export interface AssigneeControlProps {
  name: string | null;
  onReassign: () => void;
  className?: string;
}

export function AssigneeControl({ name, onReassign, className }: AssigneeControlProps) {
  return (
    <button
      type="button"
      data-slot="assignee-control"
      onClick={onReassign}
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted",
        className,
      )}
    >
      {name ? (
        <>
          <Avatar name={name} className="size-6 text-[10px]" />
          <span className="text-sm text-foreground">{name}</span>
        </>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-md border border-dashed px-2 py-0.5 text-sm text-muted-foreground">
          <span aria-hidden>+</span>
          Unassigned
        </span>
      )}
    </button>
  );
}
