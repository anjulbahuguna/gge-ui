# @ggeqs/ui — adoption tracker (T1 Cortex · T3 Paddock)

The shared framework is complete — see **`CONTRACT.md`** (component APIs) and
**`SCREEN_ANATOMY.md`** (the 6-part layout). This is the per-app **adoption
status + the migration order**, so the handoff lives in a doc, not a chat.

**Latest SHA to pin: `ece748d`** (component-complete; `ee93b86` is the last
code-bearing commit, `ece748d` adds only this tracker). Ownership (CONTRACT): T1
defines the components + framework; apps choose only color (`--primary`/rail) +
which components + content.

## What's newly available (June 13, 2026)
The framework parts apps were still rolling themselves are now shared:
- **`Rail` / `NavSection` / `NavLink`** (② rail shell) — app passes color + nav items + a conditional switcher child.
- **`AccountBar`** (⑥) — `Welcome <name>` + Sign Out. **Sign Out moved OUT of the rail.**
- **`PageShell`** (④ container) + **`Table`** (rosters) — kills cream-bg / list-drift **at the source** (no app owns a content background or table markup).
- **`StatStrip` · `Segmented` · `EmptyState` · `Pagination` · `FormActions`** — content-kit fillers (OQ-2 + audit #3).
- **`ErrorState` · `DateField` · `ConfirmDialog` · `ToastProvider`/`useToast`** — error panel · date input · destructive-confirm modal (radix) · action-feedback toasts (the patterns proven in both apps / the toast gap both had).
- **`BrandPanel`** — rail box −10% height + bold 2-line byline ("Brought to you by: / Golden Gate Equestrian, LLC").

## Cortex (T1) — status
- **Pinned `ece748d`** (was `46d0021`; bumped so all new elements are available). **Rail migrated** (`ConsoleSidebar` → shared `Rail`, `2c1fe4d`). **Content convergence adopted** (cards `rounded-lg`+border, badges `rounded`). Breadcrumbs + `DetailHeader` on all console headers.
- **`AccountBar` adopted** (June 13): `ConsoleTopBar` is now a thin wrapper over the shared `<AccountBar userName onSignOut/>` — the app-local band markup is gone (text went from product-green → neutral `text-foreground`, the framework default). Build-verified against the installed `ece748d` source.
- **TODO (T1):** adopt `PageShell` + `Table` on the bespoke list pages. *Note for T1/T3:* `PageShell` hardcodes `max-w-6xl`; Cortex has narrower form pages (`max-w-2xl`) — a width prop on `PageShell` is likely needed before a clean sweep (raise as an OQ when tackled). `ErrorState`/`ConfirmDialog`/`Toast`/`DateField` available to adopt where Cortex already has those patterns (not yet swapped).

## Paddock (T3) — migration order
Re-pin `@ggeqs/ui ≥ d0d54cd`, then, in order (each additive; nothing blocks the Care Board — it shipped composed):
1. **Rail** — replace the bespoke rail with `<Rail product="Paddock" base="#6E1A2E" brandHref={home}>` + `NavSection`/`NavLink`. Steps: `CONTRACT.md` → "Migrating an app's bespoke rail onto `Rail`". Reference: Cortex `ConsoleSidebar.tsx` (`2c1fe4d`). Switcher = a conditional child (**multi-barn users only**).
2. **AccountBar** — add `<AccountBar userName onSignOut/>` at the top of the content column; **remove Sign Out from the rail.**
3. **PageShell + Table** — wrap content pages in `<PageShell>` (drop the per-page cream-bg wrappers); rosters → the shared `<Table>`. **This retires the cream surface + stray `font-serif` at the source** (closes the OQ-1 follow-up).
4. **Care Board** — swap the ad-hoc Badge-row → `<StatStrip items=…/>`, the button-row → `<Segmented options value onChange/>`; empty board → `<EmptyState>`; long lists → `<Pagination>`.
5. **Strip leftover `font-serif`** in any screen markup (titles already neutral via the shared components).

## Open questions
- `OQ-1` (content reference) — RESOLVED; source-fix shipped (`PageShell`/`Table`).
- `OQ-2` (StatStrip/Segmented) — RESOLVED; shipped `08606fe`.
- Cortex-local `Dialog`/`Popover`/`Command`/`Textarea` — promote on a 2nd consumer (not speculatively).
