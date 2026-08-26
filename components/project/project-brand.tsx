"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import type { ProjectStory } from "@/lib/data/projects";

/**
 * The identity, shown as a system and then in place.
 *
 * The specimen panel runs on the brand's own darkest colour rather than on
 * the page's ink, so the palette is read against the ground it was drawn for.
 * Everything in it is taken from the record   the swatches are painted from
 * their own hex, the wordmark is set in the page's script face   so a project
 * cannot end up illustrated with another project's colours.
 *
 * The applications underneath are the same identity photographed where it
 * actually landed. They are captioned in the corner rather than beneath, so
 * the grid reads as one wall of work instead of four separate figures.
 */
export function ProjectBrand({
  label,
  brand,
}: {
  label: string;
  brand: ProjectStory["brand"];
}) {
  const say = useLocalized();
  const ground = brand.palette[0]?.hex ?? "#111111";

  return (
    <section className="py-20 sm:py-28">
      <div className="container-eiden">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-ink/35 text-center">{label}</p>
        </Reveal>

        <RevealWords
          as="h2"
          text={say(brand.title)}
          delay={0.06}
          className="font-display text-ink mx-auto mt-6 block max-w-4xl text-center text-[clamp(1.75rem,4.4vw,3.25rem)] leading-[1.06] font-bold tracking-[-0.03em]"
        />

        <Reveal delay={0.14}>
          <p className="text-ink/60 mx-auto mt-5 max-w-2xl text-center text-[0.9375rem] leading-relaxed sm:text-base">
            {say(brand.text)}
          </p>
        </Reveal>
      </div>

      {/* ── The system ─────────────────────────────────────────────── */}
      <Reveal delay={0.18} className="mt-14 sm:mt-20">
        <div
          style={{ backgroundColor: ground }}
          className="text-canvas overflow-hidden"
        >
          <div className="container-eiden py-12 sm:py-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Palette */}
              <div>
                <div className="border-canvas/15 flex items-baseline justify-between gap-6 border-b pb-3">
                  <p className="eyebrow text-canvas/40">Palette</p>
                  <p className="eyebrow text-canvas/40">
                    {say({ fr: "Système chromatique", en: "Chromatic system" })}
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  {brand.palette.map((swatch) => (
                    <div key={swatch.hex} className="min-w-0 flex-1">
                      <div
                        style={{ backgroundColor: swatch.hex }}
                        className="ring-canvas/10 aspect-3/4 w-full rounded-sm ring-1 ring-inset"
                      />
                      <p className="text-canvas mt-3 truncate text-[0.8125rem]">
                        {say(swatch.name)}
                      </p>
                      <p className="font-label text-canvas/40 mt-0.5 text-[0.75rem] tracking-[0.08em] uppercase tabular-nums">
                        {swatch.hex}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div>
                <div className="border-canvas/15 flex items-baseline justify-between gap-6 border-b pb-3">
                  <p className="eyebrow text-canvas/40">
                    {say({ fr: "Typographie", en: "Typography" })}
                  </p>
                  <p className="eyebrow text-canvas/40">
                    {say({ fr: "Hiérarchie", en: "Type hierarchy" })}
                  </p>
                </div>

                <p className="font-display text-canvas mt-8 text-[clamp(2.25rem,6vw,3.75rem)] leading-none">
                  {brand.type.wordmark}
                </p>

                <div className="border-canvas/12 mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
                  <p className="editorial text-canvas/80 text-[clamp(1.125rem,2vw,1.5rem)]">
                    {say(brand.type.line)}
                  </p>
                  <p className="eyebrow text-canvas/50 sm:text-right">
                    {say(brand.type.descriptor)}
                  </p>
                </div>
              </div>
            </div>

            {brand.book ? (
              <a
                href={brand.book.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group border-canvas/15 hover:border-canvas/40 mt-12 flex items-center justify-between gap-6 border-y py-5 transition-colors duration-500 ease-[var(--ease-brand)]"
              >
                <span className="font-label text-canvas text-[0.875rem] font-bold tracking-[0.16em] uppercase">
                  {say(brand.book.label)}
                </span>
                <span className="border-canvas/25 group-hover:bg-canvas group-hover:text-ink flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)]">
                  <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden />
                </span>
              </a>
            ) : null}

            {/* ── In place ───────────────────────────────────────────── */}
            <p className="eyebrow text-canvas/40 mt-14">
              {say(brand.applicationsTitle)}
            </p>

            <RevealGroup className="mt-6 grid grid-cols-2 gap-2 sm:gap-3">
              {brand.applications.map((item) => (
                <figure
                  key={item.image}
                  className="relative aspect-4/3 overflow-hidden rounded-sm"
                >
                  <Image
                    src={item.image}
                    alt={say(item.alt)}
                    fill
                    sizes="(max-width: 40rem) 48vw, 44vw"
                    className="object-cover"
                  />
                  <figcaption className="eyebrow text-canvas/70 absolute bottom-3 left-3 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
                    {say(item.label)}
                  </figcaption>
                </figure>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
