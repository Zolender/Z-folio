import { useState, useEffect } from "react";
import { Link } from "react-router";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
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
      className="fixed z-50 left-1/2 -translate-x-1/2 w-full flex items-center backdrop-blur-md border border-(--color-border) bg-(--color-surface)/90 transition-all duration-300 ease-in-out"
      style={{
        maxWidth: scrolled ? "520px" : "100%",
        top: scrolled ? "24px" : "0px",
        borderRadius: scrolled ? "9999px" : "0px",
        padding: scrolled ? "8px" : "16px 32px",
        justifyContent: scrolled ? "center" : "space-between",
      }}
    >
      {!scrolled && (
        <Link
          to="/"
          className="text-sm font-semibold text-(--color-text) shrink-0"
        >
          Eben-Ezer Ndeingar
        </Link>
      )}

      <div className="flex items-center gap-1">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="px-4 py-1.5 rounded-full text-sm text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-surface-lift) transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
