import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

export function useMotion() {
  const reduced = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const stagger: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.05,
      },
    },
  };

  return { reduced, fadeUp, stagger };
}
