import * as React from "react";
import { cn } from "./lib/cn";

// Shared roster table (OQ-1: roster lists = tables, Cortex reference). Promoted
// from app-local markup now that BOTH consoles need an identical table (the 2+
// consumer threshold). The wrapper is the canonical card shell (rounded-lg +
// border); header is bg-muted/50; rows hover + divide. Both consoles compose
// these primitives so lists can't drift apart. Neutral; brand only via --primary.
//
// Usage:
//   <Table>
//     <TableHeader><TableRow><TableHead>Name</TableHead>…</TableRow></TableHeader>
//     <TableBody>{rows.map(r => <TableRow><TableCell>{r.name}</TableCell>…</TableRow>)}</TableBody>
//   </Table>

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-wrap" className="rounded-lg border overflow-hidden">
      <table data-slot="table" className={cn("w-full text-sm", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("bg-muted/50 border-b", className)} {...props} />;
}

export function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={className} {...props} />;
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn("border-b last:border-b-0 transition-colors hover:bg-muted/30", className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return <th data-slot="table-head" className={cn("p-3 text-left text-xs font-medium text-muted-foreground", className)} {...props} />;
}

export function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td data-slot="table-cell" className={cn("p-3 align-middle", className)} {...props} />;
}
