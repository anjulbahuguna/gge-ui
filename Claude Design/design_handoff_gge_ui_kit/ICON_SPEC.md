# GGE Icon Spec — handoff for Claude Code

> **Review status (2026-06-22):** 121 / 129 concepts approved in the visual master list
> (`Icon Master List.html`), 0 flagged for change, **8 pending decision** (see §C at the
> bottom). The 121 approved follow the glyphs in `ICON_MASTER_LIST.md` + the §A/§B
> overrides below. Finalize §C before handing to Claude Code.

One coherent icon set for the three GGE apps — **Cortex** (web), **Paddock** (web),
**Canter** (iOS). This spec is **exceptions-only**: the master list already maps almost
every concept to a good library glyph, so we don't restate ~130 rows here (that would
just drift from the source). Read it as:

> **Default rule:** for every concept, use the glyph named in **`ICON_MASTER_LIST.md`** —
> the **"Web today"** column = the Lucide name (web: Cortex + Paddock), the **"iOS today"**
> column = the SF Symbol (Canter). Those columns ARE the spec for everything not overridden below.
>
> **This file overrides the master list for exactly two things:** (1) the **custom drawn
> icons** (§A — library has no good glyph) and (2) the **collision fixes** (§B — distinct
> concepts that currently share one glyph and must each get their own).

## The standard (applies to every icon, library or custom)
- **One glyph per concept**, used in all three apps. Line/stroke, **single weight**, **`currentColor`**, square 24×24 viewBox, 20px live area (2px padding).
- Must read at **~20px** (nav) and **~14px** (inline). Default render size 20.
- **Fill variants:** iOS uses the `.fill` / `.badge` / circle form per context (active nav, pinned badge, selected, warning) — that's a state variant, **not** a separate concept. The set ships **one** glyph per concept; each platform picks the fill/badge form in context. See the master list's "iOS style/state variants" note.
- Icon-only controls must carry a label: `aria-label` (web) / `accessibilityLabel` (iOS).

---

## §A — Custom drawn icons (override the library)

Seven glyphs drawn for GGE because Lucide/SF have no faithful match (or to upgrade a weak
generic). Files in **`icons/`**, traced to the standard above (fill-based paths,
`fill-rule="evenodd"`, `currentColor`). Use these **instead of** the master-list glyph for
these concepts:

| Master concept | Was (today) | Use this | File | Apps |
|---|---|---|---|---|
| `barn` / `barns` | Barn *(custom SVG)* / `house.lodge.fill` | **custom** | `icons/domain.barn.svg` | C · Can |
| `horse` / `horses` | Horse *(custom SVG)* / `figure.equestrian.sports` | **custom** | `icons/domain.horse.svg` | P · Can |
| `farrier` | Hoof *(custom SVG)* | **custom** | `icons/domain.farrier.svg` | care-line |
| `riders` | `Users` / `person.2.fill` | **custom** (helmeted head) | `icons/domain.rider.svg` | P · Can |
| `feed` | `Wheat` | **custom** (feed sack) | `icons/domain.feed.svg` | care-line |
| `handWalk` | `Footprints` | **custom** (halter + lead) | `icons/domain.handWalk.svg` | care-line |
| `turnout` *(spare)* | — *(not in master list)* | parked | `icons/domain.turnout.svg` | — |

**iOS note (Canter):** for `horse` the SF symbol renders blank on the test OS, so iOS
intentionally used the rider figure — replace with this drawn `domain.horse` (import via
SF Symbols app → New Symbol from SVG → custom template). Same path for `barn`, `farrier`,
`riders`, `feed`, `handWalk` where Canter uses them. `turnout` is a spare (no concept yet).

**Detail caveats:** `domain.handWalk` and `domain.feed` are the busiest — they read best at
≥24px; fine for nav/detail, tight inline at 14px. `domain.rider` and the rest read clean to 16px.

---

## §B — Collision fixes (distinct concepts sharing one glyph)

Each pair below currently maps to the **same** lucide glyph. Give each concept its **own**
glyph so they're never ambiguous. None need custom drawing — just a distinct library pick:

