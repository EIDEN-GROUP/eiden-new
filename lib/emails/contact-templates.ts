import { siteConfig } from "@/lib/data/site";
import type { InlineImage } from "@/lib/emails/brand-images";

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
  attachments: InlineImage[];
};

const C = {
  canvas: "#FEFDFB",
  beige: "#F4EBD0",
  beigeDk: "#E3D3A8",
  sand: "#FAF5E8",
  forest: "#122620",
  tealDk: "#0C5752",
  gold: "#DAA520",
  goldDk: "#B8860B",
} as const;

const SANS = "'Inter', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const DISPLAY = "'Outfit', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const SERIF = "'DM Serif Display', Georgia, 'Times New Roman', serif";
const FONTS =
  "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;600&family=Outfit:wght@600;700&display=swap";

const SILK_HEAD = [
  "radial-gradient(circle at 116% 42%, transparent 29%, #24463A 38%, #1B372E 46%, transparent 57%)",
  "radial-gradient(55% 85% at 100% 0%, #3A5F4F 0%, #203F34 45%, transparent 78%)",
  "linear-gradient(116deg, #1A342B 0%, #2E4E42 8%, #1D392F 15%, #122620 28%, #122620 100%)",
].join(",");
const SILK_FOOT = [
  "radial-gradient(60% 120% at 104% 0%, #31564A 0%, #1C3A30 45%, transparent 75%)",
  "linear-gradient(112deg, #16302A 0%, #274639 14%, #122620 32%, #122620 100%)",
].join(",");

const TABLE = `role="presentation" cellpadding="0" cellspacing="0" border="0"`;

const LABEL = `font-family:${DISPLAY};font-weight:700;letter-spacing:0.3em;text-transform:uppercase;`;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const lines = (value: string) => escapeHtml(value).replace(/\n/g, "<br />");

function gap(px: number): string {
  return `<div style="height:${px}px;line-height:${px}px;font-size:0;">&nbsp;</div>`;
}

// Mail apps recolour background-color in dark mode but never a background-image.
const solid = (color: string) =>
  `background-color:${color};background-image:linear-gradient(${color},${color});`;

// Gmail app dark mode darkens light text; the screen + difference pair flips it back.
function lightText(html: string, tag: "span" | "div" = "span"): string {
  return `<${tag} class="e-bs"><${tag} class="e-bd">${html}</${tag}></${tag}>`;
}

