import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../shared/BrandIcons";

export default function Footer() {
  return (
    <footer className="w-full px-8 py-8 border-t border-edge flex items-center justify-between text-sm text-muted">
      <span>Eben-Ezer Ndeingar</span>
      <div className="flex items-center gap-6">
        <a
          href="https://github.com/Zolender"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-ink transition-colors"
        >
          <GithubIcon className="w-4 h-4" />
          <span>GitHub</span>
        </a>
        <a
          href="https://linkedin.com/in/eben-ezer-ndeingar"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-ink transition-colors"
        >
          <LinkedinIcon className="w-4 h-4" />
          <span>LinkedIn</span>
        </a>
        <a
          href="mailto:ndeingare@gmail.com"
          className="flex items-center gap-2 hover:text-ink transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span>Email</span>
        </a>
      </div>
    </footer>
  );
}
