import { NextResponse } from "next/server";
import {
  buildRentalAdminEmail,
  buildRentalVisitorEmail,
  type RentalBookingPayload,
} from "@/lib/emails/rental-templates";
import { emailConfig, getTransporter } from "@/lib/emails/transporter";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[\d\s()+.-]{7,30}$/;
const NAME_RE = /^[a-zA-ZÀ-ÿ\s'-]{2,120}$/;
const ALLOWED_ORIGINS = [
  "https://www.eiden-group.com",
  "https://eiden-group.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://marouanes-macbook-pro.tail17d4b9.ts.net",
];

function clean(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, max);
}

function cleanMultiline(value: unknown, max: number): string {
  return String(value ?? "").replace(/\r\n/g, "\n").trim().slice(0, max);
}

function auditLog(event: string, ip: string, details: Record<string, unknown> = {}) {
  console.log(JSON.stringify({ ts: new Date().toISOString(), event, ip, ...details }));
}

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  if (isRateLimited(`rental:${ip}`)) {
    auditLog("rate_limited", ip);
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    auditLog("bad_request", ip);
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  if (body.website && String(body.website).trim() !== "") {
    auditLog("honeypot_triggered", ip);
    return NextResponse.json({ ok: true });
  }

  const formLoadedAt = Number(body.formLoadedAt);
  const now = Date.now();
  if (
    !formLoadedAt ||
    formLoadedAt > now ||
    now - formLoadedAt < 1500 ||
    String(body.jsChallenge ?? "") !== String(formLoadedAt)
  ) {
    auditLog("time_trap_failed", ip);
    return NextResponse.json({ ok: true });
  }

  const csrfToken = String(body.csrfToken ?? "");
  if (!csrfToken || csrfToken.length < 10) {
    auditLog("csrf_failed", ip);
    return NextResponse.json({ ok: true });
  }

  const origin = request.headers.get("origin") ?? "";
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    auditLog("origin_rejected", ip, { origin });
    return NextResponse.json({ ok: true });
  }

  const locale = body.locale === "en" ? "en" : "fr";
  const rawSessions = Array.isArray(body.sessions) ? body.sessions : [];
  const sessions = rawSessions
    .map((entry) => {
      const record = (entry ?? {}) as Record<string, unknown>;
      return {
        dateLabel: clean(record.dateLabel, 120),
        timeLabel: clean(record.timeLabel, 60),
      };
    })
    .filter((session) => session.dateLabel || session.timeLabel)
    .slice(0, 10);
  /* Backward compatibility: a single dateLabel/timeLabel pair is treated as one session. */
  if (sessions.length === 0 && (body.dateLabel || body.timeLabel)) {
    sessions.push({
      dateLabel: clean(body.dateLabel, 120),
      timeLabel: clean(body.timeLabel, 60),
    });
  }

  const payload: RentalBookingPayload = {
    name: clean(body.name, 120),
    company: clean(body.company, 160),
    email: clean(body.email, 254).toLowerCase(),
    phone: clean(body.phone, 40),
    packageName: clean(body.packageName, 160),
    sessions,
    participants: clean(body.participants, 10),
    message: cleanMultiline(body.message, 4000),
    locale,
  };

  const errors: Record<string, string> = {};
  if (!payload.name) errors.name = "required";
  else if (!NAME_RE.test(payload.name)) errors.name = "invalid";
  if (!payload.email) errors.email = "required";
  else if (!EMAIL_RE.test(payload.email)) errors.email = "invalid";
  if (!payload.phone) errors.phone = "required";
  else if (!PHONE_RE.test(payload.phone)) errors.phone = "invalid";
  if (!payload.packageName) errors.packageName = "required";
  if (!payload.sessions.length || payload.sessions.every((session) => !session.dateLabel)) {
    errors.sessions = "required";
  }

  if (Object.keys(errors).length > 0) {
    auditLog("validation_failed", ip, { errors });
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  let transporter;
  try {
    transporter = getTransporter();
  } catch {
    auditLog("not_configured", ip);
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const { from, admin } = emailConfig();
  const adminMail = buildRentalAdminEmail(payload);
  const visitorMail = buildRentalVisitorEmail(payload);

  try {
    await transporter.sendMail({
      from,
      to: admin,
      replyTo: `"${payload.name.replace(/"/g, "")}" <${payload.email}>`,
      subject: adminMail.subject,
      text: adminMail.text,
      html: adminMail.html,
      attachments: adminMail.attachments,
    });

    try {
      await transporter.sendMail({
        from,
        to: payload.email,
        replyTo: admin,
        subject: visitorMail.subject,
        text: visitorMail.text,
        html: visitorMail.html,
        attachments: visitorMail.attachments,
      });
    } catch (error) {
      console.error("[rental] visitor confirmation failed", error);
    }

    auditLog("submission_accepted", ip, {
      email: payload.email,
      package: payload.packageName,
      sessions: payload.sessions.length,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[rental] send failed", error);
    auditLog("send_failed", ip);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
