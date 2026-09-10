import nodemailer, { type Transporter } from "nodemailer";

let cached: Transporter | null = null;

export function getTransporter(): Transporter {
  if (cached) return cached;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Email is not configured (missing SMTP_HOST / SMTP_USER / SMTP_PASS).",
    );
  }

  cached = nodemailer.createTransport({
    host,
    port: Number.isFinite(port) ? port : 587,
    secure: (Number.isFinite(port) ? port : 587) === 465,
    requireTLS: (Number.isFinite(port) ? port : 587) === 587,
    auth: { user, pass },
    // Hostinger SMTP is fine with short timeouts on Vercel.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  return cached;
}

export function emailConfig() {
  return {
    from: process.env.FROM_EMAIL ?? process.env.SMTP_USER ?? "contact@eiden-group.com",
    admin: process.env.ADMIN_EMAIL ?? process.env.FROM_EMAIL ?? "contact@eiden-group.com",
  };
}
