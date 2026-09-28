import { siteConfig } from "@/lib/data/site";
import { ICON, LOGO, type InlineImage } from "@/lib/emails/brand-images";

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
  /** The images the html points at with `cid:`; pass them to `sendMail`. */
  attachments: InlineImage[];
};

/* Brand tokens mirrored from app/globals.css (emails need inline styles). */
const C = {
  canvas: "#FEFDFB",
  white: "#FFFFFF",
  beige: "#F4EBD0",
  beigeDk: "#E3D3A8",
  sand: "#FAF5E8",
  forest: "#122620",
  teal: "#0E7A73",
  tealDk: "#0C5752",
  tealWash: "#E4F1EF",
  gold: "#DAA520",
  inkSoft: "rgba(18,38,32,0.65)",
  inkFaint: "rgba(18,38,32,0.45)",
  canvasDim: "rgba(254,253,251,0.65)",
} as const;

const SANS =
  "'Inter', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const DISPLAY =
  "'Outfit', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/* The site's own marks travel with the email, so they show wherever the site is hosted. */
const ICON_SRC = `cid:${ICON.cid}`;
const LOGO_SRC = `cid:${LOGO.cid}`;

const TABLE = `role="presentation" cellpadding="0" cellspacing="0" border="0"`;

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
<style>
@media only screen and (max-width: 620px) {
  .e-wrap { padding: 16px 8px !important; }
  .e-pad { padding-left: 24px !important; padding-right: 24px !important; }
  .e-card { padding-left: 12px !important; padding-right: 12px !important; }
  .e-in { padding-left: 20px !important; padding-right: 20px !important; }
  .e-title { font-size: 26px !important; }
}
</style>
</head>
<body style="margin:0;padding:0;background-color:${C.beige};font-family:${SANS};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(intro)}</div>
<table ${TABLE} width="100%" style="background-color:${C.beige};margin:0;padding:0;">
<tr><td align="center" class="e-wrap" style="padding:32px 16px;">
<table ${TABLE} width="600" style="width:100%;max-width:600px;background-color:${C.canvas};border-radius:20px;overflow:hidden;">

<tr><td style="background-color:${C.forest};padding:0;">
<table ${TABLE} width="100%"><tr><td align="center" class="e-pad" style="padding:40px 40px 36px 40px;">
<table ${TABLE} align="center"><tr>
<td valign="middle" style="padding:0 12px 0 0;"><img src="${ICON_SRC}" width="40" height="40" alt="" style="display:block;border:0;width:40px;height:40px;" /></td>
<td valign="middle"><img src="${LOGO_SRC}" width="103" height="40" alt="${escapeHtml(siteConfig.name)}" style="display:block;border:0;width:103px;height:40px;" /></td>
</tr></table>
<p style="margin:32px 0 0 0;font-family:${DISPLAY};font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${C.gold};">${escapeHtml(eyebrow)}</p>
<h1 class="e-title" style="margin:12px 0 0 0;font-family:${DISPLAY};font-size:30px;line-height:1.15;font-weight:800;letter-spacing:-0.02em;color:${C.canvas};">${escapeHtml(title)}</h1>
</td></tr></table>
</td></tr>

<tr><td class="e-card" style="background-color:${C.forest};padding:0 24px;">
<table ${TABLE} width="100%" style="background-color:${C.white};border-radius:16px 16px 0 0;">
<tr><td align="center" class="e-in" style="padding:32px 32px 8px 32px;">
<p style="margin:0;font-family:${DISPLAY};font-size:17px;line-height:1.6;font-weight:500;color:${C.forest};">${escapeHtml(intro)}</p>
</td></tr>
</table>
</td></tr>
<tr><td class="e-card" style="background-color:${C.canvas};padding:0 24px;">
<table ${TABLE} width="100%" style="background-color:${C.white};border:1px solid ${C.beigeDk};border-top:0;border-radius:0 0 16px 16px;">
<tr><td class="e-in" style="padding:20px 32px 32px 32px;">${bodyRows}</td></tr>
</table>
</td></tr>

