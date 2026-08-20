"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { heroTexture } from "@/lib/data/site";

/** Compact dark masthead shared by every inner page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section className="px-2.5 pt-20 sm:px-4 sm:pt-24">
      <div className="grain bg-forest relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem]">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src={heroTexture}
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover object-center opacity-70 blur-[6px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(10,15,12,0.94),rgba(10,15,12,0.72)_55%,rgba(12,87,82,0.45))]" />
        </div>

        <div className="container-eiden py-20 sm:py-28 lg:py-32">
          <Reveal direction="none" duration={0.5}>
            <p className="eyebrow text-gold flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="text-canvas mt-7 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)]">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-canvas/65 mt-7 max-w-2xl text-base leading-relaxed sm:text-lg">
              {lead}
            </p>
          </Reveal>

          {children}
        </div>
      </div>
    </section>
  );
}
