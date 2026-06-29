import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useMotion } from "../../hooks/useMotion";

// "top" is the hero (no element id) — active when nothing else is in view.
const sections = [
  { id: "top", label: "Top" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function SectionRail() {
  const { pathname } = useLocation();
  const { reduced } = useMotion();
  const [active, setActive] = useState("top");

  useEffect(() => {
    if (pathname !== "/") return;
    const els = sections
      .filter((s) => s.id !== "top")
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));

    // Near the very top, snap the rail back to the hero dot.
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActive("top");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  function go(id: string) {
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
    if (id === "top") {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  }

  return (
    <nav
      aria-label="Section navigation"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-4"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            aria-label={`Go to ${s.label}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-2.5"
          >
            <span
              className={`text-xs transition-all duration-300 ${
                isActive
                  ? "text-ink opacity-100"
                  : "text-muted opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-2.5 bg-accent"
                  : "h-2 w-2 bg-muted/40 group-hover:bg-muted"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
