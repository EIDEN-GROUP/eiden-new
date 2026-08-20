"use client";

import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { siteConfig } from "@/lib/data/site";

/**
 * First half of the closing pair.
 *
 * This panel and `ContactBanner` share a gutter, a corner radius, an eyebrow
 * treatment and the same drawn backdrop language — a light step followed by a
 * dark one, so the end of the page reads as one block rather than two unrelated
 * calls to action.
 */
export function BookCall() {
  const { t } = useLanguage();

  return (
    <section
      id="appel"
      className="bg-canvas px-2.5 pt-6 pb-2 sm:px-4 sm:pt-8 sm:pb-3"
    >
      <Reveal amount={0.15} duration={0.9}>
        <div className="grain bg-beige relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem]">
          {/* Same drawn field as the hero, tuned for a light surface */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-[16rem] -right-[10rem] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(12,87,82,0.18),transparent_66%)] blur-3xl motion-safe:[animation:eiden-orb_32s_ease-in-out_infinite]" />
            <div className="absolute -bottom-[18rem] -left-[12rem] size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,88,0.28),transparent_68%)] blur-3xl motion-safe:[animation:eiden-orb_40s_ease-in-out_infinite_reverse]" />
            <div className="zellige text-forest absolute inset-0 [mask-image:radial-gradient(85%_75%_at_20%_10%,black,transparent)] opacity-70" />
          </div>

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 lg:p-16">
            <div>
              <Reveal direction="none" duration={0.5}>
                <p className="eyebrow text-teal flex items-center gap-3">
                  <span
                    aria-hidden
                    className="h-px w-8 origin-left bg-current opacity-50 motion-safe:[animation:eiden-underline_0.8s_var(--ease-brand)_0.15s_both]"
                  />
                  {t.bookCall.eyebrow}
                </p>
              </Reveal>

              <RevealWords
                as="h2"
                text={t.bookCall.title}
                delay={0.06}
                className="text-forest mt-6 text-[clamp(1.875rem,4.4vw,3.25rem)] leading-[1.04]"
              />

              <Reveal delay={0.45}>
                <p className="text-forest/65 mt-6 max-w-lg text-base leading-relaxed">
                  {t.bookCall.text}
                </p>
              </Reveal>

              <Reveal delay={0.55}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <ButtonLink href="/contact" variant="dark" size="lg" dot>
                    {t.bookCall.cta}
                  </ButtonLink>
                  <ButtonLink
                    href={`mailto:${siteConfig.email}`}
                    variant="outline"
                    size="lg"
                    className="text-forest"
                  >
                    {t.bookCall.secondary}
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <RevealGroup className="bg-forest/10 flex flex-col gap-px overflow-hidden rounded-2xl">
              {t.bookCall.points.map((point) => (
                <div
                  key={point}
                  className="group bg-cream hover:bg-canvas flex items-start gap-4 p-5 transition-colors duration-500 ease-[var(--ease-brand)] sm:p-6"
                >
                  <span
                    aria-hidden
                    className="bg-teal text-canvas mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-110"
                  >
                    <Check className="size-3.5" strokeWidth={2.4} />
                  </span>
                  <span className="text-forest/80 text-[0.9375rem] leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
