export default function Footer() {
  return (
    <footer className="w-full px-8 py-8 border-t border-edge flex items-center justify-between text-sm text-muted">
      <span>Eben-Ezer Ndeingar</span>
      <div className="flex gap-6">
        <a href="https://github.com/Zolender" target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">GitHub</a>
        <a href="https://linkedin.com/in/eben-ezer-ndeingar" target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">LinkedIn</a>
        <a href="mailto:ndeingare@gmail.com" className="hover:text-ink transition-colors">Email</a>
      </div>
    </footer>
  );
}
