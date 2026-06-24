// Propagate the canonical GGE mark to every app — ONE source, ONE command.
//
// The mark physically lives in 3 incompatible places (web /public URL, web app/
// favicon, iOS asset catalog) — none can import from this package at runtime, so
// each needs the actual bytes. This script is the single propagation point:
//   1. drop the new mark at gge-ui/brand/ggeqs-mark.png
//   2. run:  node scripts/sync-brand-mark.mjs
//   3. it copies the raw mark into each app + REGENERATES the coin favicons
//      (which embed the mark — easy to forget by hand; stale ones keep the old crest)
//   4. each terminal commits its own repo's diff (printed below)
//
// Add `--check` to verify everything is already in sync without writing (CI-friendly).

import { readFile, writeFile, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve, relative } from "node:path";
import { makeCoinFavicon, MARK } from "./make-coin-favicon.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const GGE = resolve(__dirname, "../.."); // /Users/anjul/Desktop/GGE — apps are siblings of gge-ui
const CHECK = process.argv.includes("--check");

// The manifest — every place the mark must land, and how. `raw` = byte copy;
// `favicons` = regenerated coins (color is the app's brand primary).
const APPS = [
  {
    name: "Cortex",
    root: "Cortex/cortex",
    raw: ["public/ggeqs-mark.png"],
    favicons: [
      { color: "#1A2E1A", out: "src/app/icon.png", size: 512 },
      { color: "#1A2E1A", out: "src/app/apple-icon.png", size: 180 },
    ],
  },
  {
    name: "Paddock",
    root: "Paddock",
    raw: ["public/ggeqs-mark.png"],
    favicons: [
      { color: "#6E1A2E", out: "src/app/icon.png", size: 512 },
      { color: "#6E1A2E", out: "src/app/apple-icon.png", size: 180 },
    ],
  },
  {
    name: "Canter (iOS)",
    root: "canter3",
    raw: ["Canter3/Resources/Assets.xcassets/CanterMark.imageset/canter-mark.png"],
    favicons: [], // iOS uses the raw mark directly; no derived coin (in-app coin is composed in SwiftUI)
  },
];

const sha = (buf) => createHash("sha1").update(buf).digest("hex");
const exists = (p) => access(p).then(() => true, () => false);

const source = await readFile(MARK);
console.log(`source: brand/ggeqs-mark.png  (${sha(source).slice(0, 8)}, ${source.length}b)\n`);

let changed = 0;
let drift = 0; // for --check
const touchedRepos = new Set();

for (const app of APPS) {
  const root = resolve(GGE, app.root);
  if (!(await exists(root))) {
    console.log(`• ${app.name}: repo not checked out at ${app.root} — skipped`);
    continue;
  }
  const lines = [];

  // 1. raw byte copies
  for (const rel of app.raw) {
    const dest = resolve(root, rel);
    const cur = (await exists(dest)) ? await readFile(dest) : null;
    if (cur && sha(cur) === sha(source)) continue; // already current
    if (CHECK) {
      drift++;
      lines.push(`  ⚠ stale  ${rel}`);
    } else {
      await writeFile(dest, source);
      changed++;
      lines.push(`  ✓ copied ${rel}`);
    }
  }

  // 2. derived coin favicons — always regenerated on a real sync (they embed the
  //    mark, so a composited match can't be cheaply proven). --check only guards
  //    the raw copies, which are what drift silently.
  if (!CHECK) {
    for (const f of app.favicons) {
      await makeCoinFavicon({ color: f.color, out: resolve(root, f.out), size: f.size, mark: MARK });
      changed++;
      lines.push(`  ✓ favicon ${f.out} (${f.size}px ${f.color})`);
    }
  }

  if (lines.length) {
    touchedRepos.add(app.name);
    console.log(`• ${app.name} (${app.root}):`);
    console.log(lines.join("\n"));
  } else {
    console.log(`• ${app.name}: already in sync`);
  }
}

console.log("");
if (CHECK) {
  if (drift) {
    console.log(`✗ ${drift} target(s) out of sync — run without --check to propagate.`);
    process.exit(1);
  }
  console.log("✓ all targets in sync with the canonical mark.");
} else if (changed) {
  console.log(`✓ propagated to ${touchedRepos.size} app(s). Commit each repo's diff:`);
  if (touchedRepos.has("Cortex")) console.log("  T1 (Cortex): git add public/ggeqs-mark.png src/app/icon.png src/app/apple-icon.png");
  if (touchedRepos.has("Paddock")) console.log("  T3 (Paddock): git add public/ggeqs-mark.png src/app/icon.png src/app/apple-icon.png");
  if (touchedRepos.has("Canter (iOS)")) console.log("  T2 (Canter): git add Canter3/Resources/Assets.xcassets/CanterMark.imageset/canter-mark.png");
  console.log("  (and gge-ui: git add brand/ggeqs-mark.png)");
} else {
  console.log("✓ nothing to do — everything already matches the canonical mark.");
}