function shell(opts: {
  lang: ContactLocale;
  preheader: string;
  eyebrow: string;
  title: string;
  accent: string;
  subline?: string;
  body: string;
  cta: { label: string; href: string };
  note?: string;
}): string {
  const { lang, preheader, eyebrow, title, accent, subline, body, cta, note } = opts;
  const [addressTop, ...addressRest] = siteConfig.address.split(", ");
  const address =
    addressRest.length > 1
      ? `${escapeHtml(`${addressTop}, ${addressRest[0]}`)}<br />${escapeHtml(addressRest.slice(1).join(", "))}`
      : escapeHtml(siteConfig.address);

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
u + .body .e-bs { background: #000; mix-blend-mode: screen; }
u + .body .e-bd { background: #000; mix-blend-mode: difference; }
</style>
<style>
@media only screen and (max-width: 620px) {
  .e-wrap { padding: 0 !important; }
  .e-head { padding: 34px 24px 32px 24px !important; }
  .e-title { font-size: 34px !important; line-height: 38px !important; }
  .e-body { padding-left: 18px !important; padding-right: 18px !important; }
  .e-box { padding: 20px 18px 22px 18px !important; }
  .e-foot { padding: 30px 24px !important; }
  .e-col { display: block !important; width: 100% !important; padding: 0 !important; text-align: center !important; }
  .e-col-b { padding-top: 24px !important; }
  .e-rule { display: none !important; }
  .e-dash { margin: 0 auto !important; }
}
</style>
</head>
<body class="body" style="margin:0;padding:0;background-color:${C.beige};font-family:${SANS};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table ${TABLE} width="100%" style="background-color:${C.beige};margin:0;padding:0;">
<tr><td align="center" class="e-wrap" style="padding:32px 16px;">
<table ${TABLE} width="600" style="width:100%;max-width:600px;background-color:${C.canvas};">

<tr><td align="center" bgcolor="${C.forest}" class="e-head" style="background-color:${C.forest};background-image:${SILK_HEAD};padding:40px 40px 36px 40px;">
<div style="width:52px;height:2px;margin:0 auto;${solid(C.gold)}font-size:0;line-height:2px;">&nbsp;</div>
<p style="margin:26px 0 0 0;${LABEL}font-size:11px;line-height:14px;color:${C.gold};">${escapeHtml(eyebrow)}</p>
<h1 class="e-title" style="margin:16px 0 0 0;font-family:${DISPLAY};font-size:47px;line-height:48px;font-weight:700;letter-spacing:-0.01em;color:${C.canvas};">${lightText(lines(title))} <span style="color:${C.gold};">${escapeHtml(accent)}</span></h1>
${subline ? `<p style="margin:22px 0 0 0;${LABEL}font-size:10.5px;line-height:14px;color:${C.canvas};">${lightText(escapeHtml(subline))}</p>` : ""}
</td></tr>

<tr><td class="e-body" style="background-color:${C.canvas};padding:32px 34px 0 34px;">${body}</td></tr>

<tr><td align="center" style="background-color:${C.canvas};padding:26px 24px 24px 24px;">
<table ${TABLE} align="center"><tr><td align="center" bgcolor="${C.forest}" style="${solid(C.forest)}border-radius:999px;">
<a href="${cta.href}" style="display:inline-block;padding:18px 40px;${LABEL}font-size:11px;letter-spacing:0.28em;line-height:14px;color:${C.canvas};text-decoration:none;">${lightText(`${escapeHtml(cta.label)}&nbsp;&nbsp;&rarr;`)}</a>
</td></tr></table>
${note ? `<p style="margin:18px 0 0 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.tealDk};text-align:center;">${escapeHtml(note)}</p>` : ""}
</td></tr>

<tr><td bgcolor="${C.forest}" class="e-foot" style="background-color:${C.forest};background-image:${SILK_FOOT};padding:28px 40px 24px 68px;">
<table ${TABLE} width="100%"><tr>
<td class="e-col" valign="middle" width="228" style="padding:0 20px 0 0;font-family:${SANS};font-size:12.5px;line-height:20px;color:${C.canvas};">
${lightText(
  `<a href="mailto:${siteConfig.email}" style="color:${C.canvas};text-decoration:none;">${escapeHtml(siteConfig.email)}</a><br />
<span style="display:block;height:4px;line-height:4px;font-size:0;">&nbsp;</span>
${escapeHtml(siteConfig.phoneMa)}<br />${address}`,
  "div",
)}
</td>
<td class="e-rule" width="1" style="width:1px;${solid("#3A5F4F")}font-size:0;line-height:0;">&nbsp;</td>
<td class="e-col e-col-b" valign="top" style="padding:9px 0 0 60px;">
<div class="e-dash" style="width:44px;height:2px;${solid(C.gold)}font-size:0;line-height:2px;">&nbsp;</div>
<p style="margin:18px 0 0 0;${LABEL}font-size:11px;line-height:20px;color:${C.gold};white-space:nowrap;">L&agrave; o&ugrave; le chaos<br />devient architecture.</p>
</td>
</tr></table>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function paragraph(text: string, top: number): string {
  return `<p style="margin:${top}px 6px 0 6px;max-width:440px;font-family:${SANS};font-size:15px;line-height:23px;color:${C.forest};">${escapeHtml(text)}</p>`;
}

function sectionLabel(text: string): string {
  return `<p style="margin:0 6px;${LABEL}font-size:12px;line-height:14px;color:${C.forest};">${escapeHtml(text)}</p>`;
}

function detailsBox(title: string, rows: [string, string | undefined][]): string {
  const filled = rows.filter((row): row is [string, string] => Boolean(row[1]));
  const labelStyle = `${LABEL}font-size:9.5px;line-height:16px;letter-spacing:0.24em;color:${C.tealDk};`;
  const valueStyle = `font-family:${SANS};font-size:14.5px;line-height:21px;color:${C.forest};word-break:break-word;`;

  const body = filled
    .map(([label, value], i) => {
      const rule = i < filled.length - 1 ? `border-bottom:1px dotted ${C.beigeDk};` : "";
      if (value.length > 36 || value.includes("\n")) {
        return `<tr><td colspan="3" style="padding:10px 0;${rule}">
<p style="margin:0;${labelStyle}">${escapeHtml(label)}</p>
<p style="margin:6px 0 0 0;${valueStyle}white-space:pre-line;">${escapeHtml(value)}</p>
</td></tr>`;
      }
      return `<tr>
<td valign="middle" width="32%" style="padding:8px 0;${rule}${labelStyle}">${escapeHtml(label)}</td>
<td width="26" style="width:26px;font-size:0;">&nbsp;</td>
<td valign="middle" style="padding:8px 0;${rule}${valueStyle}">${escapeHtml(value)}</td>
</tr>`;
    })
    .join("");

  return `<table ${TABLE} width="100%" style="background-color:${C.sand};border:1px solid ${C.beigeDk};border-radius:10px;">
<tr><td class="e-box" style="padding:20px 32px 16px 32px;">
<p style="margin:0 0 10px 0;${LABEL}font-size:11px;line-height:14px;color:${C.forest};">${escapeHtml(title)}</p>
<table ${TABLE} width="100%">${body}</table>
</td></tr>
</table>`;
}

function steps(items: readonly (readonly [string, string])[]): string {
  const thread = (height?: number) =>
    `<td width="12" style="width:12px;${height ? `height:${height}px;` : ""}font-size:0;line-height:0;">&nbsp;</td><td width="1" bgcolor="${C.beigeDk}" style="width:1px;${solid(C.beigeDk)}font-size:0;line-height:0;">&nbsp;</td><td width="12" style="width:12px;font-size:0;line-height:0;">&nbsp;</td>`;
  const dot = `<table ${TABLE} width="25" style="width:25px;">
<tr>${thread(8)}</tr>
<tr><td colspan="3" align="center" style="height:9px;font-size:0;line-height:0;"><div style="width:9px;height:9px;margin:0 auto;border-radius:50%;${solid(C.goldDk)}font-size:0;line-height:0;">&nbsp;</div></td></tr>
<tr>${thread(7)}</tr>
</table>`;

  const rows = items
    .map(([title, text], i) => {
      const num = String(i + 1).padStart(2, "0");
      const tail = i < items.length - 1 ? 22 : 10;
      return `<tr>
<td width="50" valign="top" style="width:50px;font-family:${SERIF};font-size:27px;line-height:24px;color:${C.goldDk};">${num}</td>
<td colspan="3" valign="top" style="font-size:0;line-height:0;background-image:linear-gradient(${C.beigeDk},${C.beigeDk});background-size:1px 100%;background-position:12px 0;background-repeat:no-repeat;">${dot}</td>
<td valign="top" style="padding:0 0 0 22px;font-family:${SANS};font-size:15px;line-height:24px;font-weight:600;color:${C.forest};">${escapeHtml(title)}</td>
</tr>
<tr>
<td>&nbsp;</td>${thread()}
<td valign="top" style="padding:3px 0 0 22px;font-family:${SANS};font-size:13.5px;line-height:19px;color:${C.forest};">${escapeHtml(text)}</td>
</tr>
<tr><td style="height:${tail}px;font-size:0;line-height:0;">&nbsp;</td>${thread(tail)}<td style="font-size:0;line-height:0;">&nbsp;</td></tr>`;
    })
    .join("");

  return `<table ${TABLE} width="100%"><tr><td style="padding:0 6px;"><table ${TABLE} width="100%">${rows}</table></td></tr></table>`;
}

const copy = {
  fr: {
    adminEyebrow: "Nouvelle demande site web",
    adminTitle: "Nouvelle demande\nde",
    adminAccent: "contact.",
    adminBox: "La demande",
    visitorEyebrow: "Confirmation",
    visitorTitle: "Votre demande\nest",
    visitorAccent: "bien reçue.",
    visitorSubline: "La prochaine étape commence ici.",
    visitorBox: "Votre demande",
    hello: "Bonjour",
    thanks:
      "Merci d’avoir pris contact avec EIDEN. Nous avons bien reçu votre demande et notre équipe l’examine avec attention.",
    reply:
      "Nous reviendrons vers vous dans les plus brefs délais, dans la langue qui vous convient : français, anglais ou darija.",
    next: "Ce qui se passe ensuite",
    steps: [
      ["Nous examinons votre demande", "Nous prenons connaissance de votre contexte et de vos besoins."],
      [
        "Nous identifions le bon point d’entrée",
        "Stratégie, croissance, marque, digital, performance commerciale ou un autre domaine selon votre situation.",
      ],
      ["Nous revenons vers vous", "Un membre de l’équipe EIDEN vous contactera prochainement."],
    ],
    discover: "Découvrir EIDEN",
    labels: {
      subject: "Intérêt",
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
    adminTitle: "New contact",
    adminAccent: "request.",
    adminBox: "The request",
    visitorEyebrow: "Confirmation",
    visitorTitle: "Your request\nhas been",
    visitorAccent: "received.",
    visitorSubline: "The next step starts here.",
    visitorBox: "Your request",
    hello: "Hello",
    thanks:
      "Thank you for contacting EIDEN. We have received your request and our team is reviewing it carefully.",
    reply:
      "We will get back to you as soon as possible, in the language that suits you: French, English or Darija.",
    next: "What happens next",
    steps: [
      ["We review your request", "We take the time to understand your context and your needs."],
      [
        "We find the right entry point",
        "Strategy, growth, brand, digital, sales performance or another area, depending on your situation.",
      ],
      ["We get back to you", "A member of the EIDEN team will contact you shortly."],
    ],
    discover: "Discover EIDEN",
    labels: {
      subject: "Interest",
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
  const title = `${t.adminTitle} ${t.adminAccent}`.replace(/\n/g, " ");
  const needLine =
    data.subjectDetail && data.subjectDetail !== data.subject
      ? `${data.subject} ${data.subjectDetail}`
      : data.subject;

  const intro =
    data.locale === "en"
      ? `New contact request from ${data.name} (${data.company}). Reply directly to this email to answer the visitor.`
      : `Nouvelle demande de ${data.name} (${data.company}). Répondez directement à cet e-mail pour contacter le visiteur.`;

  const footerNote =
    data.locale === "en"
      ? "Sent from the eiden-group.com contact form. Do not share this email."
      : "Envoyé depuis le formulaire de contact eiden-group.com. Ne pas transférer.";

  const body =
    paragraph(intro, 0) +
    gap(28) +
    detailsBox(t.adminBox, [
      [t.labels.subject, data.subject],
      [t.labels.name, data.name],
      [t.labels.company, data.company],
      [t.labels.email, data.email],
      [t.labels.phone, data.phone],
      [t.labels.detail, data.subjectDetail],
      [t.labels.message, data.message],
    ]);

  return {
    subject: `[Contact] ${needLine} ${data.name}`,
    attachments: [],
    html: shell({
      lang: data.locale,
      preheader: intro,
      eyebrow: t.adminEyebrow,
      title: t.adminTitle,
      accent: t.adminAccent,
      body,
      cta: { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
      note: footerNote,
    }),
    text: [
      title,
      "—".repeat(32),
      intro,
      "",
      `${t.labels.subject}: ${data.subject}`,
      `${t.labels.name}: ${data.name}`,
      `${t.labels.company}: ${data.company}`,
      `${t.labels.email}: ${data.email}`,
      `${t.labels.phone}: ${data.phone}`,
      `${t.labels.detail}: ${data.subjectDetail || "—"}`,
      "",
      `${t.labels.message}:`,
      data.message || "—",
      "",
      footerNote,
    ].join("\n"),
  };
}

export function buildVisitorEmail(data: ContactPayload): BuiltEmail {
  const fr = data.locale !== "en";
  const t = copy[data.locale] ?? copy.fr;
  const title = `${t.visitorTitle} ${t.visitorAccent}`.replace(/\n/g, " ");
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;
  const hello = `${t.hello} ${firstName},`;

  const footerNote = fr
    ? "Ceci est une confirmation automatique. Pour ajouter un détail, répondez simplement à cet e-mail."
    : "This is an automatic confirmation. To add anything, just reply to this email.";

  const body =
    `<h2 style="margin:0 6px;font-family:${DISPLAY};font-size:27px;line-height:32px;font-weight:700;letter-spacing:-0.01em;color:${C.forest};">${escapeHtml(hello)}</h2>` +
    paragraph(t.thanks, 14) +
    paragraph(t.reply, 12) +
    gap(28) +
    detailsBox(t.visitorBox, [
      [t.labels.subject, data.subject],
      [t.labels.name, data.name],
      [t.labels.company, data.company],
      [t.labels.phone, data.phone],
      [t.labels.message, data.message],
    ]) +
    gap(28) +
    sectionLabel(t.next) +
    gap(22) +
    steps(t.steps);

  return {
    subject: fr
      ? `Merci ${data.name} votre message est bien reçu | EIDEN GROUP`
      : `Thank you ${data.name} message received | EIDEN GROUP`,
    attachments: [],
    html: shell({
      lang: data.locale,
      preheader: t.thanks,
      eyebrow: t.visitorEyebrow,
      title: t.visitorTitle,
      accent: t.visitorAccent,
      subline: t.visitorSubline,
      body,
      cta: { label: t.discover, href: siteConfig.url },
    }),
    text: [
      title,
      "—".repeat(32),
      hello,
      t.thanks,
      t.reply,
      "",
      `${t.visitorBox}:`,
      `${t.labels.subject}: ${data.subject}`,
      `${t.labels.name}: ${data.name}`,
      `${t.labels.company}: ${data.company}`,
      `${t.labels.phone}: ${data.phone}`,
      data.message ? `${t.labels.message}:\n${data.message}` : "",
      "",
      `${t.next}:`,
      ...t.steps.map(([step, text], i) => `0${i + 1}  ${step}: ${text}`),
      "",
      `${t.discover}: ${siteConfig.url}`,
      footerNote,
    ].join("\n"),
  };
}
