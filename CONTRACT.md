# @ggeqs/ui — shared-package contract (T1 Cortex ↔ T3 Paddock)

This package is a **shared boundary**: a change here can break *either* console.
This contract governs how we evolve it without breaking each other.

## Repo & naming
- GitHub: **`github:<owner>/gge-ui`** — **public** (UI only, no secrets → Vercel
  resolves it with no deploy-token setup).
- Package name: **`@ggeqs/ui`**.

## Versioning — pin a SHA, never `#main`
- Consumers depend on a **commit SHA**: `"@ggeqs/ui": "github:<owner>/gge-ui#<sha>"`.
- `#main` is banned — a push here would silently change a consumer's next deploy.
- **Bump protocol:** edit → push → announce the new SHA → each consumer bumps its
  pin when ready. Not forced lockstep — but a **breaking change must update both
  consumers together** (and bump `version` in `package.json`).

## Export API (v0.1.0) — additive-safe
**Canonical list = `src/index.ts`** (this prose mirrors it — if they drift, `index.ts` wins). Subpaths: `@ggeqs/ui/theme.css` · `@ggeqs/ui/tokens`.
- **Tokens/utils:** `GGE`, `cn`
- **Primitives:** `Button`, `buttonVariants`, `Badge`, `Card` (+ `CardHeader/Footer/Title/Action/Description/Content`), `Input`, `Label`
- **Wayfinding/chrome:** `Breadcrumbs`, `BrandLockup`, `BrandPanel`, `Footer`, `FontScaleProvider`/`useFontScale`/`FontSizeControl`
- **Layout / framework:** **`Rail`** (② — + `NavSection`/`NavLink`) · `AccountBar` (⑥) · `DetailHeader` (③) · **`PageShell`** (④ container) · **`Table`** (+ `TableHeader/Body/Row/Head/Cell`)
- **Content kit:** `EditableSection`, `FieldGrid`/`ReadField`, `FormField`, `PlaceholderSection`, `SectionHeader`, `Avatar`, **`StatStrip`** (metric-chip rollup), **`Segmented`** (view switcher), `ListCard`/`ListRow` *(legacy — rosters use `Table`)*
- **Additive** (new exports/components/tokens) = safe, just announce the SHA.
- **Rename/remove/signature change** = breaking → coordinate + version bump.
- `Button/Card/Input/Label` are the **canonical shadcn primitives** — promoted
  from Cortex (full shadcn surface: `Button` supports `asChild` + all
  variants/sizes). Don't keep app-local forks; import from here.
- `Breadcrumbs` is the **canonical back-nav / wayfinding** element (`items:
  {label, href?}[]`, server-safe via `next/link`). **`DetailHeader` composes
  it — do NOT build a second breadcrumb.** Adds `next` as a peerDependency.

### Detail/edit layout primitives (T3, June 12 — additive)
The shared detail/edit page model (Paddock uses now; Cortex adopts on refactor):
- **`DetailHeader`** — composes `Breadcrumbs` + `Avatar` + title (`font-display`) + status slot + **`actions` slot** (page-level buttons) + at-a-glance slot. **Title color default = `text-foreground`** (the standard heading color — Cortex needs no override); pass **`titleClassName`** (e.g. `text-primary`) for a brand-tinted title. *(June 12: default changed from `text-primary` — re-pinning consumers get foreground titles unless they pass `titleClassName`.)*
- **`EditableSection`** — read↔edit-in-place section card. `action` = a server action `(prev, FormData) => { error? }` (revalidate/redirect on success); `editFields` = the form; non-editable sections omit `action` + pass `headerAction`.
- **`FieldGrid` + `ReadField`** — read-mode label/value grid.
- **`FormField`** — labeled edit field; `as="input"|"select"|"combobox"`, **option lists passed in as props** (`items` / `suggestions`) — **no data fetching in the package** (the app fetches seeded `app_settings` etc.).
- **`PlaceholderSection`** — "coming soon" section.
- **`Avatar`, `SectionHeader` (uses `font-display`), `ListCard`/`ListRow`** — promoted from Paddock-local; token-driven. **Don't keep app-local forks.**
- **`Badge` gained `dot`** — the former Paddock `Pill` reconciles INTO `Badge` (one status chip; `<Badge tone dot>`). Shape is `rounded` (OQ-1 Cortex reference); **`dot` is opt-in, OFF by default**.
- All token-driven (`--primary`, `--font-display`, surface/border tokens); warmth lives in each app's **token values**, not the components.

