"use client";

import Image from "next/image";
import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import type { ProjectStory } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

/**
 * The feed, shown as one wall rather than as a set of figures.
 *
 * Posts are judged together   nobody meets a grid one square at a time   so
 * they run edge to edge with a hairline between them and no captions. The one
 * line above the wall is the claim the wall is evidence for.
 *
 * An odd post at the end of a two-column run is widened rather than left
 * beside a hole, which is why the span is worked out from the count.
 */
export function ProjectSocial({
  label,
  social,
}: {
  label: string;
  social: ProjectStory["social"];
}) {
  const say = useLocalized();
  const odd = social.items.length % 2 === 1;

  return (
    <section data-nav-tone="light" className="bg-canvas text-ink">
      <div className="container-eiden border-ink/12 flex flex-col gap-4 border-t py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
        <p className="eyebrow text-ink/30 shrink-0">{label}</p>
        <Reveal direction="none" duration={0.5}>
          <p className="text-ink max-w-2xl text-center text-[0.9375rem] leading-relaxed">
            {say(social.title)}
          </p>
        </Reveal>
        <p className="eyebrow text-ink/30 shrink-0">
          {say({ fr: "Réseaux", en: "Social" })}
        </p>
      </div>

      <RevealGroup className="grid grid-cols-2 gap-1.5 lg:grid-cols-7">
        {social.items.map((item, index) => (
          <figure
            key={item.image}
            className={cn(
              "bg-ink/5 relative aspect-square overflow-hidden",
              odd &&
                index === social.items.length - 1 &&
                "col-span-2 aspect-2/1 lg:col-span-1 lg:aspect-square",
            )}
          >
            <Image
              src={item.image}
              alt={say(item.alt)}
              fill
              sizes="(max-width: 64rem) 50vw, 15vw"
              className="object-cover"
            />
          </figure>
        ))}
      </RevealGroup>
    </section>
  );
}
