# Handoff: Canter — Welcome / Home Hero (Splash)

## Overview
The launch/welcome screen for the **Canter** iOS app (equestrian, powered by Golden Gate
Equestrian). It greets the returning user, presents the brand crest, and gives a single
primary entry point into the app. This handoff covers **Option A — "Anchored"**, the
approved direction.

## About the Design Files
The files in this bundle are a **design reference created in HTML** — a prototype showing
the intended look, layout, and motion. They are **not production code to copy directly**.
The task is to **recreate this screen in the Canter app's environment** (SwiftUI for iOS,
or the established RN/web stack if that's the target) using its existing patterns,
components, and asset pipeline. Treat the HTML/CSS values below as the exact spec.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and motion. Recreate pixel-faithfully
using the codebase's native primitives.

## Screen: Welcome Hero

**Purpose:** Returning-user landing on cold launch. User reads the greeting and taps the
primary CTA to enter the app.

**Canvas:** designed at iPhone logical size **390 × 844 pt** (notch / Dynamic Island device).
Full-bleed background, content respects safe areas.

### Layout (top → bottom)
Single vertical flex column, centered horizontally, `padding: 118px 34px 46px` (top padding
clears the status bar / island; in native use top safe-area inset + ~64pt instead).

1. **Status bar** (system — don't build; shown in mock only): time left, Dynamic Island
   center, signal/battery right.
2. **Crest block** — shield image with a soft radial gold glow behind it.
3. **Wordmark** "Canter".
4. Short gold hairline rule (40 × 1px).
5. **Tagline** "Your Ride to the Grand Prix" (uppercase, tracked).
6. **Flexible spacer** (`flex: 1`) — pushes the rest to the bottom. This is what fixes the
   empty-bottom problem; the greeting/CTA group is bottom-anchored.
7. **Greeting** — "Welcome back," (muted) over "Ayaan" (serif).
8. **Primary CTA** button — "Let's Ride".
9. **Footer attribution** — "Powered by • Golden Gate Equestrian".

### Components

**Background**
- Fill: `#1A2E1A` (brand deep forest green), full screen.

**Crest (shield + horse mark)**
- Asset: `canter-splash/shield-gold.png` (transparent PNG, 1024×1024 source). Render with
  `object-fit: contain`.
- Display size: **197 × 240 pt**.
- Drop shadow: `0 14px 22px rgba(0,0,0,.40)`.
- Glow: radial-gradient circle **288 × 240 pt**, centered behind crest,
  `radial-gradient(circle, rgba(201,168,76,.42), transparent 68%)`, blur 8px.

**Wordmark "Canter"**
- Font: **Spectral**, weight 600, size **54pt**, letter-spacing 0.01em.
- Color: `#F5F1E6` (warm cream).
- Margin-top from crest: 34pt.

**Hairline rule**
- 40 × 1px, `linear-gradient(90deg, transparent, #C9A84C, transparent)`.
- 18pt above / 14pt below.

**Tagline**
- Font: system sans, 11pt, letter-spacing **0.26em**, `text-transform: uppercase`.
- Color: `#C9A84C` (brand gold).

**Greeting**
- Line 1 "Welcome back,": system sans 15pt, color `#A9B4A3`, margin-bottom 4pt.
- Line 2 "Ayaan": Spectral 500, 30pt, color `#F5F1E6`, margin-bottom **40pt**.
- "Ayaan" is the dynamic user first name.

**Primary CTA — "Let's Ride"**
- Full width, height **56pt**, border-radius 16pt.
- Fill: `linear-gradient(180deg, #DCC06A, #C9A84C)` (gold).
- Label: system sans 17pt, weight 600, color `#1A2E1A`.
- Shadow: `0 10px 24px rgba(201,168,76,.28)`.

**Footer attribution**
- Row, centered, gap 7pt, margin-top **40pt** from CTA.
- "Powered by": 11pt, `#6F7D6B`.
- Dot: 3×3pt circle, `#C9A84C`.
- "Golden Gate Equestrian": 11pt, weight 600, `#B7A566`.

## Interactions & Behavior
- **CTA tap** → navigate into the app's main/home route. Standard pressed state (≈0.96
  scale or 0.85 opacity).
