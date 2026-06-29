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

interface ThemeContextValue {
  theme: AccentTheme;
  themeId: string;
  themes: AccentTheme[];
  setThemeId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

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

  // useLayoutEffect so the accent is in place before the browser paints,
  // avoiding a one-frame flash of the default violet on reload.
  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setThemeId = useCallback((id: string) => {
    setThemeIdState(id);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      // localStorage can throw in private mode — theme still applies for the session
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeId, themes, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
