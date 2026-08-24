"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FilmHero } from "@/components/layout/film-hero";
import { ContactBanner } from "@/components/sections/contact-banner";
import { LogoMarquee } from "@/components/ui/marquee";
import { RevealGroup } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/components/providers/language-provider";
import { caseStudies, clientLogos, heroTexture } from "@/lib/data/site";

export function ClientsView() {
  const { t } = useLanguage();
  const page = t.pages.clients;

  return (
    <>
      <FilmHero
        eyebrow={page.eyebrow}
        titleLead={page.titleLead}
        titleAccent={page.titleAccent}
        titleTail={page.titleTail}
        lead={page.lead}
        image={heroTexture}
        imageClassName="scale-110 object-cover object-center opacity-70 blur-[6px]"
      >
        <div className="border-canvas/12 border-t pt-8">
          <LogoMarquee logos={clientLogos} tone="light" speed={44} />
        </div>
      </FilmHero>

      {/* Project grid */}
      <section className="bg-canvas py-24 sm:py-32">
        <div className="container-eiden">
          <SectionHeading
            eyebrow={t.proof.eyebrow}
            title={t.proof.title}
            lead={t.proof.text}
            className="max-w-3xl"
          />

          <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2">
            {t.proof.cases.map((entry, index) => {
              const media =
                caseStudies.find((item) => item.slug === entry.slug) ??
                caseStudies[0];
              return (
                <article
                  key={entry.slug}
                  // Landing target for the hero arc, which links each card
                  // straight to its own project. The offset clears the header.
                  id={entry.slug}
                  className={
                    "group bg-cream relative scroll-mt-28 overflow-hidden rounded-2xl " +
                    (index === 0 ? "md:col-span-2" : "")
                  }
                >
                  <div
                    className={
                      "relative overflow-hidden " +
                      (index === 0 ? "aspect-16/9" : "aspect-4/3")
                    }
                  >
                    <Image
                      src={media.image}
                      alt={media.imageAlt}
                      fill
                      sizes={
                        index === 0
                          ? "(min-width: 768px) 80vw, 100vw"
                          : "(min-width: 768px) 42vw, 100vw"
                      }
                      className="object-cover transition-transform duration-[900ms] ease-[var(--ease-brand)] group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="flex flex-col gap-5 p-7 sm:flex-row sm:items-end sm:justify-between sm:p-9">
                    <div className="min-w-0">
                      <p className="eyebrow text-gold-dk">{media.client}</p>
                      <h3 className="font-display text-forest mt-4 max-w-xl text-xl leading-tight font-bold tracking-[-0.025em] sm:text-2xl">
                        {entry.title}
                      </h3>
                      <p className="text-forest/60 mt-4 max-w-xl text-[0.9375rem] leading-relaxed">
                        {entry.text}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                          <li
                            key={tag}
                            className="border-forest/15 text-forest/60 rounded-full border px-3 py-1 text-[0.82rem]"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {media.website ? (
                      <a
                        href={media.website}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${media.client} — ${t.common.seeCase}`}
                        className="bg-forest text-canvas hover:bg-teal flex size-12 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
                      >
                        <ArrowUpRight
                          className="size-4 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:rotate-45"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-eiden">
          <SectionHeading
            eyebrow={page.eyebrow}
            title={page.sectorsTitle}
            className="max-w-2xl"
          />

          <RevealGroup className="bg-forest/10 mt-14 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-3">
            {page.sectors.map((sector) => (
              <article
                key={sector.title}
                className="group bg-canvas hover:bg-beige p-8 transition-colors duration-500"
              >
                <h3 className="font-display text-forest text-lg font-bold tracking-[-0.02em]">
                  {sector.title}
                </h3>
                <p className="text-forest/60 mt-3 text-[0.9375rem] leading-relaxed">
                  {sector.text}
                </p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <ContactBanner />
    </>
  );
}
