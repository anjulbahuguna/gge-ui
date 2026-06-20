# @ggeqs/ui

Shared GGE design tokens + UI primitives for the **Cortex** and **Paddock**
consoles. Source-shipped (no build step) — consumers transpile it.

Decision: **Approach A** — standalone repo consumed as a **git dependency**
(separate repos + Vercel projects stay independent). Pin to a **commit SHA**, not
`#main`, so a push here never silently changes a consumer's next deploy.

## What's in it
- `tokens` — `GGE` brand constants (green `#1A2E1A`, gold `#C9A84C`, cream, …) for inline styles.
- `theme.css` — Tailwind v4 `@theme` exposing the same as `--color-gge-*` (→ `bg-gge-green`, `text-gge-gold`, …).
- `Button`, `Badge`, `cn` — shared primitives. (Grow as real duplication appears.)
- `BrandLockup` — logo + product name as one inline lockup (login/landing headers).
- `BrandPanel` — the shared embossed rail header (crest · product wordmark · byline), identical across consoles, parameterized by `base` color (green / wine).
- `Footer` — shared GGE footer (© + Privacy/Terms placeholder); `color` prop = product color (Cortex green / Paddock wine).

## Consume it (Cortex / Paddock — both Tailwind v4, Next 16)
1. **Add the dep** (pinned SHA):
   ```jsonc
   // package.json
   "dependencies": { "@ggeqs/ui": "github:<owner>/gge-ui#<commit-sha>" }
   ```
2. **Transpile the package** (it ships .tsx source):
   ```ts
   // next.config.ts
   const nextConfig = { transpilePackages: ["@ggeqs/ui"] };
   ```
3. **Tailwind v4 — import the theme + register the package as a source** (so its
   classes aren't purged) in your global CSS:
   ```css
   @import "tailwindcss";
   @import "@ggeqs/ui/theme.css";
   @source "../../node_modules/@ggeqs/ui/src";   /* adjust depth to your globals.css */
   ```
4. **Use it:**
   ```tsx
   import { Button, Badge, GGE } from "@ggeqs/ui";
   <aside style={{ background: GGE.green }}>…</aside>
   <Button size="sm">Save</Button>
   <Badge tone="green">active</Badge>
   ```

## Iterate
Edit here → push → bump the consumer's SHA → reinstall. For active local co-dev,
`npm link` (or a `file:` dep) avoids the push/reinstall loop; switch back to the
pinned SHA for commits/deploys.

## Stack
Tailwind v4 · Next 16 · React 19 · cva + clsx + tailwind-merge (matches both consoles).
