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
      <span aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(115%_100%_at_50%_50%,rgba(18,38,32,0.92),rgba(18,38,32,0.72))]"/>

      <div className="mx-auto flex h-svh max-w-full flex-col items-center justify-center px-5 py-16 text-center sm:px-8 sm:py-18">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-canvas mb-3">{t.contact.eyebrow}</p>
        </Reveal>

        <RevealWords as="h2" text={t.contact.title} delay={0.06} className="font-display text-canvas mt-3 block text-[clamp(1.875rem,5vw,3.75rem)] leading-[1.06] font-medium tracking-[-0.01em] uppercase" />

        <Reveal delay={0.45}>
          <p className="text-canvas mx-auto mt-3 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
            {t.contact.text}
          </p>
        </Reveal>

        <Reveal delay={0.58} className="mt-11 flex flex-col items-center gap-5 sm:mt-12">
          <Link href={`https://wa.me/${siteConfig.phoneMa.replace(/\D/g, "")}`} className="group text-canvas px-8 py-2 font-display border border-canvas/50 rounded-full hover:border-gold hover:text-gold relative inline-block pb-2 text-[15px] font-semibold tracking-[0.24em] uppercase sm:text-[0.875rem]">
            {t.contact.cta}
          </Link>

          <a href={`mailto:${siteConfig.email}`} className="text-canvas hover:text-gold text-[0.875rem] tracking-wide transition-colors duration-300">
            {siteConfig.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
