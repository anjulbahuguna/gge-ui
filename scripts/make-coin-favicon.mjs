// Coin favicon generator — the single recipe shared by Cortex/Paddock so every
// app's tab icon is the same crest-on-coin, only the background tinted per app.
// Mirrors Canter's in-app coin (CanterCoinNav): a filled circle in the brand
// color with the gold GGE mark centered, no border ("the mark carries its own
// boundary"). Source mark is the canonical brand/ggeqs-mark.png in this repo.
//
// Usage:
//   node scripts/make-coin-favicon.mjs <hexColor> <outPath> [size]
// Examples:
//   node scripts/make-coin-favicon.mjs "#1A2E1A" ../Cortex/cortex/src/app/icon.png 512
//   node scripts/make-coin-favicon.mjs "#6E1A2E" ../Paddock/src/app/apple-icon.png 180
//
// Run twice per app: 512 for app/icon.png, 180 for app/apple-icon.png.

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MARK = resolve(__dirname, "../brand/ggeqs-mark.png");

const [, , color, outArg, sizeArg] = process.argv;
if (!color || !outArg) {
  console.error("usage: make-coin-favicon.mjs <hexColor> <outPath> [size=512]");
  process.exit(1);
}
const size = Number(sizeArg) || 512;
const out = resolve(process.cwd(), outArg);

// Hex "#rrggbb" → {r,g,b}.
const hex = color.replace("#", "");
const bg = {
  r: parseInt(hex.slice(0, 2), 16),
  g: parseInt(hex.slice(2, 4), 16),
  b: parseInt(hex.slice(4, 6), 16),
  alpha: 1,
};

// The crest sits at ~88% of the coin so a little brand color rings it (matches the
// in-app coin, where the mark fits inside the circle rather than bleeding to the edge).
const markSize = Math.round(size * 0.88);
const inset = Math.round((size - markSize) / 2);

// Circle mask: opaque disc on transparent, so the square brand fill becomes a coin.
const circleMask = Buffer.from(
  `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`
);

const coin = await sharp({
  create: { width: size, height: size, channels: 4, background: bg },
})
  .composite([{ input: circleMask, blend: "dest-in" }]) // clip the fill to a circle
  .png()
  .toBuffer();

const mark = await sharp(MARK)
  .resize(markSize, markSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp(coin)
  .composite([{ input: mark, top: inset, left: inset }])
  .png()
  .toFile(out);

console.log(`✓ ${out}  (${size}px, bg ${color})`);
