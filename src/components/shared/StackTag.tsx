interface StackTagProps {
  label: string;
  variant?: "core" | "supporting";
}

export default function StackTag({ label, variant = "supporting" }: StackTagProps) {
  const borderColor = variant === "core"
              ? "border-(--color-accent)"
              : "border-(--color-border)"

  return (
    <span
      className={`inline-block px-3 py-1 text-sm rounded-full border ${borderColor} text-(--color-text-muted)`}
    >
      {label}
    </span>
  );
}
