import { Link } from "react-router";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full border border-(--color-border) bg-(--color-surface) backdrop-blur-sm">
      <Link to="/" className="text-(--color-text) font-semibold text-sm mr-4">
        Eben
      </Link>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="text-(--color-text-muted) hover:text-(--color-text) text-sm transition-colors"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
