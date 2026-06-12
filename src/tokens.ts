// GGE brand tokens — the single source of truth (shared by Cortex + Paddock).
// Use these for inline styles (e.g. a sidebar bg); for Tailwind utilities import
// "@ggeqs/ui/theme.css" which exposes the same values as `--color-gge-*`.
export const GGE = {
  green: "#1A2E1A",        // canterGreen — primary chrome
  gold: "#C9A84C",         // canterGold — accent / active
  cream: "#F5F0E8",        // canterCream — surfaces / light text on green
  sage: "#3D5C3D",
  stone: "#8A8478",
  border: "#E2DBD0",
  borderStrong: "#C8BFB0",
  goldLight: "#F0E4C0",
} as const;

export type GgeToken = keyof typeof GGE;
