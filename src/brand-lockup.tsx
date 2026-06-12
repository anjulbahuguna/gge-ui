import * as React from "react";
import { cn } from "./lib/cn";
import { GGE } from "./tokens";

// Logo + product name as ONE lockup — used in headers/rails/landing/login so the
// mark and the product wordmark always travel together. Brand-agnostic: pass
// `color` (Cortex green / Paddock wine) for the wordmark. The mark is served by
// each app from its own /public (default /ggeqs-mark.png).
export interface BrandLockupProps extends React.HTMLAttributes<HTMLDivElement> {
  product: string; // "Paddock" | "Cortex"
  color?: string; // wordmark color (brand). default GGE green
  org?: string | null; // small eyebrow above the product name; null to omit
  markSrc?: string;
  size?: "sm" | "md" | "lg";
}

const MARK: Record<NonNullable<BrandLockupProps["size"]>, number> = {
  sm: 32,
  md: 40,
  lg: 56,
};
const PRODUCT_CLS: Record<NonNullable<BrandLockupProps["size"]>, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-2xl",
};

export function BrandLockup({
  product,
  color = GGE.green,
  org = "Golden Gate Equestrian",
  markSrc = "/ggeqs-mark.png",
  size = "md",
  className,
  ...props
}: BrandLockupProps) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={markSrc}
        alt="Golden Gate Equestrian"
        width={MARK[size]}
        height={MARK[size]}
        className="shrink-0"
      />
      <div className="leading-tight">
        {org && (
          <p className="text-[11px] font-medium uppercase tracking-wider text-gge-stone">
            {org}
          </p>
        )}
        <p className={cn("font-bold tracking-tight", PRODUCT_CLS[size])} style={{ color }}>
          {product}
        </p>
      </div>
    </div>
  );
}
