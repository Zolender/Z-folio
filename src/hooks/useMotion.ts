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
  const h = 180;
  const v = 100;
  const dx = 120;
  const dy = 100;

  const map: Record<FromDirection, { x: number; y: number }> = {
    right:          { x: h,   y: 0  },
    left:           { x: -h,  y: 0  },
    bottom:         { x: 0,   y: v  },
    top:            { x: 0,   y: -v },
    "top-right":    { x: dx,  y: -dy },
    "top-left":     { x: -dx, y: -dy },
    "bottom-right": { x: dx,  y: dy  },
    "bottom-left":  { x: -dx, y: dy  },
  };
  return map[from];
}

export function useMotion() {
  const reduced = useReducedMotion();

  function makeVariant(from: FromDirection = "bottom"): Variants {
    const { x, y } = getOffsets(from);
    const hasY = y !== 0;

    const hiddenTransition = { duration: 0.3, ease: "easeIn" as const };
    const visibleTransition = {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    };

    return {
      hidden: {
        opacity: 0,
        x: reduced ? 0 : x,
        y: reduced ? 0 : y,
        scale: reduced ? 1 : 0.80,
        rotateX: reduced ? 0 : hasY ? (y > 0 ? 15 : -15) : 0,
        transformPerspective: 1200,
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
        scale: reduced ? 1 : 0.80,
        rotateX: reduced ? 0 : hasY ? (y > 0 ? -15 : 15) : 0,
        transformPerspective: 1200,
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
