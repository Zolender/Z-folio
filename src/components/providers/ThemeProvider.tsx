import {
  createContext,
  useContext,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import type { ReactNode } from "react";
import {
  themes,
  getTheme,
  DEFAULT_THEME_ID,
  THEME_STORAGE_KEY,
  type AccentTheme,
} from "../../data/themes";

export type ColorMode = "dark" | "light" | "system";
export type EffectiveMode = "dark" | "light";

const MODE_STORAGE_KEY = "portfolio-mode";

interface ThemeContextValue {
  theme: AccentTheme;
  themeId: string;
  themes: AccentTheme[];
  setThemeId: (id: string) => void;
  mode: ColorMode;
  effectiveMode: EffectiveMode;
  setMode: (mode: ColorMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function systemPrefersLight() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  );
}

function resolveMode(mode: ColorMode): EffectiveMode {
  if (mode === "system") return systemPrefersLight() ? "light" : "dark";
  return mode;
}

// Push the active accent into the three CSS custom properties the whole site
// reads from. Inline styles on the root element win over the stylesheet's
// @theme defaults, so this is all it takes to recolor everything.
function applyTheme(theme: AccentTheme) {
  const root = document.documentElement;
  root.style.setProperty("--color-accent", theme.hex);
  root.style.setProperty("--color-accent-dim", theme.dim);
  root.style.setProperty("--accent-rgb", theme.rgb);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME_ID;
    return window.localStorage.getItem(THEME_STORAGE_KEY) ?? DEFAULT_THEME_ID;
  });

  const theme = getTheme(themeId);

  const [mode, setModeState] = useState<ColorMode>(() => {
    if (typeof window === "undefined") return "dark";
    return (window.localStorage.getItem(MODE_STORAGE_KEY) as ColorMode) ?? "dark";
  });
  const [effectiveMode, setEffectiveMode] = useState<EffectiveMode>(() =>
    resolveMode(typeof window === "undefined" ? "dark" : mode)
  );

  // useLayoutEffect so the accent is in place before the browser paints,
  // avoiding a one-frame flash of the default violet on reload.
  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Reflect the resolved light/dark mode onto <html data-mode> before paint,
  // and keep it in sync with the OS when the user picks "system".
  useLayoutEffect(() => {
    const resolved = resolveMode(mode);
    setEffectiveMode(resolved);
    document.documentElement.dataset.mode = resolved;

    if (mode !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      const next = mql.matches ? "light" : "dark";
      setEffectiveMode(next);
      document.documentElement.dataset.mode = next;
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [mode]);

  const setThemeId = useCallback((id: string) => {
    setThemeIdState(id);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      // localStorage can throw in private mode — theme still applies for the session
    }
  }, []);

  const setMode = useCallback((next: ColorMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(MODE_STORAGE_KEY, next);
    } catch {
      // ignore — mode still applies for the session
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, themeId, themes, setThemeId, mode, effectiveMode, setMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
