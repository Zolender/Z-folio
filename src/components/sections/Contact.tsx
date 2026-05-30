import { useState } from "react";
import SectionWrapper from "../shared/SectionWrapper";

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
    <SectionWrapper id="contact" className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-4">
        Contact
      </h2>
      <p className="text-[var(--color-text-muted)] mb-10 max-w-lg">
        I'm open to opportunities, collaborations, or just a conversation about
        something you're building. The best way to reach me is by email, but all
        the links below work.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Message"
            required
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-6 py-3 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold text-sm hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send"}
          </button>
          {status === "sent" && (
            <p className="text-sm text-[var(--color-accent)]">Message sent.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">Something went wrong. Try emailing directly.</p>
          )}
        </form>

        <div className="flex flex-col gap-4 text-sm text-[var(--color-text-muted)]">
          <a href="mailto:ndeingare@gmail.com" className="hover:text-[var(--color-text)] transition-colors">
            ndeingare@gmail.com
          </a>
          <a href="https://linkedin.com/in/eben-ezer-ndeingar" target="_blank" rel="noreferrer" className="hover:text-[var(--color-text)] transition-colors">
            LinkedIn
          </a>
          <a href="https://github.com/Zolender" target="_blank" rel="noreferrer" className="hover:text-[var(--color-text)] transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
