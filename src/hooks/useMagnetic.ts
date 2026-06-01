import { useRef } from "react";
import { useMotionValue, useSpring, type SpringOptions } from "framer-motion";

const spring: SpringOptions = { stiffness: 220, damping: 18, mass: 0.6 };

export function useMagnetic(strength = 0.38) {
  const ref = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width / 2)) * strength);
    rawY.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return { ref, x, y, onMouseMove, onMouseLeave };
}
