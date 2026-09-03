"use client";

import Link from "next/link";
import { FixedBackdrop } from "@/components/ui/fixed-backdrop";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { contactTexture, siteConfig } from "@/lib/data/site";

export function ContactBanner() {
  const { t } = useLanguage();

  return (
    <section id="contact" data-nav-tone="light" className="relative isolate w-full">
      <FixedBackdrop src={contactTexture} />
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
          text={t.contact.title}
          delay={0.06}
          className="font-display text-ink mt-3 block text-[clamp(1.875rem,5vw,3.75rem)] leading-[1.06] font-medium tracking-[-0.01em] uppercase"
        />

        <Reveal delay={0.45}>
          <p className="text-ink/65 mx-auto mt-3 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
            {t.contact.text}
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
            {t.contact.cta}
            <span
              aria-hidden
              className="bg-ink/40 absolute inset-x-0 bottom-0 h-px"
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
    </section>
  );
}
