"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/data/site";

type Faq = { q: string; a: string };

const faqs: Record<"fr" | "en", { title: string; items: Faq[] }> = {
  fr: {
    title: "Questions fréquentes",
    items: [
      {
        q: "Combien coûte un site web ou un branding ?",
        a: "Chaque projet est chiffré sur devis après l'appel de découverte de 30 minutes : périmètre, délais et livrables décident du prix, jamais l'inverse. Les budgets sont annoncés clairement dès le départ.",
      },
      {
        q: "Quels sont vos délais ?",
        a: "Comptez quelques semaines pour un site vitrine ou une identité, davantage pour une plateforme ou un e-commerce. Le calendrier exact figure dans chaque devis, puis est tenu et suivi.",
      },
      {
        q: "Travaillez-vous avec des clients hors d'Agadir ?",
        a: "Oui — partout au Maroc et avec des clients internationaux. Le premier appel se fait en visio, en français, en anglais ou en darija.",
      },
      {
        q: "Gérez-vous le site et les campagnes après la livraison ?",
        a: "Oui : maintenance, suivi mensuel, SEO continu et pilotage des campagnes Google et Meta. Un site qui tourne se mesure en dirhams, pas en impressions.",
      },
      {
        q: "Comment démarrer ?",
        a: "Par l'appel de 30 minutes depuis la page contact : vous repartez avec un plan clair, que nous travaillions ensemble ou non. Réponse sous 48 heures ouvrées.",
      },
    ],
  },
  en: {
    title: "Frequently asked questions",
    items: [
      {
        q: "How much does a website or a branding cost?",
        a: "Every project is quoted after the 30-minute discovery call: scope, timeline and deliverables set the price, never the other way round. Budgets are stated plainly from the start.",
      },
      {
        q: "What are your timelines?",
        a: "A few weeks for a showcase site or an identity, longer for a platform or e-commerce. The exact schedule sits in every quote, then is held and tracked.",
      },
      {
        q: "Do you work with clients outside Agadir?",
        a: "Yes — across Morocco and with international clients. The first call happens over video, in French, English or Darija.",
      },
      {
        q: "Do you run the site and campaigns after delivery?",
        a: "Yes: maintenance, monthly follow-up, ongoing SEO and Google and Meta campaign management. A site that runs is measured in dirhams, not impressions.",
      },
      {
        q: "How do we start?",
        a: "With the 30-minute call from the contact page: you leave with a clear plan, whether we work together or not. Answered within 48 business hours.",
      },
    ],
  },
};

/**
 * Visible FAQ on the contact page: answers the questions prospects actually
 * ask, and feeds the FAQPage schema below it for answer engines.
 */
export function ContactFaq() {
  const { locale } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);
  const copy = locale === "en" ? faqs.en : faqs.fr;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section
      aria-label={copy.title}
      className="bg-canvas text-ink border-ink/10 border-t"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container-eiden py-16 sm:py-20">
        <Reveal direction="none" duration={0.5} amount={0.3}>
          <h2 className="font-display max-w-2xl text-[clamp(1.5rem,3.2vw,2.5rem)] leading-tight font-extrabold tracking-[-0.04em] text-balance">
            {copy.title}
          </h2>
        </Reveal>
        <div className="mt-8 max-w-3xl">
          {copy.items.map((item, index) => {
            const isOpen = open === index;
            return (
              <Reveal key={item.q} delay={index * 0.05} amount={0.2}>
                <div className="border-ink/12 border-t last:border-b">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-[1.0625rem] leading-snug font-semibold">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "font-display text-teal shrink-0 text-[1.5rem] leading-none transition-transform duration-400 ease-[var(--ease-brand)] motion-reduce:transition-none",
                        isOpen && "rotate-45",
                      )}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-400 ease-[var(--ease-brand)] motion-reduce:transition-none",
                      isOpen ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-ink/60 max-w-2xl pb-6 text-[0.9375rem] leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="text-ink/45 mt-8 text-[0.85rem]">
          {locale === "en"
            ? `Anything else? ${siteConfig.email}`
            : `Une autre question ? ${siteConfig.email}`}
        </p>
      </div>
    </section>
  );
}
