# GGE console — screen anatomy (canonical)

The shared layout for every GGE web console (Cortex + Paddock). Ratified June 13, 2026 (T1 ↔ T3). Both consoles compose these five parts from `@ggeqs/ui`; the brand differs only by `--primary` (+ the rail color).

```
┌───────────────┬──────────────────────────────────────┐
│ ① BrandPanel  │  ③ DetailHeader                       │
│   crest +     │     Breadcrumbs · Title · status/actions│
│   product +   ├──────────────────────────────────────┤
│   byline      │                                      │
│ ───────────── │  ④ Content                            │
│ ② Rail / nav  │     (the shared content vocabulary)   │
│   switcher    │                                      │
│   nav links   │                                      │
│   sign-out    ├──────────────────────────────────────┤
│   FontSize    │  ⑤ Footer                             │
└───────────────┴──────────────────────────────────────┘
   rail = ①②                content = ③④⑤
```

## The five parts → owning component

| # | Part | Component(s) | Notes |
|---|------|--------------|-------|
| ① | **Brand panel** | `BrandPanel` | Embossed rail header: crest · product wordmark · "Brought to you by" byline. `base` = brand color (Cortex green / Paddock wine). |
| ② | **Rail / navigation** | app-owned (uses `FontSizeControl`, `Breadcrumbs` not here) | Barn switcher + nav links + footer strip (sign-out, `FontSizeControl`). The rail is the brand surface — Paddock wine, Cortex green. |
| ③ | **Page header** | `DetailHeader` (composes `Breadcrumbs`) | Breadcrumbs (wayfinding) + title (`font-display`) + `status` slot + `actions` slot ("+ New X" buttons, title-cased). Title color default = `foreground`; pass `titleClassName` to tint. |
| ④ | **Content** | the content vocabulary: `EditableSection`, `ListCard`/`ListRow`, `FieldGrid`/`ReadField`, `FormField`, `PlaceholderSection`, `Card`, `Badge`, `Avatar`, `SectionHeader` | See note 1 — this is the **available** vocabulary, not a mandate. |
| ⑤ | **Footer** | `Footer` | "© GGE · Privacy · Terms", `color` = product color; pinned at the bottom of the content column. |

## Two important framings

**Note 1 — ④ is the shared content *vocabulary available*, not a uniform layout.** Both consoles compose ①②③⑤ identically. ④ is where they diverge: **Cortex's content is still bespoke** (admin tables + `Card`/`Input`/`Label`) and adopts the shared content kit (`EditableSection`/`ListRow`/`FieldGrid`/…) only on a future refactor, per screen. **Paddock** is fully on the shared kit. So "shared" means the *vocabulary* is one source; which screens use it is each app's call.

**Note 2 — `@ggeqs/ui` is presentational only.** Components take **data as props**; the **app owns all fetching** (Supabase/Cortex API, seeded `app_settings`, etc.). No data layer or API client lives in the package — e.g. `FormField` takes `items`/`suggestions` as props; the app fetches them. This keeps the package a pure design system.

## Theming (token-driven)
Same components, different brand via token *values*:
- **Cortex console** — neutral base + **gold** `--primary` + Geist sans.
- **Paddock** — rail (①②) is **wine**; content (③④) adopts the **neutral base + Geist sans** (identical to Cortex) with **wine** `--primary` as the only accent override.
- `--font-display` is the title-font hook (defaults to sans; both use sans today; available if a serif is ever wanted).
