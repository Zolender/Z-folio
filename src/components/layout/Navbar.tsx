import { Link } from "react-router";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-2 rounded-full border border-(--color-border) bg-(--color-surface)/90 backdrop-blur-md">
      <Link
        to="/"
        className="px-4 py-1.5 rounded-full text-sm font-semibold text-(--color-text) hover:bg-(--color-surface-lift) transition-colors"
      >
        Eben
      </Link>

      <div className="w-px h-4 bg-(--color-border) mx-1" />

      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="px-4 py-1.5 rounded-full text-sm text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-surface-lift) transition-colors"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
