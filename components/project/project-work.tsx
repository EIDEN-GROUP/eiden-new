"use client";

import Image from "next/image";
import { SectionLabel, useLocalized } from "@/components/project/shared";
import { Reveal } from "@/components/ui/reveal";
import type { Localized, WorkBlock, WorkImage } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

/**
 * 05 — The work.
 *
 * The pictures carry this section; the writing only names what is being
 * looked at. Each block in the record picks its own shape, so the rhythm —
 * plate, pair, plate, aside — is a property of the project rather than of
 * the template.
 */
export function ProjectWork({ work }: { work: WorkBlock[] }) {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-eiden">
        <SectionLabel number="05">The work</SectionLabel>
      </div>

      <div className="mt-12 flex flex-col gap-4 sm:gap-6">
        {work.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>
    </section>
  );
}

function Block({ block }: { block: WorkBlock }) {
  const say = useLocalized();

  if (block.kind === "full") {
    return (
      <Reveal>
        <figure>
          <div className="relative aspect-4/3 w-full overflow-hidden sm:aspect-16/9">
            <Image
              src={block.image}
              alt={say(block.alt)}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <Caption caption={block.caption} className="container-eiden" />
        </figure>
      </Reveal>
    );
  }

  if (block.kind === "note") {
    return (
      <Reveal>
        <div
          className={cn(
            "container-eiden grid items-center gap-8 py-6 lg:grid-cols-2 lg:gap-16 lg:py-10",
          )}
        >
          <div
            className={cn(
              "relative aspect-4/3 w-full overflow-hidden",
              block.side === "left" && "lg:order-last",
            )}
          >
            <Image
              src={block.image}
              alt={say(block.alt)}
              fill
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="object-cover"
            />
          </div>

          <div className="max-w-md">
            <h3 className="font-display text-ink text-[clamp(1.25rem,2.2vw,1.75rem)] leading-tight font-extrabold tracking-[-0.03em] uppercase">
              {say(block.title)}
            </h3>
            <p className="text-ink/60 mt-4 text-[0.9375rem] leading-relaxed">
              {say(block.text)}
            </p>
          </div>
        </div>
      </Reveal>
    );
  }

  /* `pair` and `trio` differ only in how many share the row. Below `sm` both
     stack, which is the only way three screenshots stay legible on a phone. */
  const across = block.kind === "pair" ? "sm:grid-cols-2" : "sm:grid-cols-3";

  return (
    <Reveal>
      <div className={cn("container-eiden grid gap-4 sm:gap-6", across)}>
        {block.items.map((item) => (
          <Plate key={item.image} item={item} count={block.items.length} />
        ))}
      </div>
    </Reveal>
  );
}

function Plate({ item, count }: { item: WorkImage; count: number }) {
  const say = useLocalized();

  return (
    <figure>
      <div
        className={cn(
          "relative w-full overflow-hidden",
          count === 3 ? "aspect-4/5" : "aspect-4/3",
        )}
      >
        <Image
          src={item.image}
          alt={say(item.alt)}
          fill
          sizes={
            count === 3
              ? "(max-width: 640px) 92vw, 30vw"
              : "(max-width: 640px) 92vw, 46vw"
          }
          className="object-cover"
        />
      </div>
      <Caption caption={item.caption} />
    </figure>
  );
}

function Caption({
  caption,
  className,
}: {
  caption?: Localized;
  className?: string;
}) {
  const say = useLocalized();
  if (!caption) return null;

  return (
    <figcaption className={cn("pt-3", className)}>
      <span className="eyebrow text-ink/35">{say(caption)}</span>
    </figcaption>
  );
}
