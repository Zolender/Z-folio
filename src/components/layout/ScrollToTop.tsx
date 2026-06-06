import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    const scrollTo = (state as Record<string, unknown> | null)?.scrollTo as string | undefined;
    if (scrollTo) {
      const id = setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: "instant" });
      }, 80);
      return () => clearTimeout(id);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
