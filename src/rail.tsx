"use client";

import * as React from "react";
import Link from "next/link";
import { GGE } from "./tokens";
import { cn } from "./lib/cn";
import { BrandPanel } from "./brand-panel";
import { FontSizeControl } from "./font-scale";

// Shared console rail (anatomy ②). ONE shell across Cortex + Paddock — the app
// passes only the rail color (`base`) + the product name + the nav
// (`NavSection`/`NavLink` children). The shell composes: BrandPanel (top) ·
// scrollable nav · a footer strip with the font control (Sign Out lives in
// `AccountBar`, NOT here). Active links = solid accent fill (gold). A barn
// switcher is just a child the app conditionally renders (e.g. multi-barn only).
// Presentational; uses next/link.

const CREAM = GGE.cream;

const RailCtx = React.createContext<{ base: string; accent: string }>({ base: GGE.green, accent: GGE.gold });

export interface RailProps extends React.ComponentProps<"aside"> {
  product: string;   // "Cortex" | "Paddock" — the BrandPanel wordmark
  base: string;      // rail color (green / wine) — the only brand variable
  accent?: string;   // active-link fill + section labels (default GGE gold)
  brandHref?: string; // if set, the brand panel links here (e.g. the console home)
}

export function Rail({ product, base, accent = GGE.gold, brandHref, className, children, ...props }: RailProps) {
  const brand = <BrandPanel product={product} base={base} baseTop={base} />;
  return (
    <RailCtx.Provider value={{ base, accent }}>
      <aside
        data-slot="rail"
        className={cn("flex h-full w-60 shrink-0 flex-col", className)}
        style={{ background: base }}
        {...props}
      >
        {brandHref ? <Link href={brandHref} className="block">{brand}</Link> : brand}
        <nav className="flex-1 space-y-5 overflow-y-auto px-2 pb-4 pt-6">{children}</nav>
        <div className="flex h-14 flex-col justify-center border-t px-4" style={{ borderColor: "rgba(245,240,232,0.15)" }}>
          <FontSizeControl style={{ color: CREAM }} />
        </div>
      </aside>
    </RailCtx.Provider>
  );
}

// A nav group with an optional uppercase accent label.
export function NavSection({
  label,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { label?: string }) {
  const { accent } = React.useContext(RailCtx);
  return (
    <div data-slot="nav-section" className={cn("space-y-0.5", className)} {...props}>
      {label && (
        <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: accent, opacity: 0.72 }}>
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

// A rail nav link. Active = solid accent fill (treatment A): gold bg + the rail's
// base color as text; inactive = cream. App computes `active` (route match).
export interface NavLinkProps extends Omit<React.ComponentProps<typeof Link>, "href"> {
  href: string;
  label: string;
  active?: boolean;
  icon?: React.ReactNode;   // a shared <Icon.concept/> — never a raw lucide import
}

export function NavLink({ href, label, active, icon, className, style, ...props }: NavLinkProps) {
  const { base, accent } = React.useContext(RailCtx);
  return (
    <Link
      href={href}
      data-slot="nav-link"
      data-active={active || undefined}
      className={cn("flex items-center gap-2.5 rounded px-3 py-1.5 text-sm transition-colors", className)}
      style={
        active
          ? { background: accent, color: base, fontWeight: 600, ...style }
          : { color: CREAM, opacity: 0.82, ...style }
      }
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="min-w-0 truncate">{label}</span>
    </Link>
  );
}
