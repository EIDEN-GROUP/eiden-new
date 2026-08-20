"use client";

import { PageHero } from "@/components/layout/page-hero";
import { Team } from "@/components/sections/team";
import { BookCall } from "@/components/sections/book-call";
import { ContactBanner } from "@/components/sections/contact-banner";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/components/providers/language-provider";

export function AboutView() {
  const { t } = useLanguage();
  const page = t.pages.about;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      {/* Positioning */}
      <section className="bg-canvas py-24 sm:py-32">
        <div className="container-eiden grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <p className="editorial text-forest text-[clamp(1.375rem,2.6vw,2rem)] leading-snug">
              {t.idea.title}
            </p>
          </Reveal>

          <div>
            <Reveal delay={0.06}>
              <p className="text-forest/65 text-base leading-relaxed sm:text-[1.0625rem]">
                {page.body}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-2 sm:grid-cols-2">
              {[
                {
                  label: t.idea.missionLabel,
                  body: t.idea.mission,
                  accent: "bg-teal",
                },
                {
                  label: t.idea.visionLabel,
                  body: t.idea.vision,
                  accent: "bg-gold",
                },
              ].map((block, index) => (
                <Reveal key={block.label} delay={0.1 + index * 0.06}>
                  <div className="bg-cream relative h-full overflow-hidden rounded-2xl p-7">
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 top-0 h-[3px] ${block.accent}`}
                    />
                    <p className="eyebrow text-forest/40">{block.label}</p>
                    <p className="text-forest/75 mt-4 text-[0.9375rem] leading-relaxed">
                      {block.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-forest py-24 sm:py-32">
        <div className="container-eiden">
          <SectionHeading
            eyebrow={t.idea.eyebrow}
            title={page.valuesTitle}
            tone="light"
            className="max-w-2xl"
          />

          <RevealGroup className="bg-canvas/10 mt-14 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2">
            {page.values.map((value) => (
              <article
                key={value.title}
                className="bg-forest hover:bg-forest-md p-8 transition-colors duration-500 sm:p-10"
              >
                <h3 className="font-display text-canvas text-xl font-bold tracking-[-0.02em]">
                  {value.title}
                </h3>
                <p className="text-canvas/60 mt-4 text-[0.9375rem] leading-relaxed">
                  {value.text}
                </p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-canvas py-24 sm:py-32">
        <div className="container-eiden">
          <SectionHeading
            eyebrow={page.timelineTitle}
            title={t.idea.visionLabel + " — 2025 → 2026"}
            className="max-w-2xl"
          />

          <RevealGroup className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {page.timeline.map((step) => (
              <article key={step.title} className="border-teal/25 border-t-2 pt-6">
                <p className="font-label text-gold-dk text-sm font-semibold tracking-[0.2em]">
                  {step.year}
                </p>
                <h3 className="font-display text-forest mt-4 text-lg font-bold tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="text-forest/60 mt-3 text-[0.9375rem] leading-relaxed">
                  {step.text}
                </p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Team />
      <BookCall />
      <ContactBanner />
    </>
  );
}
