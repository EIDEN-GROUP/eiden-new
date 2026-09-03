"use client";

import { useLocalized } from "@/components/project/shared";
import { Reveal } from "@/components/ui/reveal";
import type { Localized } from "@/lib/data/projects";

/**
 * The room before, and the room after.
 *
 * The same band twice, at either end of the story: on ink, one statement, no
 * picture. It is the only place on the page where the client's own account is
 * allowed to stand on its own   before the work, and once it is running   so
 * nothing is set beside it to argue with.
 */
export function ProjectStatement({
  label,
  statement,
}: {
  label: string;
  statement: Localized;
}) {
  const say = useLocalized();

  return (
    <section data-nav-tone="light" className="grain bg-beige text-ink">
      <div className="container-eiden py-20 sm:py-28">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-ink/35">{label}</p>
        </Reveal>

        {/* Plain text, not `RevealWords`: the run is a paragraph rather
            than a headline, and word-by-word masking would both strand the
            spaces out of anything copied from it and take far too long to
            settle at this length. */}
        <Reveal delay={0.06}>
          <p className="editorial text-ink mx-auto mt-10 max-w-4xl text-center text-[clamp(1.25rem,3vw,2.125rem)] leading-[1.28]">
            {say(statement)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The line that carries the whole engagement, set on its own rule.
 *
 * It repeats what the masthead already said, on purpose: by this point the
 * reader has been through the pictures, and the sentence reads differently
 * on the way out than it did on the way in.
 */
export function ProjectStrip({
  label,
  text,
  meta,
}: {
  label: string;
  text: Localized;
  meta?: string;
}) {
  const say = useLocalized();

  return (
    <section data-nav-tone="light" className="bg-beige text-ink">
      <div className="container-eiden border-ink/12 flex flex-col gap-4 border-t py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
        <p className="eyebrow text-ink/30 shrink-0">{label}</p>
        <p className="text-ink/70 max-w-2xl text-center text-[0.9375rem] leading-relaxed sm:text-left">
          {say(text)}
        </p>
        <p className="eyebrow text-ink/30 shrink-0">{meta}</p>
      </div>
    </section>
  );
}
