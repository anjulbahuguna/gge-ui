# GGE Brand Logo Intake — consolidated (Cortex · Paddock · Canter)

_Prepared for the GGE master-brand / logo-lockup effort. Covers all three product apps,
reconciled. June 2026._

## Headline

The system you're proposing is already in production. **Cortex** and **Paddock** share
**one** lockup architecture via the shared `@ggeqs/ui` package (`BrandPanel` for app
chrome, `BrandLockup` for inline headers). **Canter** reimplements natively in SwiftUI but
renders the **same emblem**. The field-color model (Q6) is live today. You are formalizing
a shipped system, not choosing one from scratch — the only native reimplementation to keep
in sync is Canter (iOS).

## The unified model (all three apps agree)

- **Emblem = wordless gold shield + gold horse, transparent interior + corners.** The
  consuming surface fills the field behind it. One **1024×1024 transparent PNG** master
  serves every placement (largest real use ≈ 648px = Canter splash @3x).
- **Field color identifies the _surface_, not just the product:**
  - Cortex → green `#1A2E1A` (fixed)
  - Paddock → wine `#6E1A2E` (fixed)
  - Canter → **per-barn** (the barn's `barnPrimary`; fallback green `#1A2E1A`)
  - Accent gold `#C9A84C` is standardized and **never themed**.
- **App icons are a separate opaque variant:** square 1024×1024, **no transparency**, field
  baked in (iOS requirement). Same shield, fixed field (Canter's icon = green, not per-barn
  — the home-screen icon can't theme).
- **"Golden Gate Equestrian" is never in the emblem.** It appears only as a byline/eyebrow
  in chrome (Cortex rail byline; Paddock login eyebrow + rail byline) and legal footers
  (Canter "© 2026 Golden Gate Equestrian, LLC"). The **wordmark is the product name**
  ("Cortex" / "Paddock" / "Canter"), gold serif.

## Placements & sizes (verified against the live apps)

| | Cortex (web) | Paddock (web) | Canter (iOS) |
|---|---|---|---|
| Persistent chrome | Left rail `BrandPanel`, emblem **104px** | Same rail, emblem **104px** | Floating coin-nav **100pt** |
| Login | Text only (no emblem today) | `BrandLockup` `lg` — emblem **56px** + "Paddock" + GGE eyebrow | AuthView coin **86pt** |
| Splash / hero | `BrandPanel` `hero` 184px (landing) | Landing `BrandPanel` `hero` + invite-accept page | Splash emblem **216pt** |
| Emblem-alone, smallest | Favicon **16px** | Favicon **16px** | Tab bar / `BarnCoin` **20px** |
| App icon (home screen) | — | — | **1024² opaque, green field** |
| Background | Light content, dark-green rail | Light content, wine rail | Per-barn solid field |
| On photos / busy bg? | No — solid color only | No — solid color only | No — solid field only |

Notes:
- Both web apps render through the same two density tiers in code: `rail` (104px emblem +
  36px product wordmark + byline) and `hero` (184px + 64px) for landing/marketing.
- Canter renders one `CanterMark` asset via `scaledToFit`, so a single master serves all
  three iOS sizes.

## Format deliverables (PNG — the emblem does not vectorize)

The shield is a rendered 3D-gold raster; there is **no SVG/vector** form of the emblem.

- **Emblem:** 1024² **transparent PNG**. Used by the web apps (`/public` + generated
  favicon coins) and Canter (`CanterMark.imageset`).
- **App icons:** 1024² **opaque PNG**, square, no alpha, field baked in — one per surface
  color (Cortex green, Paddock wine, Canter green).
- **Favicons (web):** `icon.png` 512 + `apple-icon.png` 180, auto-generated from the emblem
  + field color (already scripted in `@ggeqs/ui`).
- No PDF or SVG required for the emblem. (SVG/vector would only apply to a text wordmark, if
  one is ever specified separately.)

## For the lockup-architecture decision

- Must support **stacked** layout (vertical rails — the dominant web placement) and
  **emblem-alone at ≤32px** (favicon, coin-nav, avatars — the wordmark drops here).
- Two density tiers already exist (`rail` 104px / `hero` 184px) — the chosen architecture
  should map onto these or supersede them cleanly.
- Lock the **emblem-to-wordmark spacing/ratio** in the spec so all three apps regenerate
  consistently. A single master already propagates to every app + favicon via a sync
  script, so one spec lands everywhere.

## Open per-app confirmations

- **Cortex:** none — fully verified.
- **Paddock:** none — fully verified (one soft value: exact emblem px in branded
  magic-link emails; present and branded, confirm against the live template before locking).
- **Canter:** the legacy app icon's baked-in "CANTER / GOLDEN GATE EQUESTRIAN" text is
  being **retired** — the new icon is shield-on-green with no baked text.
