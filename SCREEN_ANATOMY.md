# GGE console — screen anatomy (canonical)

The shared layout for every GGE web console (Cortex + Paddock). Ratified June 13, 2026 (T1 ↔ T3). Both consoles compose these **six parts** from `@ggeqs/ui`; the brand differs only by `--primary` (+ the rail color). Apps choose only: their color · which components · the content.

```
┌───────────────┬──────────────────────────────────────────┐
│ ① BrandPanel  │  ⑥ AccountBar      Welcome <name> · Sign out│  ← top band (h-14)
│   crest +     ├──────────────────────────────────────────┤
│   product +   │  ③ DetailHeader   Breadcrumbs·Title·actions │
│   byline      │  ┌─ ④ PageShell (neutral · max-w-6xl · p-8) ─┐│
│ ───────────── │  │   content: Table / Card / forms /        ││
│ ② Rail / nav  │  │   EditableSection / FieldGrid / …        ││
│   switcher    │  └──────────────────────────────────────────┘│
│   nav links   ├──────────────────────────────────────────┤
│   FontSize    │  ⑤ Footer                                  │  ← bottom band (h-14)
└───────────────┴──────────────────────────────────────────┘
   rail = ①②                 content column = ⑥③④⑤
```

## The six parts → owning component

| # | Part | Component(s) | Notes |
|---|------|--------------|-------|
| ① | **Brand panel** | `BrandPanel` | Embossed rail header: crest · product wordmark · "Brought to you by" byline. `base` = brand color (Cortex green / Paddock wine). |
| ② | **Rail / navigation** | **app-owned** (uses `FontSizeControl`) | Barn switcher + nav links + a footer strip with **`FontSizeControl` only** (Sign Out moved to ⑥). The rail is the brand surface — Paddock wine, Cortex green. *(Gap: the rail shell + nav-link styling are not yet a shared element — see OQ.)* |
| ⑥ | **Account bar** | `AccountBar` | Top band of the content column: `Welcome <name>` + Sign Out, right-aligned, `h-14`. **Presentational** — app passes `userName` + `onSignOut`. **Sign Out lives here, not in the rail.** |
| ③ | **Page header** | `DetailHeader` (composes `Breadcrumbs`) | Breadcrumbs (wayfinding) + title (`font-display`, default `text-foreground`; `titleClassName` to tint) + `status` slot + `actions` slot ("+ New X", title-cased). |
| ④ | **Content** | **container: `PageShell`** · the content vocabulary: **`Table`** (rosters), `Card`, `Badge`, `Avatar`, `SectionHeader`, `EditableSection`, `FieldGrid`/`ReadField`, `FormField`, `PlaceholderSection` | `PageShell` = the neutral surface + `max-w-6xl` column + `p-8` (no app owns its content background). See note 1. |
| ⑤ | **Footer** | `Footer` | "© GGE · Privacy · Terms", `color` = product color; pinned at the bottom of the content column, `h-14` (frames with ⑥). |

## Two important framings

**Note 1 — ④ is the shared content *vocabulary available*, on a single LOOK reference (OQ-1, resolved 2026-06-13).** Both consoles compose the chrome (①②⑥③⑤) identically. ④ is the shared vocabulary; **which screens use it is each app's call** — Cortex's content is partly bespoke and adopts the shared kit on per-screen refactor; Paddock is fully on the shared kit. The **content look = one reference (Cortex's)**: shared components render to it by default — **`PageShell` neutral surface; Card shell `rounded-lg` + `border`; `Badge` `rounded` (dot opt-in, off); `SectionHeader` neutral `text-foreground`/`font-medium`/sans (tint via prop only); rosters use the shared `Table`; column `max-w-6xl`/`p-8`**. Interactive accents (links/actions) keep `--primary`. *(`ListCard`/`ListRow` predate the rosters→tables decision — use `Table` for rosters; `ListCard` is legacy pending a cleanup call.)* See `OPEN_QUESTIONS.md` OQ-1.

**Note 2 — `@ggeqs/ui` is presentational only.** Components take **data as props**; the **app owns all fetching** (Supabase/Cortex API, seeded `app_settings`, etc.). No data layer or API client lives in the package — e.g. `FormField` takes `items`/`suggestions` as props, `AccountBar` takes `userName`/`onSignOut`. A pure design system.

## Theming (token-driven)
Same components, different brand via token *values*:
- **Cortex console** — neutral base + **gold** `--primary` + Geist sans.
- **Paddock** — rail (①②) is **wine**; content (⑥③④⑤) adopts the **neutral base + Geist sans** (identical to Cortex) with **wine** `--primary` as the only accent override.
- `--font-display` is the title-font hook (defaults to sans; both use sans today; available if a serif is ever wanted).

## Known gaps (not yet shared — divergence room)
- **② Rail / nav** is app-owned (Cortex `ConsoleSidebar` vs Paddock rail) — the largest remaining un-shared part.
- No shared **form shell / action-row**, **`Pagination`**, or **`EmptyState`** yet.
- `Dialog`/`Popover`/`Command`/`Textarea` are Cortex-local (promote on a 2nd consumer).
- `ListCard`/`ListRow` overlap with `Table` (rosters → `Table`); `ListCard`'s role pending a call.
