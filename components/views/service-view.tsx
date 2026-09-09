"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import {
  heroEnter,
  heroStage,
  HERO_WORD_LEAD,
  HERO_WORD_STEP,
  useHeroDepart,
} from "@/components/layout/film-hero";
import { useLanguage } from "@/components/providers/language-provider";
import { serviceMedia } from "@/lib/data/site";
import { cn } from "@/lib/utils";

/**
 * One expertise, on its own page.
 *
 * There is no body to this page yet   the copy for it has not been written
 * so it is the masthead and nothing else: the same film hero the about page
 * opens on, carrying the title, the two lines that sit under it and the
 * deliverables the homepage already lists as pills. Everything it says is read
 * out of `services.items` in the dictionaries, so both languages arrive with
 * it and neither has to be re-typed here.
 */
export function ServiceView({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const sectionRef = useHeroDepart<HTMLElement>();

  const index = t.services.items.findIndex((item) => item.slug === slug);
  const service = t.services.items[index];
  if (!service) notFound();

  const image = serviceMedia[slug];
  const words = service.title.split(" ").filter(Boolean);

  return (
    <section
      ref={sectionRef}
      data-nav-tone="light"
      className="hero-depart bg-cream relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      {image ? (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 overflow-hidden motion-safe:[animation:eiden-film-settle_2.4s_var(--ease-brand)_both]"
        >
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="idea-shot-img scale-105 object-cover object-center"
          />
          <span aria-hidden className="hero-shot-veil" />
        </div>
      ) : null}

      <div className="container-eiden relative flex flex-1 flex-col justify-end pt-32 pb-16 sm:pt-40 sm:pb-20">
        <p
          className={cn(heroEnter, "eyebrow text-canvas flex items-center gap-3")}
          style={heroStage(0.06)}
        >
          <span aria-hidden className="h-px w-8 bg-current opacity-50" />
          <span className="numeral">{String(index + 1).padStart(2, "0")}</span>
        </p>

        <h1 className="text-balance-tight text-ink mt-6 max-w-5xl text-[clamp(2.25rem,min(6.4vw,11vh),4.5rem)] leading-[1.02] font-medium">
          {words.map((word, wordIndex) => (
            <span
              key={`${word}-${wordIndex}`}
              className={cn(
                // The padding keeps accents and descenders clear of the mask.
                "inline-block overflow-hidden pb-[0.14em] align-bottom",
                wordIndex < words.length - 1 && "mr-[0.25em]",
              )}
            >
              <span
                className="inline-block motion-safe:[animation:eiden-word-rise_0.95s_var(--ease-brand)_both]"
                style={heroStage(HERO_WORD_LEAD + wordIndex * HERO_WORD_STEP)}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p
          className={cn(
            heroEnter,
            "text-gold-dk mt-5 max-w-3xl text-[1.0625rem] leading-snug font-medium sm:text-[1.25rem]",
          )}
          style={heroStage(0.52)}
        >
          {service.kicker}
        </p>

        <p
          className={cn(
            heroEnter,
            "text-ink/70 mt-5 max-w-2xl text-[0.9375rem] leading-relaxed sm:text-[1.0625rem]",
          )}
          style={heroStage(0.6)}
        >
          {service.text}
        </p>

        <div className={cn(heroEnter, "mt-9")} style={heroStage(0.7)}>
          <p className="eyebrow text-ink/45">{t.services.deliverablesLabel}</p>
          <ul className="mt-4 flex flex-wrap items-center gap-2">
            {service.deliverables.map((deliverable) => (
              <li
                key={deliverable}
                className="border-ink/20 text-ink/75 hover:border-ink/45 hover:text-ink rounded-full border px-3 py-1.5 text-[0.875rem] transition-colors duration-300 ease-[var(--ease-brand)] motion-reduce:transition-none"
              >
                {deliverable}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
