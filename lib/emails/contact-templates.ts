import { siteConfig } from "@/lib/data/site";

export type ContactLocale = "fr" | "en";

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  subjectDetail?: string;
  message?: string;
  locale: ContactLocale;
};

export type BuiltEmail = {
  subject: string;
  html: string;
  text: string;
};

/* Brand tokens mirrored from app/globals.css (emails need inline styles). */
const C = {
  canvas: "#FEFDFB",
  beige: "#F4EBD0",
  beigeDk: "#E3D3A8",
  forest: "#122620",
  teal: "#0E7A73",
  tealDk: "#0C5752",
  gold: "#DAA520",
  inkSoft: "rgba(18,38,32,0.65)",
  inkFaint: "rgba(18,38,32,0.45)",
  canvasDim: "rgba(254,253,251,0.65)",
} as const;

const SANS =
  "'Inter', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const DISPLAY =
  "'Outfit', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function shell(opts: {
  lang: ContactLocale;
  eyebrow: string;
  title: string;
  intro: string;
  bodyRows: string;
  footerNote: string;
}): string {
  const { lang, eyebrow, title, intro, bodyRows, footerNote } = opts;
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.beige};font-family:${SANS};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(intro)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${C.beige};margin:0;padding:0;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;background-color:${C.canvas};border:1px solid ${C.beigeDk};border-radius:16px;overflow:hidden;">
<tr><td style="background-color:${C.forest};padding:28px 32px 24px 32px;">
<p style="margin:0;font-family:${DISPLAY};font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${C.gold};">Eiden&nbsp;Group</p>
<p style="margin:10px 0 0 0;font-family:${DISPLAY};font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:${C.canvasDim};">${escapeHtml(eyebrow)}</p>
<h1 style="margin:12px 0 0 0;font-family:${DISPLAY};font-size:24px;line-height:1.2;font-weight:800;letter-spacing:-0.01em;color:${C.canvas};">${escapeHtml(title)}</h1>
<div style="margin-top:16px;height:3px;width:56px;background-color:${C.gold};border-radius:999px;">&nbsp;</div>
</td></tr>
<tr><td style="padding:28px 32px 8px 32px;">
<p style="margin:0;font-size:14px;line-height:1.7;color:${C.inkSoft};">${escapeHtml(intro)}</p>
</td></tr>
<tr><td style="padding:16px 32px 8px 32px;">${bodyRows}</td></tr>
<tr><td style="padding:20px 32px 32px 32px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td align="center" style="background-color:${C.forest};border-radius:12px;padding:16px 20px;">
<a href="mailto:${siteConfig.email}" style="font-family:${DISPLAY};font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${C.canvas};text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
<p style="margin:6px 0 0 0;font-size:12px;color:${C.canvasDim};">${escapeHtml(siteConfig.phoneMa)} &middot; ${escapeHtml(siteConfig.address)}</p>
</td></tr>
</table>
<p style="margin:16px 0 0 0;font-size:12px;line-height:1.6;color:${C.inkFaint};text-align:center;">${escapeHtml(footerNote)}</p>
</td></tr>
</table>
<p style="margin:16px 0 0 0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${C.inkFaint};font-family:${DISPLAY};text-align:center;">L&agrave; o&ugrave; le chaos devient architecture</p>
</td></tr>
</table>
</div>
</body>
</html>`;
}

function fieldRow(label: string, value: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 10px 0;background-color:#FFFFFF;border:1px solid ${C.beigeDk};border-radius:10px;">
<tr><td style="padding:12px 16px;">
<p style="margin:0;font-family:${DISPLAY};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${C.tealDk};">${escapeHtml(label)}</p>
<p style="margin:6px 0 0 0;font-size:14px;line-height:1.6;color:${C.forest};word-break:break-word;">${escapeHtml(value)}</p>
</td></tr>
</table>`;
}