<tr><td align="center" class="e-pad" style="background-color:${C.canvas};padding:32px 40px 36px 40px;">
<table ${TABLE} align="center"><tr><td align="center" style="background-color:${C.teal};border-radius:12px;">
<a href="mailto:${siteConfig.email}" style="display:inline-block;padding:15px 30px;font-family:${DISPLAY};font-size:14px;font-weight:700;letter-spacing:0.04em;color:${C.canvas};text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
</td></tr></table>
<p style="margin:18px 0 0 0;font-size:12px;line-height:1.6;color:${C.inkFaint};text-align:center;">${escapeHtml(footerNote)}</p>
</td></tr>

<tr><td align="center" class="e-pad" style="background-color:${C.forest};padding:32px 40px;">
<img src="${ICON_SRC}" width="44" height="44" alt="" style="display:block;margin:0 auto;border:0;width:44px;height:44px;" />
<p style="margin:16px 0 0 0;font-size:12px;line-height:1.7;color:${C.canvasDim};">${escapeHtml(siteConfig.phoneMa)} &middot; ${escapeHtml(siteConfig.address)}</p>
<div style="margin:20px auto 0 auto;width:48px;height:1px;background-color:${C.gold};font-size:0;line-height:1px;">&nbsp;</div>
<p style="margin:16px 0 0 0;font-family:${DISPLAY};font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${C.gold};">L&agrave; o&ugrave; le chaos devient architecture</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

/* One line of the summary: label left, value right; long values go under their label. */
function fieldRow(label: string, value: string): string {
  const labelStyle = `font-family:${DISPLAY};font-size:13px;line-height:22px;font-weight:700;color:${C.forest};`;
  const valueStyle = `font-family:${SANS};font-size:14px;line-height:22px;color:${C.inkSoft};word-break:break-word;`;

  if (value.length > 36 || value.includes("\n")) {
    return `<tr><td colspan="2" style="padding:14px 0;">
<p style="margin:0;${labelStyle}">${escapeHtml(label)}</p>
<p style="margin:6px 0 0 0;${valueStyle}white-space:pre-line;">${escapeHtml(value)}</p>
</td></tr>`;
  }

  return `<tr>
<td valign="top" style="padding:14px 16px 14px 0;${labelStyle}">${escapeHtml(label)}</td>
<td valign="top" align="right" style="padding:14px 0;${valueStyle}text-align:right;">${escapeHtml(value)}</td>
</tr>`;
}

/* The summary lines on sand, divided by dashes like a receipt. */
function detailsBox(rows: string[]): string {
  const divider = `<tr><td colspan="2" style="padding:0;border-top:1px dashed ${C.beigeDk};font-size:0;line-height:0;">&nbsp;</td></tr>`;
  return `<table ${TABLE} width="100%" style="background-color:${C.sand};border-radius:12px;">
<tr><td style="padding:4px 20px;">
<table ${TABLE} width="100%">${rows.filter(Boolean).join(divider)}</table>
</td></tr>
</table>`;
}

function subjectPill(subject: string): string {
  return `<table ${TABLE} align="center" style="margin:0 auto 22px auto;">
<tr><td style="background-color:${C.tealWash};border-radius:999px;padding:8px 18px;">
<span style="font-family:${DISPLAY};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${C.tealDk};">${escapeHtml(subject)}</span>
</td></tr>
</table>`;
}

const copy = {
  fr: {
    adminEyebrow: "Nouvelle demande site web",
    adminTitle: "Nouvelle demande de contact",
    visitorEyebrow: "Confirmation",
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
    visitorEyebrow: "Confirmation",
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
    detailsBox([
      fieldRow(t.labels.name, data.name),
      fieldRow(t.labels.company, data.company),
      fieldRow(t.labels.email, data.email),
      fieldRow(t.labels.phone, data.phone),
      data.subjectDetail ? fieldRow(t.labels.detail, data.subjectDetail) : "",
      data.message ? fieldRow(t.labels.message, data.message) : "",
    ]);

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
    attachments: [ICON, LOGO],
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
    `<p style="margin:0 0 10px 0;font-family:${DISPLAY};font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${C.tealDk};">${escapeHtml(recap)}</p>` +
    detailsBox([
      fieldRow(t.labels.name, data.name),
      fieldRow(t.labels.company, data.company),
      fieldRow(t.labels.phone, data.phone),
      data.message ? fieldRow(t.labels.message, data.message) : "",
    ]);

  return {
    subject: fr
      ? `Merci ${data.name} votre message est bien reçu | EIDEN GROUP`
      : `Thank you ${data.name} message received | EIDEN GROUP`,
    attachments: [ICON, LOGO],
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
