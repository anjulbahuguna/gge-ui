# GGE Icon Vocabulary

**One icon per concept, everywhere.** Icons must not change between screens for the
same thing (a list empty-state, a nav link, and a setup card for "Vendors" must all
show the *same* glyph). This doc is the shared source of truth across the GGE apps.

## The rule
- **Never hardcode an icon at a call site.** Reference the shared constant for the
  concept. New concept → add it here + to the per-app constant set, then reference it.
- The **concept → meaning** mapping below is shared across apps. The **exact glyph**
  differs per platform (SF Symbols on iOS; the web icon set on Cortex/Paddock) — but
  the *meaning* and the *one-per-concept* rule are identical everywhere.
- Prefer the **filled** variant for solid presence (nav, links, cards). Don't mix
  filled/unfilled for the same concept across screens — that's the drift we're killing.

## Canonical vocabulary

| Concept | Meaning | Canter iOS (SF Symbol) | Web equivalent (T1/T3 pick + keep) |
|---|---|---|---|
| Home | dashboard | `house.fill` | home/house |
| Shows | shows / classes | `rosette` | rosette / award |
> **Web column = `gge-ui/src/icons.tsx`** (`Icon.<concept>`, SHA d9c4dcb). Concept
> names match this doc exactly, so iOS keeps SF Symbols under the same names. Concepts marked
> *(iOS-only)* have no web counterpart (Canter show-setup surfaces; Paddock doesn't run setup).

| Concept | Meaning | Canter iOS (SF Symbol) | Web (`gge-ui` Icon) |
|---|---|---|---|
| Home | dashboard | `house.fill` | `Icon.home` |
| Shows | shows / classes | `rosette` | `Icon.shows` |
| Barn | barn container | `house.lodge.fill` | `Icon.barn` |
| Roster | barn people | `person.2.fill` | `Icon.roster` |
| Riders | riders | `person.2.fill` | `Icon.riders` |
| Staff | staff & grooms | `person.text.rectangle.fill` | `Icon.staff` |
| Horses | horses | `figure.equestrian.sports` ¹ | `Icon.horse` (true horse SVG) |
| Vendors | service providers | `bag.fill` ² | `Icon.vendors` (`ShoppingBag`) |
| Invites | invitations | `envelope.fill` | `Icon.invites` |
| Care | daily care tasks | `cross.case.fill` | `Icon.care` |
| Pay / Owe | money owed | `dollarsign.circle.fill` | `Icon.pay` |
| Profile | account | `person.crop.circle.fill` | `Icon.profile` |
| Set up show | setup wizard entry | `list.bullet.clipboard` | *(iOS-only)* |
| Classes | classes & entries | `rosette` | *(iOS-only)* |
| Schedule | class times | `clock` | `Icon.schedule` |
| Grooms | groom assignments | `figure.2` | *(iOS-only)* |
| Checklist | tasks/checklist | `checklist` | `Icon.checklist` |
| Bulletin | bulletin posts | `pin` (outline) ³ | `Icon.bulletin` |
| Announce | broadcast | `megaphone.fill` | `Icon.announce` |
| Venue | location | `mappin.and.ellipse` | `Icon.venue` |
| Pinned | "this post is pinned" badge | `pin.fill` (filled) ³ | *(badge)* |
| Notifications | bell + hub | `bell` | *(iOS-only for now)* |
| Training | lessons & progress (stub) | `figure.equestrian.sports` (= Horses) | *(iOS-only)* |
| Points | USEF & circuit (stub) | `trophy.fill` | *(iOS-only)* |
| Show Team | roster "on show team" toggle | `star` (off) / `star.fill` (on) | `Icon.showTeam` (lucide `Star`) — web ✓ (added `d9c4dcb`) |
| Course map | class course map (in notifications) | `map.fill` | `Icon.courseMap` (lucide `Map`) — web ✓ (added `d9c4dcb`) |

> **Show Team + Course map:** added to gge-ui `icons.tsx` in `d9c4dcb` — `Icon.showTeam`
> (`Star`, the roster toggle #13) and `Icon.courseMap` (`Map`, the notification-row glyph).
> iOS already uses these; web is now aligned.

² **Vendors = a bag, everywhere** (final — supersedes the earlier "box"). ✅ Aligned: iOS
`bag.fill`; gge-ui `Icon.vendors` = `ShoppingBag`. (iOS does not consume gge-ui,
so no pin to bump on Canter; the pin bump is for Paddock/Cortex web.)

³ **Bulletin** uses the **outline** `pin` for the concept (card + page), so it stays
distinct from the **filled** `pin.fill` "this post is pinned" badge.

> **Card == page rule:** an entry-point (card/tab) and the page it opens must use the
> *same* concept icon — incl. the page's empty-state. (e.g. the Schedule card and the
> Schedule page's "no classes" state both use `clock`, not `calendar`.)

¹ **Horses — accepted platform difference (decided, Anjul):** web (`Icon.horse`) uses a
**custom true-horse SVG**; **iOS intentionally stays on the equestrian *rider*-figure
fallback** (`figure.equestrian.sports`) — the SF Symbol horse renders blank on the test OS,
and we are *not* mirroring the custom asset to iOS for now. Revisit only if the horse glyph
becomes a priority; the gge-ui SVG is the asset to mirror if/when we do.

² **Vendors:** a **bag** (`bag.fill`) — reads as commerce/services. Decided June 2026
(Anjul). Use a bag/shopping-bag glyph on web, not a box.

## Per-app implementation
- **Canter iOS:** `Canter3/DesignSystem/Components/CanterSupport.swift` → `enum CanterIcon`.
  `NavDestination.systemImage` references it. All entity call sites reference it.
- **Cortex / Paddock (web):** add the matching constant set to the shared `gge-ui`
  package so both apps reference one source; pick the closest glyph in the web icon set
  per the table and keep it consistent across screens.
