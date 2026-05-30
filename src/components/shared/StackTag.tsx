interface StackTagProps {
  label: string;
  variant?: "core" | "supporting";
}

export default function StackTag({ label, variant = "supporting" }: StackTagProps) {
  const borderColor =
    variant === "core"
      ? "border-[var(--color-accent)]"
      : "border-[var(--color-border)]";

  return (
    <span
      className={`inline-block px-3 py-1 text-sm rounded-full border ${borderColor} text-[var(--color-text-muted)]`}
    >
      {label}
    </span>
  );
}
