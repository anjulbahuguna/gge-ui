# Handoff: @ggeqs/ui — GGE Console Design System

## Overview
A design-system gallery for **@ggeqs/ui**, the shared UI package consumed by Golden
Gate Equestrian's two web consoles — **Cortex** (T1) and **Paddock** (T3). The
gallery showcases every primitive, themed for both consoles side by side, so the
package's look-and-feel is documented in one place. The actual package is a
source-shipped git dependency (Tailwind v4 · Next 16 · React 19 · shadcn primitives);
this gallery is the visual reference for what those components should render to.

## About the Design Files
The file in this bundle (`GGE UI Kit.dc.html`) is a **design reference created in
HTML** — a static prototype showing the intended look of every `@ggeqs/ui` component.
It is **not** production code to copy directly. The task is to recreate these
specimens as the real `@ggeqs/ui` React/Tailwind components, following the
package's existing contract (see `spec/` in this bundle, which is the source of
truth) and the codebase's established shadcn + cva patterns.

The four markdown specs in `spec/` (`CONTRACT.md`, `SCREEN_ANATOMY.md`,
`ADOPTION.md`, `OPEN_QUESTIONS.md`, `README.md`) are the canonical package
documentation — **they win over this gallery if anything drifts.** The gallery
visualizes them; it does not redefine them.

## Fidelity
**High-fidelity.** Final colors, typography (Geist), spacing, radii, and component
states are all specified below with exact values. Recreate pixel-faithfully using
the codebase's shadcn primitives and Tailwind v4 tokens — do **not** re-roll markup
that the package already owns.

Two caveats from how the gallery was built:
- It is a **static layout reference** — interactions (Segmented switching,
  edit-in-place toggling, dialog open/close, toasts) are shown in fixed visual
  states, not wired. Behavior is described under **Interactions** below.
- Content is **generic placeholder labels** ("Placeholder name", "Category A",
  "Field label"). Real copy comes from the consuming app (the package is
  presentational — data arrives as props).

## Design Tokens (exact)

### GGE brand
| Token | Hex | Use |
|---|---|---|
| GGE Green | `#1A2E1A` | Cortex rail (`base`) |
| GGE Gold | `#C9A84C` | Cortex `--primary`; active nav fill (both rails) |
| GGE Wine | `#6E1A2E` | Paddock rail + Paddock `--primary` |
| Cream | `#F4EFE3` | **retired** content surface (do not use — content is neutral) |

### Neutral base (shadcn)
| Token | Hex |
|---|---|
| `--background` | `#FFFFFF` |
| `--foreground` | `#252525` |
| `--muted` | `#F5F5F5` |
| `--muted-foreground` | `#737373` |
| `--border` | `#E5E5E5` |
| `--destructive` | `#DC2626` |
| page canvas (gallery chrome only) | `#FAF9F7` |

### Per-console mapping
- **Cortex:** `--primary` = gold `#C9A84C`; primary button text = green `#1A2E1A`; rail = green `#1A2E1A`.
- **Paddock:** `--primary` = wine `#6E1A2E`; primary button text = white; rail = wine `#6E1A2E`.
- Content surface is **always neutral** for both — brand shows only in the rail + `--primary`.

### Typography
- Family: **Geist** (`--font-sans`); **Geist Mono** for captions/code/metadata.
- `--font-display` (title hook) **defaults to the sans stack** — both consoles use sans today.
- Scale: Page title 30/600 (-0.5 tracking) · Section heading 24/600 (-0.3) · Card title 16–18/500–600 · Body 14/400 (1.6 line-height) · Caption 12 mono.

### Radius & elevation
- `sm` 4px (badges) · `lg` 8px (cards, inputs, buttons) · `full` 9999px (avatars only).
- Card border: solid `1px var(--border)`, radius 8px (the converged "Cortex reference" shell).
- Modal shadow: `0 18px 50px rgba(0,0,0,0.25)`; toast: `0 8px 24px rgba(0,0,0,0.08)`.

## Components (maps to the package export API)

