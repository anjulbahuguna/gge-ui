// Coin favicon generator — the single recipe shared by Cortex/Paddock so every
// app's tab icon is the same crest-on-coin, only the background tinted per app.
// Mirrors Canter's in-app coin (CanterCoinNav): a filled circle in the brand
// color with the gold GGE mark centered, no border ("the mark carries its own
// boundary"). Source mark is the canonical brand/ggeqs-mark.png in this repo.
//
// Importable: `import { makeCoinFavicon } from "./make-coin-favicon.mjs"` (used by
// sync-brand-mark.mjs). Also runnable as a CLI:
//   node scripts/make-coin-favicon.mjs <hexColor> <outPath> [size]
//   node scripts/make-coin-favicon.mjs "#1A2E1A" ../Cortex/cortex/src/app/icon.png 512

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const MARK = resolve(__dirname, "../brand/ggeqs-mark.png");

// Composite the coin: brand-color disc + the gold mark at ~88% (a little color
// rings it, matching the in-app coin). Writes a PNG of `size`px to `out`.
export async function makeCoinFavicon({ color, out, size = 512, mark = MARK }) {
  const hex = color.replace("#", "");
  const bg = {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
    alpha: 1,
  };
  const markSize = Math.round(size * 0.88);
  const inset = Math.round((size - markSize) / 2);

  // Circle mask: opaque disc on transparent → clips the square fill into a coin.
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`
  );
  const coin = await sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: circleMask, blend: "dest-in" }])
    .png()
    .toBuffer();
  const markBuf = await sharp(mark)
    .resize(markSize, markSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await sharp(coin)
    .composite([{ input: markBuf, top: inset, left: inset }])
    .png()
    .toFile(out);
  return { out, size, color };
}

// CLI entry — only when invoked directly, not when imported.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [, , color, outArg, sizeArg] = process.argv;
  if (!color || !outArg) {
    console.error("usage: make-coin-favicon.mjs <hexColor> <outPath> [size=512]");
    process.exit(1);
  }
  await makeCoinFavicon({ color, out: resolve(process.cwd(), outArg), size: Number(sizeArg) || 512 });
  console.log(`✓ ${resolve(process.cwd(), outArg)}  (${Number(sizeArg) || 512}px, bg ${color})`);
}