### Content shell + table (T1, June 13 — additive)
The **container + the list** — the two parts that were still left to each app, where divergence crept in (page background → Cortex white vs Paddock cream; table markup re-rolled per app). Defined once so apps own neither:
- **`PageShell`** — the anatomy ④ container: neutral `bg-background` + `min-h-screen` + centered `max-w-6xl` column + `p-8` + `space-y-6`. Apps wrap each page in it → **no app owns its content background** (an app can't render cream content — it doesn't set the surface). Brand only via the rail; content is always neutral.
- **`Table` / `TableHeader` / `TableBody` / `TableRow` / `TableHead` / `TableCell`** — the canonical roster table (OQ-1: lists = tables, Cortex reference; promoted now that **both** consoles need it). Wrapper = `rounded-lg`+border; header `bg-muted/50`; rows hover + divide; composed cell-by-cell. Replaces app-local table markup.
- **`AccountBar`** — a **new anatomy part**: the top-right account strip (`Welcome <name>` + Sign Out), the top band of the content column (`h-14`, matches the Footer). **Presentational** — the app passes `userName` (data) + `onSignOut` (action). **Sign Out lives HERE, not in the rail** — the rail keeps only the font control. Compose: `<AccountBar/>` then `<PageShell/>` then `<Footer/>` in the content column. Both consoles compose it; brand differs only via the rail/`--primary`.
- **`Rail` / `NavSection` / `NavLink`** (②) — the shared rail shell. Composes `BrandPanel` + scrollable nav + a font-control footer (Sign Out is NOT here — it's `AccountBar`). The app passes only: `product` · `base` (rail color: green/wine) · `brandHref?` (brand → home link) · the nav (`NavSection`/`NavLink` children) · a **switcher as a conditional child** (e.g. multi-barn only). `NavLink` active = solid gold fill (treatment A); `active` is computed by the app (route match).

  **Migrating an app's bespoke rail onto `Rail` (for T3 / Paddock):**
  1. Re-pin `@ggeqs/ui` to `≥46d0021`.
  2. Replace the bespoke `<aside>` rail with:
     ```tsx
     <Rail product="Paddock" base="#6E1A2E" brandHref={paddockHome}>
       {multiBarn && <YourSwitcher />}            {/* switcher ONLY for multi-barn users */}
       <NavSection>{items.map(i => <NavLink key={i.href} href={i.href} label={i.label} active={isActive(i.href)} />)}</NavSection>
       <NavSection label="…">…</NavSection>
     </Rail>
     ```
  3. Delete the app's local nav-link, the `BrandPanel`/footer rendering, and the `<aside>` — `Rail` provides them. Keep your route→`active` logic.
  4. **Reference implementation:** Cortex `src/components/console/ConsoleSidebar.tsx` (commit `2c1fe4d`) — same migration, green base.

### OQ-1 content-layer convergence (resolved 2026-06-13 — see `OPEN_QUESTIONS.md`)
The content components' default look = the **Cortex reference**: `Card` shell `rounded-lg` + `border`; `Badge` `rounded` (dot off); `SectionHeader` neutral `text-foreground`/`font-medium`/sans (tint via `className` only); `ListCard`/`EditableSection`/`PlaceholderSection` shells `rounded-lg` + `border`; roster lists are **tables** (app-local markup, not a shared `Table`); column `max-w-6xl`/`p-8`. Interactive accents (links/actions, e.g. the `EditableSection` "Edit") keep `--primary`. `Avatar` unchanged. Cortex re-pins to adopt these (its shadcn form cards converge to `rounded-lg` + `border` = the intended consistency fix).

## Theme & typography (shipped by `@ggeqs/ui/theme.css`)
- `theme.css` ships the **shadcn base theme** (`--background/--card/--primary/
  --border/--radius/…` in `:root` + `.dark`, bound to utilities via `@theme
  inline`). Apps **override only their product specifics** — e.g. the Cortex
  console scopes `--primary` to gold, Paddock to wine. Don't re-declare the base
  in app CSS (it would drift).
- **Typography:** the agreed UI font is **Geist**, exposed as `--font-sans` in
  `theme.css` (single source of truth for "what font"). Each app still loads
  Geist via `next/font` (build-time optimized) and sets `--font-sans` on
  `<html>`; the theme value is the documented family + fallback. Changing the
  GGE font happens **here**.
- **Title font — `--font-display`** (→ the `font-display` utility): the
  section/detail title face used by the title components (`DetailHeader`,
  `SectionHeader`). **Defaults to the sans stack** (`var(--font-sans)`); **both
  consoles use sans today** (Paddock's content went neutral/sans). The hook
  stays available if a product ever wants a serif title (override per app, same
  `<html>` pattern as `--font-sans`). T1 owns the token + default. See
  `SCREEN_ANATOMY.md`.

## Ownership (clarified by Anjul, June 13)
**T1 defines the UI components + the framework** — the shared element set, how
they compose (the screen anatomy), and `tokens.ts` + `theme.css` (the GGE brand).
**Apps choose only three things: their color (`--primary` + the rail) · which
components to use · the content.** Apps do **not** define UI elements or own page
surfaces — which is precisely why divergence has no room (no app owns a content
background or re-rolls table markup; it composes the shared shell + table). New
shared elements / structure go through **T1**; either terminal may flag a need.

## Consumption (both apps: Tailwind v4 / Next 16) — see README
`transpilePackages: ["@ggeqs/ui"]` + `@import "@ggeqs/ui/theme.css"` +
`@source ".../node_modules/@ggeqs/ui/src"` in global CSS.

## Kickoff handshake
1. **T3:** create the public repo + push this seed → report **repo URL + SHA**.
2. **T1 + T3:** each wire their app pinning **that same SHA**; confirm both build.
3. Iterate via the bump protocol above.