- No other interactive elements.

## Motion (entrance + ambient)
Run once on screen appear, then ambient loops continue.

- **Crest entrance** — `cnt-shieldIn`: opacity 0→1, translateY 20px→0, scale 0.92→1,
  duration **0.9s**, easing `cubic-bezier(.22,1,.36,1)`.
- **Crest float** (ambient, starts at 1s) — translateY 0 → -7px → 0, **6s**, ease-in-out,
  infinite.
- **Glow pulse** (ambient) — opacity 0.4→0.85→0.4 + scale 1→1.1, **4.5s**, infinite.
- **Gold sheen** (ambient) — a soft white light bar sweeps across the metal, masked to the
  shield silhouette (use the PNG alpha as a mask). Bar `linear-gradient(90deg, transparent,
  rgba(255,255,255,.55), transparent)`, blur 5px, blend `overlay`, translateX -160%→260%,
  rotate 18°, **5.5s**, infinite (1.4s delay). Implement natively as a masked gradient layer
  animating offset, or a shimmer/`.mask()` over the crest.
- **Text stagger** — `cnt-rise` (opacity 0→1, translateY 14px→0, 0.7s ease-out) on wordmark,
  rule, tagline, greeting lines, CTA, footer with delays
  **0.30 / 0.42 / 0.50 / 0.62 / 0.68 / 0.76 / 0.86s**.

Respect "Reduce Motion": disable float/sheen/pulse, keep a simple fade.

## State
- `firstName: String` — drives the greeting ("Ayaan" in mock).
- No data fetching on this screen; it's presentational + one navigation action.

## Design Tokens
Colors
- `green/bg` `#1A2E1A`
- `gold/primary` `#C9A84C`
- `gold/light` `#DCC06A` (gradient top)
- `gold/muted` `#B7A566` (attribution name)
- `cream` `#F5F1E6` (wordmark, name)
- `sage/muted` `#A9B4A3` ("Welcome back,")
- `sage/dim` `#6F7D6B` (footer "Powered by")

Type
- Display serif: **Spectral** (600 wordmark, 500 name) — Google Fonts.
- UI sans: system (`-apple-system` / SF Pro on iOS).

Radius: button 16, (frame/device 46).
Shadow: CTA `0 10px 24px rgba(201,168,76,.28)`; crest `0 14px 22px rgba(0,0,0,.40)`.

## Assets
- `canter-splash/shield-gold.png` — gold shield + horse crest, transparent PNG (1024×1024).
  This is the canonical brand mark; ship at @2x/@3x or as a vector if available. The original
  brand emblem set lives in the project's `brand-assets/` (gold/green/cream/wine/navy variants).

## Screenshots (`screenshots/`)
Because a static image can't show motion, these five frames are the **entrance animation
posed at successive timestamps** (left → right = the screen assembling on launch). Read them
together with the **Motion** section above.

- `01-entrance.png` — ~180ms: crest scaling/rising in, gold sheen entering from the left edge.
- `02-entrance.png` — ~480ms: crest settled, wordmark "Canter" fading up, sheen mid-sweep.
- `03-entrance.png` — ~820ms: tagline + greeting risen; full composition nearly assembled.
- `04-entrance.png` — ~1100ms: **settled final state** (use this as the reference comp).
- `05-entrance.png` — ~2600ms: ambient loop — sheen sweeping the metal again, crest mid-float.

The device chrome (bezel/status bar) in the shots is mock framing only — the real status bar
is the system's.

## Files
- `Canter Splash.dc.html` — the HTML reference prototype. It contains **three** explored
  directions side by side (A · Anchored, B · Framed Editorial, C · Immersive Spotlight).
  **Build Option A** (the first / left frame). B and C are kept for context only.
- `canter-splash/shield-gold.png` — crest asset referenced by the prototype.
