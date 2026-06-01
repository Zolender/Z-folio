import { motion } from "framer-motion";
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

  if (noAnimation) {
    return (
      <section id={id} className={`w-full px-6 py-24 ${className}`}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={`w-full px-6 py-24 ${className}`}
      variants={makeVariant(from)}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "0px 0px -150px 0px" }}
    >
      {children}
    </motion.section>
  );
}
