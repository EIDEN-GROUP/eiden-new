"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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

const GROUNDS = [
  { bg: "#0e1b17", tone: "dark" }, // teal   the primary
  { bg: "#fefdfb", tone: "light" }, // canvas
  { bg: "#0a0f0c", tone: "dark" }, // ink
  { bg: "#b8a876", tone: "light" }, // gold
  { bg: "#2a2c2b", tone: "dark" }, // grey
] as const;

const INTRO_GROUND = "#0a0f0c";
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
  dark: {
    title: "text-canvas",
    body: "text-canvas/65",
    quote: "text-canvas/85",
    muted: "text-canvas/40",
    accent: "text-gold",
    rule: "border-canvas/20",
    ghost: "text-white/[0.06]",
    ring: "border-canvas/40 group-hover:bg-canvas group-hover:text-ink",
    bar: "bg-canvas",
  },
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
  label,
  cta,
}: {
  cases: ShowcaseCase[];
  intro: ShowcaseIntro;
  label: string;
  cta: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /** The statement, then the cases. */
  const panels = cases.length + 1;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let painted = Number.NaN;

    const paint = () => {
      const { top, height } = track.getBoundingClientRect();
      const travel = height - window.innerHeight;
      const share = travel > 0 ? -top / travel : 0;
      const seq = Math.min(Math.max(share, 0), 1) * (panels - 1);
      const value = Math.round(seq * 100) / 100;

      if (value !== painted) {
        painted = value;
        track.style.setProperty("--seq", `${value}`);
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

  const onCase = active > 0;
  const caseNumber = String(active).padStart(2, "0");
  const activeInk =
    active > 0 ? INK[GROUNDS[(active - 1) % GROUNDS.length].tone] : INK.dark;

  return (
    <div ref={trackRef} className="relative" style={{ height: `${panels * 100}svh` }}>
      <div className="text-canvas sticky top-0 h-svh overflow-hidden">
        <section className="absolute inset-0 isolate z-0 flex items-center justify-center" style={{ backgroundColor: INTRO_GROUND }} >
          <FixedBackdrop src={intro.texture} />

          {/* Darkest through the middle, where the type lands. */}
          <span aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(115%_100%_at_50%_50%,rgba(10,15,12,0.84),rgba(10,15,12,0.55))]" />

          <div className="container-eiden flex flex-col items-center py-16 text-center">
            <Reveal direction="none" duration={0.5}>
              <p className="eyebrow text-gold mb-3">{intro.eyebrow}</p>
            </Reveal>

            <RevealWords
              as="h2"
              text={intro.title}
              delay={0.06}
              className="font-display text-canvas mt-3 block max-w-4xl text-[clamp(1.875rem,5vw,3.75rem)] leading-[1.06] font-medium tracking-[-0.01em] uppercase"
            />

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

        {/* ── One curtain per case, each rising over the last ──────── */}
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
                  backgroundColor: ground.bg,
                } as CSSProperties
              }
              className="curtain-layer absolute inset-0 flex items-start"
            >
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b to-transparent",
                  ground.tone === "light" ? "from-black/15" : "from-black/40",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-x-0 top-0 z-10 h-px",
                  ground.tone === "light" ? "bg-black/10" : "bg-white/15",
                )}
              />

              {/* The number the case stands on. */}
              <span
                aria-hidden
                className={cn(
                  "font-display pointer-events-none absolute right-2 bottom-[-4vw] text-[26vw] leading-none font-extrabold tracking-[-0.06em] select-none",
                  ink.ghost,
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="container-eiden relative my-auto grid w-full items-center gap-5 py-28 sm:gap-8 sm:py-32 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-40">
                <div className="min-w-0">
                  <p
                    className={cn(
                      "eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 tracking-[0.14em] sm:tracking-[0.2em]",
                      ink.accent,
                    )}
                  >
                    <span>{entry.client}</span>
                    <span className={ink.muted}>· {entry.tags.join(" · ")}</span>
                  </p>

                  <h3
                    className={cn(
                      "font-display mt-4 text-[clamp(1.625rem,4vw,3.25rem)] leading-[1.08] font-medium tracking-[-0.03em] sm:mt-6",
                      ink.title,
                    )}
                  >
                    {entry.title}
                  </h3>

                  <p className={cn( "mt-4 line-clamp-4 max-w-md text-[0.9375rem] leading-relaxed sm:mt-6 sm:line-clamp-none sm:text-base [@media(max-height:640px)]:line-clamp-3", ink.body, )}>
                    {entry.text}
                  </p>

                  {entry.quote && entry.author ? (
                    <figure
                      className={cn(
                        "mt-5 max-w-md border-l pl-5 sm:mt-8",
                        ink.rule,
                      )} >
                      <blockquote
                        className={cn(
                          "text-[0.9375rem] leading-relaxed",
                          ink.quote,
                        )}
                      >
                        “{entry.quote}”
                      </blockquote>
                      <figcaption className={cn("eyebrow mt-3", ink.muted)}>
                        {entry.author}
                      </figcaption>
                    </figure>
                  ) : null}

                  <Link
                    href={entry.href}
                    tabIndex={index + 1 === active ? undefined : -1}
                    className={cn(
                      "group font-label mt-5 inline-flex items-center gap-4 text-[0.82rem] font-bold tracking-[0.22em] uppercase sm:mt-9",
                      ink.title,
                    )}
                  >
                    {cta}
                    <span className={cn( "flex size-10 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)]", ink.ring, )} >
                      <ArrowRight className="size-4" strokeWidth={1.6} aria-hidden />
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

        {/* Running head   the count, held still while the work turns. */}
        <div className="container-eiden pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between pt-20 sm:pt-24 lg:pt-32">
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
            "pointer-events-none absolute top-1/2 right-4 z-20 hidden -translate-y-1/2 flex-col gap-2 transition-opacity duration-500 sm:right-6 lg:flex",
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