### Primitives
- **Button** — height 36 (default), 32 (sm), 42 (lg); radius 8; font 500. Variants: `primary` (filled `--primary`), `secondary` (`#F5F5F5`), `outline` (1px border, white), `ghost` (transparent), `link` (`--primary`, underline 3px offset), `destructive` (`#DC2626`/white). Supports `asChild`.
- **Badge** — radius 6 (`rounded`, **not** pill); padding `3px 9px`; 12/500. Tones tint bg ~10–20% + colored text: active(green), pending(gold `#7a651d` text), flagged(wine), neutral(`#525252`), overdue(red `#b91c1c`). `dot` opt-in (6px circle), **off by default**.
- **Card** (+ Header/Title/Description/Action/Content/Footer) — 8px radius, 1px border; footer row `#FAFAFA` with right-aligned actions.
- **Input / Label** — height 38; radius 8; 1px border; focus = 2px `--primary` border; disabled = `#F5F5F5` bg + muted text. Label 13/500.

### Forms
- **FormField** `as="input"|"select"|"combobox"` — option lists are **props** (`items`/`suggestions`); no fetching in the package. Combobox shows a suggestion dropdown (1px border, `0 6px 18px` shadow, active row `#F5F5F5`).
- **DateField** — input-shaped with a trailing calendar glyph.
- **FormActions** — right-aligned Cancel (outline) + Save (primary) row.

### Chrome / wayfinding
- **BrandLockup** — crest roundel (44px, 1.5px brand-color border, "GGE" mono letterspaced) + product name + "Golden Gate Equestrian" subtitle.
- **BrandPanel** (①) — embossed rail header on `base` color: crest + product wordmark (white, 19/600) + 2-line byline "Brought to you by: / **Golden Gate Equestrian, LLC**" at ~`rgba(255,255,255,0.5–0.72)`.
- **Breadcrumbs** — 12.5px muted, `/` separators at 0.5 opacity, current crumb `--foreground`/500.
- **DetailHeader** (③) — composes Breadcrumbs + Avatar(48) + title (24/600, default `text-foreground`; `titleClassName` tints) + status Badge slot + right-aligned `actions` slot ("+ New Record"). **Do not build a second breadcrumb.**
- **AccountBar** (⑥) — top band of content column, `h-14`, right-aligned `Welcome, <name>` + Sign Out (outline). Presentational: `userName` + `onSignOut`. **Sign Out lives here, not in the rail.**
- **Footer** (⑤) — `h-14`, `© 2026 Golden Gate Equestrian` + Privacy/Terms links tinted in the **product color**.
- **FontSizeControl** — segmented `A− / A / A+` (active = `#F5F5F5` fill); persisted via `FontScaleProvider`. Lives in the rail footer.

### Navigation
- **Rail** (②) — `base`-colored column composing BrandPanel + nav (`NavSection` mono uppercase labels + `NavLink`) + FontSizeControl footer. **Active NavLink = solid gold `#C9A84C` fill** (treatment A) with dark text — on both green and wine rails. App passes `product`, `base`, `brandHref`, nav children, and an optional **switcher as a conditional child** (multi-barn only — Paddock shows a "Barn — North ▾" pill). Inactive links `rgba(255,255,255,0.78)`.

### Content kit
- **EditableSection** — read↔edit section card (8px/border). Read: header (15/500 title) + "Edit" action in `--primary` + `FieldGrid`. Edit: `FormField`s + `FormActions` footer on `#FAFAFA`.
- **FieldGrid / ReadField** — 2-col label(12/muted)/value(14) grid.
- **SectionHeader** — neutral `text-foreground`/500/sans (tint via prop only — no `--primary`, no `font-display`).
- **PlaceholderSection** — dashed 1px border, centered "coming soon".
- **Avatar** — `full` radius; initials (muted bg `#F0EDE6` / or brand bg) or image; sizes 32 & 40.
- **ListCard / ListRow** — *legacy*; rosters use **Table** instead.

