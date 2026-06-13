import * as React from "react"
import Link from "next/link"

import { cn } from "./lib/cn"

// Breadcrumbs — the shared "up to parent" / wayfinding element for the GGE
// consoles. A bare back link is just the 2-segment case; the same component
// scales to a full trail. Server-safe (uses next/link directly, no closures
// passed across the server→client boundary) so it drops into async page
// components. DetailHeader composes this — do not build a second breadcrumb.
//
// Each crumb with an `href` (and not the last one) renders as a link; the last
// crumb is the current page. Brand-quiet: muted base, gold hover accent (gold
// stays reserved for primary actions elsewhere).

export type Crumb = { label: string; href?: string }

export interface BreadcrumbsProps extends React.ComponentProps<"nav"> {
  items: Crumb[]
}

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-3.5 shrink-0 text-muted-foreground/50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function Breadcrumbs({ items, className, ...props }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      data-slot="breadcrumbs"
      className={cn("flex flex-wrap items-center gap-1.5 text-sm", className)}
      {...props}
    >
      {items.map((c, i) => {
        const last = i === items.length - 1
        return (
          <React.Fragment key={`${c.label}-${i}`}>
            {i > 0 && <Chevron />}
            {c.href && !last ? (
              <Link
                href={c.href}
                data-slot="breadcrumb-link"
                className="text-muted-foreground transition-colors hover:text-gge-gold"
              >
                {c.label}
              </Link>
            ) : (
              <span
                data-slot="breadcrumb-page"
                aria-current={last ? "page" : undefined}
                className={last ? "text-foreground/70" : "text-muted-foreground"}
              >
                {c.label}
              </span>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

export { Breadcrumbs }
