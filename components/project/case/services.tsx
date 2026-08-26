"use client";

import { BandLabel } from "@/components/solutions/shared";
import { useLocalized } from "@/components/project/shared";
import { RevealGroup, RevealWords } from "@/components/ui/reveal";
import type { Service } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

/**
 * 02   What we did, on the solutions process rows.
 *
 * A row carries only the service name at rest. Point at it and the row
 * inverts: the teal ground wipes in from the left, the name lifts away, and
 * the line underneath says what the service actually was. The two halves
 * share one grid cell from `lg`, so the row is always as tall as the taller of
 * them and never changes height   only `opacity` and `transform` animate, so
 * the compositor handles the swap without laying the page out again, and a row
 * cannot slide out from under the cursor pointing at it.
 *
 * A service with no note never inverts. Five of these across the portfolio are
 * sold without anything on file to describe them, and a row that lit up to
 * reveal nothing would be worse than one that plainly does not move.
 *
 * There is no hover on a touch screen, so below `lg` the halves fall back into
 * ordinary flow and the row reads name then description.
 */
export function CaseServices({ services }: { services: Service[] }) {
  const say = useLocalized();

  return (
    <section className="py-20">
      <div className="container-eiden">
        <BandLabel number="02">
          {say({ fr: "Ce que nous avons fait", en: "What we did" })}
        </BandLabel>

        <RevealWords
          as="h2"
          text={say({
            fr: "Les disciplines qui sont entrées dans ce projet.",
            en: "The disciplines that went into this project.",
          })}
          delay={0.06}
          className="text-ink mt-12 block max-w-4xl text-[clamp(1.875rem,5vw,3.75rem)] uppercase"
        />

        <RevealGroup as="ul" className="mt-14 flex flex-col">
          {services.map((service, index) => {
            const hasNote = Boolean(service.note);

            return (
              <li
                key={say(service.name)}
                className={cn(
                  "border-ink/15 relative isolate border-t last:border-b",
                  hasNote && "group lg:grid lg:items-center",
                )}
              >
                {hasNote ? (
                  /* The ground, wiped in from the left. It runs a little past
                     the measure on either side so the bar reads as struck
                     across the page rather than boxed inside the column. */
                  <span
                    aria-hidden
                    className="bg-teal absolute inset-y-0 -right-4 -left-4 -z-10 origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none lg:-right-6 lg:-left-6 lg:group-hover:scale-x-100"
                  />
                ) : null}

                {/* At rest: the name, at size. */}
                <div
                  className={cn(
                    "transition-[opacity,transform] duration-300 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    hasNote &&
                      "lg:col-start-1 lg:row-start-1 lg:group-hover:-translate-y-2 lg:group-hover:opacity-0",
                  )}
                >
                  <div className="flex items-center justify-between gap-6 py-5 lg:py-6">
                    <h3 className="font-display text-ink text-[clamp(1.625rem,4vw,3.25rem)] leading-none font-extrabold tracking-[-0.04em] uppercase">
                      {say(service.name)}
                    </h3>
                    <span className="eyebrow text-ink/30 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Pointed at: the same row, inverted, saying what the service
                    was. The small label repeats the name only where the big one
                    has just left   below `lg` it would be the name twice. */}
                {hasNote ? (
                  <div className="transition-[opacity,transform] duration-400 ease-[var(--ease-brand)] motion-reduce:transition-none lg:col-start-1 lg:row-start-1 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-hover:delay-100">
                    <div className="pb-5 lg:py-6">
                      <p className="eyebrow lg:text-canvas/45 hidden lg:block">
                        {say(service.name)}
                      </p>
                      <p className="text-ink/65 lg:text-canvas max-w-3xl text-[0.9375rem] leading-relaxed lg:mt-2 lg:text-[clamp(1rem,1.5vw,1.25rem)]">
                        {say(service.note!)}
                      </p>
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
