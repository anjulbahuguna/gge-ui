# @ggeqs/ui — Open Questions (cross-terminal)

Shared register for decisions that affect more than one GGE web app (T1 Cortex ·
T3 Paddock · later canter-public). Lives here because `@ggeqs/ui` is the one repo
every app consumes. Append new questions at the top. Mark **OPEN** / **RESOLVED**
with a date and the resolution.

---

## OQ-1 — Single common reference for the content layer · **OPEN** (raised 2026-06-13, T3)

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

**Status:** awaiting T1 discussion. No unilateral changes by T3 in the interim.
