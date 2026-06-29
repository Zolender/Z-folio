import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotion } from "../../hooks/useMotion";

const INTERACTIVE = "a, button, [role='button'], [role='option'], label, [data-cursor]";

export default function Cursor() {
  const { reduced } = useMotion();
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const x = useSpring(rawX, { stiffness: 700, damping: 42, mass: 0.18 });
  const y = useSpring(rawY, { stiffness: 700, damping: 42, mass: 0.18 });

  useEffect(() => {
    // Only activate on true pointer devices (desktop/mouse)
    if (!window.matchMedia("(pointer: fine)").matches || reduced) return;
    setMounted(true);

    function onMove(e: MouseEvent) {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      const el = e.target as Element;
      setHovering(!!el.closest(INTERACTIVE));
    }

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-1100"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      aria-hidden
    >
      {/* Filled dot — default state */}
      <motion.div
        className="absolute rounded-full bg-accent"
        style={{ top: "50%", left: "50%", translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hovering ? 4 : 8, height: hovering ? 4 : 8, opacity: hovering ? 0.4 : 0.85 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      />
      {/* Ring — hover state */}
      <motion.div
        className="absolute rounded-full border border-accent"
        style={{ top: "50%", left: "50%", translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hovering ? 30 : 0, height: hovering ? 30 : 0, opacity: hovering ? 0.65 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      />
    </motion.div>
  );
}