| Concept | Keep / new glyph (web · iOS) | Why distinct from… |
|---|---|---|
| `schedule` | `CalendarClock` · `calendar.badge.clock` | …`overdue` (iOS `calendar` would collide with the `calendar` concept) |
| `overdue` | `AlarmClock` · `clock.badge.exclamationmark` | (time-critical, not a planned time) |
| `owners` | `ScrollText` · `doc.plaintext` | …`auditLog` |
| `auditLog` | `History` · `clock.arrow.circlepath` | (a log/trail, not a deed) |
| `filter` | `Filter` (funnel) · `line.3.horizontal.decrease` | …`config` |
| `config` | `SlidersHorizontal` · `slider.horizontal.3` | (settings sliders, not filtering) |
| `health` | `HeartPulse` · `heart.text.square` | …`injured` |
| `injured` | `Bandage` · `bandage.fill` | (an injury, not a health section) |
| `settings` | `Settings` (gear) · `gearshape.fill` | …`appSettings` |
| `appSettings` | `Wrench` · `wrench.and.screwdriver.fill` | (platform config page) |
| `profile` / `account` | `CircleUser` · `person.crop.circle.fill` | …`assignee` |
| `assignee` | `UserCheck` · `person.crop.circle.badge.checkmark` | (who's assigned to a task) |

> These are proposals — adjust if an app owner prefers a different split, but **the rule
> holds: one glyph ↔ one concept**, no shared glyphs across distinct concepts.

---

## Integration

**Web (`@ggeqs/ui`)** — one registry maps semantic → component so screens stay icon-agnostic:

```ts
// src/icons.ts
import { CalendarClock, AlarmClock, Filter, /* …lucide… */ } from "lucide-react";
import { DomainHorse, DomainBarn, DomainFarrier, DomainRider, DomainFeed, DomainHandWalk } from "./icons/custom";
export const Icon = {
  // library concepts → lucide (per master list, with §B fixes)
  schedule: CalendarClock, overdue: AlarmClock, filter: Filter, /* … */
  // custom concepts → drawn SVG components (§A)
  barn: DomainBarn, horse: DomainHorse, farrier: DomainFarrier,
  riders: DomainRider, feed: DomainFeed, handWalk: DomainHandWalk,
} as const;
export type IconName = keyof typeof Icon;
```
Each custom is a tiny SVG component (paste the `<path>` from the file) — see `icons/README.md`.

**iOS (Canter)** — `CanterIcon` enum maps semantic → SF Symbol string (per master list +
§B), with the §A customs added as custom symbols in the asset catalog. `CanterIcon` stays
the authoritative complete iOS inventory (T2 appends iOS-only concepts).

## §C — Pending decisions (resolved 2026-06-22)

The 8 that were undecided in review are now settled:

| Concept | Decision | Glyph / file |
|---|---|---|
| `auditLog` | library | `History` · `clock.arrow.circlepath` |
| `barnSubscriptions` | library | `Building2` · `building.2` |
| `pointsEligibility` | library | `FileCheck` · `doc.badge.checkmark` |
| `training` (Canter) | library | `GraduationCap` · `graduationcap` |
| `owners` | library | `BookUser` · `person.text.rectangle` |
| `serviceAccounts` | library | `Bot` · `cpu` (keeps `key` = `KeyRound`) |
| `roster` | **custom** ✅ | `icons/domain.roster.svg` (people + barn; best ≥24px) |
| `team` | **custom** ✅ | `icons/domain.team.svg` (horse + rider jumping; best ≥24px) |

`roster` (barn people) and `team` must be visually distinct from each other and from
Lucide `Users`/`UsersRound`. → adds two more entries to §A when delivered.

## Files in this handoff
- `ICON_MASTER_LIST.md` — the full concept list + per-app usage + today's glyphs (**the default spec**).
- `ICON_SPEC.md` — this file (the overrides: §A customs, §B collisions, the standard, integration).
- `icons/` — the 7 custom SVGs + `README.md` (web `icons.ts` + iOS `CanterIcon`/`GGEIcon` wiring).
- `icons-review.html` — visual proof sheet of the customs at 16/20/24/40px + recolored.
