import { Fragment } from "react";
import { motion } from "framer-motion";
import { useMotion } from "../../hooks/useMotion";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

interface MaskedTextProps {
  text: string;
  className?: string;
  as?: Tag;
  /** "mount" animates immediately (hero); "inView" waits for scroll. */
  trigger?: "mount" | "inView";
  delay?: number;
  /** Seconds between each word. */
  wordStagger?: number;
}

/**
 * Words slide up from behind a clip mask, staggered. Each word sits in an
 * overflow-hidden wrapper so the rise is masked at the baseline. Falls back to
 * plain, fully-visible text when the user prefers reduced motion.
 */
export default function MaskedText({
  text,
  className = "",
  as = "span",
  trigger = "inView",
  delay = 0,
  wordStagger = 0.05,
}: MaskedTextProps) {
  const { reduced } = useMotion();
  const words = text.split(" ");

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{text}</Plain>;
  }

  const MotionTag = motion[as] as typeof motion.span;

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: wordStagger, delayChildren: delay },
    },
  };
  const wordVariant = {
    hidden: { y: "115%" },
    visible: {
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const animateProps =
    trigger === "mount"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-10% 0px -10% 0px" },
        };

  return (
    <MotionTag className={className} variants={container} {...animateProps} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            aria-hidden
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
          >
            <motion.span variants={wordVariant} className="inline-block">
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </MotionTag>
  );
}
