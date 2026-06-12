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
}

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
  className,
  style,
  ...props
}: BrandPanelProps) {
  const top = baseTop ?? base;
  return (
    <div
      className={cn("relative flex flex-col items-center px-5 pb-6 pt-7 text-center", className)}
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
      <img src={markSrc} alt={org} width={120} height={120} className="shrink-0" />
      <p
        className="mt-2 text-[40px] font-bold leading-none tracking-tight"
        style={{ color: productColor }}
      >
        {product}
      </p>
      <p className="mt-2 text-[10px] tracking-wide" style={{ color: bylineColor }}>
        Brought to you by: {org}
      </p>
    </div>
  );
}
