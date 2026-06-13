# @ggeqs/ui — Open Questions (cross-terminal)

Shared register for decisions that affect more than one GGE web app (T1 Cortex ·
T3 Paddock · later canter-public). Lives here because `@ggeqs/ui` is the one repo
every app consumes. Append new questions at the top. Mark **OPEN** / **RESOLVED**
with a date and the resolution.

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
