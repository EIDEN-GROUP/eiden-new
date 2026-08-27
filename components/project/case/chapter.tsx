"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { CaseBlock, CaseRoom } from "./stack";
import { CasePaletteStory } from "./palette-story";
import { CaseWall } from "./wall";
import { TONES, type ToneSkin } from "./tone";
import type {
  Chapter,
  ChapterLink,
  Localized,
  Shot,
} from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

type Say = (value: Localized) => string;

/** Where the hero's rail sends a reader who picks this section. */
export function chapterId(key: string) {
  return `chapter-${key}`;
}

/**
 * One section of the case.
 *
 * Everything a piece of work produced is in here, on one ground, behind one
 * rounded edge: what it covers, what it did, the pictures that came out of it,
 * and then whatever else belongs to it   the palette, the wall, the figure it
 * moved. It is as tall as it needs to be and it simply rides up over the
 * section before it.
 *
 * A section whose disciplines produced nothing to photograph is set in type
 * alone, at size, with its number ghosted behind it.
 */
export function CaseChapter({
  chapter,
  order,
  number,
  release = false,
}: {
  chapter: Chapter;
  order: number;
  /** What the rail prints. 1-based, counted across sections. */
  number: number;
  /** True on the last section of the case. See `CaseRoom`. */
  release?: boolean;
}) {
  const say = useLocalized();
  const skin = TONES[chapter.tone];
  const shots = chapter.shots ?? [];
  const index = String(number).padStart(2, "0");
  const bare = shots.length === 0;

  return (
    <CaseRoom
      tone={chapter.tone}
      order={order}
      id={chapterId(chapter.key)}
      release={release}
    >
      <CaseBlock className={cn("relative", bare && "overflow-hidden")}>
        {bare ? (
          <span
            aria-hidden
            className={cn(
              "font-display pointer-events-none absolute right-0 -bottom-[0.18em] text-[34vw] leading-none font-extrabold tracking-[-0.06em] opacity-[0.055] select-none lg:text-[22vw]",
              skin.title,
            )}
          >
            {index}
          </span>
        ) : null}

        <div
          className={cn(
            "relative",
            !bare &&
              "grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start lg:gap-16 xl:gap-20",
          )}
        >
          <Writing
            chapter={chapter}
            skin={skin}
            index={index}
            say={say}
            bare={bare}
          />

          {bare ? null : (
            <Shots shots={shots} skin={skin} say={say} first={order === 0} />
          )}
        </div>
      </CaseBlock>

      {/* Everything else the same work produced, on the same ground, inside the
          same section   one curtain covers all of it. */}
      {chapter.palette ? <CasePaletteStory story={chapter.palette} skin={skin} /> : null}

      {chapter.wall?.length ? <CaseWall wall={chapter.wall} skin={skin} /> : null}

    </CaseRoom>
  );
}

/** The rail, the headline, the line under it, and the ways out to the live work. */
function Writing({
  chapter,
  skin,
  index,
  say,
  bare,
}: {
  chapter: Chapter;
  skin: ToneSkin;
  index: string;
  say: Say;
  bare: boolean;
}) {
  return (
    <div className={cn(bare && "max-w-4xl")}>
      <Reveal direction="none" duration={0.5} amount={0.3}>
        <div
          className={cn(
            "flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t pt-5",
            skin.rule,
          )}
        >
          <span className={cn("eyebrow mr-1 tabular-nums", skin.label)}>
            {index}
          </span>
          {chapter.labels.map((label, i) => (
            <span key={say(label)} className="flex items-baseline gap-3">
              {i > 0 ? (
                <span
                  aria-hidden
                  className="h-3 w-px translate-y-0.5 bg-current opacity-25"
                />
              ) : null}
              <span className={cn("eyebrow", skin.title)}>{say(label)}</span>
            </span>
          ))}
        </div>
      </Reveal>

      <RevealWords
        as="h2"
        amount={0.3}
        delay={0.05}
        text={say(chapter.title)}
        className={cn(
          "font-display mt-7 block font-extrabold tracking-[-0.045em]",
          bare
            ? "text-[clamp(2rem,5.6vw,4.25rem)] leading-[0.99]"
            : "text-[clamp(1.75rem,4vw,3rem)] leading-[1.03]",
          skin.title,
        )}
      />

      <Reveal delay={0.14} amount={0.3}>
        <p
          className={cn(
            "mt-6 leading-relaxed",
            bare
              ? "max-w-2xl text-base sm:text-lg"
              : "max-w-xl text-[0.9375rem] sm:text-base",
            skin.body,
          )}
        >
          {say(chapter.text)}
        </p>
      </Reveal>

      <Links links={chapter.links} skin={skin} say={say} />

      {chapter.metric ? (
        <Reveal delay={0.26} amount={0.3}>
          <p
            className={cn(
              "mt-10 flex items-baseline gap-4 border-t pt-6",
              skin.rule,
            )}
          >
            <span className="font-display text-gold text-[clamp(2.75rem,7vw,4.5rem)] leading-none font-extrabold tracking-[-0.05em] tabular-nums">
              {chapter.metric}
            </span>
            <span className={cn("eyebrow", skin.caption)}>
              {say({ fr: "Résultat", en: "Outcome" })}
            </span>
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/**
 * The pictures.
 *
 * One column on a phone, two from `sm`, and an odd first picture runs the width
 * so the grid never ends on a hole. The same at every size   the layout reflows,
 * nothing behaves differently.
 */
function Shots({
  shots,
  skin,
  say,
  first,
}: {
  shots: Shot[];
  skin: ToneSkin;
  say: Say;
  first: boolean;
}) {
  const odd = shots.length % 2 === 1;

  return (
    <RevealGroup amount={0.12} className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      {shots.map((shot, i) => {
        const wide = shots.length === 1 || (odd && i === 0);

        return (
          <figure
            key={shot.image}
            className={cn(
              "relative overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]",
              skin.frame,
              wide ? "aspect-16/10 sm:col-span-2" : "aspect-4/3",
            )}
          >
            <Image
              src={shot.image}
              alt={say(shot.alt)}
              fill
              sizes="(max-width: 40rem) 92vw, (max-width: 64rem) 46vw, 36vw"
              className={cn(
                shot.fit === "contain"
                  ? "object-contain p-4 sm:p-6"
                  : "object-cover",
              )}
              priority={first && i === 0}
            />
            <figcaption className="eyebrow text-canvas/85 absolute bottom-3 left-4 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:bottom-4 sm:left-5">
              {say(shot.label)}
            </figcaption>
          </figure>
        );
      })}
    </RevealGroup>
  );
}

/** Where the work is live: the site, and the accounts it runs on. */
function Links({
  links,
  skin,
  say,
}: {
  links?: ChapterLink[];
  skin: ToneSkin;
  say: Say;
}) {
  if (!links?.length) return null;

  return (
    <Reveal delay={0.22} amount={0.3}>
      <ul className="mt-8 flex flex-wrap gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "font-label inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5",
                "text-[0.72rem] font-bold tracking-[0.16em] uppercase sm:px-6 sm:py-3 sm:text-[0.78rem]",
                "transition-colors duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                skin.control,
              )}
            >
              {say(link.label)}
              <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
