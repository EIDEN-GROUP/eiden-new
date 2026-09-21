"use client";

import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { CasePaletteStory } from "@/components/project/case/palette-story";
import { TONES } from "@/components/project/case/tone";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { FacebookGlyph, InstagramGlyph } from "@/components/ui/social-glyphs";
import type { PaletteStory } from "@/lib/data/projects/types";
import { cn, cursorOn } from "@/lib/utils";


export type Say = { fr: string; en: string };
export type ChapterDef = { id: string; label: Say };
export type NextProject = {
  href: string;
  client: string;
  category: Say;
  image: string;
};
export type Face = { name: string; stack: string; role: Say };
export type Socials = { instagram?: string; facebook?: string };

const FRAME = "bg-beige relative overflow-hidden rounded-xl";
export const HALF = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 38vw";
export const FULL = "(max-width: 1024px) 100vw, 76vw";

type CaseContextValue = {
  chapters: readonly ChapterDef[];
  say: (value: Say) => string;
};

const CaseContext = createContext<CaseContextValue | null>(null);

/** Inside a `fit` chapter: the whole chapter is held to one screen. */
const Fit = createContext(false);

function useCase() {
  const value = useContext(CaseContext);
  if (!value) throw new Error("case-v2 pieces must be used inside <CaseV2>");
  return value;
}

export function useSay() {
  const { locale } = useLanguage();
  return useCallback((value: Say) => value[locale], [locale]);
}

/** The last chapter whose top has passed a line just above the middle. */
function useChapter(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.42;
      let current = nodes[0];
      for (const node of nodes) {
        if (node.getBoundingClientRect().top > line) break;
        current = node;
      }
      setActive(current.id);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);

  return active;
}

/* ─── The page ─────────────────────────────────────────────────────── */

