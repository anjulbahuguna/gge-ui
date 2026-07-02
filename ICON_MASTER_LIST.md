# GGE Icon Master List — design brief

**Purpose.** The complete set of icon *concepts* across the three GGE apps — **Cortex**
(admin console, web), **Paddock** (barn ops, web), **Canter** (show app, iOS). Hand to
Claude Design to produce **one coherent icon set** all three apps consume, replacing
today's grab-bag (lucide on web + SF Symbols on iOS + a few custom SVGs).

**Rules the set must honour.** One glyph per concept, everywhere · line/stroke, single
weight, currentColor, square viewbox · works at ~20px (nav) and ~14px (inline) · note
where a filled variant matters (active nav, pinned badge).

## Who needs it — read this

The **C / P / Can** columns mark which app uses each concept. **✓ = confirmed source;
blank = that app's owner to confirm/fill.** I (T1) only marked what's reliably sourced —
**not guesses:**
- **C (Cortex)** ✓ = verified in the Cortex repo (mine).
- **P (Paddock)** ✓ = read from Paddock `src` + T3's relay → **T3 to confirm/extend.**
- **Can (Canter/iOS)** ✓ = from T2's vocab-doc SF-Symbol mappings + T2's relays →
  **T2 to confirm/extend; `CanterIcon` is the authoritative complete iOS inventory, so
  T2 must append any iOS-only concepts + fill blanks.**

"Web today" / "iOS today" = the current glyph, as *direction* for the designer (not a
prescription). `—` = design fresh.

---

## 1. Navigation & entities

| Concept | Meaning | C | P | Can | Web today | iOS today |
|---|---|:-:|:-:|:-:|---|---|
| home | dashboard / home | | | ✓ | Home | house.fill |
| shows | shows / classes | | | ✓ | Award | rosette |
| showTeam | "on show team" toggle | | | ✓ | Star | star / star.fill |
| courseMap | class course map | | | ✓ | Map | map.fill |
| barn / barns | barn container | ✓ | | ✓ | Barn *(custom SVG)* | domain.barn *(custom, shipped)* |
| horse / horses | horse | | ✓ | ✓ | Horse *(custom SVG)* | domain.horse *(custom, shipped)* |
| riders | riders | | ✓ | ✓ | Users | domain.rider *(custom, shipped)* |
| roster | barn people | | ✓ | ✓ | UsersRound | domain.roster *(custom, shipped)* |
| members | barn members | | | | Contact | — |
| staff | staff & grooms | ✓ | ✓ | ✓ | IdCard | person.text.rectangle.fill |
| team | team | | ✓ | | UsersRound | — |
| owners | horse owners | | ✓ | | ScrollText | — |
| vendors | service providers | | ✓ | ✓ | ShoppingBag (bag) | bag.fill |
| supplies | feed/med supplies | | ✓ | | Boxes | — |
| invites | invitations | | ✓ | ✓ | Mail | envelope.fill |
| care | daily care tasks | | ✓ | ✓ | BriefcaseMedical | cross.case.fill |
| pay | money owed | | | ✓ | CircleDollarSign | dollarsign.circle.fill |
| profile / account | account | | | ✓ | CircleUser | person.crop.circle.fill |
| checklist | tasks / checklist | | | ✓ | ListChecks | checklist |
| schedule | class times | | | ✓ | CalendarClock | calendar.badge.clock *(§B; iOS `calendar` collides with the calendar concept)* |
| calendar | calendar | | | ✓ | Calendar | calendar |
| bulletin | bulletin posts | | | ✓ | Pin (outline) | pin |
| announce | broadcast | | | ✓ | Megaphone | megaphone.fill |
| venue | location | | | ✓ | MapPin | mappin.and.ellipse |

## 2. Data Import *(new — Paddock building now)*

| Concept | Meaning | C | P | Can | Web today | iOS today |
|---|---|:-:|:-:|:-:|---|---|
| customField | a column kept as a barn-defined field | | ✓ | | Tag *(proposed)* | tag.fill ² |
| undo | reverse a committed import batch | | ✓ | | Undo2 *(proposed)* | arrow.uturn.backward ² |
| feedChart | feed/meds matrix shape (fork tile) | | ✓ | | Table *(proposed)* | tablecells.fill ² |
| list | flat-list shape (fork tile) | | ✓ | | List *(proposed)* | list.bullet ² |
| import | the import feature (nav + fork page) | | ✓ | | *(aliases `upload`)* | — |

> ² **iOS symbols confirmed by T2** as the right SF Symbols for these concepts. **Can = blank**
> because Canter has no import today (Paddock-web only) — they're not in `CanterIcon` yet; these
> are the agreed iOS mappings for when/if Canter gains import.

## 3. Care board

