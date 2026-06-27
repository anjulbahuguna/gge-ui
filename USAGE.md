# gge-ui — usage conventions

The components exist; this is the **grammar** for using them. The guard
(`scripts/check-gge-ui.sh`) enforces the mechanical parts. Read this before adding a
button or a clickable element to a consuming app (Cortex / Paddock).

## Button emphasis hierarchy

`<Button>` ships six variants. Pick by the action's **emphasis**, not by taste — every
view has exactly **one** primary action.

| Variant | Use for | Looks like |
|---|---|---|
| `default` | **The one primary action** per view — the main next step (Save, New check, Run another check, Submit) | Filled, `bg-primary` |
| `outline` / `secondary` | Secondary actions sitting next to the primary (Cancel, Back, Re-check, filters) | Bordered, no fill |
| `ghost` | Tertiary / toolbar / icon-only / inline low-chrome (an inline "Edit" toggle, row actions) | No border, no fill |
| `destructive` | Delete / irreversible | Tinted red |
| `link` | **Inline, inside running prose only** — never a standalone action button | Underlined text |

**The rule that catches the common bug:** a view's main next-step action is **`default`**.
It must never land as `outline`, `ghost`, or `link` — those are border-only / text and read
as "just clickable text," so a primary CTA disappears. The *same* logical action must use the
**same** variant across views (don't make "New check" filled on the list page but outline on
the result page).

For a button that navigates, wrap a `Link` with `asChild` — keep it a real Button:
```tsx
<Button asChild size="sm"><Link href="/x"><Icon.add /> New check</Link></Button>
```

## Compose — don't hand-roll

If gge-ui has the primitive, use it. Do not hand-roll the thing it already provides:

- **Clickable → `<Button>`.** No raw `<button>`, no `<a onClick>`, no `<div onClick>` /
  `<span onClick>` acting as a button. Real navigation = `<Link>` (or `<Button asChild><Link>`).
- **Inputs → gge-ui.** `Input`, `DateField`, `Select`, `Checkbox` — never a native
  `<input>`/`<select>` styled to match.
- **Icons → `Icon.*`** (the shared vocabulary), never an inline SVG or emoji glyph.

## No hardcoded colors

Use the semantic tokens (`text-primary`, `bg-muted`, `border-border`, `text-foreground`,
`text-destructive`, …) — never raw palette classes like `text-green-700` / `bg-red-500`.
Tokens theme per-app (Cortex green, Paddock wine) and keep contrast correct; hardcoded
palette colors break theming and drift off-brand.

**Status colors** (success / warning / error / info) have dedicated **brand-independent**
tokens — a success is green on every app. For a status chip, use `<Badge tone="success">`
(also `warning` / `error` / `info` / `neutral`). For other status surfaces, use the tokens
directly: `text-success` / `bg-success`, `text-warning`, `text-destructive` (error),
`text-info`. Never `bg-green-100 text-green-900` — that's exactly what these replace.

## The guard + escape hatch

`scripts/check-gge-ui.sh [targetDir]` (default `src`) fails CI on raw clickables and
hardcoded colors. Wire it into each app's lint/build/test step:

```bash
bash node_modules/@ggeqs/ui/scripts/check-gge-ui.sh src
```

For a genuinely justified exception, add `gge-ui-ok` in a comment on the offending line —
the guard skips it. Use sparingly; an escape hatch is a decision, not a default.