export function CaseV2({
  chapters,
  client,
  statement,
  category,
  location,
  year,
  site,
  socials,
  next,
  children,
}: {
  chapters: readonly ChapterDef[];
  client: string;
  statement: Say;
  category: Say;
  location?: Say;
  year: string;
  site?: string;
  socials?: Socials;
  next: NextProject[];
  children: ReactNode;
}) {
  const say = useSay();
  const accounts = [
    { label: "Instagram", href: socials?.instagram, Icon: InstagramGlyph },
    { label: "Facebook", href: socials?.facebook, Icon: FacebookGlyph },
  ].filter((account) => account.href);
  const ids = useMemo(() => chapters.map((chapter) => chapter.id), [chapters]);
  const active = useChapter(ids);
  const context = useMemo(() => ({ chapters, say }), [chapters, say]);

  return (
    <CaseContext.Provider value={context}>
      <div data-nav-tone="light" className="bg-canvas text-ink">
        <div className="lg:grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
          <aside className="border-beige-dk no-scrollbar relative z-20 border-b lg:sticky lg:top-0 lg:h-dvh lg:self-start lg:overflow-y-auto lg:border-r lg:border-b-0">
            <div className="flex h-full flex-col px-5 pt-24 pb-10 sm:px-10 sm:pt-32 lg:px-7 lg:pt-28 lg:pb-6 xl:px-9">
              <Link
                href="/portfolio"
                className="group font-label text-ink hover:text-teal inline-flex w-fit items-center gap-1.5 text-[0.75rem] font-bold tracking-[0.18em] uppercase transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none"
              >
                <ChevronLeft
                  aria-hidden
                  strokeWidth={2.2}
                  className="size-4 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:-translate-x-0.5 motion-reduce:transition-none"
                />
                {say({ fr: "Tous les projets", en: "All projects" })}
              </Link>

              <p className="eyebrow text-teal mt-7 flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-current" />
                {say({ fr: "Étude de cas", en: "Case study" })}
              </p>

              <h1 className="text-ink mt-5 text-[clamp(2.25rem,5vw,3rem)] lg:text-[clamp(2rem,2.6vw,2.75rem)]">
                {client}
              </h1>

              <p className="text-ink mt-3 max-w-md text-[1.1875rem] leading-snug">
                {say(statement)}
              </p>

              <p className="font-label text-gold-dk mt-5 text-[0.75rem] leading-relaxed font-bold tracking-[0.16em] uppercase">
                <span className="block">
                  {say(category)} · {year}
                </span>
                {location ? <span className="block">{say(location)}</span> : null}
              </p>

              <nav
                aria-label={say({ fr: "Chapitres", en: "Chapters" })}
                className="mt-9 hidden lg:block"
              >
                <ol className="flex flex-col gap-1.5">
                  {chapters.map((chapter) => {
                    const on = chapter.id === active;

                    return (
                      <li key={chapter.id}>
                        <a
                          href={`#${chapter.id}`}
                          aria-current={on ? "location" : undefined}
                          className={cn(
                            "group relative flex items-center py-0.5 text-[1.0625rem] leading-snug transition-[color,opacity] duration-400 ease-[var(--ease-brand)] motion-reduce:transition-none",
                            on
                              ? "text-teal font-semibold"
                              : "text-ink opacity-40 hover:opacity-100",
                          )}
                        >
                          <span
                            aria-hidden
                            className={cn(
                              "bg-teal absolute -left-3.5 size-1.5 rounded-full transition-[opacity,scale] duration-400 ease-[var(--ease-brand)] motion-reduce:transition-none",
                              on ? "scale-100 opacity-100" : "scale-50 opacity-0",
                            )}
                          />
                          {say(chapter.label)}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>

              {site || accounts.length > 0 ? (
                <div className="mt-8 flex flex-wrap items-center gap-2.5 lg:mt-auto">
                  {site ? (
                    <a
                      href={site}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group border-ink text-ink hover:bg-ink hover:text-canvas font-label inline-flex w-fit items-center gap-2.5 rounded-full border px-5 py-3 text-[0.75rem] font-bold tracking-[0.16em] uppercase transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none"
                    >
                      {say({ fr: "Voir le site", en: "View the site" })}
                      <ArrowUpRight
                        aria-hidden
                        strokeWidth={2}
                        className="size-4 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                      />
                    </a>
                  ) : null}
                  {accounts.map((account) => (
                    <a
                      key={account.label}
                      href={account.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${client} · ${account.label}`}
                      title={account.label}
                      className="border-ink text-ink hover:bg-ink hover:text-canvas flex size-11 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none"
                    >
                      <account.Icon className="size-[1.15rem]" />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </aside>

          <div className="min-w-0 p-1.5">
            <Tabs active={active} />
            {children}
          </div>
        </div>

        <NextProjects items={next} />
      </div>
    </CaseContext.Provider>
  );
}

/** The chapter index on a phone: tabs held under the header. */
function Tabs({ active }: { active: string }) {
  const { chapters, say } = useCase();
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = track.current;
    const tab = box?.querySelector<HTMLElement>(`[data-chapter="${active}"]`);
    if (!box || !tab) return;
    box.scrollTo({
      left: tab.offsetLeft - box.clientWidth / 2 + tab.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <nav
      aria-label={say({ fr: "Chapitres", en: "Chapters" })}
      className="bg-canvas border-beige-dk sticky top-16 z-30 -mx-1.5 mb-1.5 border-b sm:top-18 lg:hidden"
    >
      <div
        ref={track}
        className="no-scrollbar flex gap-1.5 overflow-x-auto px-3 py-2.5"
      >
        {chapters.map((chapter) => {
          const on = chapter.id === active;

          return (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              data-chapter={chapter.id}
              data-scroll-offset="-132"
              aria-current={on ? "location" : undefined}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-[0.875rem] font-semibold whitespace-nowrap transition-colors duration-300 ease-[var(--ease-brand)] motion-reduce:transition-none",
                on ? "bg-teal text-canvas" : "bg-beige text-ink",
              )}
            >
              {say(chapter.label)}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

/* ─── Chapters ─────────────────────────────────────────────────────── */

export function Chapter({
  id,
  fit = false,
  children,
}: {
  id: string;
  /** Hold the chapter to one screen, under the header and the tabs. */
  fit?: boolean;
  children: ReactNode;
}) {
  return (
    <Fit.Provider value={fit}>
      <section
        id={id}
        className={cn(
          "grid gap-1.5 pb-1.5",
          fit &&
            "h-[calc(100svh-8.25rem)] grid-rows-[auto_minmax(0,1fr)] sm:h-[calc(100svh-8.75rem)] lg:h-[calc(100svh-0.375rem)]",
        )}
      >
        {children}
      </section>
    </Fit.Provider>
  );
}

/**
 * The row that opens a chapter: number and name across the top, the claim on
 * the left, the argument on the right. With no argument the claim takes both.
 */
export function Caption({
  index,
  label,
  title,
  text,
  meta,
}: {
  /** Position in the chapter list; leave out for a second row inside a chapter. */
  index?: number;
  label?: string;
  title: string;
  text?: string;
  meta?: string;
}) {
  const { chapters, say } = useCase();
  const fit = useContext(Fit);
  const name =
    label ?? (index !== undefined ? say(chapters[index].label) : undefined);

  return (
    <Reveal amount={0.2}>
      <header
        className={cn(
          "border-beige-dk mx-2 grid gap-x-12 gap-y-4 border-t pt-6 pb-8 sm:mx-4 sm:pt-7 sm:pb-10 lg:grid-cols-2",
          fit &&
            "gap-y-[clamp(0.5rem,1.8svh,1rem)] pt-[clamp(0.75rem,2.6svh,1.75rem)] pb-[clamp(0.75rem,3.4svh,2.5rem)] sm:pt-[clamp(0.75rem,2.6svh,1.75rem)] sm:pb-[clamp(0.75rem,3.4svh,2.5rem)]",
        )}
      >
        <p className="font-label flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.78rem] font-bold tracking-[0.18em] uppercase lg:col-span-2">
          {index !== undefined ? (
            <span className="text-gold-dk tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
          {name ? <span className="text-teal">{name}</span> : null}
          {meta ? <span className="text-gold-dk">· {meta}</span> : null}
        </p>

        <h2
          className={cn(
            "font-display text-ink text-[clamp(1.875rem,3.3vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.04em]",
            fit && "text-[clamp(1.375rem,min(5.8vw,4.8svh),3rem)] lg:text-[clamp(1.5rem,min(3.3vw,5.2svh),3rem)]",
            !text && "lg:col-span-2",
          )}
        >
          {title}
        </h2>

        {text ? (
          <p
            className={cn(
              "text-ink text-[1.0625rem] leading-[1.7] sm:text-[1.125rem]",
              fit &&
                "text-[clamp(0.8125rem,min(3.8vw,1.9svh),1.125rem)] sm:text-[clamp(0.8125rem,1.9svh,1.125rem)] lg:text-[clamp(0.8125rem,min(1.9svh,1.4vw),1.125rem)]",
            )}
          >
            {text}
          </p>
        ) : null}
      </header>
    </Reveal>
  );
}

/** Two abreast from a small tablet up; in a `fit` chapter, always, sharing what is left of the screen. */
export function Pair({ children }: { children: ReactNode }) {
  const fit = useContext(Fit);

  return (
    <div
      className={cn(
        "grid gap-1.5 sm:grid-cols-2",
        fit && "h-full min-h-0 grid-cols-2 grid-rows-1",
      )}
    >
      {children}
    </div>
  );
}

/** A 2 × 2 block of plates. */
export function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-1.5 sm:grid-cols-2">{children}</div>;
}

export function Hero({ image, alt }: { image: string; alt: string }) {
  return (
    <Reveal amount={0.1}>
      <figure className={cn(FRAME, "aspect-4/5 sm:aspect-16/9")}>
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 85vw, 80vw"
          quality={95}
          className="object-cover"
        />
      </figure>
    </Reveal>
  );
}

export function Plate({
  image,
  alt,
  shape,
  caption,
  sizes = FULL,
  delay = 0,
  contain = false,
}: {
  image: string;
  alt: string;
  shape: string;
  caption?: string;
  sizes?: string;
  delay?: number;
  /** Show the whole picture on the beige ground instead of filling the frame. */
  contain?: boolean;
}) {
  return (
    <Reveal amount={0.1} delay={delay}>
      <figure className={cn(FRAME, "group", shape)}>
        <Image
          src={image}
          alt={alt}
          fill
          quality={95}
          sizes={sizes}
          className={cn(
            "transition-transform duration-[1400ms] ease-[var(--ease-brand)] group-hover:scale-[1.03] motion-reduce:transition-none",
            contain ? "object-contain p-6 sm:p-8" : "object-cover",
          )}
        />
        {caption ? (
          <figcaption
            className={cn(
              "font-label absolute bottom-5 left-6 text-[0.78rem] font-bold tracking-[0.18em] uppercase",
              contain
                ? "text-ink"
                : "text-canvas [text-shadow:0_1px_12px_rgba(0,0,0,0.8)]",
            )}
          >
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </Reveal>
  );
}

/** Plates that take turns in one frame: they move on by themselves, and can be swiped. */
export function Slides({
  items,
  shape = "aspect-4/5",
  sizes = HALF,
  interval = 4000,
}: {
  items: { image: string; alt: string }[];
  shape?: string;
  sizes?: string;
  interval?: number;
}) {
  const { say } = useCase();
  const fit = useContext(Fit);
  const reduced = useReducedMotion();
  const [turn, setTurn] = useState({ index: 0, previous: 0, forward: true });
  const [held, setHeld] = useState(false);
  const [hidden, setHidden] = useState(
    () => typeof document !== "undefined" && document.hidden,
  );
  const start = useRef<number | null>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const count = items.length;

  // The arriving slide pushes the leaving one: same property as `translate-x-full`, same timing, before paint.
  useLayoutEffect(() => {
    const { index, previous, forward } = turn;
    if (index === previous || reduced) return;
    const timing = { duration: 1000, easing: "cubic-bezier(0.65, 0, 0.35, 1)" };
    slides.current[index]?.animate(
      [{ translate: forward ? "100% 0" : "-100% 0" }, { translate: "0 0" }],
      timing,
    );
    slides.current[previous]?.animate(
      [{ translate: "0 0" }, { translate: forward ? "-100% 0" : "100% 0" }],
      timing,
    );
  }, [turn, reduced]);

  const go = useCallback(
    (step: number) =>
      setTurn(({ index }) => ({
        index: (index + step + count) % count,
        previous: index,
        forward: step > 0,
      })),
    [count],
  );

  useEffect(() => {
    if (reduced || held || hidden || count < 2) return;
    const id = window.setInterval(() => go(1), interval);
    return () => window.clearInterval(id);
  }, [reduced, held, hidden, count, interval, go]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <Reveal amount={0.1} className="h-full">
      <figure
        aria-roledescription={say({ fr: "carrousel", en: "carousel" })}
        className={cn(FRAME, "touch-pan-y select-none", fit ? "size-full" : shape)}
        onPointerEnter={() => setHeld(true)}
        onPointerLeave={() => {
          setHeld(false);
          start.current = null;
        }}
        onFocus={() => setHeld(true)}
        onBlur={() => setHeld(false)}
        onPointerDown={(event) => {
          start.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (start.current === null) return;
          const moved = event.clientX - start.current;
          start.current = null;
          if (Math.abs(moved) > 40) go(moved < 0 ? 1 : -1);
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.image}
            ref={(node) => {
              slides.current[index] = node;
            }}
            aria-hidden={index !== turn.index}
            className={cn(
              "absolute inset-0",
              index !== turn.index && "translate-x-full",
            )}
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              quality={95}
              sizes={sizes}
              loading="eager"
              draggable={false}
              className="object-cover"
            />
          </div>
        ))}

        {count > 1 ? (
          <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
            {items.map((item, index) => (
              <button
                key={item.image}
                type="button"
                onClick={() => go(index - turn.index)}
                aria-label={say({
                  fr: `Image ${index + 1} sur ${count}`,
                  en: `Picture ${index + 1} of ${count}`,
                })}
                aria-current={index === turn.index}
                className={cn(
                  "h-2 rounded-full transition-[width,background-color] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                  index === turn.index ? "bg-gold w-6" : "bg-canvas w-2",
                )}
              />
            ))}
          </div>
        ) : null}
      </figure>
    </Reveal>
  );
}

export function ListPanel({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "reality" | "fracture";
}) {
  const fracture = tone === "fracture";

  return (
    <Reveal amount={0.15} delay={fracture ? 0.08 : 0} className="h-full">
      <div
        className={cn(
          "flex h-full flex-col rounded-xl p-7 sm:p-9",
          fracture ? "bg-forest text-canvas" : "bg-beige text-ink",
        )}
      >
        <p
          className={cn(
            "font-label text-[0.78rem] font-bold tracking-[0.18em] uppercase",
            fracture ? "text-gold" : "text-teal",
          )}
        >
          {label}
        </p>

        <ol className="mt-6 flex flex-1 flex-col justify-between">
          {items.map((item, index) => (
            <li
              key={item}
              className={cn(
                "grid grid-cols-[2.5rem_1fr] items-baseline border-t py-4 first:border-t-0 first:pt-0 last:pb-0 sm:py-5",
                fracture ? "border-forest-md" : "border-beige-dk",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "font-label text-[0.8rem] font-bold tracking-[0.16em] tabular-nums",
                  fracture ? "text-gold" : "text-teal",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[1.1875rem] leading-snug font-bold tracking-[-0.02em] sm:text-[1.375rem]">
                {item}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

/** Réalité beside fracture: what the place already had, and what it lacked. */
export function RealityFracture({
  reality,
  fracture,
}: {
  reality: Say[];
  fracture: Say[];
}) {
  const { say } = useCase();

  return (
    <Pair>
      <ListPanel
        label={say({ fr: "La réalité", en: "The reality" })}
        items={reality.map(say)}
        tone="reality"
      />
      <ListPanel
        label={say({ fr: "La fracture", en: "The fracture" })}
        items={fracture.map(say)}
        tone="fracture"
      />
    </Pair>
  );
}

/** The wordmark on its own ground. */
export function IdentityPlate({
  ground,
  image,
  alt,
  contain,
  shape = "aspect-square",
  sizes = HALF,
}: {
  ground: string;
  image: string;
  alt: string;
  contain: boolean;
  shape?: string;
  sizes?: string;
}) {
  const { say } = useCase();
  const onGround = cursorOn(ground) === "light" ? "text-canvas" : "text-ink";

  return (
    <Reveal amount={0.1}>
      <figure
        className={cn(FRAME, shape)}
        style={{ backgroundColor: ground }}
        data-cursor={cursorOn(ground)}
      >
        <Image
          src={image}
          alt={alt}
          fill
          quality={90}
          sizes={sizes}
          className={contain ? "object-contain" : "object-cover"}
        />
        <figcaption
          className={cn(
            "font-label absolute top-6 left-7 text-[0.78rem] font-bold tracking-[0.18em] uppercase",
            onGround,
          )}
        >
          {say({ fr: "Identité", en: "Identity" })}
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function BrandBoard({
  ground,
  wordmark,
  wordmarkAlt,
  contain,
  faces,
}: {
  ground: string;
  wordmark: string;
  wordmarkAlt: string;
  contain: boolean;
  faces: Face[];
}) {
  const { say } = useCase();

  return (
    <Pair>
      <IdentityPlate
        ground={ground}
        image={wordmark}
        alt={wordmarkAlt}
        contain={contain}
      />

      <Reveal amount={0.1} delay={0.08} className="h-full">
        <div className="bg-beige flex h-full flex-col rounded-xl p-7 sm:p-9">
          <p className="font-label text-teal text-[0.78rem] font-bold tracking-[0.18em] uppercase">
            {say({ fr: "Typographie", en: "Typography" })}
          </p>

          <ul className="mt-5 flex flex-1 flex-col">
            {faces.map((face) => (
              <li key={face.name} className="border-beige-dk flex flex-1 items-center gap-6 border-t py-4" >
                <span
                  aria-hidden
                  className="text-teal w-[1.6em] shrink-0 text-[clamp(2.75rem,4.6vw,4.25rem)] leading-none"
                  style={{ fontFamily: face.stack }}
                >
                  Aa
                </span>
                <span className="min-w-0">
                  <span className="font-display text-ink block text-[1.25rem] leading-tight font-bold sm:text-[1.375rem]">
                    {face.name}
                  </span>
                  <span className="text-ink mt-1.5 block text-[1rem] leading-snug">
                    {say(face.role)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Pair>
  );
}

export type Swatch = { hex: string; role: Say };

export function ColourBoard({
  ground,
  wordmark,
  wordmarkAlt,
  contain,
  colors,
}: {
  ground: string;
  wordmark: string;
  wordmarkAlt: string;
  contain: boolean;
  colors: Swatch[];
}) {
  const { say } = useCase();

  return (
    <Pair>
      <IdentityPlate
        ground={ground}
        image={wordmark}
        alt={wordmarkAlt}
        contain={contain}
      />

      <Reveal amount={0.1} delay={0.08} className="h-full">
        <div className="bg-beige flex h-full flex-col rounded-xl p-7 sm:p-9">
          <p className="font-label text-teal text-[0.78rem] font-bold tracking-[0.18em] uppercase">
            {say({ fr: "Système colorimétrique", en: "Colour system" })}
          </p>

          <ul className="mt-5 flex flex-1 flex-col gap-1.5">
            {colors.map((colour) => (
              <li
                key={colour.hex}
                style={{ backgroundColor: colour.hex }}
                data-cursor={cursorOn(colour.hex)}
                className={cn(
                  "ring-beige-dk flex min-h-[4.5rem] flex-1 items-end justify-between gap-4 rounded-2xl px-5 py-4 ring-1 ring-inset",
                  "transition-[flex-grow] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none sm:hover:grow-[2.5]",
                  cursorOn(colour.hex) === "light" ? "text-canvas" : "text-ink",
                )}
              >
                <span className="font-display text-[1.25rem] leading-tight font-bold sm:text-[1.375rem]">
                  {say(colour.role)}
                </span>
                <span className="font-label text-[0.78rem] font-bold tracking-[0.16em] uppercase tabular-nums">
                  {colour.hex}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Pair>
  );
}

/** The v1 palette story, held in the column. */
export function PaletteStage({ story }: { story: PaletteStory }) {
  return (
    /* overflow-clip, not hidden: the stage is sticky, and a hidden overflow
       would pin it to this box instead of the page. */
    <div className="overflow-clip rounded-xl lg:[&_.palette-frame]:[--disk:min(36rem,72svh)]">
      <CasePaletteStory story={story} skin={TONES.canvas} />
    </div>
  );
}

/** Three short lines on teal, lifted from the chapter's own text. */
export function SignalsPanel({ items }: { items: string[] }) {
  const fit = useContext(Fit);
  const box = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const lines = items.join("\n");

  // In a `fit` chapter the lines step down a pixel at a time until they fit the panel.
  useLayoutEffect(() => {
    const panel = box.current;
    const ol = list.current;
    if (!fit || !panel || !ol) return;

    const section = panel.closest("section");

    const settle = () => {
      section?.style.removeProperty("height");
      section?.style.removeProperty("min-height");
      section?.style.removeProperty("grid-template-rows");
      ol.style.removeProperty("--signal");
      const line = ol.querySelector<HTMLElement>("li > span:last-child");
      if (!line) return;
      const style = getComputedStyle(panel);
      const room =
        panel.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
      let size = Math.floor(parseFloat(getComputedStyle(line).fontSize));
      while (ol.offsetHeight > room && size > 12) {
        size -= 1;
        ol.style.setProperty("--signal", `${size}px`);
      }

      // Not even the smallest size fits: the chapter grows past the screen rather than cut its lines.
      if (ol.offsetHeight > room && section) {
        ol.style.removeProperty("--signal");
        section.style.minHeight = `${section.offsetHeight}px`;
        section.style.height = "auto";
        section.style.gridTemplateRows = "auto auto";
      }
    };

    settle();
    void document.fonts.ready.then(settle);
    window.addEventListener("resize", settle);
    return () => window.removeEventListener("resize", settle);
  }, [fit, lines]);

  return (
    <Reveal amount={0.1} delay={0.08} className={cn("h-full", fit && "@container")}>
      <div
        ref={box}
        className={cn(
          "bg-teal text-canvas flex h-full flex-col justify-center rounded-xl p-8 sm:p-10",
          fit && "p-[clamp(0.875rem,6cqi,2.5rem)] sm:p-[clamp(0.875rem,6cqi,2.5rem)]",
        )}
      >
        <ol ref={list} className="flex flex-col">
          {items.map((item, index) => (
            <li
              key={item}
              className={cn(
                "border-teal-dk grid grid-cols-[3rem_1fr] items-baseline border-t py-6 first:border-t-0 first:pt-0 last:pb-0",
                fit &&
                  "grid-cols-[clamp(1.75rem,12cqi,3rem)_1fr] py-[clamp(0.375rem,min(4cqi,2.8svh),1.5rem)]",
              )}
            >
              <span
                className={cn(
                  "font-label text-gold text-[0.85rem] font-bold tracking-[0.16em] tabular-nums",
                  fit && "text-[clamp(0.6875rem,3cqi,0.85rem)]",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "font-display text-[clamp(1.5rem,2.6vw,2.375rem)] leading-[1.06] font-extrabold tracking-[-0.035em]",
                  fit &&
                    "text-[length:var(--signal,clamp(0.9375rem,min(8.5cqi,4.4svh),2.375rem))]",
                )}
              >
                {item}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

/** Each row's own tone, then the one it alternates with. */
const LINES = {
  teal: ["bg-teal text-canvas", "bg-forest text-canvas"],
  forest: ["bg-forest text-canvas", "bg-teal text-canvas"],
  beige: ["bg-beige text-ink", "bg-forest text-canvas"],
} as const;

const ABREAST: Record<number, string> = {
  2: "grid-cols-2",
  3: "sm:grid-cols-3",
  4: "grid-cols-2 xl:grid-cols-4",
};

/** Short lines lifted from a chapter's own text, a tile each, the tones taking turns. */
export function LinesRow({
  items,
  tone = "teal",
}: {
  items: string[];
  tone?: keyof typeof LINES;
}) {
  return (
    <ol className={cn("grid gap-1.5", ABREAST[items.length])}>
      {items.map((item, index) => {
        const skin = LINES[tone][index % 2];

        return (
          <Reveal key={item} as="li" amount={0.15} delay={index * 0.06}>
            <div
              className={cn(
                "flex h-full min-h-[11rem] flex-col justify-between gap-8 rounded-xl p-6 sm:min-h-[14rem] sm:p-8",
                skin,
              )}
            >
              <span
                className={cn(
                  "font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-none font-extrabold tracking-[-0.05em] tabular-nums",
                  skin.includes("bg-beige") ? "text-teal" : "text-gold",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[clamp(1.375rem,2.2vw,2rem)] leading-[1.06] font-extrabold tracking-[-0.035em]">
                {item}
              </span>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

/** The impact where no figure has been published: what changed, on forest, beside the place itself. */
export function OutcomePanel({ image, items }: { image: string; items: string[] }) {
  return (
    <div className="grid gap-1.5 lg:grid-cols-[7fr_5fr]">
      <Reveal amount={0.15} className="h-full">
        <div className="bg-forest text-canvas flex h-full flex-col justify-center rounded-xl px-7 py-10 sm:px-12 sm:py-14">
          <ol className="flex flex-col">
            {items.map((item, index) => (
              <li
                key={item}
                className="border-forest-md grid grid-cols-[4rem_1fr] items-baseline border-t py-6 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[6rem_1fr] sm:py-7"
              >
                <span className="font-display text-gold text-[clamp(2rem,4vw,3.5rem)] leading-none font-extrabold tracking-[-0.05em] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[clamp(1.5rem,2.6vw,2.375rem)] leading-[1.08] font-extrabold tracking-[-0.035em]">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal amount={0.15} delay={0.08} className="h-full">
        <figure className={cn(FRAME, "aspect-4/3 h-full lg:aspect-auto")}>
          <Image src={image} alt="" fill quality={90} sizes={HALF} className="object-cover" />
        </figure>
      </Reveal>
    </div>
  );
}

export function ImpactPanel({
  image,
  metric,
  label,
  line,
}: {
  image: string;
  metric: string;
  label?: string;
  line: string;
}) {
  return (
    <Reveal amount={0.15}>
      <div className="bg-beige relative isolate grid gap-8 overflow-hidden rounded-xl px-7 py-12 sm:grid-cols-2 sm:items-end sm:px-12 sm:py-16">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src={image}
            alt=""
            fill
            quality={70}
            sizes={FULL}
            className="object-cover opacity-20"
          />
          <span className="absolute inset-0 bg-[radial-gradient(120%_100%_at_15%_0%,transparent,var(--color-beige)_75%)]" />
        </div>

        <p className="font-display text-teal text-[clamp(4.5rem,12vw,9.5rem)] leading-[0.82] font-extrabold tracking-[-0.06em]">
          <CountUp value={metric} />
        </p>

        <div>
          {label ? (
            <p className="font-label text-gold-dk text-[0.78rem] font-bold tracking-[0.18em] uppercase">
              {label}
            </p>
          ) : null}
          <p
            className={cn(
              "font-display text-ink text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.15] font-bold tracking-[-0.025em]",
              label && "mt-3",
            )}
          >
            {line}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/** Opened and closed across the whole column, everything between two abreast. */
export function Gallery({ items }: { items: { image: string; alt: Say }[] }) {
  const { say } = useCase();
  const first = items[0];
  const last = items[items.length - 1];
  const middle = items.slice(1, -1);

  return (
    <div className="grid gap-1.5">
      <Plate
        image={first.image}
        alt={say(first.alt)}
        shape="aspect-4/3 sm:aspect-16/9"
        sizes={FULL}
      />

      <div className="grid gap-1.5 sm:grid-cols-2">
        {middle.map((item, index) => (
          <Plate
            key={item.image}
            image={item.image}
            alt={say(item.alt)}
            shape="aspect-4/3"
            delay={(index % 2) * 0.06}
          />
        ))}
      </div>

      <Plate
        image={last.image}
        alt={say(last.alt)}
        shape="aspect-4/3 sm:aspect-16/9"
        sizes={FULL}
      />
    </div>
  );
}

function NextProjects({ items }: { items: NextProject[] }) {
  const { say } = useCase();

  return (
    <section
      aria-label={say({ fr: "Projets suivants", en: "Next projects" })}
      className="border-beige-dk border-t"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 px-5 pt-12 pb-6 sm:px-10 sm:pt-16 lg:px-7 xl:px-9">
        <h2 className="font-display text-ink text-[clamp(1.875rem,3.3vw,3rem)] leading-none font-extrabold tracking-[-0.04em]">
          {say({ fr: "Transformations suivantes", en: "Next transformations" })}
        </h2>

        <Link
          href="/portfolio"
          className="font-label text-ink hover:text-teal inline-flex items-center gap-2 text-[0.78rem] font-bold tracking-[0.18em] uppercase transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none"
        >
          {say({ fr: "Tous les projets", en: "All projects" })}
          <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
        </Link>
      </div>

      <div className="grid gap-1.5 p-1.5 sm:grid-cols-2">
        {items.map((project, index) => (
          <Reveal key={project.href} amount={0.15} delay={index * 0.08}>
            <Link
              href={project.href}
              transitionTypes={["case-open"]}
              aria-label={`${project.client}, ${say(project.category)}`}
              className="group focus-visible:outline-teal relative block focus-visible:outline-2 focus-visible:-outline-offset-4"
            >
              <div className={cn(FRAME, "aspect-4/3 lg:aspect-16/11")}>
                <Image
                  src={project.image}
                  alt=""
                  aria-hidden
                  fill
                  quality={90}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-brand)] group-hover:scale-[1.04] motion-reduce:transition-none"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 sm:p-8">
                  <div className="min-w-0">
                    <p className="font-label text-gold text-[0.78rem] font-bold tracking-[0.18em] uppercase">
                      {say(project.category)}
                    </p>
                    <h3 className="font-display text-canvas mt-2.5 text-[clamp(2rem,3.6vw,3rem)] leading-[0.95] font-extrabold tracking-[-0.05em] text-balance transition-transform duration-700 ease-[var(--ease-brand)] group-hover:translate-x-1 motion-reduce:transition-none">
                      {project.client}
                    </h3>
                  </div>

                  <span
                    aria-hidden
                    className="border-canvas text-canvas group-hover:bg-canvas group-hover:text-ink flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none"
                  >
                    <ArrowUpRight className="size-5" strokeWidth={1.8} />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