### Data display
- **Table** (+ Header/Body/Row/Head/Cell) — wrapper 8px radius + border; header `#FAFAFA`, 11.5–12/500 muted; rows divide 1px + hover; cells composed individually; status cells hold Badges; trailing `›`. **Rosters = tables** (Cortex reference) — no app-local table markup.
- **StatStrip** — row of metric chips (each 8px/border card): big value (24/600, tone-colored) + small muted label. Tones: open(green/wine `--primary`), done(neutral), overdue(red), order-soon(gold).
- **Segmented** — controlled view switcher; muted `#F5F5F5` track (radius 9, 3px pad), active segment lifted white with `0 1px 2px` shadow.
- **Pagination** — link-based; 32px square cells, 8px radius; active = `--primary` fill; `‹ … ›` controls; `hrefFor`.
- **EmptyState** — 8px/border card, centered: 40px circle outline + title(14/500) + muted desc + primary action.
- **ErrorState** — same, with destructive-tinted border + `rgba(220,38,38,0.1)` icon circle + outline Retry.

### Interaction
- **ConfirmDialog** — controlled destructive-confirm modal (radix-backed). Overlay `rgba(20,20,20,0.4)`; card 380px, 12px radius, `0 18px 50px` shadow; title(17/600) + muted body + Cancel(outline)/Delete(destructive).
- **ToastProvider / useToast** — `toast({title, description?, tone})`, no external dep, wrap app once. Card: 10px radius + border + `0 8px 24px` shadow; leading 8px tone dot (success=green, warning=gold `#7a651d`, error=red); title 13.5/500 + muted desc.

## Screen Anatomy (the six parts)
Both consoles compose identically: **① BrandPanel · ② Rail** (= the rail) and
**⑥ AccountBar · ③ DetailHeader · ④ PageShell · ⑤ Footer** (= the content column).
- **PageShell** (④) = the neutral container: `bg-background` + `min-h-screen` + centered `max-w-6xl` column + `p-8` + `space-y-6`. **No app owns its content background.** (Note from ADOPTION.md: Cortex has narrower `max-w-2xl` form pages — a width prop on PageShell is likely needed before a clean sweep; raise as an OQ.)
- AccountBar (`h-14`) and Footer (`h-14`) frame the content column top and bottom.
- The assembled mini-consoles in the gallery (section 09) show this for both Cortex and Paddock.

## Interactions & Behavior (to wire when implementing)
- **Rail NavLink active** — computed by the app via route match; active = gold fill.
- **Segmented** — controlled (`value` + `onChange`), client component, toggles the content view (Today / By horse / By assignee).
- **EditableSection** — read↔edit toggle; `action` = a server action `(prev, FormData) => { error? }` that revalidates/redirects on success; non-editable sections omit `action`.
- **ConfirmDialog** — controlled open state; confirm triggers the destructive server action.
- **Toast** — fired from actions for feedback.
- **FontSizeControl** — adjusts a scale persisted per user (`FontScaleProvider`).
- **Sign Out** — `onSignOut` from AccountBar.

## State Management
The package is **presentational only** — all state and data fetching live in the
consuming app (Supabase / Cortex API / seeded `app_settings`). Components take data
as props (`userName`, `onSignOut`, `items`, `suggestions`, `value`/`onChange`, the
server `action`). No data layer or API client ships in `@ggeqs/ui`.

## Assets
- **Crest:** a simple circular roundel with "GGE" letterspaced in Geist Mono (no
  raster asset) — replace with the real GGE crest SVG if one exists in the brand system.
- **Avatar images / placeholders:** striped placeholder swatch in the gallery; real
  app supplies image URLs or falls back to initials.
- No other imagery.

## Files
- `GGE UI Kit.dc.html` — the design-reference gallery (open in a browser to view).
- `spec/CONTRACT.md` — **canonical** export API + evolution rules.
- `spec/SCREEN_ANATOMY.md` — the 6-part layout.
- `spec/ADOPTION.md` — per-app adoption status + migration order (latest SHA `ece748d`).
- `spec/OPEN_QUESTIONS.md` — resolved cross-terminal decisions (OQ-1 content reference, OQ-2 StatStrip/Segmented).
- `spec/README.md` — package consumption (git dep, pin SHA, transpile, Tailwind v4 source registration).
