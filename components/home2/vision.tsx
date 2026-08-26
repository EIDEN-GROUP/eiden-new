"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useState } from "react";
import { ScrollWords } from "@/components/home2/motion";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { projectGallery } from "@/lib/data/site";
import { cn } from "@/lib/utils";

const strip = projectGallery.slice(0, 6);

/**
 * Where the house stands, as a two-tab folder.
 *
 * Mission and vision are the same shape of statement, so they get the same
 * panel and a tab each rather than two competing columns   the folder is what
 * makes the second one read as a continuation instead of a rival.
 */
export function Home2Vision() {
  const { t } = useLanguage();
  const [tab, setTab] = useState(0);

  const tabs = [
    {
      label: t.idea.missionLabel,
      body: t.idea.mission,
      points: t.idea.missionPoints,
    },
    {
      label: t.idea.visionLabel,
      body: t.idea.vision,
      points: t.idea.visionPoints,
    },
  ];

  const active = tabs[tab];

  return (
    <section className="bg-canvas px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
        {/* The claim */}
        <div>
          <Reveal direction="none" duration={0.5}>
            <p className="font-label text-forest/40 text-[0.8rem] font-bold tracking-[0.32em] uppercase">
              {t.idea.shiftLead}
            </p>
          </Reveal>

          <ScrollWords
            as="h2"
            text={t.idea.shiftTail}
            className="font-display mt-5 text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.02] font-extrabold tracking-[-0.045em]"
          />

          <Reveal delay={0.1}>
            <p className="text-forest/65 mt-6 max-w-md text-[0.9375rem] leading-relaxed">
              {t.idea.lead2}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <ButtonLink
              href="/a-propos"
              variant="outline"
              size="md"
              className="text-forest/70 hover:text-ink mt-8"
            >
              {t.common.seeSolutions}
            </ButtonLink>
          </Reveal>
        </div>

        {/* The folder */}
        <Reveal direction="left" duration={0.9}>
          <div className="relative">
            {/* Tabs sit on the panel's shoulder, so the active one reads as the
                front sheet rather than a button parked above it. */}
            <div className="relative z-10 flex items-end gap-1.5 pl-5">
              {tabs.map((entry, index) => (
                <button
                  key={entry.label}
                  type="button"
                  onClick={() => setTab(index)}
                  aria-pressed={tab === index}
                  className={cn(
                    "font-display rounded-t-2xl px-6 pt-3 pb-4 text-[0.95rem] font-bold tracking-[-0.02em]",
                    "transition-colors duration-300 ease-[var(--ease-brand)]",
                    tab === index
                      ? "bg-ink text-canvas"
                      : "bg-beige/70 text-forest/55 hover:text-forest",
                  )}
                >
                  {entry.label}
                </button>
              ))}
            </div>

            <div className="bg-ink text-canvas relative -mt-2 rounded-[1.6rem] p-6 shadow-[0_36px_80px_-40px_rgba(10,15,12,0.7)] sm:p-8">
              <p className="text-canvas/85 text-[1.0625rem] leading-relaxed">
                {active.body}
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {active.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="bg-teal text-canvas mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                      <Check className="size-3" strokeWidth={2.6} aria-hidden />
                    </span>
                    <span className="text-canvas/65 text-[0.9375rem] leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <ul className="mt-8 grid grid-cols-3 gap-2">
                {strip.map((entry) => (
                  <li
                    key={entry.src}
                    className="relative aspect-4/3 overflow-hidden rounded-xl"
                  >
                    <Image
                      src={entry.src}
                      alt={entry.client}
                      fill
                      sizes="120px"
                      className="object-cover opacity-85"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