| Concept | Meaning | C | P | Can | Web today | iOS today |
|---|---|:-:|:-:|:-:|---|---|
| careBoard | the care board | | ✓ | | LayoutDashboard | — |
| myTasks | my assigned tasks | | ✓ | | ListChecks | — |
| groomProgress | groom progress | | | | Activity | — |
| supplyLow | supply running low | | | | PackageMinus | — |
| dueNext | next due | | | | CalendarClock | — |
| recordCare | record a care task | | ✓ | | ClipboardPlus | — |
| checkOff | mark one done | | ✓ | ✓ | Check | checkmark.circle.fill |
| bundleDone | mark a group done | | | | CheckCheck | — |
| assignee | who's assigned | | | | CircleUser | — |
| reassign | reassign | | | | UserCog | — |
| delivery | supply delivery | | ✓ | | Truck | — |
| supplyLevel | supply level gauge | | | | Gauge | — |
| slotAM | morning slot | | | | Sunrise | — |
| slotNoon | midday slot | | | | Sun | — |
| slotPM | evening slot | | | | Sunset | — |
| slotNight | night slot | | | | Moon | — |

## 4. Care-line types

| Concept | Meaning | C | P | Can | Web today | iOS today |
|---|---|:-:|:-:|:-:|---|---|
| daily | recurring daily | | | | Repeat | — |
| appointment | scheduled appointment | | | | CalendarClock | — |
| feed | feed | | | | Wheat | — |
| medication | medication | | | | Pill | — |
| vet | vet | | | | Stethoscope | — |
| vaccination | vaccination | | | | Syringe | — |
| farrier | farrier / hoof | | | | Hoof *(custom SVG)* | — |
| handWalk | hand-walk | | | | Footprints | — |
| chore | general chore | | | | ClipboardList | — |

## 5. Status & health

| Concept | Meaning | C | P | Can | Web today | iOS today |
|---|---|:-:|:-:|:-:|---|---|
| healthy | healthy / ok | | | | CircleCheck | — |
| restricted | restricted | | | | TriangleAlert | — |
| injured | injured | | | | HeartPulse | — |
| overdue | overdue | | | | Clock | — |
| lowStock | low stock | | | | TrendingDown | — |
| active | active | | | | CircleDot | — |
| inactive | inactive | | | | Circle | — |
| eligible | eligible | ✓ | | | CircleCheck | — |
| notEligible | not eligible | | | | CircleX | — |
| cantConfirm | can't confirm / unsure | | ✓ | | CircleAlert | — |
| warning | warning | | | ✓ | TriangleAlert | exclamationmark.triangle |
| info | info | | | | Info | — |
| loading | loading | | | | Loader2 | — |

## 6. Detail sections

| Concept | Meaning | C | P | Can | Web today | iOS today |
|---|---|:-:|:-:|:-:|---|---|
| health | health section | | | | HeartPulse | — |
| costs | costs section | | | | Receipt | — |
| documents | documents | | | | FileText | — |
| notes | notes | | | | StickyNote | — |
| lease | lease | | | | FileSignature | — |

## 7. Actions & chrome

| Concept | Meaning | C | P | Can | Web today | iOS today |
|---|---|:-:|:-:|:-:|---|---|
| add | add / new | | ✓ | ✓ | Plus | plus |
| edit | edit | | ✓ | ✓ | SquarePen | pencil |
| delete | delete | | ✓ | ✓ | Trash2 | trash |
| save | save | | | | Save | — |
| close / discard | close / dismiss | | ✓ | ✓ | X | xmark |
| search | search | ✓ | | | Search | — |
| filter | filter | | | | SlidersHorizontal | — |
| sort | sort | | | | ArrowUpDown | — |
| back | back | ✓ | | ✓ | ChevronLeft | chevron.left |
| drillIn | drill into row | | | ✓ | ChevronRight | chevron.right |
| overflow | more actions | | | ✓ | MoreHorizontal | ellipsis |
| external | external link | | ✓ | | ExternalLink | — |
| upload | upload a file | | ✓ | ✓ | Upload | arrow.up.doc.fill |
| copy | copy | ✓ | | | Copy | — |
| settings | settings | | | ✓ | Settings *(new)* | gearshape.fill |
| celebrate | success / aha moment | | | ✓ | Sparkles *(new)* | sparkles |

## 8. Auth

| Concept | Meaning | C | P | Can | Web today | iOS today |
|---|---|:-:|:-:|:-:|---|---|
| magicLink | magic-link sign-in | | | ✓ | Mail | envelope.badge |
| password | password sign-in | | | | Lock | — |
| signIn | sign in | | | | LogIn | — |
| signOut | sign out | | | ✓ | LogOut | rectangle.portrait.and.arrow.right |
| key | credential / key | | | | KeyRound | — |

