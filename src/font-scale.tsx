"use client";

import * as React from "react";
import { cn } from "./lib/cn";

// Accessibility text-size control, shared by Cortex + Paddock. Scales the ROOT
// font-size, so all rem-based text (nav + content) grows proportionally. The
// brand box uses fixed px, so it stays constant (brand identity doesn't scale).
// Persisted to localStorage.
const KEY = "gge-font-scale";
const BASE_PX = 16;
const MIN = 1.0; // 100%
const MAX = 1.5; // 150%

const clamp = (s: number) => Math.min(MAX, Math.max(MIN, s));

type FontScaleCtx = { scale: number; setScale: (s: number) => void };
const Ctx = React.createContext<FontScaleCtx | null>(null);

export function FontScaleProvider({ children }: { children: React.ReactNode }) {
  const [scale, setScaleState] = React.useState(1);

  // load persisted choice on mount (client only)
  React.useEffect(() => {
    const saved = parseFloat(localStorage.getItem(KEY) ?? "");
    if (!Number.isNaN(saved)) setScaleState(clamp(saved));
  }, []);

  // apply to the document root + persist
  React.useEffect(() => {
    document.documentElement.style.fontSize = `${BASE_PX * scale}px`;
    localStorage.setItem(KEY, String(scale));
  }, [scale]);

  const setScale = React.useCallback((s: number) => setScaleState(clamp(s)), []);
  return <Ctx.Provider value={{ scale, setScale }}>{children}</Ctx.Provider>;
}

export function useFontScale(): FontScaleCtx {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useFontScale must be used within a FontScaleProvider");
  return ctx;
}

// A —————●———— A   (100% → 150%). The A glyphs are fixed px so they read as a
// size legend (small A → large A) and don't scale themselves.
export function FontSizeControl({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { scale, setScale } = useFontScale();
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <span aria-hidden style={{ fontSize: 12, lineHeight: 1 }}>A</span>
      <input
        type="range"
        min={100}
        max={150}
        step={5}
        value={Math.round(scale * 100)}
        onChange={(e) => setScale(Number(e.target.value) / 100)}
        aria-label="Text size"
        title={`Text size ${Math.round(scale * 100)}%`}
        className="flex-1 min-w-0 cursor-pointer accent-current"
      />
      <span aria-hidden style={{ fontSize: 20, lineHeight: 1 }}>A</span>
    </div>
  );
}
