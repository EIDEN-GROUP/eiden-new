"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { FixedBackdrop } from "@/components/ui/fixed-backdrop";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export type ShowcaseCase = {
  slug: string;
  client: string;
  title: string;
  text: string;
  tags: readonly string[];
  image: string;
  imageAlt: string;
  href: string;
  quote?: string;
  author?: string;
};

export type ShowcaseIntro = {
  eyebrow: string;
  title: string;
  text: string;
  cue: string;
  texture: string;
};

export type ShowcaseOutro = {
  eyebrow: string;
  blocks: readonly {
    title: string;
    text: string;
    cta: string;
    href: string;
    /* Decorative: the heading beside it carries the meaning, so it is
       rendered with an empty alt rather than described twice. */
    image: string;
  }[];
};

const GROUNDS = [
  { bg: "#FEFDFB", tone: "light" }, // canvas
  { bg: "#f4ebd0", tone: "light" }, // beige
  { bg: "#e3d3a8", tone: "light" }, // beige
  { bg: "#FEFDFB", tone: "light" }, // canvas
  { bg: "#f4ebd0", tone: "light" }, // beige
] as const;

const INTRO_GROUND = "#f4ebd0";
/* The closing panel keeps nothing behind the cards   no picture, no
   wash. They are the only thing on it, which is why they can be this
   large and still read as objects rather than as the panel itself. */
const SUITE_GROUND = "#FEFDFB";
/* Both are read against the span the last case takes to lift away.
   `LEAD` lets that lift get under way on its own before anything moves
   underneath it; `SHARE` is what the cards travel over, and it ends
   just short of the lift, so the suite is already carrying its pair by
   the time the case is off the screen. The panel after that is the rest
   the pair comes to before the track releases. */
const SUITE_LEAD = 0.2;
const SUITE_SHARE = 0.7;
type Tone = (typeof GROUNDS)[number]["tone"];
const INK: Record<
  Tone,
  {
    title: string;
    body: string;
    quote: string;
    muted: string;
    accent: string;
    rule: string;
    ghost: string;
    ring: string;
    bar: string;
  }
> = {
  light: {
    title: "text-ink",
    body: "text-ink/70",
    quote: "text-ink/85",
    muted: "text-ink/45",
    accent: "text-teal",
    rule: "border-ink/20",
    ghost: "text-black/[0.06]",
    ring: "border-ink/35 group-hover:bg-ink group-hover:text-canvas",
    bar: "bg-ink",
  },
};

