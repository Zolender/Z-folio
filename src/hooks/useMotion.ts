import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

export type FromDirection =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

function getOffsets(from: FromDirection): { x: number; y: number } {
  const l = 70;
  const d = 50;
  const map: Record<FromDirection, { x: number; y: number }> = {
    right:         { x: l,  y: 0  },
    left:          { x: -l, y: 0  },
    bottom:        { x: 0,  y: l  },
    top:           { x: 0,  y: -l },
    "top-right":   { x: d,  y: -d },
    "top-left":    { x: -d, y: -d },
    "bottom-right":{ x: d,  y: d  },
    "bottom-left": { x: -d, y: d  },
  };
  return map[from];
}

export function useMotion() {
  const reduced = useReducedMotion();

  function makeVariant(from: FromDirection = "bottom"): Variants {
    const { x, y } = getOffsets(from);
    const hasY = y !== 0;

    const hiddenTransition = { duration: 0.25, ease: "easeIn" as const };
    const visibleTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

    return {
      hidden: {
        opacity: 0,
        x: reduced ? 0 : x,
        y: reduced ? 0 : y,
        scale: reduced ? 1 : 0.9,
        rotateX: reduced ? 0 : hasY ? (y > 0 ? 5 : -5) : 0,
        transformPerspective: 1000,
        transition: hiddenTransition,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: visibleTransition,
      },
      past: {
        opacity: 0,
        x: reduced ? 0 : -x,
        y: reduced ? 0 : -y,
        scale: reduced ? 1 : 0.9,
        rotateX: reduced ? 0 : hasY ? (y > 0 ? -5 : 5) : 0,
        transformPerspective: 1000,
        transition: hiddenTransition,
      },
    };
  }

  const fadeUp = makeVariant("bottom");

  const stagger: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.05 },
    },
  };

  return { reduced, fadeUp, stagger, makeVariant };
}
