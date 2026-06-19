import * as React from "react";
import { cn } from "./lib/cn";
import { BrandPanel } from "./brand-panel";
import { Footer } from "./footer";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";

// Shared invite-accept screen for BOTH web invite pages (Paddock · Canter web),
// so the same concept renders identically — only brand + copy + landing differ.
// Presentational: the app owns auth (magic-link), the accept call, and the state
// machine; this just renders the right view for `state`. Full-screen page:
// light warm-white bg · centered card · gge-ui BrandPanel header · Footer.
//
// Security model (see docs/ONBOARDING_MODEL.md): the URL token is only a landing
// trigger; the invited EMAIL is the boundary. accept-pending returns accepted:0
// when the signed-in email matches no pending invite → `no_match` state.

const WARM_WHITE = "#FAF6EE";

export type InviteAcceptState = "email" | "sent" | "accepting" | "done" | "no_match" | "error";

export interface InviteAcceptProps {
  product: string;        // "Paddock" | "Canter"
  base: string;           // brand base color (wine / green)
  baseTop?: string;
  headline: string;       // "You've been invited to manage a barn on Paddock."
  inviteeName?: string | null; // → "Hi Jordan,"
  barnName?: string | null;    // shown on `done`
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;        // app wires signInWithOtp
  onUseDifferentEmail?: () => void;
  state: InviteAcceptState;
  busy?: boolean;
  error?: string | null;
  onContinue?: () => void;     // `done` CTA — app lands them
  continueLabel?: string;
  className?: string;
}

function Spinner({ base }: { base: string }) {
  return (
    <div
      className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-muted"
      style={{ borderTopColor: base }}
    />
  );
}

export function InviteAccept({
  product, base, baseTop, headline, inviteeName, barnName,
  email, onEmailChange, onSubmit, onUseDifferentEmail,
  state, busy, error, onContinue, continueLabel = "Continue", className,
}: InviteAcceptProps) {
  return (
    <div className={cn("flex min-h-screen flex-col", className)} style={{ background: WARM_WHITE }}>
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-black/5">
          <BrandPanel product={product} base={base} baseTop={baseTop} size="rail" />
          <div className="p-6">
            {state === "email" && (
              <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
                {inviteeName && <p className="text-sm text-muted-foreground">Hi {inviteeName},</p>}
                <p className="text-lg font-semibold leading-snug">{headline}</p>
                <p className="text-sm text-muted-foreground">
                  Enter the email this invite was sent to and we&apos;ll send a one-tap sign-in link — no password.
                </p>
                <div className="space-y-1.5">
                  <Label htmlFor="invite-email">Email</Label>
                  <Input id="invite-email" type="email" value={email} placeholder="you@barn.com"
                    onChange={(e) => onEmailChange(e.target.value)} required disabled={busy} />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy ? "Sending…" : "Email me a sign-in link"}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Only the person who received this invite can join — the link is sent to that email.
                </p>
              </form>
            )}

            {state === "sent" && (
              <div className="space-y-3 text-center">
                <p className="font-medium">Check your email</p>
                <p className="text-sm text-muted-foreground">
                  We sent a sign-in link to <span className="font-medium">{email}</span>. Open it on this device to continue.
                </p>
                {onUseDifferentEmail && (
                  <button type="button" onClick={onUseDifferentEmail} className="text-sm text-muted-foreground underline">
                    Use a different email
                  </button>
                )}
              </div>
            )}

            {state === "accepting" && (
              <div className="space-y-3 py-4 text-center">
                <Spinner base={base} />
                <p className="text-sm text-muted-foreground">Joining…</p>
              </div>
            )}

            {state === "done" && (
              <div className="space-y-3 text-center">
                <div className="text-3xl text-green-600">✓</div>
                <p className="font-medium">You&apos;re in</p>
                {barnName && (
                  <p className="text-sm text-muted-foreground">Welcome to <span className="font-medium">{barnName}</span>.</p>
                )}
                {onContinue && <Button className="w-full" onClick={onContinue}>{continueLabel}</Button>}
              </div>
            )}

            {state === "no_match" && (
              <div className="space-y-3 text-center">
                <p className="font-medium">No invite found</p>
                <p className="text-sm text-muted-foreground">
                  We couldn&apos;t find an invite for <span className="font-medium">{email}</span>. Use the email address this invite was sent to.
                </p>
                {onUseDifferentEmail && (
                  <Button variant="outline" className="w-full" onClick={onUseDifferentEmail}>Try another email</Button>
                )}
              </div>
            )}

            {state === "error" && (
              <div className="space-y-3 text-center">
                <p className="text-sm text-destructive">{error ?? "Something went wrong. Please try again."}</p>
                {onUseDifferentEmail && (
                  <Button variant="outline" className="w-full" onClick={onUseDifferentEmail}>Start over</Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
