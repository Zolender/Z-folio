import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

export type FromDirection = "bottom" | "top" | "left" | "right";

export function useMotion() {
  const reduced = useReducedMotion();

  function makeVariant(from: FromDirection = "bottom"): Variants {
    const isVertical = from === "bottom" || from === "top";
    const offset = isVertical ? 50 : 80;

    const x = from === "right" ? offset : from === "left" ? -offset : 0;
    const y = from === "bottom" ? offset : from === "top" ? -offset : 0;

    return {
      hidden: {
        opacity: 0,
        x: reduced ? 0 : x,
        y: reduced ? 0 : y,
        scale: reduced ? 1 : 0.9,
        rotateX: reduced || !isVertical ? 0 : from === "bottom" ? 5 : -5,
        transformPerspective: 1000,
        transition: { duration: 0.25, ease: "easeIn" },
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      },
    };
  }

  const fadeUp = makeVariant("bottom");

  const stagger: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.05,
      },
    },
  };

  return { reduced, fadeUp, stagger, makeVariant };
}
