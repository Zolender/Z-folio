import { motion } from "framer-motion";

interface StackTagProps {
  label: string;
  variant?: "core" | "supporting" | "learning";
}

export default function StackTag({ label, variant = "supporting" }: StackTagProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`inline-block px-3.5 py-1.5 text-sm rounded-full border transition-colors select-none ${
        variant === "core"
          ? "bg-accent/12 border-accent/45 text-accent-text"
          : variant === "learning"
          ? "bg-surface/50 border-line text-muted/70 italic"
          : "bg-surface/50 border-line text-muted hover:text-ink hover:border-accent/35"
      }`}
    >
      {label}
    </motion.span>
  );
}
