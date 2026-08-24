"use client";

import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Services } from "@/components/sections/services";
import { Pricing } from "@/components/sections/pricing";
import { BookCall } from "@/components/sections/book-call";
import { ContactBanner } from "@/components/sections/contact-banner";
import { ServiceGlyph, serviceGlyphs } from "@/components/ui/service-glyph";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/components/providers/language-provider";

export function SolutionsView() {
  const { t } = useLanguage();
  const page = t.pages.solutions;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      {/* Four solution families */}
      <section className="bg-canvas py-24 sm:py-32">
        <div className="container-eiden flex flex-col gap-4">
          {page.groups.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.04} amount={0.15}>
              <article
                id={group.id}
                className="border-forest/10 bg-cream scroll-mt-28 overflow-hidden rounded-2xl border"
              >
                <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 lg:p-14">
                  <div>
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="font-label text-gold-dk text-[0.9375rem] font-bold tracking-[0.2em]">
                          0{index + 1}
                        </p>
                        <h2 className="font-display text-forest mt-4 text-[clamp(1.5rem,3vw,2.25rem)] leading-tight font-extrabold tracking-[-0.035em]">
                          {group.title}
                        </h2>
                      </div>
                      <ServiceGlyph
                        name={serviceGlyphs[index % serviceGlyphs.length]}
                        className="text-teal/45 size-14 shrink-0"
                      />
                    </div>

                    <p className="text-forest/65 mt-5 max-w-md text-base leading-relaxed">
                      {group.text}
                    </p>
                  </div>

                  <div>
                    <p className="eyebrow text-forest/40">
                      {page.deliverablesTitle}
                    </p>
                    <ul className="mt-6 flex flex-col gap-3.5">
                      {group.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            aria-hidden
                            className="bg-teal/10 text-teal mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full"
                          >
                            <Check className="size-3" strokeWidth={2.6} />
                          </span>
                          <span className="text-forest/75 text-[0.9375rem] leading-snug">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Services />

      {/* Process */}
      <section className="grain bg-forest py-24 sm:py-32">
        <div className="container-eiden">
          <SectionHeading
            eyebrow={page.eyebrow}
            title={page.processTitle}
            tone="light"
            className="max-w-2xl"
          />

          <RevealGroup className="bg-canvas/10 mt-14 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4">
            {page.process.map((step) => (
              <article
                key={step.n}
                className="bg-forest hover:bg-forest-md p-8 transition-colors duration-500"
              >
                <span className="font-label text-gold text-[0.9375rem] font-bold tracking-[0.2em]">
                  {step.n}
                </span>
                <h3 className="font-display text-canvas mt-4 text-lg font-bold tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="text-canvas/55 mt-3 text-[0.9375rem] leading-relaxed">
                  {step.text}
                </p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Pricing />
      <BookCall />
      <ContactBanner />
    </>
  );
}