function subjectPill(subject: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px 0;">
<tr><td style="background-color:${C.teal};border-radius:999px;padding:8px 18px;">
<span style="font-family:${DISPLAY};font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${C.canvas};">${escapeHtml(subject)}</span>
</td></tr>
</table>`;
}

const copy = {
  fr: {
    adminEyebrow: "Nouvelle demande site web",
    adminTitle: "Nouvelle demande de contact",
    visitorEyebrow: "Eiden Group confirmation",
    visitorTitle: "Merci, message bien reçu",
    labels: {
      name: "Nom complet",
      company: "Entreprise",
      email: "Adresse e-mail",
      phone: "Téléphone",
      detail: "Précision du besoin",
      message: "Message",
    },
  },
  en: {
    adminEyebrow: "New request website",
    adminTitle: "New contact request",
    visitorEyebrow: "EIDEN GROUP confirmation",
    visitorTitle: "Thank you, message received",
    labels: {
      name: "Full name",
      company: "Company",
      email: "Email address",
      phone: "Phone",
      detail: "Need details",
      message: "Message",
    },
  },
} as const;

export function buildAdminEmail(data: ContactPayload): BuiltEmail {
  const t = copy[data.locale] ?? copy.fr;
  const needLine =
    data.subjectDetail && data.subjectDetail !== data.subject
      ? `${data.subject} ${data.subjectDetail}`
      : data.subject;

  const rows =
    subjectPill(data.subject) +
    fieldRow(t.labels.name, data.name) +
    fieldRow(t.labels.company, data.company) +
    fieldRow(t.labels.email, data.email) +
    fieldRow(t.labels.phone, data.phone) +
    (data.subjectDetail ? fieldRow(t.labels.detail, data.subjectDetail) : "") +
    (data.message ? fieldRow(t.labels.message, data.message) : "");

  const intro =
    data.locale === "en"
      ? `New contact request from ${data.name} (${data.company}). Reply directly to this email to answer the visitor.`
      : `Nouvelle demande de ${data.name} (${data.company}). Répondez directement à cet e-mail pour contacter le visiteur.`;

  const footerNote =
    data.locale === "en"
      ? "Sent from the eiden-group.com contact form. Do not share this email."
      : "Envoyé depuis le formulaire de contact eiden-group.com. Ne pas transférer.";

  return {
    subject: `[Contact] ${needLine} ${data.name}`,
    html: shell({
      lang: data.locale,
      eyebrow: t.adminEyebrow,
      title: t.adminTitle,
      intro,
      bodyRows: rows,
      footerNote,
    }),
    text: [
      t.adminTitle,
      "\u2014".repeat(32),
      intro,
      "",
      `${t.labels.name}: ${data.name}`,
      `${t.labels.company}: ${data.company}`,
      `${t.labels.email}: ${data.email}`,
      `${t.labels.phone}: ${data.phone}`,
      `${t.labels.detail}: ${data.subjectDetail || "\u2014"}`,
      "",
      `${t.labels.message}:`,
      data.message || "\u2014",
      "",
      footerNote,
    ].join("\n"),
  };
}

export function buildVisitorEmail(data: ContactPayload): BuiltEmail {
  const fr = data.locale !== "en";
  const t = copy[data.locale] ?? copy.fr;

  const intro = fr
    ? `Bonjour ${data.name}, merci pour votre message. Nous revenons vers vous sous 48 heures, en français, en anglais ou en darija.`
    : `Hello ${data.name}, thank you for reaching out. We reply within 48 hours, in French, English or Darija.`;

  const recap = fr ? "Récapitulatif de votre demande" : "Summary of your request";
  const footerNote = fr
    ? "Ceci est une confirmation automatique. Pour ajouter un détail, répondez simplement à cet e-mail."
    : "This is an automatic confirmation. To add anything, just reply to this email.";

  const rows =
    subjectPill(data.subject) +
    `<p style="margin:0 0 12px 0;font-family:${DISPLAY};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${C.tealDk};">${escapeHtml(recap)}</p>` +
    fieldRow(t.labels.name, data.name) +
    fieldRow(t.labels.company, data.company) +
    fieldRow(t.labels.phone, data.phone) +
    (data.message ? fieldRow(t.labels.message, data.message) : "");

  return {
    subject: fr
      ? `Merci ${data.name} votre message est bien reçu | EIDEN GROUP`
      : `Thank you ${data.name} message received | EIDEN GROUP`,
    html: shell({
      lang: data.locale,
      eyebrow: t.visitorEyebrow,
      title: t.visitorTitle,
      intro,
      bodyRows: rows,
      footerNote,
    }),
    text: [t.visitorTitle, "\u2014".repeat(32), intro, "", recap + ":", `${t.labels.name}: ${data.name}`, `${t.labels.company}: ${data.company}`, `${t.labels.phone}: ${data.phone}`, data.message ? `${t.labels.message}:\n${data.message}` : "", footerNote]
      .filter((l) => l !== "")
      .join("\n"),
  };
}
