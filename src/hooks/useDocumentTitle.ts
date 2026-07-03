import { useEffect } from "react";

const BASE = "Eben-Ezer Ndeingar — Full-Stack Developer";

// Sets document.title for the mounted page and restores the base title
// on unmount, so each route (and shared links) reads correctly.
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Eben-Ezer Ndeingar` : BASE;
    return () => {
      document.title = BASE;
    };
  }, [title]);
}
