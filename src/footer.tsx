import * as React from "react";
import { cn } from "./lib/cn";

// Shared GGE footer — same component in Cortex and Paddock. Neutral styling
// (sits on light surfaces). Legal links are placeholders by default until the
// real Privacy/Terms pages exist; pass `links` to point them at real routes.
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  org?: string;
  year?: number;
  links?: FooterLink[];
}

const DEFAULT_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
];

export function Footer({
  org = "Golden Gate Equestrian",
  year,
  links = DEFAULT_LINKS,
  className,
  ...props
}: FooterProps) {
  const y = year ?? new Date().getFullYear();
  return (
    <footer
      className={cn(
        "w-full border-t border-gge-border bg-transparent px-6 py-4",
        "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
        "text-xs text-gge-stone",
        className,
      )}
      {...props}
    >
      <p>
        &copy; {y} {org}
      </p>
      <nav className="flex items-center gap-4">
        {links.map((l) => (
          <a key={l.label} href={l.href} className="hover:underline">
            {l.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
