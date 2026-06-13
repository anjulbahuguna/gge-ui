"use client";

import * as React from "react";
import { cn } from "./lib/cn";

// Account bar — the shared top-right account strip (Welcome + Sign Out): a new
// anatomy part, the top band of the content column. Presentational: the app
// supplies `userName` (data) + `onSignOut` (action) — look & feel only, per the
// gge-ui rule. Sign Out lives HERE, not in the rail (the rail keeps only the
// font control). `h-14` matches the Footer + rail-font bands so top + bottom
// frame the content. Neutral; brand differs only via the rail / --primary.
//
// Compose at the top of the content column, above PageShell:
//   <AccountBar userName={name} onSignOut={signOut} />
//   <PageShell>…</PageShell>
//   <Footer … />
export interface AccountBarProps extends React.ComponentProps<"div"> {
  userName: string;
  onSignOut: () => void;
  signOutLabel?: string;
}

export function AccountBar({
  userName,
  onSignOut,
  signOutLabel = "Sign out",
  className,
  ...props
}: AccountBarProps) {
  return (
    <div
      data-slot="account-bar"
      className={cn("flex h-14 shrink-0 items-center justify-end gap-4 px-6 text-sm text-foreground", className)}
      {...props}
    >
      <span>
        Welcome <span className="font-bold">{userName}</span>
      </span>
      <button
        type="button"
        onClick={onSignOut}
        className="text-muted-foreground transition-colors hover:text-foreground hover:underline"
      >
        {signOutLabel}
      </button>
    </div>
  );
}
