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

## Export API (v0.0.1) — additive-safe
`import { GGE, cn, Button, buttonVariants, Badge, Card, CardHeader, CardFooter,
CardTitle, CardAction, CardDescription, CardContent, Input, Label, BrandLockup,
BrandPanel, Footer, FontScaleProvider, useFontScale, FontSizeControl } from
"@ggeqs/ui"` · `@ggeqs/ui/theme.css` · `@ggeqs/ui/tokens`.
- **Additive** (new exports/components/tokens) = safe, just announce the SHA.
- **Rename/remove/signature change** = breaking → coordinate + version bump.
- `Button/Card/Input/Label` are the **canonical shadcn primitives** — promoted
  from Cortex (full shadcn surface: `Button` supports `asChild` + all
  variants/sizes). Don't keep app-local forks; import from here.

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

## Ownership
- **T1 (Cortex):** `tokens.ts` + `theme.css` — the **GGE brand**, source of truth.
  Token value changes go through T1.
- **T3 (Paddock):** package **structure + component API**. Either terminal may add
  components; coordinate on **shared primitives** (`Button`, `Badge`) so they stay
  consistent across both consoles.

## Consumption (both apps: Tailwind v4 / Next 16) — see README
`transpilePackages: ["@ggeqs/ui"]` + `@import "@ggeqs/ui/theme.css"` +
`@source ".../node_modules/@ggeqs/ui/src"` in global CSS.

## Kickoff handshake
1. **T3:** create the public repo + push this seed → report **repo URL + SHA**.
2. **T1 + T3:** each wire their app pinning **that same SHA**; confirm both build.
3. Iterate via the bump protocol above.
