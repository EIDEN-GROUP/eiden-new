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

export async function POST(request: Request) {
  // Basic abuse guard before doing any work.
  if (isRateLimited(`contact:${clientIp(request.headers)}`)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: bots fill it, humans never see it.
  if (body.website && String(body.website).trim() !== "") {
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
  if (!data.company) errors.company = "required";
  if (!data.email) errors.email = "required";
  else if (!EMAIL_RE.test(data.email)) errors.email = "invalid";
  if (!data.phone) errors.phone = "required";
  if (!data.subject) errors.subject = "required";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  let transporter;
  try {
    transporter = getTransporter();
  } catch {
    console.error("[contact] email transport not configured");
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
    });

    try {
      await transporter.sendMail({
        from,
        to: data.email,
        replyTo: admin,
        subject: visitorMail.subject,
        text: visitorMail.text,
        html: visitorMail.html,
      });
    } catch (visitorError) {
      // The lead is already delivered to the inbox; don't fail the request.
      console.error("[contact] visitor confirmation failed", visitorError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] send failed", error);
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
  return new NextResponse(built.html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
