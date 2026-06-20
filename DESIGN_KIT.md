# Design Kit — visual reference (not canonical)

A Claude Design export of `@ggeqs/ui`, kept in `GGE-UI Kit/` in this repo.

## What it is
- **`GGE-UI Kit/GGE UI Kit.dc.html`** — a high-fidelity **visual gallery**: every
  primitive rendered and themed side-by-side for both consoles (Cortex green/gold ·
  Paddock wine). Open it in a browser. This is the useful artifact — a documented
  picture of the whole system we didn't have before.
- **`GGE-UI Kit/spec/`** — a **frozen snapshot copy** of this repo's top-level spec
  docs (CONTRACT / SCREEN_ANATOMY / ADOPTION / OPEN_QUESTIONS / README) as they
  stood when the kit was generated.

It is **documentation of the package we already have**, not new code to build. Every
component it shows already exists in `src/`.

## Status — it's a snapshot, and it's behind
The kit was generated at **SHA `ece748d`** (~2026-06-13). The live package is ahead.
Things the kit does **not** reflect:
- **`Icon.<concept>` system** — the shared one-glyph-per-concept icon set
  (`0fcab6e`→`24250b6`), incl. the custom horse/hoof/barn glyphs. Not in the kit.
- **`InviteAccept`** — shared invite-accept screen (`dab41cc`). Not in the kit.
- **`PageShell` `width` prop** (2xl–6xl) — the kit lists this as a TODO; it
  **shipped** (`ed2ccf2`) and Cortex form pages use `width="2xl"`.

## How to use it
- **Visual reference only.** Use the gallery to see intended look/states when
  building or skinning a screen.
- **The repo's top-level specs win.** `CONTRACT.md` / `SCREEN_ANATOMY.md` / etc. at
  the root of this repo are canonical and current; the kit's `spec/` copies are
  frozen — **do not edit them and do not treat them as source of truth.** Where the
  gallery and the live package disagree, the live package + root specs win.
- **Don't merge the `.dc.html` as code.** The README inside the kit frames a
  "recreate these as real components" task — that's already done; ignore it.

## Reconcile (parked)
Folding the three missing additions (Icon, InviteAccept, shipped PageShell width)
back into the kit is **deferred** — Anjul's call to keep it as reference for now.
When/if we refresh it, regenerate from the then-current SHA rather than hand-editing
the snapshot.

## For T2 / T3
- **T3 (Paddock):** you can open the gallery for an exact visual of every shared
  component themed in wine — handy when adopting `PageShell`/`Table`/`StatStrip`/
  `Segmented`. Pin/build against the **live SHA**, not the kit's `ece748d`.
- **T2 (Canter iOS · canter-public):** the gallery is the cleanest single picture of
  the GGE web design language to mirror in SwiftUI / canter-public. Note the kit
  predates the `Icon` system + `InviteAccept` — for those, see `src/icons.tsx`,
  `src/invite-accept.tsx`, and `assets/horse.svg` directly.
