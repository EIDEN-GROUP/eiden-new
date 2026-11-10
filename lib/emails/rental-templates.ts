import { siteConfig } from "@/lib/data/site";
import { escapeHtml, type ContactLocale } from "@/lib/emails/contact-templates";
import type { InlineImage } from "@/lib/emails/brand-images";

/**
 * Booking emails for the salle de formation, skinned exactly like the
 * /rental page: deep green ink, gold hairlines, cream paper and the
 * perforated ticket stub that closes the booking.
 *
 * Both emails are sent in the language the visitor used on the page,
 * the booking flow posts its locale with the payload and everything below
 * branches on it, so a French visitor and an English visitor never see
 * each other's words.
 */

export type RentalBookingPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  packageName: string;
  /** Pre-formatted, in the visitor's locale, e.g. "vendredi 20 novembre 2026". */
  dateLabel: string;
  /** "HH:MM" or "" when the visitor has no preference. */
  timeLabel: string;
  /** Free text, e.g. "12". */
  participants: string;
  message?: string;
  locale: ContactLocale;
};

export type BuiltEmail = {
  subject: string;
  html: string;
  text: string;
  attachments: InlineImage[];
};

const C = {
  canvas: "#FCF9F4",
  cream: "#F7F2EA",
  deep: "#122620",
  forest: "#0E3B33",
  forestDk: "#0A2E28",
  gold: "#B88A55",
  goldLt: "#D2A877",
  sand: "#EAD7BD",
  line: "#E6DCCD",
  muted: "#55635F",
} as const;

const SANS =
  "'Inter', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const DISPLAY = "'Outfit', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const SERIF = "'Playfair Display', 'DM Serif Display', Georgia, 'Times New Roman', serif";
const FONTS =
  "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;600&family=Outfit:wght@600;700&display=swap";

const LABEL = `font-family:${DISPLAY};font-weight:700;letter-spacing:0.3em;text-transform:uppercase;`;
const TABLE = `role="presentation" cellpadding="0" cellspacing="0" border="0"`;
const solid = (color: string) =>
  `background-color:${color};background-image:linear-gradient(${color},${color});`;
const gap = (px: number) =>
  `<div style="height:${px}px;line-height:${px}px;font-size:0;">&nbsp;</div>`;
const lines = (value: string) => escapeHtml(value).replace(/\n/g, "<br />");

const waLink = `https://wa.me/212${siteConfig.phoneMa
  .replace(/\D/g, "")
  .replace(/^212/, "")
  .replace(/^0/, "")}`;

const addressBlock = ((): string => {
  const raw = siteConfig.address.split(", ");
  if (raw.length <= 1) return escapeHtml(siteConfig.address);
  const [first, ...rest] = raw;
  return `${escapeHtml(first)}, ${escapeHtml(rest[0] ?? "")}<br />${escapeHtml(
    rest.slice(1).join(", "),
  )}`;
})();

