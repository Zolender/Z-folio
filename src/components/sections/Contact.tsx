import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../shared/BrandIcons";
import SectionWrapper from "../shared/SectionWrapper";
import { useMotion } from "../../hooks/useMotion";
import { contact } from "../../data/content";

type IconComponent = React.ComponentType<{ className?: string }>;

function getLinkIcon(href: string): IconComponent {
  if (href.startsWith("mailto:")) return Mail;
  if (href.includes("linkedin")) return LinkedinIcon;
  return GithubIcon;
}

export default function Contact() {
  const { reduced, fadeUp } = useMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const fieldStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.09,
        delayChildren: reduced ? 0 : 0.35,
      },
    },
    past: {},
  };

  const linkStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.08,
        delayChildren: reduced ? 0 : 0.5,
      },
    },
    past: {},
  };

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
    <SectionWrapper id="contact" from="right">
      <div className="max-w-3xl mx-auto w-full">
        <motion.p
          variants={fadeUp}
          className="text-xs tracking-widest uppercase text-muted mb-4"
        >
          Contact
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="text-muted mb-10 max-w-lg leading-relaxed"
        >
          {contact.opening}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <motion.div variants={fieldStagger} className="flex flex-col gap-4">
              <motion.div variants={fadeUp}>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface/60 backdrop-blur-sm border border-white/6 text-ink placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors"
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface/60 backdrop-blur-sm border border-white/6 text-ink placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors"
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-surface/60 backdrop-blur-sm border border-white/6 text-ink placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors resize-none"
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full px-6 py-3 rounded-full bg-accent text-canvas font-semibold text-sm hover:bg-accent-dim transition-colors disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send"}
                </button>
              </motion.div>
            </motion.div>
            {status === "sent" && (
              <p className="text-sm text-accent">Message sent.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Try emailing directly.
              </p>
            )}
          </form>

          <motion.div
            variants={linkStagger}
            className="flex flex-col gap-5 text-sm"
          >
            {contact.links.map((link) => {
              const Icon = getLinkIcon(link.href);
              return (
                <motion.a
                  key={link.label}
                  variants={fadeUp}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noreferrer"}
                  className="flex items-center gap-3 text-muted hover:text-ink transition-colors"
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.label}</span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
