"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { FilmHero } from "@/components/layout/film-hero";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/components/providers/language-provider";
import { aboutTexture, movementMedia, siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";
import { FixedBackdrop } from "../ui/fixed-backdrop";
import Link from "next/link";
import { AboutMovements } from "../about/movements";
import { AboutPrinciples } from "../about/principles";
import { AboutMethods } from "../about/methods";

export function AboutView() {
  const { t } = useLanguage();
  const page = t.pages.about;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const arrow =
    "size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-1 motion-reduce:transition-none";

  return (
    <>
      <FilmHero
        eyebrow={page.eyebrow}
        titleLead={page.titleLead}
        titleAccent={page.titleAccent}
        titleTail={page.titleTail}
        lead={page.lead}
        imageClassName="scale-110 object-cover object-center blur-[5px]"
      >
        <Link href="/contact" className="group bg-ink text-canvas hover:bg-teal inline-flex h-9 items-center gap-2 rounded-full px-6 text-[0.9375rem] transition-colors duration-300">
          {page.ctaAction}
          <ArrowRight className={arrow} strokeWidth={1.8} aria-hidden />
        </Link>
      </FilmHero>

      {/* ── Where we stand ─────────────────────────────────────────── */}
      <section className="bg-canvas py-24 sm:py-32">
        <div className="container-eiden grid items-end gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
          <SectionHeading
            eyebrow={page.positionEyebrow}
            title={page.positionTitle}
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <Reveal delay={0.06}>
            <p className="editorial text-forest text-[clamp(1rem,2.4vw,1.5rem)] leading-snug">
              {page.positionBody}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── The origin, in four movements ──────────────────────────── */}
      <AboutMovements
        eyebrow={page.storyEyebrow}
        title={page.storyTitle}
        movements={page.movements}
        media={movementMedia}
      />

      {/* ── Principles ─────────────────────────────────────────────── */}
      <AboutPrinciples
        eyebrow={page.principlesEyebrow}
        title={page.principlesTitle}
        principles={page.principles}
      />

      {/* ── Methods, then the count ────────────────────────────────── */}
      <AboutMethods
        eyebrow={page.methodsEyebrow}
        title={page.methodsTitle}
        methods={page.methods}
        numbersEyebrow={page.numbersEyebrow}
        numbers={page.numbers}
      />

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-cream py-24 sm:py-32">
        <div className="container-eiden grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-20">
          <SectionHeading
            eyebrow={page.faqEyebrow}
            title={page.faqTitle}
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <div>
            {page.faq.map((entry, index) => {
              const open = openFaq === index;
              return (
                <Reveal key={entry.q} delay={0.04 * index} amount={0.15}>
                  <div
                    className={cn(
                      "border-forest/12 border-t",
                      index === page.faq.length - 1 && "border-b",
                    )}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : index)}
                        aria-expanded={open}
                        className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                      >
                        <span className="font-display text-forest group-hover:text-teal text-[1.0625rem] font-bold tracking-[-0.02em] transition-colors duration-300 sm:text-lg">
                          {entry.q}
                        </span>
                        <span
                          className={cn(
                            "border-forest/20 text-forest mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                            open
                              ? "border-teal bg-teal text-canvas rotate-45"
                              : "group-hover:border-teal/50",
                          )}
                        >
                          <Plus className="size-4" strokeWidth={1.8} aria-hidden />
                        </span>
                      </button>
                    </h3>

                    {/* `grid-template-rows: 0fr → 1fr` animates to intrinsic
                        height in pure CSS, so the answer opens with or without
                        JavaScript animation support. */}
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                        open
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="text-forest/65 max-w-xl pb-6 text-[0.9375rem] leading-relaxed">
                          {entry.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── The way in ─────────────────────────────────────────────── */}
      {/* <section
        id="contact"
        data-nav-tone="light"
        className="relative isolate w-full"
      >
        <FixedBackdrop src={aboutTexture} />
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(115%_100%_at_50%_50%,rgba(244,235,208,0.94),rgba(244,235,208,0.72))]"
        />

        <div className="mx-auto flex h-svh max-w-full flex-col items-center justify-center px-5 py-16 text-center sm:px-8 sm:py-18">
          <Reveal direction="none" duration={0.5}>
            <p className="eyebrow text-teal mb-3">{t.contact.eyebrow}</p>
          </Reveal>

          <RevealWords
            as="h2"
            text={page.ctaTitle}
            delay={0.06}
            className="font-display text-ink mt-3 block text-[clamp(1.875rem,5vw,3.75rem)] leading-[1.06] font-medium tracking-[-0.01em] uppercase"
          />

          <Reveal delay={0.45}>
            <p className="text-ink/65 mx-auto mt-3 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
              {page.ctaText}
            </p>
          </Reveal>

          <Reveal
            delay={0.58}
            className="mt-11 flex flex-col items-center gap-5 sm:mt-12"
          >
            <Link
              href="/contact"
              className="group text-ink font-display relative inline-block pb-2 text-[0.82rem] font-semibold tracking-[0.24em] uppercase sm:text-[0.875rem]"
            >
              {page.ctaAction}
              <span
                aria-hidden
                className="bg-ink/30 absolute inset-x-0 bottom-0 h-px"
              />
              <span
                aria-hidden
                className="bg-teal absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-x-100 motion-reduce:transition-none"
              />
            </Link>

            <a
              href={`mailto:${siteConfig.email}`}
              className="text-ink/60 hover:text-teal text-[0.875rem] tracking-wide transition-colors duration-300"
            >
              {siteConfig.email}
            </a>
          </Reveal>
        </div>
      </section> */}
    </>
  );
}
