"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { CaseBlock, CaseRoom } from "./stack";
import { CasePaletteStory } from "./palette-story";
import { TONES, type ToneSkin } from "./tone";
import type {
  Chapter,
  ChapterBlock,
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
 * Every part of the business a room covers, in reading order.
 *
 * The room is numbered and named once, at the top; this is what the hero's rail
 * prints, because a rail that named only the first block would promise less
 * than the room delivers.
 */
export function chapterCovers(chapter: Chapter) {
  return [...chapter.labels, ...(chapter.blocks ?? []).flatMap((b) => b.labels)];
}

/**
 * One chapter of what was built.
 *
 * The chapters are the answer to the architecture: one decision each, the work
 * it produced, and the proof it left   on one ground, behind one rounded edge.
 * The number and the part of the business it covers run along the top, so a
 * reader walking the run knows they are still inside "what we built" without
 * the phrase being printed over every room.
 *
 * A room can hold more than one piece of work. Where a second piece is only
 * legible next to the first   a position under the branding it argues for, the
 * money under the content it paid for   it is a block inside the same room
 * rather than a room of its own, and the curtain covers both. The palette,
 * where there is one, always closes the room.
 *
 * A chapter whose disciplines produced nothing to photograph is set in type
 * alone, at size, with its number ghosted behind it. The figure it moved is not
 * stated here   every result in a case is read together, in the impact room.
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

        <Body
          piece={chapter}
          skin={skin}
          say={say}
          index={index}
          lead
          first={order === 0}
        />
      </CaseBlock>

      {/* The work that only means something next to the work above it. Same
          ground, no second curtain   read as the next screen of one room. */}
      {chapter.blocks?.map((block) => (
        <CaseBlock key={block.key} tight>
          <Body piece={block} skin={skin} say={say} />
        </CaseBlock>
      ))}

      {/* The palette is part of the branding chapter rather than a subject of
          its own: same ground, same room, one curtain over both. */}
      {chapter.palette ? (
        <CasePaletteStory story={chapter.palette} skin={skin} />
      ) : null}
    </CaseRoom>
  );
}

/**
 * One piece of work: what it covers, what it decided, and what it produced.
 *
 * The same shape whether it opens a room or follows inside one   only the size
 * changes. `lead` is the room's own first piece and is set at headline size;
 * everything after it is set one step down, so a room reads as one argument
 * carried further rather than as two arguments competing.
 */
function Body({
  piece,
  skin,
  say,
  index,
  lead = false,
  first = false,
}: {
  piece: Chapter | ChapterBlock;
  skin: ToneSkin;
  say: Say;
  /** The room's number. Printed on the opening piece only. */
  index?: string;
  lead?: boolean;
  first?: boolean;
}) {
  const shots = piece.shots ?? [];
  const bare = shots.length === 0;

  /* A piece that follows another inside the same room is mirrored: pictures
     to the left, writing to the right. Two pieces set out identically read as
     one screen printed twice, and the second stops being looked at. Below the
     breakpoint nothing swaps   the writing is what a phone should meet
     first, whichever side it would have sat on. */
  const mirrored = !lead;

  return (
    <div
      className={cn(
        "relative",
        !bare && "grid gap-12 lg:items-start lg:gap-16 xl:gap-20",
        !bare &&
          (mirrored
            ? "lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)]"
            : "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]"),
      )}
    >
      <Writing
        piece={piece}
        skin={skin}
        say={say}
        index={index}
        lead={lead}
        bare={bare}
        className={cn(mirrored && "lg:order-2")}
      />

      {bare ? null : (
        <Shots
          shots={shots}
          skin={skin}
          say={say}
          first={first}
          className={cn(mirrored && "lg:order-1")}
        />
      )}
    </div>
  );
}

/** The rule, the headline, the line under it, and the ways out to the live work. */
function Writing({
  piece,
  skin,
  say,
  index,
  lead,
  bare,
  className,
}: {
  piece: Chapter | ChapterBlock;
  skin: ToneSkin;
  say: Say;
  index?: string;
  lead: boolean;
  bare: boolean;
  className?: string;
}) {
  /* Type alone is allowed to run wide, but only where it opens the room: a
     block set as large as the piece above it would read as a new argument. */
  const loud = lead && bare;

  return (
    <div className={cn(bare && "max-w-4xl", className)}>
      <Reveal direction="none" duration={0.5} amount={0.3}>
        <div
          className={cn(
            "flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t pt-5",
            skin.rule,
          )}
        >
          {index ? (
            <span className={cn("eyebrow mr-1 tabular-nums", skin.label)}>
              {index}
            </span>
          ) : null}
          {piece.labels.map((label, i) => (
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
        text={say(piece.title)}
        className={cn(
          "font-display mt-7 block font-extrabold tracking-[-0.045em]",
          loud
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
          {say(piece.text)}
        </p>
      </Reveal>

      <Links links={piece.links} skin={skin} say={say} />
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
  className,
}: {
  shots: Shot[];
  skin: ToneSkin;
  say: Say;
  first: boolean;
  className?: string;
}) {
  const odd = shots.length % 2 === 1;

  return (
    <RevealGroup
      amount={0.12}
      className={cn("grid gap-3 sm:grid-cols-2 sm:gap-4", className)}
    >
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
