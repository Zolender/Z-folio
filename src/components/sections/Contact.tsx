import { useState } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../shared/BrandIcons";
import SectionWrapper from "../shared/SectionWrapper";
import { contact } from "../../data/content";

type IconComponent = React.ComponentType<{ className?: string }>;

function getLinkIcon(href: string): IconComponent {
  if (href.startsWith("mailto:")) return Mail;
  if (href.includes("linkedin")) return LinkedinIcon;
  return GithubIcon;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <SectionWrapper id="contact">
      <div className="max-w-3xl mx-auto w-full">
        <p className="text-xs tracking-widest uppercase text-muted mb-4">
          Contact
        </p>
        <p className="text-muted mb-10 max-w-lg leading-relaxed">
          {contact.opening}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full px-4 py-3 rounded-xl bg-surface border border-edge text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-3 rounded-xl bg-surface border border-edge text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-edge text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-6 py-3 rounded-full bg-accent text-canvas font-semibold text-sm hover:bg-accent-dim transition-colors disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send"}
            </button>
            {status === "sent" && (
              <p className="text-sm text-accent">Message sent.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Try emailing directly.
              </p>
            )}
          </form>

          <div className="flex flex-col gap-5 text-sm">
            {contact.links.map((link) => {
              const Icon = getLinkIcon(link.href);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noreferrer"}
                  className="flex items-center gap-3 text-muted hover:text-ink transition-colors"
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
