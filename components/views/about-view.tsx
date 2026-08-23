"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { FilmHero } from "@/components/layout/film-hero";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/components/providers/language-provider";
import { aboutTexture, siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";
import { FixedBackdrop } from "../ui/fixed-backdrop";
import Link from "next/link";

export function AboutView() {
  const { t } = useLanguage();
  const page = t.pages.about;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const arrow = "size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-1 motion-reduce:transition-none";

  return (
    <>
      <FilmHero
        eyebrow={page.eyebrow}
        titleLead={page.titleLead}
        titleAccent={page.titleAccent}
        titleTail={page.titleTail}
        lead={page.lead}
        imageClassName="scale-110 object-cover object-center opacity-70 blur-[6px]"
      >
        <Link href="/nos-solutions" className="group bg-canvas text-ink hover:bg-gold inline-flex h-9 items-center gap-2 rounded-full px-6 text-sm transition-colors duration-300" >
          {page.ctaAction}
          <ArrowRight className={arrow} strokeWidth={1.8} aria-hidden />
        </Link>
      </FilmHero>

      {/* ── Where we stand ─────────────────────────────────────────── */}
      <section className="bg-canvas py-24 sm:py-32">
        <div className="container-eiden grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
          <SectionHeading
            eyebrow={page.positionEyebrow}
            title={page.positionTitle}
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <Reveal delay={0.06}>
            <p className="editorial text-forest text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug">
              {page.positionBody}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── The origin, in four movements ──────────────────────────── */}
      <section className="grain bg-ink py-24 sm:py-32">
        <div className="container-eiden relative z-2">
          <SectionHeading
            eyebrow={page.storyEyebrow}
            title={page.storyTitle}
            tone="light"
            className="max-w-2xl"
          />

          <RevealGroup className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {page.movements.map((movement) => (
              <article
                key={movement.n}
                className="border-canvas/15 hover:border-gold/50 border-t pt-6 transition-colors duration-500"
              >
                <p className="font-label text-gold text-sm font-semibold tracking-[0.24em]">
                  {movement.n}
                </p>
                <h3 className="font-display text-canvas mt-4 text-xl font-bold tracking-[-0.02em]">
                  {movement.title}
                </h3>
                <p className="text-canvas/60 mt-3 text-[0.9375rem] leading-relaxed">
                  {movement.text}
                </p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Principles ─────────────────────────────────────────────── */}
      <section className="bg-canvas py-24 sm:py-32">
        <div className="container-eiden">
          <SectionHeading
            eyebrow={page.principlesEyebrow}
            title={page.principlesTitle}
            className="max-w-2xl"
          />

          <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-2">
            {page.principles.map((principle) => (
              <article
                key={principle.n}
                className="bg-cream flex flex-col rounded-2xl p-8 sm:p-10"
              >
                <p className="font-label text-gold-dk text-sm font-semibold tracking-[0.24em]">
                  {principle.n}
                </p>
                <h3 className="font-display text-forest mt-4 text-xl font-bold tracking-[-0.02em] sm:text-2xl">
                  {principle.title}
                </h3>
                <p className="text-forest/65 mt-3 text-[0.9375rem] leading-relaxed">
                  {principle.text}
                </p>
                <p className="editorial text-teal mt-auto pt-6 text-[0.9375rem] leading-snug">
                  “{principle.quote}”
                </p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Methods, then the count ────────────────────────────────── */}
      <section className="grain bg-forest py-24 sm:py-32">
        <div className="container-eiden relative z-2">
          <SectionHeading
            eyebrow={page.methodsEyebrow}
            title={page.methodsTitle}
            tone="light"
            className="max-w-2xl"
          />

          <RevealGroup className="bg-canvas/10 mt-14 grid gap-px overflow-hidden rounded-2xl lg:grid-cols-3">
            {page.methods.map((method) => (
              <article
                key={method.name}
                className="bg-forest hover:bg-forest-md flex flex-col p-8 transition-colors duration-500 sm:p-10"
              >
                <h3 className="font-display text-canvas text-xl font-bold tracking-[-0.02em]">
                  {method.name}
                </h3>
                <p className="text-canvas/60 mt-4 text-[0.9375rem] leading-relaxed">
                  {method.text}
                </p>
                <p className="editorial text-gold mt-auto pt-6 text-[0.9375rem] leading-snug">
                  “{method.quote}”
                </p>
              </article>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p className="eyebrow text-canvas/35 mt-16">{page.numbersEyebrow}</p>
          </Reveal>

          <RevealGroup className="border-canvas/12 mt-6 grid grid-cols-2 gap-x-8 gap-y-10 border-t pt-10 lg:grid-cols-4">
            {page.numbers.map((entry) => (
              <div key={entry.label}>
                <p className="font-display text-canvas text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.05em]">
                  {entry.value}
                </p>
                <p className="text-canvas/55 mt-3 text-sm leading-snug">
                  {entry.label}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

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
      <section id="contact" data-nav-tone="dark" className="relative isolate w-full">
        <FixedBackdrop src={aboutTexture} />
        <span aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(115%_100%_at_50%_50%,rgba(10,15,12,0.84),rgba(10,15,12,0.55))]"/>
  
        <div className="mx-auto flex h-svh max-w-full flex-col items-center justify-center px-5 py-16 text-center sm:px-8 sm:py-18">
          <Reveal direction="none" duration={0.5}>
            <p className="eyebrow text-gold mb-3">{t.contact.eyebrow}</p>
          </Reveal>
  
          <RevealWords
            as="h2"
            text={page.ctaTitle}
            delay={0.06}
            className="font-display text-canvas mt-3 block text-[clamp(1.875rem,5vw,3.75rem)] leading-[1.06] font-medium tracking-[-0.01em] uppercase"
          />
  
          <Reveal delay={0.45}>
            <p className="text-canvas/65 mx-auto mt-3 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
              {page.ctaText}
            </p>
          </Reveal>
  
          <Reveal
            delay={0.58}
            className="mt-11 flex flex-col items-center gap-5 sm:mt-12"
          >
            <Link
              href="/contact"
              className="group text-canvas font-display relative inline-block pb-2 text-[0.75rem] font-semibold tracking-[0.24em] uppercase sm:text-[0.8125rem]"
            >
              {page.ctaAction}
              <span
                aria-hidden
                className="bg-canvas/40 absolute inset-x-0 bottom-0 h-px"
              />
              <span
                aria-hidden
                className="bg-gold absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-x-100 motion-reduce:transition-none"
              />
            </Link>
  
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-canvas/60 hover:text-gold text-[0.8125rem] tracking-wide transition-colors duration-300"
            >
              {siteConfig.email}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
