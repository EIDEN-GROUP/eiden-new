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
      <div className="grain bg-beige relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem]">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src={heroTexture}
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover object-center opacity-40 blur-[6px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(244,235,208,0.96),rgba(244,235,208,0.86)_55%,rgba(244,235,208,0.72))]" />
        </div>

        <div className="container-eiden py-20 sm:py-28 lg:py-32">
          <Reveal direction="none" duration={0.5}>
            <p className="eyebrow text-teal flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="text-ink mt-7 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)]">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-ink/65 mt-7 max-w-2xl text-base leading-relaxed sm:text-lg">
              {lead}
            </p>
          </Reveal>

          {children}
        </div>
      </div>
    </section>
  );
}
