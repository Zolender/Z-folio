import { useRef, useState, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import type { ReactNode } from "react";
import { useMotion, type FromDirection } from "../../hooks/useMotion";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  noAnimation?: boolean;
  from?: FromDirection;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  noAnimation = false,
  from = "bottom",
}: SectionWrapperProps) {
  const { makeVariant } = useMotion();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -120px 0px" });
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      setHasBeenVisible(true);
      controls.start("visible");
    } else if (hasBeenVisible) {
      controls.start("past");
    }
  }, [isInView]);

  if (noAnimation) {
    return (
      <section id={id} className={`w-full px-6 py-36 ${className}`}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`w-full px-6 py-36 ${className}`}
      initial="hidden"
      animate={controls}
      variants={makeVariant(from)}
    >
      {children}
    </motion.section>
  );
}
