import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router";
import { Menu, X, Command } from "lucide-react";
import { useCommand } from "../providers/CommandProvider";
import { useMotion } from "../../hooks/useMotion";

const isMac =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

const links = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { open: openCommand } = useCommand();
  const { reduced } = useMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav link for whichever section is in view.
  // Only the home route has these sections; on sub-routes nothing is active.
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }
    const ids = links.map((l) => l.href.split("#")[1]);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      // A band across the middle of the viewport decides the "current" section.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <nav
        className={`fixed z-50 w-full flex items-center backdrop-blur-md border border-white/8 bg-surface/80 transition-all duration-300 ease-in-out ${
          scrolled
            ? "right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 max-w-14 md:max-w-88 top-6 rounded-full p-1 justify-center"
            : "left-1/2 -translate-x-1/2 max-w-full top-0 rounded-none px-6 md:px-8 py-4 justify-between"
        }`}
      >
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              key="brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <Link to="/" className="text-sm font-semibold text-ink shrink-0">
                Eben-Ezer Ndeingar
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const id = link.href.split("#")[1];
            const active = activeSection === id;
            return (
              <a
                key={link.label}
                href={link.href}
                aria-current={active ? "true" : undefined}
                className={`relative px-4 py-1.5 rounded-full text-sm transition-colors ${
                  active ? "text-ink" : "text-muted hover:text-ink hover:bg-raise"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-accent/15 ring-1 ring-accent/25"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 32 }
                    }
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
          {/* Command palette trigger — icon always, shortcut hint in the full bar */}
          <button
            onClick={openCommand}
            aria-label="Open command palette"
            className="ml-1 flex items-center gap-1.5 pl-3 pr-2.5 py-1.5 rounded-full text-sm text-muted hover:text-ink hover:bg-raise transition-colors"
          >
            <Command className="w-3.5 h-3.5" />
            {!scrolled && (
              <kbd className="text-[10px] font-medium tracking-wide">
                {isMac ? "⌘K" : "Ctrl K"}
              </kbd>
            )}
          </button>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className={`flex md:hidden w-9 h-9 rounded-full items-center justify-center text-muted hover:text-ink transition-colors shrink-0 ${
            scrolled ? "" : "bg-raise border border-edge"
          }`}
          aria-label="Toggle menu"
        >
          {menuOpen
            ? <X className="w-4 h-4" />
            : <Menu className="w-4 h-4" />
          }
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-canvas/75 backdrop-blur-sm md:hidden"
            />

            <motion.div
              key="menu"
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed top-20 right-4 z-50 w-56 bg-surface border border-edge rounded-2xl p-2 md:hidden"
            >
              {links.map((link) => {
                const id = link.href.split("#")[1];
                const active = activeSection === id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-current={active ? "true" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm transition-colors ${
                      active
                        ? "text-ink bg-accent/12"
                        : "text-muted hover:text-ink hover:bg-raise"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        active ? "bg-accent" : "bg-transparent"
                      }`}
                      aria-hidden
                    />
                    {link.label}
                  </a>
                );
              })}
              {/* Command palette — works great as a touch navigator too */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openCommand();
                }}
                className="mt-1 flex w-full items-center gap-2.5 px-4 py-3 rounded-xl text-sm text-muted hover:text-ink hover:bg-raise transition-colors border-t border-white/5"
              >
                <Command className="w-4 h-4" />
                Commands & search
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
