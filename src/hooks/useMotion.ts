import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

export function useMotion() {
  const reduced = useReducedMotion();

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: reduced ? 0 : 50,
      scale: reduced ? 1 : 0.88,
      rotateX: reduced ? 0 : 5,
      transformPerspective: 1000,
      transition: { duration: 0.25, ease: "easeIn" },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
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
