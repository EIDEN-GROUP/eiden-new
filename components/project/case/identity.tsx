"use client";

import Image from "next/image";
import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import type { ProjectCase } from "@/lib/data/projects/types";

/**
 * 04 — Visual identity. Conditional.
 *
 * Rendered only where there are real identity assets — a logo, an application,
 * a palette taken off the brand board. Four of the ten projects sell art
 * direction and have none of that on file; for those the section does not
 * exist rather than being padded with website screenshots.
 *
 * The palette is part of this section and never gets one of its own. It is
 * painted from each swatch's own hex, so a project can never end up
 * illustrated with another project's colours, and the panel takes the brand's
 * darkest colour as its ground so the palette is read against the ground it
 * was drawn for.
 */
export function CaseIdentity({
  identity,
}: {
  identity: NonNullable<ProjectCase["identity"]>;
}) {
  const say = useLocalized();
  const ground = identity.palette?.[0]?.hex;

  return (
    <section className="py-20 sm:py-28">
      <div className="container-eiden">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-ink/35">
            {say({ fr: "Identité visuelle", en: "Visual identity" })}
          </p>
        </Reveal>

        <RevealWords
          as="h2"
          text={say(identity.title)}
          delay={0.06}
          className="font-display text-ink mt-6 block max-w-3xl text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.06] font-bold tracking-[-0.03em]"
        />

        <Reveal delay={0.14}>
          <p className="text-ink/60 mt-5 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
            {say(identity.text)}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-2">
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:contents">
            {identity.shots.map((shot) => (
              <figure
                key={shot.image}
                className="bg-ink/5 relative aspect-4/5 overflow-hidden rounded-[1.6rem]"
              >
                <Image
                  src={shot.image}
                  alt={say(shot.alt)}
                  fill
                  sizes="(max-width: 64rem) 92vw, 44vw"
                  className="object-cover"
                />
                <figcaption className="eyebrow text-canvas/80 absolute bottom-4 left-5 [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]">
                  {say(shot.label)}
                </figcaption>
              </figure>
            ))}
          </RevealGroup>
        </div>

        {identity.palette?.length ? (
          <Reveal delay={0.1} className="mt-4">
            <div
              style={ground ? { backgroundColor: ground } : undefined}
              className="text-canvas overflow-hidden rounded-[1.6rem] p-8 sm:p-10"
            >
              <p className="eyebrow text-canvas/40">
                {say({ fr: "Palette", en: "Palette" })}
              </p>

              <div className="mt-6 flex gap-3 sm:gap-4">
                {identity.palette.map((swatch) => (
                  <div key={swatch.hex} className="min-w-0 flex-1">
                    <div
                      style={{ backgroundColor: swatch.hex }}
                      className="ring-canvas/10 aspect-4/5 w-full rounded-[1.2rem] ring-1 ring-inset"
                    />
                    <p className="text-canvas mt-3 truncate text-[0.875rem]">
                      {say(swatch.name)}
                    </p>
                    <p className="font-label text-canvas/40 mt-0.5 text-[0.75rem] tracking-[0.08em] uppercase tabular-nums">
                      {swatch.hex}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