## 9. Cortex platform admin *(web)*

| Concept | Meaning | C | P | Can | Web today | iOS today |
|---|---|:-:|:-:|:-:|---|---|
| serviceAccounts | service accounts | | | | KeyRound | — |
| roles | roles & permissions | | | | ShieldCheck | — |
| taskTemplates | task templates | | | | ClipboardList | — |
| vendorCategories | vendor categories | | | | Tags | — |
| appSettings | app settings page | | | | Settings | — |
| classReference | class reference catalog | | | | BookOpen | — |
| showCalendar | platform show calendar | | | | CalendarDays | — |
| licensing | licensing | ✓ | | | BadgeCheck | — |
| analytics | analytics | | | | BarChart3 | — |
| auditLog | audit log | | | | ScrollText | — |
| branding | branding / theme | | | ✓ | Palette | paintpalette.fill |
| config | configuration | | | | SlidersHorizontal | — |
| hiddenCategories | hidden categories | | | | EyeOff | — |
| catalog | catalog grid | | | | LayoutGrid | — |
| userLicenses | per-user licenses | | | | UserCheck | — |
| barnSubscriptions | barn subscriptions | | | | Building2 | — |

## 10. Points & eligibility

| Concept | Meaning | C | P | Can | Web today | iOS today |
|---|---|:-:|:-:|:-:|---|---|
| pointsEligibility | points & eligibility | | | ✓ | FileCheck | checkmark.seal.fill † |
| rules | rules-as-data | | | | Scale | — |
| divisions | divisions | | | | Rows3 | — |
| points | USEF & circuit points *(iOS stub)* | | | ✓ | — | trophy.fill |

† `pointsEligibility` iOS: the vocab originally suggested `doc.badge.checkmark`, but that
SF Symbol name **does not render on iOS** — Canter ships `checkmark.seal.fill` (the
licensed-only 5th coin-fan "Eligibility" entry). Web keeps `FileCheck` (lucide).

## 11. iOS-only concepts *(no web counterpart yet — T2 to confirm + append the rest)*

| Concept | Meaning | Can | iOS today |
|---|---|:-:|---|
| setupShow | setup wizard entry | ✓ | list.bullet.clipboard |
| classes | classes & entries | ✓ | rosette |
| grooms | groom assignments | ✓ | figure.2 |
| pinned | "this post is pinned" badge | ✓ | pin.fill (filled) |
| notifications | bell + hub | ✓ | bell |
| training | lessons & progress *(stub)* | ✓ | figure.equestrian.sports |
| selected | selected / checkbox-on | ✓ | checkmark / checkmark.square.fill |
| radio | single-select | ✓ | largecircle.fill.circle / circle |
| verified | "all caught up" / ready seal | ✓ | checkmark.seal.fill |
| expand | expand / collapse disclosure | ✓ | chevron.down / chevron.up |
| timeTBD | time to be determined | ✓ | clock.badge.questionmark |
| hidden | hidden checklist item | ✓ | eye.slash |
| unpin | unpin a post | ✓ | pin.slash |
| comingSoon | stub / placeholder | ✓ | hourglass |
| photo | image / logo picker | ✓ | photo |
| remove | remove from a list | ✓ | minus.circle |

> **iOS style/state variants** (no separate glyph needed — same concept, filled/circle form):
> add also uses `plus.circle`/`plus.circle.fill`; close uses `xmark.circle.fill`; checkOff uses
> an outline `checkmark.circle`; warning uses a filled `exclamationmark.triangle.fill` + an
> `exclamationmark.circle` alert; notifications uses `bell.badge`. The designer needs one glyph
> per concept; iOS picks the fill/badge variant per context.

## 12. Brand assets

| Asset | Decision |
|---|---|
| Canter iOS app icon | **GGE-baked** — one GGE-branded app icon ("Canter by GGE"). Per-barn branding lives *inside* the app, not on the home-screen icon. (iOS app icons fixed per build; per-barn would need alternate-icons + store review — out of scope.) |

---

## Notes on accepted differences
- ¹ **Horse:** web = custom true-horse SVG; **iOS intentionally stays on the rider-figure**
  (`figure.equestrian.sports`) — SF Symbol horse renders blank on the test OS. A real drawn
  horse from Claude Design becomes the asset to mirror to iOS.
- **Custom SVGs today:** horse, hoof (farrier), barn — lucide has no good glyph; highest value
  for Claude Design to draw properly.
- **Same-glyph collisions to resolve** (distinct concepts sharing a lucide glyph today — give
  each its own drawn glyph): schedule/overdue (Clock) · owners/auditLog (ScrollText) ·
  filter/config (SlidersHorizontal) · health/injured (HeartPulse) · settings/appSettings
  (Settings) · profile/account/assignee (CircleUser).
