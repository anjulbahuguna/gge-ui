import * as React from "react";
import { cn } from "./lib/cn";
import { GGE } from "./tokens";

// Shared brand header panel for the console rails — IDENTICAL across Cortex and
// Paddock, parameterized only by the product's base color (green / wine). The
// embossed treatment: a gold radial spotlight behind the crest over a
// lit-from-above vertical gradient, inset highlight/shadow emboss, an accent
// hairline, and a drop shadow onto the flat 2D nav. Renders a centered 3-row
// lockup (crest · product wordmark · "Brought to you by" byline).
//
// Layout note: this is the centered/stacked panel lockup. The horizontal
// `BrandLockup` stays for inline headers (login/landing).
export interface BrandPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  product: string; // "Paddock" | "Cortex"
  base: string; // rail base color = gradient BOTTOM (wine / green)
  baseTop?: string; // gradient TOP, a few % lighter than base; defaults to base
  glow?: string; // radial spotlight color (default GGE gold)
  accent?: string; // hairline border-bottom (default GGE gold)
  productColor?: string; // wordmark color (default GGE gold)
  bylineColor?: string; // muted byline color (default muted cream)
  org?: string;
  markSrc?: string;
  size?: "rail" | "hero"; // rail = the sidebar header (default); hero = larger,
  // for a landing/marketing hero.
}

const SIZES = {
  rail: { crest: 120, product: "text-[40px]", byline: "text-[10px]", pad: "px-5 pb-6 pt-7" },
  hero: { crest: 184, product: "text-[64px]", byline: "text-xs", pad: "px-8 pb-10 pt-11" },
} as const;

export function BrandPanel({
  product,
  base,
  baseTop,
  glow = GGE.gold,
  accent = GGE.gold,
  productColor = GGE.gold,
  bylineColor = "rgba(245,240,232,0.6)",
  org = "Golden Gate Equestrian",
  markSrc = "/ggeqs-mark.png",
  size = "rail",
  className,
  style,
  ...props
}: BrandPanelProps) {
  const top = baseTop ?? base;
  const s = SIZES[size];
  return (
    <div
      className={cn("relative flex flex-col items-center text-center", s.pad, className)}
      style={{
        background: `radial-gradient(120% 78% at 50% 0%, ${glow}2e, transparent 62%), linear-gradient(180deg, ${top}, ${base})`,
        borderBottom: `1px solid ${accent}55`,
        boxShadow:
          "inset 0 1px 0 rgba(245,240,232,0.14), inset 0 -1px 0 rgba(0,0,0,0.25), 0 14px 28px -10px rgba(0,0,0,0.7)",
        ...style,
      }}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={markSrc} alt={org} width={s.crest} height={s.crest} className="shrink-0" />
      <p
        className={cn("mt-2 font-bold leading-none tracking-tight", s.product)}
        style={{ color: productColor }}
      >
        {product}
      </p>
      <p className={cn("mt-2 tracking-wide", s.byline)} style={{ color: bylineColor }}>
        Brought to you by: {org}
      </p>
    </div>
  );
}
