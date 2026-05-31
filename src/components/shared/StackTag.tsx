interface StackTagProps {
  label: string;
  variant?: "core" | "supporting";
}

export default function StackTag({ label, variant = "supporting" }: StackTagProps) {
  return (
    <span
      className={`inline-block px-3 py-1 text-sm rounded-full border text-muted ${
        variant === "core" ? "border-accent" : "border-edge"
      }`}
    >
      {label}
    </span>
  );
}
