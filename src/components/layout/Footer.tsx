export default function Footer() {
  return (
    <footer className="w-full px-6 py-8 border-t border-[var(--color-border)] flex items-center justify-between text-sm text-[var(--color-text-muted)]">
      <span>Eben-Ezer Ndeingar</span>
      <div className="flex gap-6">
        <a href="https://github.com/Zolender" target="_blank" rel="noreferrer" className="hover:text-[var(--color-text)] transition-colors">GitHub</a>
        <a href="https://linkedin.com/in/eben-ezer-ndeingar" target="_blank" rel="noreferrer" className="hover:text-[var(--color-text)] transition-colors">LinkedIn</a>
        <a href="mailto:ndeingare@gmail.com" className="hover:text-[var(--color-text)] transition-colors">Email</a>
      </div>
    </footer>
  );
}
