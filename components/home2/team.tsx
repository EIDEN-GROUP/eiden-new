"use client";

import Link from "next/link";
import { ScrollWords } from "@/components/home2/motion";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

/** Tint behind each monogram, rotated so the grid never repeats a pair. */
const tints = [
  "bg-teal text-canvas",
  "bg-beige text-forest",
  "bg-ink text-canvas",
  "bg-gold text-forest",
];

/**
 * The people, as a grid with the founder cut into the middle of it.
 *
 * No portraits have been supplied, so each frame carries a monogram over a
 * brand tint — a deliberate placeholder. Dropping in real photography means
 * putting an `<Image>` in the same slot; nothing else has to move.
 */
export function Home2Team() {
  const { t } = useLanguage();
  const members = t.team.members;

  return (
    <section className="bg-canvas px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <Reveal direction="none" duration={0.5}>
            <p className="font-label text-teal text-[0.7rem] font-semibold tracking-[0.32em] uppercase">
              {t.team.eyebrow}
            </p>
          </Reveal>

          <ScrollWords
            as="h2"
            text={t.team.title}
            className="font-display mt-5 text-[clamp(2rem,4.8vw,3.5rem)] leading-[1] font-extrabold tracking-[-0.045em]"
          />

          <Reveal delay={0.1}>
            <p className="text-forest/65 mt-6 max-w-lg text-[0.9375rem] leading-relaxed">
              {t.team.text}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* The founder holds two slots and the only dark panel, so the eye
              lands on him before it reads the rest of the grid. */}
          <Link
            href="/a-propos#equipe"
            className="group bg-ink text-canvas flex flex-col justify-between rounded-[1.6rem] p-7 shadow-[0_30px_70px_-38px_rgba(10,15,12,0.6)] transition-transform duration-500 ease-[var(--ease-brand)] hover:-translate-y-1.5 motion-reduce:transition-none sm:col-span-2"
          >
            <span className="font-display text-canvas/15 text-[clamp(3rem,7vw,5.5rem)] leading-none font-extrabold tracking-[-0.05em]">
              {t.team.founder.initials}
            </span>
            <span className="mt-8 block">
              <span className="font-display block text-[1.5rem] leading-tight font-extrabold tracking-[-0.035em]">
                {t.team.founder.name}
              </span>
              <span className="font-label text-gold mt-2 block text-[0.65rem] font-semibold tracking-[0.24em] uppercase">
                {t.team.founder.role}
              </span>
              <span className="text-canvas/60 mt-4 block text-sm leading-relaxed">
                {t.team.founder.text}
              </span>
            </span>
          </Link>

          {members.map((member, index) => (
            <Link
              key={member.name}
              href="/a-propos#equipe"
              aria-label={`${member.name} — ${member.role}`}
              className={cn(
                "group flex flex-col justify-between rounded-[1.6rem] p-6",
                "shadow-[0_28px_64px_-40px_rgba(10,15,12,0.45)]",
                "transition-transform duration-500 ease-[var(--ease-brand)] hover:-translate-y-1.5 motion-reduce:transition-none",
                tints[index % tints.length],
              )}
            >
              <span className="font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-none font-extrabold tracking-[-0.05em] opacity-25">
                {member.initials}
              </span>
              <span className="mt-10 block">
                <span className="font-display block text-[1.0625rem] leading-tight font-bold tracking-[-0.02em]">
                  {member.name}
                </span>
                <span className="mt-1.5 block text-xs leading-relaxed opacity-65">
                  {member.role}
                </span>
              </span>
            </Link>
          ))}
        </RevealGroup>

        <Reveal delay={0.12}>
          <p className="text-forest/45 mt-8 text-sm">{t.team.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
