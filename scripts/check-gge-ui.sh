#!/usr/bin/env bash
# gge-ui conformance guard (web). Fails when app code hand-rolls something gge-ui
# already provides, or hardcodes colors instead of tokens. The component grammar
# is in USAGE.md. Wire into each consuming app's lint/build/test:
#   bash node_modules/@ggeqs/ui/scripts/check-gge-ui.sh src
# Escape hatch: put `gge-ui-ok` in a comment on a line to skip it (use sparingly).
set -euo pipefail

TARGET="${1:-src}"
if [ ! -d "$TARGET" ]; then
  echo "check-gge-ui: target dir '$TARGET' not found" >&2
  exit 2
fi

fail=0
report() { # <title> <grep-output>
  if [ -n "$2" ]; then
    echo "❌ $1"
    echo "$2" | sed 's/^/   /'
    echo
    fail=1
  fi
}

# Strip allowed lines (gge-ui-ok) before judging.
scan() { grep -rnE "$1" "$TARGET" --include=\*.tsx --include=\*.jsx 2>/dev/null | grep -v 'gge-ui-ok' || true; }

# 1. Raw <button> — use <Button> (or <Button asChild><Link> to navigate).
report "Raw <button> — use gge-ui <Button> (see USAGE.md → Button hierarchy):" \
  "$(scan '<button[ >/]')"

# 2. Clickable <div>/<span>/<a onClick> acting as a button — use <Button> / <Link>.
report "Clickable <div>/<span>/<a onClick> — use <Button> or <Link>:" \
  "$(scan '<(div|span|a)[^>]*onClick')"

# 3. Hardcoded palette colors — use semantic tokens (text-primary, bg-muted, …).
report "Hardcoded palette color — use a semantic token, not a raw palette class:" \
  "$(scan '(text|bg|border|ring|fill|stroke|from|to|via)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}')"

if [ "$fail" -ne 0 ]; then
  echo "gge-ui guard failed. Fix above, or annotate a justified line with 'gge-ui-ok'."
  exit 1
fi
echo "✓ gge-ui: no hand-rolled clickables or hardcoded colors in $TARGET"
