"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { siteConfig } from "@/lib/data/site";

/**
 * Second half of the closing pair — the dark panel `BookCall` steps up into.
 * Gutter, radius, eyebrow rule and backdrop language are deliberately shared.
 */
export function ContactBanner() {
  const { t } = useLanguage();

  const details = [
    {
      icon: Mail,
      label: t.contact.infoLabels.email,
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: Phone,
      label: t.contact.infoLabels.phone,
      value: siteConfig.phoneMa,
      href: `tel:${siteConfig.phoneMa.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: t.contact.infoLabels.address,
      value: "Agadir 80000, Maroc",
      href: undefined,
    },
  ];

  return (
    <section
      id="contact"
      className="rounded-b-[1.75rem] px-2.5 pb-4 sm:rounded-b-[2.5rem] sm:px-4 sm:pb-6"
    >
      <Reveal amount={0.12} duration={0.9}>
        <div className="relative isolate overflow-hidden">
          <div className="relative px-6 py-20 text-center sm:px-10 sm:py-28">
            <Reveal direction="none" duration={0.5}>
              <p className="eyebrow text-gold flex items-center justify-center gap-3">
                <span
                  aria-hidden
                  className="h-px w-8 origin-left bg-current opacity-50 motion-safe:[animation:eiden-underline_0.8s_var(--ease-brand)_0.15s_both]"
                />
                {t.contact.eyebrow}
              </p>
            </Reveal>

            <RevealWords
              as="h2"
              text={t.contact.title}
              delay={0.06}
              className="text-ink mx-auto mt-7 block max-w-3xl text-[clamp(2rem,5.4vw,4rem)] leading-[1.04]"
            />

            <Reveal delay={0.5}>
              <p className="text-ink/70 mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                {t.contact.text}
              </p>
            </Reveal>

            <Reveal delay={0.6}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href="/contact" variant="gold" size="lg">
                  {t.contact.cta}
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${siteConfig.email}`}
                  variant="outline"
                  size="lg"
                  className="text-ink"
                >
                  {siteConfig.email}
                </ButtonLink>
              </div>
            </Reveal>

            {/* Same row rhythm as the checklist on the panel above */}
            <RevealGroup className="bg-canvas/10 mx-auto mt-16 grid max-w-3xl gap-px overflow-hidden rounded-2xl text-left sm:grid-cols-3">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="group bg-ink hover:bg-ink/90 flex items-start gap-3 p-5 transition-colors duration-500 ease-[var(--ease-brand)] sm:p-6"
                >
                  <item.icon
                    className="text-gold mt-0.5 size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-110"
                    strokeWidth={1.7}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="eyebrow text-canvas/40">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-canvas hover:text-gold mt-2 block text-sm break-words transition-colors duration-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-canvas mt-2 text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
