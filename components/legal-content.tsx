"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import { siteConfig } from "@/lib/data/site";

type Section = { h: string; body: string[] };
type LegalCopy = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
};

function Shell({ copy }: { copy: LegalCopy }) {
  return (
    <article data-nav-tone="light" className="bg-canvas text-ink">
      <div className="container-eiden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <p className="eyebrow text-teal flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-current opacity-50" />
          {copy.eyebrow}
        </p>
        <h1 className="font-display mt-6 max-w-3xl text-[clamp(2rem,5vw,3.75rem)] leading-[1.02] font-extrabold tracking-[-0.04em] text-balance">
          {copy.title}
        </h1>
        <p className="text-ink/45 mt-4 text-[0.85rem]">{copy.updated}</p>
        <p className="text-ink/60 mt-6 max-w-2xl text-[1.0625rem] leading-relaxed">
          {copy.intro}
        </p>

        <div className="mt-12 grid max-w-3xl gap-10">
          {copy.sections.map((section) => (
            <section key={section.h}>
              <h2 className="font-display border-ink/12 border-t pt-5 text-[1.25rem] font-bold tracking-[-0.02em]">
                {section.h}
              </h2>
              {section.body.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-ink/60 mt-3 text-[0.9375rem] leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-[0.9375rem]">
          <Link
            href="/contact"
            className="text-teal font-semibold underline underline-offset-4 hover:opacity-80"
          >
            {siteConfig.email}
          </Link>
        </p>
      </div>
    </article>
  );
}

const terms: Record<"fr" | "en", LegalCopy> = {
  fr: {
    eyebrow: "Conditions d'utilisation",
    title: "Conditions générales d'utilisation",
    updated: "Dernière mise à jour : octobre 2026",
    intro:
      "Ces conditions encadrent l'utilisation du site eiden-group.com, édité par EIDEN GROUP, Agadir — ainsi que la relation commerciale pour nos services de stratégie, marque, web, visibilité et contenu.",
    sections: [
      {
        h: "1. Objet",
        body: [
          "Le site présente les services, réalisations et solutions d'EIDEN GROUP et permet de demander un devis via le formulaire de contact. Toute collaboration fait l'objet d'un devis écrit accepté par le client.",
        ],
      },
      {
        h: "2. Services",
        body: [
          "Stratégie et identité, création de sites web et d'applications, référencement naturel (SEO) et visibilité IA (GEO), campagnes publicitaires, création de contenus photo et vidéo, et solutions digitales (Skema, Essor, Kavo, StayDesk).",
        ],
      },
      {
        h: "3. Devis et commandes",
        body: [
          "Chaque projet démarre par un appel de découverte de 30 minutes, suivi d'un devis détaillé : périmètre, délais, livrables et prix. Aucun travail n'est engagé sans validation écrite du devis. Les demandes envoyées via le formulaire reçoivent une réponse sous 48 heures ouvrées.",
        ],
      },
      {
        h: "4. Propriété intellectuelle",
        body: [
          "Les contenus du site (textes, images, marque EIDEN GROUP) sont protégés et ne peuvent être reproduits sans autorisation. Les livrables clients sont cédés selon les termes du devis accepté.",
        ],
      },
      {
        h: "5. Responsabilités",
        body: [
          "EIDEN GROUP met en œuvre les moyens nécessaires à la qualité de ses prestations sans garantie de résultat chiffré (positions Google, volumes de prospects), ceux-ci dépendant de facteurs extérieurs. Le client reste responsable des contenus et informations qu'il fournit.",
        ],
      },
      {
        h: "6. Droit applicable et contact",
        body: [
          "Ces conditions relèvent du droit marocain. Pour toute question : contact@eiden-group.com, +212 777 777 428, Agadir Bay, Technopole 1, Bloc B101, Agadir 80000, Maroc.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "Terms of use",
    title: "Terms of service",
    updated: "Last updated: October 2026",
    intro:
      "These terms govern the use of eiden-group.com, published by EIDEN GROUP, Agadir — and the business relationship for our strategy, brand, web, visibility and content services.",
    sections: [
      {
        h: "1. Purpose",
        body: [
          "The site presents EIDEN GROUP's services, work and solutions, and lets visitors request a quote through the contact form. Every engagement is covered by a written quote accepted by the client.",
        ],
      },
      {
        h: "2. Services",
        body: [
          "Strategy and identity, websites and web applications, SEO and AI visibility (GEO), advertising campaigns, photo and video content, and digital solutions (Skema, Essor, Kavo, StayDesk).",
        ],
      },
      {
        h: "3. Quotes and orders",
        body: [
          "Every project starts with a 30-minute discovery call, followed by a detailed quote: scope, timeline, deliverables and price. No work starts without written approval of the quote. Form requests are answered within 48 business hours.",
        ],
      },
      {
        h: "4. Intellectual property",
        body: [
          "Site contents (copy, images, the EIDEN GROUP brand) are protected and may not be reproduced without permission. Client deliverables are transferred under the terms of the accepted quote.",
        ],
      },
      {
        h: "5. Liability",
        body: [
          "EIDEN GROUP applies the care its work requires without guaranteeing quantified outcomes (Google rankings, lead volumes), which depend on outside factors. The client remains responsible for the contents and information it provides.",
        ],
      },
      {
        h: "6. Governing law and contact",
        body: [
          "These terms fall under Moroccan law. Any question: contact@eiden-group.com, +212 777 777 428, Agadir Bay, Technopole 1, Bloc B101, Agadir 80000, Morocco.",
        ],
      },
    ],
  },
};

const privacy: Record<"fr" | "en", LegalCopy> = {
  fr: {
    eyebrow: "Données personnelles",
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : octobre 2026",
    intro:
      "EIDEN GROUP (Agadir, Maroc) respecte la loi 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel. Cette page dit quelles données nous collectons, pourquoi, et quels sont vos droits.",
    sections: [
      {
        h: "1. Données collectées",
        body: [
          "Via le formulaire de contact : nom, société, e-mail, téléphone, sujet et message — utilisés uniquement pour répondre à votre demande. Via la navigation, et seulement après votre acceptation : mesures d'audience anonymisées (voir section 3).",
        ],
      },
      {
        h: "2. Mesures d'audience",
        body: [
          "Après acceptation du bandeau cookies : Google Analytics 4 et Google Tag Manager (Google Ireland), pour comprendre les visites de façon agrégée, et Microsoft Clarity (heatmaps et enregistrements de session anonymisés). Sans acceptation, rien n'est chargé : le mode consentement de Google reste sur refus et Clarity ne démarre pas.",
        ],
      },
      {
        h: "3. Cookies et stockage",
        body: [
          "Votre choix cookies est conservé localement dans votre navigateur (clé « eiden-consent-v1 ») et rien d'autre. Les outils de mesure, une fois acceptés, déposent leurs propres cookies selon leurs politiques (Google, Microsoft).",
        ],
      },
      {
        h: "4. Vos droits",
        body: [
          "Droit d'accès, de rectification et d'opposition conformément à la loi 09-08, exercés par simple e-mail à contact@eiden-group.com. Réponse sous 30 jours. Vous pouvez aussi retirer votre consentement à tout moment en effaçant le stockage local du site puis en rechargeant la page.",
        ],
      },
      {
        h: "5. Conservation et partage",
        body: [
          "Les demandes de contact sont conservées 3 ans maximum. Aucune donnée n'est vendue ni cédée ; les seuls destinataires sont nos outils de mesure (Google, Microsoft) et notre hébergeur, dans le cadre strict de leurs prestations.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "Personal data",
    title: "Privacy policy",
    updated: "Last updated: October 2026",
    intro:
      "EIDEN GROUP (Agadir, Morocco) complies with Law 09-08 on the protection of individuals with regard to personal data processing. This page states what we collect, why, and what your rights are.",
    sections: [
      {
        h: "1. Data collected",
        body: [
          "Through the contact form: name, company, email, phone, subject and message — used only to answer your request. Through browsing, and only after you accept: anonymised audience measurement (see section 3).",
        ],
      },
      {
        h: "2. Audience measurement",
        body: [
          "After accepting the cookie banner: Google Analytics 4 and Google Tag Manager (Google Ireland), to understand visits in aggregate, and Microsoft Clarity (anonymised heatmaps and session recordings). Without acceptance nothing loads: Google consent mode stays denied and Clarity never starts.",
        ],
      },
      {
        h: "3. Cookies and storage",
        body: [
          "Your cookie choice is kept locally in your browser (key “eiden-consent-v1”) and nothing else. Once accepted, the measurement tools set their own cookies under their own policies (Google, Microsoft).",
        ],
      },
      {
        h: "4. Your rights",
        body: [
          "Rights of access, rectification and objection under Law 09-08, exercised by a simple email to contact@eiden-group.com. Answered within 30 days. You can also withdraw consent at any time by clearing the site's local storage and reloading.",
        ],
      },
      {
        h: "5. Retention and sharing",
        body: [
          "Contact requests are kept 3 years maximum. No data is sold or transferred; the only recipients are our measurement tools (Google, Microsoft) and our host, strictly within their services.",
        ],
      },
    ],
  },
};

const security: Record<"fr" | "en", LegalCopy> = {
  fr: {
    eyebrow: "Sécurité",
    title: "Sécurité et bonnes pratiques",
    updated: "Dernière mise à jour : octobre 2026",
    intro:
      "Comment nous protégeons ce site, vos demandes de contact et les projets que vous nous confiez — concrètement, sans jargon.",
    sections: [
      {
        h: "1. Chiffrement et hébergement",
        body: [
          "L'ensemble du trafic est chiffré (HTTPS/TLS) et le site est hébergé sur une infrastructure cloud avec pare-feu applicatif, sauvegardes et surveillance. Les en-têtes de sécurité (politique de contenu, anti-clickjacking) sont activés.",
        ],
      },
      {
        h: "2. Formulaire de contact",
        body: [
          "Les envois sont validés côté serveur, limités en fréquence anti-abus et filtrés anti-spam. Les identifiants d'envoi d'e-mails sont stockés en variables d'environnement chiffrées, jamais dans le code.",
        ],
      },
      {
        h: "3. Accès aux données",
        body: [
          "Accès restreint aux seules personnes qui en ont besoin, mots de passe uniques et authentification renforcée sur tous les services. Aucun poste ou prestataire n'a accès au-delà de sa mission.",
        ],
      },
      {
        h: "4. Mises à jour",
        body: [
          "Dépendances suivies et mises à jour, sauvegardes régulières, journalisation des accès d'administration. En cas d'incident avéré, les personnes concernées sont informées sous 72 heures.",
        ],
      },
      {
        h: "5. Signaler un problème",
        body: [
          "Vous avez repéré une faille ou un comportement anormal ? Écrivez à contact@eiden-group.com avec l'objet « Sécurité » : nous accusons réception sous 48 heures ouvrées.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "Security",
    title: "Security practices",
    updated: "Last updated: October 2026",
    intro:
      "How we protect this site, your contact requests and the projects you entrust to us — concretely, without jargon.",
    sections: [
      {
        h: "1. Encryption and hosting",
        body: [
          "All traffic is encrypted (HTTPS/TLS) and the site runs on cloud infrastructure with application firewall, backups and monitoring. Security headers (content policy, anti-clickjacking) are enabled.",
        ],
      },
      {
        h: "2. Contact form",
        body: [
          "Submissions are validated server-side, abuse rate-limited and spam-filtered. Email credentials live in encrypted environment variables, never in code.",
        ],
      },
      {
        h: "3. Data access",
        body: [
          "Access restricted to the people who need it, unique passwords and hardened authentication on every service. No workstation or provider reaches beyond its assignment.",
        ],
      },
      {
        h: "4. Updates",
        body: [
          "Tracked and updated dependencies, regular backups, admin access logging. In case of a proven incident, affected people are informed within 72 hours.",
        ],
      },
      {
        h: "5. Report an issue",
        body: [
          "Spotted a flaw or abnormal behaviour? Write to contact@eiden-group.com with the subject “Security”: we acknowledge within 48 business hours.",
        ],
      },
    ],
  },
};

export function TermsContent() {
  const { locale } = useLanguage();
  return <Shell copy={locale === "en" ? terms.en : terms.fr} />;
}

export function PrivacyContent() {
  const { locale } = useLanguage();
  return <Shell copy={locale === "en" ? privacy.en : privacy.fr} />;
}

export function SecurityContent() {
  const { locale } = useLanguage();
  return <Shell copy={locale === "en" ? security.en : security.fr} />;
}
