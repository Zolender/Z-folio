import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.FROM_EMAIL ?? "onboarding@resend.dev";
const TO = "ndeingare@gmail.com";

//  Escape HTML special characters to prevent injection in the email body
function esc(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Portfolio contact — ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;color:#1a1a1a">
        <p style="margin:0 0 8px"><strong>Name:</strong> ${esc(name)}</p>
        <p style="margin:0 0 20px"><strong>From:</strong> ${esc(email)}</p>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:0 0 20px"/>
        <p style="white-space:pre-wrap;margin:0">${esc(message)}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }

  return res.status(200).json({ ok: true });
}