export function CaseShowcase({
  cases,
  intro,
  outro,
  label,
  cta,
}: {
  cases: ShowcaseCase[];
  intro: ShowcaseIntro;
  outro: ShowcaseOutro;
  label: string;
  cta: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  /* Two panels beyond the run of work   the intro it opens on and the
     outro it closes on   and one more after those, so the outro has a
     span of its own to bring the suite cards in on and hold them. */
  const panels = cases.length + 3;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let painted = Number.NaN;
    /* The last case's own index   `panels` is that plus the intro, the
       span it lifts away over, and the rest at the end. `--seq` passing
       it is the case leaving, and the cards come in across that span. */
    const suiteFrom = panels - 3;

    const paint = () => {
      const { top, height } = track.getBoundingClientRect();
      const travel = height - window.innerHeight;
      const share = travel > 0 ? -top / travel : 0;
      const seq = Math.min(Math.max(share, 0), 1) * (panels - 1);
      /* Thousandths, not hundredths. A unit of `--seq` is a whole
         viewport of curtain travel, so at 0.01 a panel moves in eight
         pixel steps and the wheel notches show in the motion. */
      const value = Math.round(seq * 1000) / 1000;

      if (value !== painted) {
        painted = value;
        track.style.setProperty("--seq", `${value}`);

        /* The cards ride the span left over once the last curtain is up
           and the panel has held a beat on its own. Smootherstep, not
           smoothstep: it is flat in the second derivative at both ends
           as well as the first, so the pair leaves and arrives without
           the corner a plain smoothstep still puts in the motion. */
        const run = Math.min(
          Math.max((value - suiteFrom - SUITE_LEAD) / SUITE_SHARE, 0),
          1,
        );
        const eased = run * run * run * (run * (run * 6 - 15) + 10);
        track.style.setProperty("--suite", `${Math.round(eased * 1000) / 1000}`);

        const next = Math.round(value);
        setActive((current) => (current === next ? current : next));
      }
      raf = requestAnimationFrame(paint);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!raf) raf = requestAnimationFrame(paint);
          return;
        }
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );

    observer.observe(track);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [panels]);

  if (cases.length === 0) return null;

  const onCase = active > 0 && active <= cases.length;
  const caseNumber = String(active).padStart(2, "0");
  const activeInk = onCase
    ? INK[GROUNDS[(active - 1) % GROUNDS.length].tone]
    : INK.light;

  return (
    <div ref={trackRef} className="relative" style={{ height: `${panels * 100}svh` }}>
      <div className="text-canvas sticky top-0 h-svh overflow-hidden">
        <section className="absolute inset-0 isolate z-0 flex items-center justify-center" style={{ backgroundColor: INTRO_GROUND }}>
          <FixedBackdrop src={intro.texture} imageClassName="scale-110 blur-2xl" />
          <div className="container-eiden flex flex-col items-center py-16 text-center">
            <Reveal direction="none" duration={0.5}>
              <p className="eyebrow text-teal mb-3">{intro.eyebrow}</p>
            </Reveal>

            <RevealWords as="h2" text={intro.title} delay={0.06} className="font-display text-canvas mt-3 block max-w-4xl text-[clamp(1.875rem,5vw,3.75rem)] leading-[1.06] font-medium tracking-[-0.01em] uppercase" />
            <Reveal delay={0.45}>
              <p className="text-canvas/65 mx-auto mt-3 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
                {intro.text}
              </p>
            </Reveal>

            <Reveal delay={0.58} className="mt-11 sm:mt-12">
              <p className="eyebrow text-canvas/50 flex items-center justify-center gap-3">
                {intro.cue}
                <ArrowDown className="size-4" strokeWidth={1.4} aria-hidden />
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── One curtain per case, each rising over the last, and the
               last of them lifting away again to uncover the suite ── */}
        {cases.map((entry, index) => {
          const ground = GROUNDS[index % GROUNDS.length];
          const ink = INK[ground.tone];

          return (
            <article
              key={entry.slug}
              aria-hidden={index + 1 !== active}
              style={
                {
                  "--i": index + 1,
                  /* Doubled, so the suite can take an odd number and sit
                     between the last case and the one before it. */
                  zIndex: (index + 1) * 2,
                  backgroundColor: ground.bg,
                } as CSSProperties
              }
              className={cn(
                "curtain-layer absolute inset-0 flex items-start",
                /* Only the last one leaves. */
                index === cases.length - 1 && "curtain-exit",
              )}
            >
              <span aria-hidden className={cn( "pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b to-transparent", "from-black/15", )} />
              <span aria-hidden className={cn( "pointer-events-none absolute inset-x-0 top-0 z-10 h-px", "bg-black/10", )} />

              {/* The number the case stands on. */}
              <span aria-hidden className={cn( "font-display pointer-events-none absolute right-2 bottom-[-4vw] text-[26vw] leading-none font-extrabold tracking-[-0.06em] select-none", ink.ghost, )} >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="container-eiden relative my-auto grid w-full items-center gap-5 py-28 sm:gap-8 sm:py-32 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-40">
                <div className="min-w-0">
                  <p className={cn( "eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 tracking-[0.14em] sm:tracking-[0.2em]", ink.accent, )} >
                    <span>{entry.client}</span>
                    <span className={ink.muted}>· {entry.tags.join(" · ")}</span>
                  </p>

                  <h3 className={cn( "font-display mt-4 text-[clamp(1.625rem,4vw,3.25rem)] leading-[1.08] font-medium tracking-[-0.03em] sm:mt-6", ink.title, )} >
                    {entry.title}
                  </h3>

                  <p className={cn( "mt-4 line-clamp-4 max-w-md text-[0.9375rem] leading-relaxed sm:mt-6 sm:line-clamp-none sm:text-base [@media(max-height:640px)]:line-clamp-3", ink.body, )} >
                    {entry.text}
                  </p>

                  {entry.quote && entry.author ? (
                    <figure className={cn( "mt-5 max-w-md border-l pl-5 sm:mt-8", ink.rule, )}>
                      <blockquote className={cn( "text-[0.9375rem] leading-relaxed", ink.quote, )}>
                        “{entry.quote}”
                      </blockquote>
                      <figcaption className={cn("eyebrow mt-3", ink.muted)}>
                        {entry.author}
                      </figcaption>
                    </figure>
                  ) : null}

                  <Link href={entry.href} tabIndex={index + 1 === active ? undefined : -1} className={cn( "group font-label mt-5 inline-flex items-center gap-4 text-[0.82rem] font-bold tracking-[0.22em] uppercase sm:mt-9", ink.title, )} >
                    {cta}
                    <span
                      className={cn(
                        "flex size-10 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)]",
                        ink.ring,
                      )}
                    >
                      <ArrowRight
                        className="size-4"
                        strokeWidth={1.6}
                        aria-hidden
                      />
                    </span>
                  </Link>
                </div>
                <div className="relative order-first h-[18svh] w-full overflow-hidden rounded-sm sm:h-[24svh] lg:order-none lg:aspect-16/10 lg:h-auto">
                  <Image
                    src={entry.image}
                    alt={entry.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </article>
          );
        })}

        {/* The run of work closes on a clear ground   nothing behind the
            pair, so the two cards are the whole of the panel and can come
            in off the edges of the screen with nothing to cross.

            It carries the last case's own number rather than one past it,
            so it rises *with* that curtain instead of after it   held out
            of sight underneath while the case is up, and uncovered as the
            case lifts off. The odd `zIndex` is what holds it there: under
            the last case, over every case before it. */}
        <article
          aria-hidden={active < cases.length + 1}
          style={
            {
              "--i": cases.length,
              zIndex: cases.length * 2 - 1,
              backgroundColor: SUITE_GROUND,
            } as CSSProperties
          }
          className="curtain-layer absolute inset-0 isolate flex items-center justify-center"
        >
          <div className="container-eiden text-ink py-16">
            <p className="eyebrow text-teal text-center">{outro.eyebrow}</p>

            <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-8 sm:mt-10 sm:gap-12">
              {outro.blocks.map((block, index) => {
                /* The rows alternate, so the two cards are held on opposite
                   corners and swing in past each other rather than over the
                   same one. `--dir` carries both the travel and the lean;
                   `order` puts the card on the side it comes in from. */
                const held = index % 2 === 0 ? "-1" : "1";

                return (
                  <div
                    key={block.href}
                    className="grid items-center gap-6 md:grid-cols-2 md:gap-14"
                  >
                    {/* Held back below `md`: two pictures and two blocks of
                        words will not stand in one viewport on a phone, and
                        the panel is pinned   it cannot spill. */}
                    <figure
                      style={{ "--dir": held } as CSSProperties}
                      className={cn(
                        "suite-card relative hidden h-[26svh] overflow-hidden rounded-[1.75rem] md:block",
                        "shadow-[0_40px_90px_-45px_rgba(18,38,32,0.45)]",
                        held === "1" && "md:order-last",
                      )}
                    >
                      <Image
                        src={block.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="object-cover"
                      />
                    </figure>

                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                      <h3 className="font-display text-ink text-[clamp(1.375rem,3vw,2.125rem)] leading-[1.06] font-medium tracking-[-0.02em]">
                        {block.title}
                      </h3>

                      <p className="text-ink/70 mt-3 max-w-sm text-[0.9375rem] leading-relaxed sm:text-base">
                        {block.text}
                      </p>

                      <ButtonLink
                        href={block.href}
                        variant="primary"
                        size="lg"
                        className="mt-6"
                        tabIndex={active >= cases.length + 1 ? undefined : -1}
                      >
                        {block.cta}
                      </ButtonLink>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </article>

        {/* Running head   the count, held still while the work turns. */}
        <div className="container-eiden pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between pt-20 sm:pt-24 lg:pt-32">
          <p
            className={cn(
              "eyebrow transition-colors duration-500",
              activeInk.muted,
              "transition-opacity",
              onCase ? "opacity-100" : "opacity-0",
            )}
          >
            <span className={activeInk.accent}>{caseNumber}</span>
            {" / "}
            {label}
          </p>
        </div>

        {/* Where you are in the set. */}
        <ol
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-1/2 right-4 z-40 hidden -translate-y-1/2 flex-col gap-2 transition-opacity duration-500 sm:right-6 lg:flex",
            onCase ? "opacity-100" : "opacity-0",
          )}
        >
          {cases.map((entry, index) => (
            <li
              key={entry.slug}
              className={cn(
                "font-label flex items-center justify-end gap-2 text-[0.75rem] tracking-[0.18em] tabular-nums transition-colors duration-500",
                index + 1 === active ? activeInk.title : activeInk.muted,
              )}
            >
              <span
                className={cn(
                  "h-px transition-all duration-500",
                  index + 1 === active
                    ? cn("w-5", activeInk.bar)
                    : "w-0 bg-transparent",
                )}
              />
              {String(index + 1).padStart(2, "0")}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
