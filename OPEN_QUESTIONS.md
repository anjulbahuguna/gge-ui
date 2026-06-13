# @ggeqs/ui — Open Questions (cross-terminal)

Shared register for decisions that affect more than one GGE web app (T1 Cortex ·
T3 Paddock · later canter-public). Lives here because `@ggeqs/ui` is the one repo
every app consumes. Append new questions at the top. Mark **OPEN** / **RESOLVED**
with a date and the resolution.

---

## OQ-2 — Two content elements the Care Board needs · **OPEN** (raised 2026-06-13, T3)

**Owners:** T1 (defines shared components) · T3 (flagged the need from the board-as-home)

The Care Board (Paddock, shipped) composes two UI elements that aren't shared
components yet — built ad-hoc from `Badge`/`Button` for now. They should be
canonicalized so Cortex reuses them too (the board is the first consumer; both
recur on any dashboard). Per `CONTRACT.md`: new shared elements go through T1;
either terminal may flag the need — this is T3 flagging it.

1. **`StatStrip`** — a horizontal rollup row of metric chips (the board's
   `open` / `done` / `overdue` / `order-soon`). Proposed API:
   `<StatStrip items={[{label, value, tone}]} />` (or a container + `Stat` items).
   *Current ad-hoc:* a flex row of tone'd `Badge`s.
2. **`Segmented`** — a segmented view switcher (the board's Today / By-horse /
   By-assignee). Proposed API: `<Segmented options={[{value,label}]} value onChange />`
   (client component). *Current ad-hoc:* a row of buttons toggling local state.

**Ask:** T1 canonicalize these two (additive to `@ggeqs/ui`); T3 swaps the ad-hoc
versions on the board once they land. **Neither blocks the board** — it shipped
with the composed versions.

**Status:** awaiting T1.

---

## OQ-1 — Single common reference for the content layer · **RESOLVED** 2026-06-13 (Anjul, visual pick)

**Owners:** T1 (brand/tokens) + T3 (component structure/API)

**Constraint (from Anjul):** GGE web apps should share one common look & feel drawn
from a single reference. Anjul's stated preference is to keep **Cortex's current
look**. Do not change Cortex to achieve parity — everything else conforms to it.

**Observation:** Paddock and Cortex render differently in their content areas today,
despite the shared `@ggeqs/ui` package.

**What is / isn't common, factually:**
- **Chrome + primitives** (`BrandPanel`, `Footer`, `Button`, `Card`, `Input`,
  `Label`, `Breadcrumbs`, `Badge`) — both apps import these from `@ggeqs/ui`. They match.
- **Content layer** (`ListCard`, `SectionHeader`, `DetailHeader`, `EditableSection`;
  plus Paddock-local `HubCard`) — used by Paddock only. Cortex renders its own
  bespoke content. So the content layer is not common in practice.

**Concrete differences:**

| | Paddock | Cortex |
|---|---|---|
| Cards | `rounded-2xl` + `ring-1` | `rounded-lg` + `border` |
| Section titles | wine `text-primary`, `font-display`, semibold | neutral foreground, `font-medium` |
| Column | `max-w-5xl`, `px-8 py-7` | `max-w-6xl`, `p-8` |

**Ownership context:** per `CONTRACT.md`, T1 owns brand/tokens; T3 owns component
structure/API. The differences above span both token-level and component-level.

**Open question:** How should the single common reference for the content layer be
established, and how should the two apps converge on it?

**Resolution (Anjul, visual pick on the Cortex console):** Cortex's current look is
the canonical reference. The single content-layer reference:
- **Card shell:** `rounded-lg` + `border` (8px radius, solid 1px border) — Cortex's
  majority / the Barn Hub `SectionCard`. The shared `Card` and all content cards
  converge to this (drop `rounded-xl`/`ring` and Paddock's `rounded-2xl`).
- **Status pill (`Badge`):** `rounded` (NOT `rounded-full`); no dot by default.
- **Section titles (`SectionHeader`):** neutral `text-foreground`, `font-medium`,
  sans — no `text-primary` tint / no `font-display` (same call as the `DetailHeader`
  title). Apps opt into a tint via prop only.
- **Roster lists:** **tables** (the Cortex pattern), not list-cards. Paddock's
  `ListCard`/`RosterRow` roster lists converge to tables.
- **Column:** `max-w-6xl`, `p-8`.
- `EditableSection` / `FieldGrid` / `ReadField` / `PlaceholderSection` / `FormField`
  inherit the card shell + neutral titles + shared `Input`/`Label`. `Avatar` unchanged.
- Brand differs only by `--primary` + the rail.

**Convergence (who does what):**
- **T3 (component structure):** update the shared content components' defaults to the
  spec above (`Card` → A; `Badge` → `rounded`; `SectionHeader` → neutral; roster
  screens → tables). Announce a SHA.
- **T1 (tokens):** the reference maps to existing tokens (`--radius` lg, `border`,
  `--font-display` already sans) — no new tokens needed. Cortex = the reference,
  unchanged; re-pins to adopt the converged shared components for dedup over time.

**Follow-up (June 13) — fix the remaining divergence at the SOURCE, not per-screen.**
After the component convergence, Paddock still read warm. Audit: the leftover
warmth was **app-level** (page background still cream; stray `font-serif` in
screens) — *not* in any shared component, because **the container + the list were
still left to each app**. Treating that per-screen is whack-a-mole. The fix is to
**define those as common elements** (T1):
- **`PageShell`** (the ④ container) + **`Table`** primitives shipped in `@ggeqs/ui`
  `5848b6f`. Apps now compose them → **no app owns a content background or table
  markup**, so cream/list-drift can't recur.
- **Ownership (Anjul):** *T1 defines the UI components + framework; apps choose only
  color (`--primary`/rail) + which components + content.* See `CONTRACT.md`.
- App task: compose `PageShell` (drop per-page `bg-*` wrappers) + `Table` for
  rosters; the surface/serif then come from the shared elements, not the screen.
