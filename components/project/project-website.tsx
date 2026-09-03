"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import type { ProjectStory } from "@/lib/data/projects";

/**
 * The site, shown at the two sizes it is actually used at.
 *
 * The phone is laid over the corner of the desktop rather than set beside it:
 * they are one site, and standing them side by side reads as two. Below `sm`
 * the overlap is dropped   there is no room for it, and a phone shrunk into
 * the corner of a phone-width picture is a smear.
 */
export function ProjectWebsite({
  label,
  website,
}: {
  label: string;
  website: ProjectStory["website"];
}) {
  const say = useLocalized();

  return (
    <section data-nav-tone="light" className="grain bg-beige text-ink">
      <div className="container-eiden py-20 sm:py-28">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-ink/35 text-center">{label}</p>
        </Reveal>

        <RevealWords
          as="h2"
          text={say(website.title)}
          delay={0.06}
          className="font-display text-ink mx-auto mt-6 block max-w-3xl text-center text-[clamp(1.625rem,4vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.03em]"
        />

        <Reveal delay={0.14}>
          <p className="text-ink/55 mx-auto mt-5 max-w-2xl text-center text-[0.9375rem] leading-relaxed sm:text-base">
            {say(website.text)}
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-14 sm:mt-20">
          <div className="relative mx-auto max-w-5xl">
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg">
              <Image
                src={website.desktop}
                alt={say(website.alt)}
                fill
                sizes="(max-width: 64rem) 92vw, 64rem"
                className="object-cover"
              />
            </div>

            <div className="relative mx-auto -mt-8 w-2/5 max-w-[11rem] sm:absolute sm:right-[6%] sm:-bottom-10 sm:mt-0 sm:w-[18%]">
              <div className="ring-ink/10 relative aspect-9/19 w-full overflow-hidden rounded-2xl shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] ring-1">
                <Image
                  src={website.mobile}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 40rem) 40vw, 12rem"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {website.href ? (
          <Reveal delay={0.28}>
            <div className="mt-16 flex justify-center sm:mt-24">
              <a
                href={website.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group text-ink hover:text-teal inline-flex items-center gap-4 transition-colors duration-300"
              >
                <span className="font-label text-[0.875rem] font-bold tracking-[0.16em] uppercase">
                  {say({ fr: "Voir le site", en: "Visit the site" })}
                </span>
                <span className="border-ink/25 group-hover:bg-ink group-hover:text-canvas flex size-10 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)]">
                  <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden />
                </span>
              </a>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