function shell(opts: {
  lang: ContactLocale;
  preheader: string;
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
  cta: { label: string; href: string };
  note?: string;
}): string {
  const { lang, preheader, eyebrow, title, accent, body, cta, note } = opts;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light only" />
<title>${escapeHtml(`${title} ${accent}`.replace(/\n/g, " "))}</title>
<link href="${FONTS}" rel="stylesheet" />
<style>
:root { color-scheme: light only; supported-color-schemes: light only; }
</style>
<style>
@media only screen and (max-width: 620px) {
  .e-wrap { padding: 0 !important; }
  .e-head { padding: 34px 26px 30px 26px !important; }
  .e-title { font-size: 34px !important; line-height: 38px !important; }
  .e-body { padding-left: 16px !important; padding-right: 16px !important; }
  .e-foot { padding: 26px 22px !important; }
  .e-ticket-stub { width: 30% !important; padding: 16px 10px !important; }
}
</style>
</head>
<body style="margin:0;padding:0;background-color:${C.cream};font-family:${SANS};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table ${TABLE} width="100%" style="background-color:${C.cream};margin:0;padding:0;">
<tr><td align="center" class="e-wrap" style="padding:32px 16px;">
<table ${TABLE} width="600" style="width:100%;max-width:600px;">

<tr><td align="center" bgcolor="${C.forest}" class="e-head" style="background-color:${C.forest};background-image:radial-gradient(120% 130% at 50% -10%, #174A3F 0%, ${C.forest} 46%, ${C.deep} 100%);padding:36px 40px 34px 40px;border-radius:18px 18px 0 0;">
<p style="margin:0;${LABEL}font-size:12px;line-height:14px;color:${C.sand};">EIDEN&nbsp;GROUP</p>
<div style="width:52px;height:2px;margin:18px auto 0;${solid(C.gold)}font-size:0;line-height:2px;">&nbsp;</div>
<p style="margin:22px 0 0 0;${LABEL}font-size:10px;line-height:14px;letter-spacing:0.32em;color:${C.goldLt};">${escapeHtml(eyebrow)}</p>
<h1 class="e-title" style="margin:14px 0 0 0;font-family:${SERIF};font-weight:400;font-size:42px;line-height:44px;letter-spacing:-0.01em;color:#F7F2EA;">${lines(title)} <em style="font-style:italic;color:${C.sand};">${escapeHtml(accent)}</em></h1>
</td></tr>

<tr><td class="e-body" style="background-color:${C.canvas};padding:30px 30px 4px 30px;">${body}</td></tr>

<tr><td align="center" style="background-color:${C.canvas};padding:8px 24px 26px 24px;">
<table ${TABLE} align="center"><tr><td align="center" bgcolor="${C.deep}" style="${solid(C.deep)}border:1px solid ${C.gold};border-radius:999px;">
<a href="${cta.href}" style="display:inline-block;padding:17px 40px;${LABEL}font-size:10.5px;letter-spacing:0.28em;line-height:14px;color:${C.sand};text-decoration:none;">${escapeHtml(cta.label)}&nbsp;&nbsp;&rarr;</a>
</td></tr></table>
${note ? `<p style="margin:16px 0 0 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.muted};text-align:center;">${escapeHtml(note)}</p>` : ""}
</td></tr>

<tr><td align="center" bgcolor="${C.forest}" class="e-foot" style="background-color:${C.forest};background-image:radial-gradient(120% 120% at 50% 120%, #174A3F 0%, ${C.forest} 50%, ${C.deep} 100%);padding:26px 34px 24px 34px;font-family:${SANS};font-size:12px;line-height:20px;color:rgba(247,242,234,0.82);text-align:center;border-radius:0 0 18px 18px;">
<a href="mailto:${siteConfig.email}" style="color:${C.sand};text-decoration:none;">${escapeHtml(siteConfig.email)}</a><br />
<span style="display:block;height:4px;line-height:4px;font-size:0;">&nbsp;</span>
${escapeHtml(siteConfig.phoneMa)}<br />${addressBlock}<br />
<span style="display:block;height:8px;line-height:8px;font-size:0;">&nbsp;</span>
<a href="${siteConfig.url}" style="color:${C.goldLt};text-decoration:none;">eiden-group.com</a>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

/** The perforated ticket stub that anchors the booking, on mint-dark paper. */
function ticket(opts: {
  packageName: string;
  dateLabel: string;
  timeLabel: string;
  participants: string;
  locale: ContactLocale;
  statusLine: string;
}): string {
  const fr = opts.locale !== "en";
  const T = {
    yourPackage: fr ? "Votre formule" : "Your package",
    seats: fr ? "Places<br />assises" : "Seats<br />available",
    date: fr ? "Date" : "Date",
    time: fr ? "Horaire" : "Time",
    participants: fr ? "Participants" : "Participants",
    noTime: fr ? "Sans préférence" : "No preference",
    perRoom: "15",
  };
  const rows: [string, string][] = [
    [T.date, opts.dateLabel || "-"],
    [T.time, opts.timeLabel || T.noTime],
    [T.participants, opts.participants || "-"],
  ];
  const rowHtml = rows
    .map(
      ([label, value]) => `<tr>
<td style="padding:9px 16px 9px 0;vertical-align:top;${LABEL}font-size:8px;letter-spacing:0.22em;line-height:18px;color:${C.goldLt};white-space:nowrap;">${escapeHtml(label)}</td>
<td style="padding:7px 0 0 0;font-family:${SANS};font-size:13.5px;line-height:18px;color:#F7F2EA;">${escapeHtml(value)}</td>
</tr>`,
    )
    .join("");

  return `<table ${TABLE} width="100%" style="border:1px solid rgba(210,168,119,0.4);border-radius:16px;background-color:${C.forest};">
<tr>
<td class="e-ticket-stub" width="112" valign="middle" align="center" style="width:112px;${solid(C.forestDk)}padding:22px 14px;border-right:2px dashed rgba(234,215,189,0.35);border-radius:16px 0 0 16px;">
<div style="font-family:${SERIF};font-size:52px;line-height:52px;color:${C.sand};">${T.perRoom}</div>
<div style="margin-top:8px;${LABEL}font-size:8px;letter-spacing:0.3em;line-height:13px;color:rgba(234,215,189,0.72);">${T.seats}</div>
</td>
<td valign="middle" style="padding:18px 20px 16px 20px;">
<p style="margin:0;${LABEL}font-size:8.5px;letter-spacing:0.3em;line-height:12px;color:${C.goldLt};">${escapeHtml(T.yourPackage)}</p>
<p style="margin:6px 0 0 0;font-family:${SERIF};font-size:19px;line-height:24px;color:#F7F2EA;">${escapeHtml(opts.packageName)}</p>
<table ${TABLE} width="100%" style="margin-top:12px;border-top:1px dashed rgba(234,215,189,0.28);">${rowHtml}</table>
<p style="margin:12px 0 0 0;padding-top:10px;border-top:1px solid rgba(234,215,189,0.18);${LABEL}font-size:8.5px;letter-spacing:0.32em;line-height:12px;color:${C.sand};">${escapeHtml(opts.statusLine)}</p>
</td>
</tr>
</table>`;
}

function paragraph(text: string, top: number): string {
  return `<p style="margin:${top}px 2px 0 2px;max-width:460px;font-family:${SANS};font-size:15px;line-height:23px;color:${C.deep};">${escapeHtml(text)}</p>`;
}

function detailsBox(title: string, rows: [string, string | undefined][]): string {
  const filled = rows.filter((row): row is [string, string] => Boolean(row[1]));
  const labelStyle = `${LABEL}font-size:9.5px;line-height:16px;letter-spacing:0.24em;color:${C.forest};`;
  const valueStyle = `font-family:${SANS};font-size:14.5px;line-height:21px;color:${C.deep};word-break:break-word;`;

  const body = filled
    .map(([label, value], i) => {
      const rule = i < filled.length - 1 ? `border-bottom:1px dotted ${C.line};` : "";
      if (value.length > 36 || value.includes("\n")) {
        return `<tr><td colspan="3" style="padding:10px 0;${rule}">
<p style="margin:0;${labelStyle}">${escapeHtml(label)}</p>
<p style="margin:6px 0 0 0;${valueStyle}white-space:pre-line;">${escapeHtml(value)}</p>
</td></tr>`;
      }
      return `<tr>
<td valign="middle" width="32%" style="padding:8px 0;${rule}${labelStyle}">${escapeHtml(label)}</td>
<td width="24" style="width:24px;font-size:0;">&nbsp;</td>
<td valign="middle" style="padding:8px 0;${rule}${valueStyle}">${escapeHtml(value)}</td>
</tr>`;
    })
    .join("");

  return `<table ${TABLE} width="100%" style="background-color:${C.cream};border:1px solid ${C.line};border-radius:12px;">
<tr><td style="padding:18px 22px 14px 22px;">
<p style="margin:0 0 8px 0;${LABEL}font-size:10px;line-height:14px;color:${C.gold};">${escapeHtml(title)}</p>
<table ${TABLE} width="100%">${body}</table>
</td></tr>
</table>`;
}

function stepsRows(items: readonly (readonly [string, string])[]): string {
  const dot = `<div style="width:7px;height:7px;border-radius:50%;${solid(C.gold)}font-size:0;line-height:7px;">&nbsp;</div>`;
  return items
    .map(([title, text], i) => {
      const num = String(i + 1).padStart(2, "0");
      return `<tr>
<td width="40" valign="top" style="width:40px;">
<div style="font-family:${SERIF};font-size:23px;line-height:22px;color:${C.gold};">${num}</div>
<div style="margin:6px 0 0 4px;">${dot}</div>
</td>
<td valign="top" style="padding:1px 0 0 16px;border-left:1px dashed ${C.line};">
<span style="font-family:${SANS};font-size:14px;line-height:20px;font-weight:600;color:${C.deep};">${escapeHtml(title)}</span>
<div style="margin:3px 0 0 0;font-family:${SANS};font-size:13px;line-height:18px;color:${C.muted};">${escapeHtml(text)}</div>
</td>
</tr>
${i < items.length - 1 ? `<tr><td colspan="2" style="height:16px;font-size:0;line-height:0;">&nbsp;</td></tr>` : ""}`;
    })
    .join("");
}

const copy = {
  fr: {
    eyebrow: "Location de salle · Agadir Bay",
    // admin
    adminTitle: "Nouvelle demande\nde",
    adminAccent: "réservation.",
    adminIntro: (name: string, company: string) =>
      `Nouvelle demande de ${name}${company ? ` (${company})` : ""} pour la salle. Répondez directement à cet e-mail pour écrire au visiteur.`,
    adminBox: "Coordonnées",
    adminStatus: "En attente de confirmation",
    labels: {
      name: "Nom complet",
      company: "Société",
      email: "Adresse e-mail",
      phone: "Téléphone",
      message: "Message",
    },
    adminCta: (firstName: string) => `Répondre à ${firstName}`,
    adminNote: "Demande envoyée depuis eiden-group.com/rental. Ne pas transférer.",
    adminSubject: (p: { packageName: string; dateLabel: string; name: string }) =>
      `[Réservation salle] ${p.packageName} · ${p.dateLabel || "sans date"} · ${p.name}`,
    // visitor
    visitorTitle: "Votre demande\nest bien",
    visitorAccent: "reçue.",
    hello: "Bonjour",
    thanks:
      "Nous avons bien reçu votre demande de réservation pour la salle de formation EIDEN, à Agadir Bay. Voici le récapitulatif de votre demande :",
    visitorStatus: "Réservation en attente de confirmation",
    next: "Ce qui se passe ensuite",
    steps: [
      [
        "Nous confirmons votre créneau",
        "Sous 24 heures ouvrées, nous revenons avec la confirmation de la date et de l'horaire.",
      ],
      [
        "Devis ou facture",
        "Vous recevez un devis clair avant la session, ou la facture une fois la date bloquée.",
      ],
      [
        "La salle est prête à votre arrivée",
        "Écran, sonorisation, tableau blanc, accueil et pause café selon la formule.",
      ],
    ] as const,
    visitorNote:
      "Si la date ou l'horaire ne vous convient plus, répondez simplement à cet e-mail.",
    visitorCta: "Écrire sur WhatsApp",
    visitorSubject: "Votre demande de salle est bien reçue | EIDEN GROUP",
  },
  en: {
    eyebrow: "Room hire · Agadir Bay",
    adminTitle: "New room\nbooking",
    adminAccent: "request.",
    adminIntro: (name: string, company: string) =>
      `New booking request from ${name}${company ? ` (${company})` : ""} for the room. Reply directly to this email to write to the visitor.`,
    adminBox: "Details",
    adminStatus: "Pending confirmation",
    labels: {
      name: "Full name",
      company: "Company",
      email: "Email address",
      phone: "Phone",
      message: "Message",
    },
    adminCta: (firstName: string) => `Reply to ${firstName}`,
    adminNote: "Request sent from eiden-group.com/rental. Do not share this email.",
    adminSubject: (p: { packageName: string; dateLabel: string; name: string }) =>
      `[Room booking] ${p.packageName} · ${p.dateLabel || "no date"} · ${p.name}`,
    visitorTitle: "Your request\nhas been",
    visitorAccent: "received.",
    hello: "Hello",
    thanks:
      "We have received your booking request for the EIDEN training room, in Agadir Bay. Here is a summary of your request:",
    visitorStatus: "Booking pending confirmation",
    next: "What happens next",
    steps: [
      [
        "We confirm your slot",
        "Within 24 working hours, we come back with the confirmation of the date and time.",
      ],
      [
        "Quote or invoice",
        "You get a clear quote before the session, or the invoice once the date is blocked.",
      ],
      [
        "The room is ready when you arrive",
        "Screen, sound, whiteboard, welcome and coffee break according to your package.",
      ],
    ] as const,
    visitorNote:
      "If the date or time no longer suits you, just reply to this email.",
    visitorCta: "Message us on WhatsApp",
    visitorSubject: "Your room request has been received | EIDEN GROUP",
  },
} as const;

export function buildRentalAdminEmail(data: RentalBookingPayload): BuiltEmail {
  const fr = data.locale !== "en";
  const t = copy[data.locale] ?? copy.fr;
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;

  const ticketHtml = ticket({
    packageName: data.packageName,
    dateLabel: data.dateLabel,
    timeLabel: data.timeLabel,
    participants: data.participants,
    locale: data.locale,
    statusLine: t.adminStatus,
  });

  const body =
    paragraph(t.adminIntro(data.name, data.company), 0) +
    gap(24) +
    ticketHtml +
    gap(24) +
    detailsBox(t.adminBox, [
      [t.labels.name, data.name],
      [t.labels.company, data.company],
      [t.labels.email, data.email],
      [t.labels.phone, data.phone],
      [t.labels.message, data.message],
    ]);

  const subject = t.adminSubject({
    packageName: data.packageName,
    dateLabel: data.dateLabel,
    name: data.name,
  });

  const text = [
    `${t.adminTitle.replace(/\n/g, " ")} ${t.adminAccent}`,
    "─".repeat(30),
    t.adminIntro(data.name, data.company),
    "",
    `${fr ? "Formule" : "Package"}: ${data.packageName}`,
    `${fr ? "Date" : "Date"}: ${data.dateLabel || "-"}`,
    `${fr ? "Horaire" : "Time"}: ${data.timeLabel || (fr ? "Sans préférence" : "No preference")}`,
    `${fr ? "Participants" : "Participants"}: ${data.participants || "-"}`,
    "",
    `${t.labels.name}: ${data.name}`,
    `${t.labels.company}: ${data.company}`,
    `${t.labels.email}: ${data.email}`,
    `${t.labels.phone}: ${data.phone}`,
    data.message ? `\n${t.labels.message}:\n${data.message}` : "",
    "",
    t.adminNote,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject,
    attachments: [],
    html: shell({
      lang: data.locale,
      preheader: `${subject}`,
      eyebrow: t.eyebrow,
      title: t.adminTitle,
      accent: t.adminAccent,
      body,
      cta: { label: t.adminCta(firstName), href: `mailto:${data.email}` },
      note: t.adminNote,
    }),
    text,
  };
}

export function buildRentalVisitorEmail(data: RentalBookingPayload): BuiltEmail {
  const fr = data.locale !== "en";
  const t = copy[data.locale] ?? copy.fr;
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;
  const greeting = `${t.hello} ${firstName},`;

  const ticketHtml = ticket({
    packageName: data.packageName,
    dateLabel: data.dateLabel,
    timeLabel: data.timeLabel,
    participants: data.participants,
    locale: data.locale,
    statusLine: t.visitorStatus,
  });

  const sectionLabel = (text: string) =>
    `<p style="margin:0 2px;${LABEL}font-size:11px;line-height:14px;letter-spacing:0.3em;color:${C.forest};">${escapeHtml(text)}</p>`;

  const body =
    `<h2 style="margin:0 2px;font-family:${SERIF};font-size:25px;line-height:30px;font-weight:400;color:${C.deep};">${escapeHtml(greeting)}</h2>` +
    paragraph(t.thanks, 12) +
    gap(24) +
    ticketHtml +
    gap(26) +
    sectionLabel(t.next) +
    gap(18) +
    `<table ${TABLE} width="100%"><tr><td style="padding:0 2px;"><table ${TABLE} width="100%">${stepsRows(t.steps)}</table></td></tr></table>`;

  const text = [
    `${t.visitorTitle.replace(/\n/g, " ")} ${t.visitorAccent}`,
    "─".repeat(30),
    greeting,
    t.thanks,
    "",
    `${fr ? "Formule" : "Package"}: ${data.packageName}`,
    `${fr ? "Date" : "Date"}: ${data.dateLabel || "-"}`,
    `${fr ? "Horaire" : "Time"}: ${data.timeLabel || (fr ? "Sans préférence" : "No preference")}`,
    `${fr ? "Participants" : "Participants"}: ${data.participants || "-"}`,
    "",
    `${t.next}:`,
    ...t.steps.map(([step, text], i) => `0${i + 1}  ${step}: ${text}`),
    "",
    t.visitorNote,
  ].join("\n");

  return {
    subject: t.visitorSubject,
    attachments: [],
    html: shell({
      lang: data.locale,
      preheader: t.thanks,
      eyebrow: t.eyebrow,
      title: t.visitorTitle,
      accent: t.visitorAccent,
      body,
      cta: { label: t.visitorCta, href: waLink },
      note: t.visitorNote,
    }),
    text,
  };
}
