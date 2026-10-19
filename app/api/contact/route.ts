import { NextResponse } from "next/server";
import {
  buildAdminEmail,
  buildVisitorEmail,
  type ContactPayload,
} from "@/lib/emails/contact-templates";
import { emailConfig, getTransporter } from "@/lib/emails/transporter";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[\d\s()+-]{7,20}$/;
const NAME_RE = /^[a-zA-ZÀ-ÿ\s'-]{2,120}$/;
const ALLOWED_ORIGINS = [
  "https://www.eiden-group.com",
  "https://eiden-group.com",
  "http://localhost:3000",
];

function clean(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, max);
}

function cleanMultiline(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, max);
}

function auditLog(
  event: string,
  ip: string,
  details: Record<string, unknown> = {},
) {
  console.log(
    JSON.stringify({
      ts: new Date().toISOString(),
      event,
      ip,
      ...details,
    }),
  );
}

export async function POST(request: Request) {
  const ip = clientIp(request.headers);

  // Basic abuse guard before doing any work.
  if (isRateLimited(`contact:${ip}`)) {
    auditLog("rate_limited", ip);
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    auditLog("bad_request", ip);
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: bots fill it, humans never see it.
  if (body.website && String(body.website).trim() !== "") {
    auditLog("honeypot_triggered", ip);
    return NextResponse.json({ ok: true });
  }

  // Time-trap + JS challenge: bots submit instantly without executing JS.
  // Silently accept to avoid tipping off bots that they've been detected.
  const formLoadedAt = Number(body.formLoadedAt);
  const jsChallenge = String(body.jsChallenge ?? "");
  const now = Date.now();
  if (
    !formLoadedAt ||
    formLoadedAt > now ||
    now - formLoadedAt < 2000 ||
    jsChallenge !== String(formLoadedAt)
  ) {
    auditLog("time_trap_or_js_challenge_failed", ip);
    return NextResponse.json({ ok: true });
  }

  // CSRF token: must be present and non-empty.
  const csrfToken = String(body.csrfToken ?? "");
  if (!csrfToken || csrfToken.length < 10) {
    auditLog("csrf_failed", ip);
    return NextResponse.json({ ok: true });
  }

  // Origin check: reject cross-origin form submissions.
  const origin = request.headers.get("origin") ?? "";
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    auditLog("origin_rejected", ip, { origin });
    return NextResponse.json({ ok: true });
  }

  const locale = body.locale === "en" ? "en" : "fr";
  const data: ContactPayload = {
    name: clean(body.name, 120),
    company: clean(body.company, 160),
    email: clean(body.email, 254).toLowerCase(),
    phone: clean(body.phone, 40),
    subject: clean(body.subject, 120),
    subjectDetail: clean(body.subjectDetail, 160),
    message: cleanMultiline(body.message, 4000),
    locale,
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "required";
  else if (!NAME_RE.test(data.name)) errors.name = "invalid";
  if (!data.company) errors.company = "required";
  if (!data.email) errors.email = "required";
  else if (!EMAIL_RE.test(data.email)) errors.email = "invalid";
  if (!data.phone) errors.phone = "required";
  else if (!PHONE_RE.test(data.phone)) errors.phone = "invalid";
  if (!data.subject) errors.subject = "required";

  // Message content check: reject if it looks like spam (too many links).
  const messageStr = data.message ?? "";
  const linkCount = (messageStr.match(/https?:\/\//g) ?? []).length;
  if (linkCount > 5) {
    auditLog("spam_detected", ip, { linkCount });
    return NextResponse.json({ ok: true });
  }

  if (Object.keys(errors).length > 0) {
    auditLog("validation_failed", ip, { errors });
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  let transporter;
  try {
    transporter = getTransporter();
  } catch {
    console.error("[contact] email transport not configured");
    auditLog("not_configured", ip);
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const { from, admin } = emailConfig();
  const adminMail = buildAdminEmail(data);
  const visitorMail = buildVisitorEmail(data);

  try {
    // Admin notification first (critical); visitor confirmation is best-effort.
    await transporter.sendMail({
      from,
      to: admin,
      replyTo: `"${data.name.replace(/"/g, "")}" <${data.email}>`,
      subject: adminMail.subject,
      text: adminMail.text,
      html: adminMail.html,
      attachments: adminMail.attachments,
    });

    try {
      await transporter.sendMail({
        from,
        to: data.email,
        replyTo: admin,
        subject: visitorMail.subject,
        text: visitorMail.text,
        html: visitorMail.html,
        attachments: visitorMail.attachments,
      });
    } catch (visitorError) {
      // The lead is already delivered to the inbox; don't fail the request.
      console.error("[contact] visitor confirmation failed", visitorError);
    }

    auditLog("submission_accepted", ip, {
      name: data.name,
      company: data.company,
      email: data.email,
      subject: data.subject,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] send failed", error);
    auditLog("send_failed", ip);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}

/* Dev-only visual QA for the branded templates:
   /api/contact/preview?kind=admin|visitor&locale=fr|en */
export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  const url = new URL(request.url);
  const kind = url.searchParams.get("kind") === "visitor" ? "visitor" : "admin";
  const locale = url.searchParams.get("locale") === "en" ? "en" : "fr";

  const sample: ContactPayload = {
    name: "Yasmine El Fassi",
    company: "Maison Atlas",
    email: "yasmine@maison-atlas.ma",
    phone: "+212 661 234 567",
    subject: locale === "en" ? "Website or application" : "Site web ou application",
    subjectDetail: locale === "en" ? "Booking site" : "Site vitrine + réservation",
    message:
      locale === "en"
        ? "We run a guesthouse in Taghazout and need a booking site before December."
        : "Nous gérons une maison d'hôtes à Taghazout et voulons un site avec réservation avant décembre.",
    locale,
  };

  const built = kind === "visitor" ? buildVisitorEmail(sample) : buildAdminEmail(sample);
  // A browser cannot follow `cid:`; show the attached images in place instead.
  const html = built.attachments.reduce(
    (page, image) =>
      page.replaceAll(`cid:${image.cid}`, `data:${image.contentType};base64,${image.content}`),
    built.html,
  );
  return new NextResponse(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
