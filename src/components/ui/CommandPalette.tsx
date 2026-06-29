import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router";
import {
  Search,
  ArrowUp,
  User,
  Layers,
  Wrench,
  Mail,
  Palette,
  Copy,
  Check,
  CornerDownLeft,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../shared/BrandIcons";
import { useCommand } from "../providers/CommandProvider";
import { useTheme } from "../providers/ThemeProvider";
import { useMotion } from "../../hooks/useMotion";
import { projects } from "../../data/projects";

type IconComponent = React.ComponentType<{ className?: string }>;

interface Command {
  id: string;
  label: string;
  group: string;
  icon: IconComponent;
  keywords?: string;
  perform: () => void;
  keepOpen?: boolean; // theme + copy keep the palette open so the effect is visible
  swatch?: string; // accent hex for theme rows
  active?: boolean; // currently-selected theme
}

const EMAIL = "ndeingare@gmail.com";
const GITHUB = "https://github.com/Zolender";
const LINKEDIN = "https://linkedin.com/in/eben-ezer-ndeingar";

export default function CommandPalette() {
  const { isOpen, close } = useCommand();
  const { themes, themeId, setThemeId, mode, setMode } = useTheme();
  const { reduced } = useMotion();
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Smooth-scroll to a section, navigating home first if we're on a sub-route.
  function goToSection(id: string) {
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
    const scroll = () => {
      if (id === "top") {
        window.scrollTo({ top: 0, behavior });
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
    };
    if (location.pathname !== "/") {
      navigate("/");
      // Wait two frames for Home to mount before scrolling.
      requestAnimationFrame(() => requestAnimationFrame(scroll));
    } else {
      scroll();
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setFeedback("Email copied to clipboard");
    } catch {
      setFeedback(EMAIL);
    }
    clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setFeedback(null), 2000);
  }

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = [
      { id: "nav-top", label: "Back to top", group: "Navigation", icon: ArrowUp, keywords: "home hero start", perform: () => goToSection("top") },
      { id: "nav-about", label: "About", group: "Navigation", icon: User, keywords: "bio story journey", perform: () => goToSection("about") },
      { id: "nav-projects", label: "Projects", group: "Navigation", icon: Layers, keywords: "work portfolio", perform: () => goToSection("projects") },
      { id: "nav-skills", label: "Skills", group: "Navigation", icon: Wrench, keywords: "stack tools tech", perform: () => goToSection("skills") },
      { id: "nav-contact", label: "Contact", group: "Navigation", icon: Mail, keywords: "email reach message", perform: () => goToSection("contact") },
    ];

    const projectCmds: Command[] = projects.map((p) => ({
      id: `project-${p.slug}`,
      label: `Open ${p.name}`,
      group: "Projects",
      icon: Layers,
      keywords: `${p.name} ${p.coreStack.join(" ")} case study`,
      perform: () => navigate(`/projects/${p.slug}`),
    }));

    const themeCmds: Command[] = themes.map((t) => ({
      id: `theme-${t.id}`,
      label: `${t.name} accent`,
      group: "Theme",
      icon: Palette,
      keywords: `color theme accent ${t.name}`,
      swatch: t.hex,
      active: t.id === themeId,
      keepOpen: true,
      perform: () => setThemeId(t.id),
    }));

    const appearance: Command[] = [
      { id: "mode-system", label: "Match system", group: "Appearance", icon: Monitor, keywords: "auto theme mode os default", active: mode === "system", keepOpen: true, perform: () => setMode("system") },
      { id: "mode-light", label: "Light mode", group: "Appearance", icon: Sun, keywords: "bright day theme mode", active: mode === "light", keepOpen: true, perform: () => setMode("light") },
      { id: "mode-dark", label: "Dark mode", group: "Appearance", icon: Moon, keywords: "night dark theme mode", active: mode === "dark", keepOpen: true, perform: () => setMode("dark") },
    ];

    const connect: Command[] = [
      { id: "copy-email", label: "Copy email address", group: "Connect", icon: Copy, keywords: "clipboard mail", keepOpen: true, perform: copyEmail },
      { id: "email", label: "Send an email", group: "Connect", icon: Mail, keywords: "mailto contact write", perform: () => { window.location.href = `mailto:${EMAIL}`; } },
      { id: "github", label: "GitHub profile", group: "Connect", icon: GithubIcon, keywords: "code repos source zolender", perform: () => window.open(GITHUB, "_blank", "noopener") },
      { id: "linkedin", label: "LinkedIn profile", group: "Connect", icon: LinkedinIcon, keywords: "social network career", perform: () => window.open(LINKEDIN, "_blank", "noopener") },
    ];

    return [...nav, ...projectCmds, ...themeCmds, ...appearance, ...connect];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themes, themeId, mode, location.pathname]);

  // Filter by label + keywords (case-insensitive substring).
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        (c.keywords ?? "").toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q)
    );
  }, [query, commands]);

  // Reset state each time the palette opens; remember focus to restore on close.
  useEffect(() => {
    if (isOpen) {
      restoreFocusRef.current = document.activeElement as HTMLElement;
      setQuery("");
      setActive(0);
      setFeedback(null);
      // Focus the input after the entrance frame.
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      restoreFocusRef.current?.focus?.();
    }
  }, [isOpen]);

  // Keep the active row in range when the filtered list shrinks.
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  // Scroll the active row into view as the user arrows through.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function run(cmd: Command | undefined) {
    if (!cmd) return;
    cmd.perform();
    if (!cmd.keepOpen) close();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      // Trap focus inside the dialog — rows are arrow-navigated, not tabbed.
      e.preventDefault();
    }
  }

  // Group the filtered commands while preserving a flat index for keyboard nav.
  let flatIndex = -1;
  const groups = filtered.reduce<Record<string, { cmd: Command; index: number }[]>>(
    (acc, cmd) => {
      flatIndex += 1;
      (acc[cmd.group] ??= []).push({ cmd, index: flatIndex });
      return acc;
    },
    {}
  );

  const overlayMotion = reduced
    ? { initial: false as const, animate: {}, exit: {} }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.18 } },
        exit: { opacity: 0, transition: { duration: 0.12 } },
      };

  const panelMotion = reduced
    ? { initial: false as const, animate: {}, exit: {} }
    : {
        initial: { opacity: 0, y: -10, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
        exit: { opacity: 0, y: -6, scale: 0.985, transition: { duration: 0.12, ease: "easeIn" as const } },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cmd-overlay"
          {...overlayMotion}
          className="fixed inset-0 z-1000 flex items-start justify-center px-4 pt-[18vh] bg-canvas/70 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            key="cmd-panel"
            {...panelMotion}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-edge bg-surface/95 backdrop-blur-md shadow-2xl shadow-black/50"
            onKeyDown={onKeyDown}
          >
            {/* Search row */}
            <div className="flex items-center gap-3 px-4 border-b border-white/8">
              <Search className="w-4 h-4 text-muted shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
                className="w-full bg-transparent py-4 text-sm text-ink placeholder:text-muted focus:outline-none"
              />
              <kbd className="hidden sm:inline-block text-[10px] font-medium text-muted border border-edge rounded px-1.5 py-0.5 shrink-0">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} role="listbox" aria-label="Commands" className="max-h-[52vh] overflow-y-auto scrollbar-hide py-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-muted">No matches found.</p>
              ) : (
                Object.entries(groups).map(([group, items]) => (
                  <div key={group} className="mb-1 last:mb-0">
                    <p className="px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted/60">
                      {group}
                    </p>
                    {items.map(({ cmd, index }) => {
                      const Icon = cmd.icon;
                      const isActive = index === active;
                      return (
                        <div
                          key={cmd.id}
                          id={`cmd-${cmd.id}`}
                          data-index={index}
                          role="option"
                          aria-selected={isActive}
                          onMouseMove={() => setActive(index)}
                          onClick={() => run(cmd)}
                          className={`mx-2 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                            isActive ? "bg-accent/15 text-ink" : "text-muted"
                          }`}
                        >
                          {cmd.swatch ? (
                            <span
                              className="w-4 h-4 rounded-full shrink-0 ring-1 ring-white/15"
                              style={{ backgroundColor: cmd.swatch }}
                              aria-hidden
                            />
                          ) : (
                            <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-accent" : "text-muted"}`} />
                          )}
                          <span className="flex-1">{cmd.label}</span>
                          {cmd.active && <Check className="w-3.5 h-3.5 text-accent shrink-0" />}
                          {isActive && !cmd.active && (
                            <CornerDownLeft className="w-3.5 h-3.5 text-muted shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer hints / feedback */}
            <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-t border-white/8 text-[11px] text-muted">
              {feedback ? (
                <span className="flex items-center gap-1.5 text-accent" role="status" aria-live="polite">
                  <Check className="w-3 h-3" /> {feedback}
                </span>
              ) : (
                <>
                  <span className="hidden sm:flex items-center gap-3">
                    <span className="flex items-center gap-1"><kbd className="border border-edge rounded px-1">↑</kbd><kbd className="border border-edge rounded px-1">↓</kbd> navigate</span>
                    <span className="flex items-center gap-1"><kbd className="border border-edge rounded px-1">↵</kbd> select</span>
                  </span>
                  <span className="sm:hidden text-muted/70">Tap a command</span>
                </>
              )}
              <span className="hidden sm:flex items-center gap-1.5 text-muted/70">
                <Palette className="w-3 h-3" /> live theme
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
