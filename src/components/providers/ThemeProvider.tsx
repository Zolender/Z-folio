import {
  createContext,
  useContext,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { flushSync } from "react-dom";
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
  setMode: (mode: ColorMode, origin?: { x: number; y: number }) => void;
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

  // Accent-as-text uses the darker shade in light mode for readable contrast
  // on light surfaces; the bright accent stays for fills, borders, and glow.
  useLayoutEffect(() => {
    document.documentElement.style.setProperty(
      "--color-accent-text",
      effectiveMode === "light" ? theme.dim : theme.hex
    );
  }, [theme, effectiveMode]);

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

  const setMode = useCallback(
    (next: ColorMode, origin?: { x: number; y: number }) => {
      const persist = () => {
        setModeState(next);
        try {
          window.localStorage.setItem(MODE_STORAGE_KEY, next);
        } catch {
          // ignore — mode still applies for the session
        }
      };

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const supportsVT =
        typeof document !== "undefined" && "startViewTransition" in document;

      if (!supportsVT || prefersReduced) {
        persist();
        return;
      }

      // Circular wipe from the origin point (defaults to viewport center).
      // flushSync forces React to commit the data-mode change inside the
      // transition callback so the API can snapshot the new colors.
      const root = document.documentElement;
      root.style.setProperty("--vt-x", `${origin?.x ?? window.innerWidth / 2}px`);
      root.style.setProperty("--vt-y", `${origin?.y ?? window.innerHeight / 2}px`);
      root.classList.add("mode-wipe");
      const transition = document.startViewTransition(() => {
        flushSync(persist);
      });
      transition.finished.finally(() => root.classList.remove("mode-wipe"));
    },
    []
  );

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
