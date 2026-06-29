import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { Menu, X, Command } from "lucide-react";
import { useCommand } from "../providers/CommandProvider";

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
  const { open: openCommand } = useCommand();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-1.5 rounded-full text-sm text-muted hover:text-ink hover:bg-raise transition-colors"
            >
              {link.label}
            </a>
          ))}
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
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl text-sm text-muted hover:text-ink hover:bg-raise transition-colors"
                >
                  {link.label}
                </a>
              ))}
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
