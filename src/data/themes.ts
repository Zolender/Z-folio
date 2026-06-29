// Accent themes — the whole site is keyed off a single accent color
// (buttons, tags, borders, the cursor, and the canvas background). Switching
// one of these rewrites three CSS custom properties on :root, so every accent
// utility and the canvas recolor in one stroke.
//
// - `hex`  → --color-accent      (the main accent)
// - `dim`  → --color-accent-dim  (hover / pressed shade, slightly darker)
// - `rgb`  → --accent-rgb        ("r, g, b" triple the canvas uses for rgba())
//
// Every accent is deliberately light enough to read as text on the near-black
// canvas (#09090b) and to carry dark label text when used as a button fill.

export interface AccentTheme {
  id: string;
  name: string;
  hex: string;
  dim: string;
  rgb: string;
}

export const themes: AccentTheme[] = [
  { id: "violet", name: "Violet", hex: "#8b5cf6", dim: "#7c3aed", rgb: "139, 92, 246" },
  { id: "sky", name: "Sky", hex: "#38bdf8", dim: "#0ea5e9", rgb: "56, 189, 248" },
  { id: "emerald", name: "Emerald", hex: "#34d399", dim: "#10b981", rgb: "52, 211, 153" },
  { id: "amber", name: "Amber", hex: "#fbbf24", dim: "#f59e0b", rgb: "251, 191, 36" },
  { id: "rose", name: "Rose", hex: "#fb7185", dim: "#f43f5e", rgb: "251, 113, 133" },
];

export const DEFAULT_THEME_ID = "violet";
export const THEME_STORAGE_KEY = "portfolio-accent";

export function getTheme(id: string | null | undefined): AccentTheme {
  return themes.find((t) => t.id === id) ?? themes[0];
}
