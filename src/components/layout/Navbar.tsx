import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const links = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed z-50 left-1/2 -translate-x-1/2 w-full flex items-center backdrop-blur-md border border-edge bg-surface/90 transition-all duration-300 ease-in-out ${
        scrolled
          ? "max-w-88 top-6 rounded-full p-1 justify-center"
          : "max-w-full top-0 rounded-none px-8 py-4 justify-between"
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

      <div className="flex items-center gap-1">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="px-4 py-1.5 rounded-full text-sm text-muted hover:text-ink hover:bg-raise transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
