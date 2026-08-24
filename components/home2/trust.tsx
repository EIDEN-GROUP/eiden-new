"use client";

import { ScrollWords } from "@/components/home2/motion";
import { LogoMarquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { clientLogos } from "@/lib/data/site";

/** The roster, on a running band under a line that lights up as it arrives. */
export function Home2Trust() {
  const { t } = useLanguage();

  return (
    <section className="bg-cream px-4 pb-20 sm:px-6 sm:pb-28">
      <div className="mx-auto max-w-6xl">
        <Reveal direction="none" duration={0.5}>
          <p className="font-label text-forest/40 text-[0.8rem] font-bold tracking-[0.32em] uppercase">
            {t.hero.clientsLabel}
          </p>
        </Reveal>

        <ScrollWords
          as="h2"
          text={t.hero.trust}
          className="font-display mt-5 max-w-3xl text-[clamp(1.75rem,4.6vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.045em]"
        />

        <LogoMarquee logos={clientLogos} className="mt-12 sm:mt-16" />
      </div>
    </section>
  );
}
