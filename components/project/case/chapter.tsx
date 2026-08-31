"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { CaseBlock, CaseSection } from "./stack";
import { CasePaletteStory } from "./palette-story";
import { TONES, type DisplayTone, type ToneSkin } from "./tone";
import type {
  Chapter,
  ChapterBlock,
  ChapterLink,
  Localized,
  Shot,
} from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

type Say = (value: Localized) => string;

export function chapterId(key: string) {
  return `chapter-${key}`;
}

export function chapterCovers(chapter: Chapter) {
  return [...chapter.labels, ...(chapter.blocks ?? []).flatMap((b) => b.labels)];
}

export function CaseChapter({
  chapter,
  tone,
  number,
}: {
  chapter: Chapter;
  /** Decided by the run, not by the chapter. See `case-study`. */
  tone: DisplayTone;
  number: number;
}) {
  const say = useLocalized();
  const skin = TONES[tone];
  const shots = chapter.shots ?? [];
  const index = String(number).padStart(2, "0");
  const bare = shots.length === 0;

  return (
    <CaseSection tone={tone} id={chapterId(chapter.key)}>
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
          first={number === 1}
        />
      </CaseBlock>

      {chapter.blocks?.map((block) => (
        <CaseBlock key={block.key} tight>
          <Body piece={block} skin={skin} say={say} />
        </CaseBlock>
      ))}

      {chapter.palette ? (
        <CasePaletteStory story={chapter.palette} skin={skin} />
      ) : null}
    </CaseSection>
  );
}


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
  index?: string;
  lead?: boolean;
  first?: boolean;
}) {
  const shots = piece.shots ?? [];
  const bare = shots.length === 0;
  const mirrored = !lead;

  return (
    <div
      className={cn(
        "relative",
        !bare && "grid gap-12 lg:items-start lg:gap-16 xl:gap-20",
        !bare &&
          (mirrored && "lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)]"))} >
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
  const count = shots.length;
  const odd = count % 2 === 1;

  const gridCols =
    count === 1
      ? "grid-cols-1"
      : count === 2
        ? "sm:grid-cols-2"
        : count === 3
          ? "sm:grid-cols-3"
          : count === 4
            ? "sm:grid-cols-4"
            : "sm:grid-cols-3";

  return (
    <RevealGroup
      amount={0.12}
      className={cn(
        "grid gap-3 sm:gap-4",
        gridCols,
        className,
      )}
    >
      {shots.map((shot, i) => {
        // Wide uniquement pour 1 image ou nombre impair
        const wide =
          count === 1 || (odd && count !== 1 && i === 0);

        return (
          <figure
            key={shot.image}
            className={cn(
              "relative overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem]",
              skin.frame,
              wide && "aspect-16/10 sm:col-span-2",
              !wide && "aspect-4/3",
            )}
          >
            <Image
              src={shot.image}
              alt={say(shot.alt)}
              fill
              quality={90}
              sizes={
                count === 1
                  ? "(max-width: 640px) 92vw, 72vw"
                  : count === 2
                    ? "(max-width: 640px) 92vw, 46vw"
                    : "(max-width: 640px) 92vw, 23vw"
              }
              className={cn(
                shot.fit === "contain"
                  ? "object-contain p-4 sm:p-6"
                  : "object-cover size-full",
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
