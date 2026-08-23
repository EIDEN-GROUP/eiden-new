"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

/** Panel tint each portrait fades up into on hover. */
const accents = [
  "from-teal/70 to-teal/25 text-canvas",
  "from-gold/70 to-gold/25 text-forest",
  "from-teal-lt/70 to-teal-lt/25 text-canvas",
  "from-gold-dk/70 to-gold-dk/25 text-canvas",
  "from-mint/70 to-mint/25 text-forest",
];

/**
 * One person.
 *
 * No photography has been supplied yet, so the frame renders the monogram over
 * a brand-tinted panel — a deliberate placeholder rather than a broken image.
 * Dropping in a real portrait means putting an `<Image>` in this slot; the
 * grayscale-to-colour behaviour is on the wrapper and applies either way.
 */
function Member({
  initials,
  name,
  role,
  accent,
}: {
  initials: string;
  name: string;
  role: string;
  accent: string;
}) {
  return (
    <Link
      href="/a-propos#equipe"
      aria-label={`${name} — ${role}`}
      className="group focus-visible:outline-gold relative block aspect-4/5 overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {/* Portrait — desaturated at rest, full colour once hovered */}
      <div
        aria-hidden
        className={cn(
          "grain absolute inset-0 flex items-center justify-center bg-gradient-to-br",
          accent,
          "grayscale transition-[filter,transform] duration-700 ease-[var(--ease-brand)]",
          "group-focus-within:grayscale-0 group-hover:grayscale-0",
          "group-focus-within:scale-105 group-hover:scale-105",
          "motion-reduce:transition-none",
        )}
      >
        <span className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-extrabold tracking-[-0.05em] opacity-50">
          {initials}
        </span>
      </div>

      {/* Scrim, so the caption stays legible over any portrait */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,rgba(8,13,11,0.88),transparent)]",
          "opacity-0 transition-opacity duration-500 ease-[var(--ease-brand)]",
          "group-focus-within:opacity-100 group-hover:opacity-100",
          "motion-reduce:transition-none",
        )}
      />

      {/* Caption rides up from behind the bottom edge. The padding belongs to
          the moving element, not the mask, or a sliver stays visible at rest. */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden">
        <div
          className={cn(
            "translate-y-full p-5 transition-transform duration-600 ease-[var(--ease-brand)]",
            "group-focus-within:translate-y-0 group-hover:translate-y-0",
            "motion-reduce:translate-y-0 motion-reduce:transition-none",
          )}
        >
          <h3 className="font-label text-canvas text-sm font-semibold tracking-[0.08em] uppercase">
            {name}
          </h3>
          <p className="text-canvas/65 mt-1 text-[0.8125rem] leading-snug">
            {role}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function Team() {
  const { t } = useLanguage();
  const founder = t.team.founder;

  return (
    <section id="equipe" className="grain bg-ink text-canvas py-24 sm:py-32">
      <div className="container-eiden">
        <RevealWords
          as="h2"
          text={t.team.title}
          delay={0.04}
          className="max-w-4xl text-[clamp(2rem,5.6vw,4.5rem)] leading-[1.02] font-extrabold tracking-[-0.03em] uppercase"
        />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.5}>
            <p className="text-canvas/55 max-w-xl text-base leading-relaxed">
              {t.team.text}
            </p>
          </Reveal>
          <Reveal delay={0.58} direction="left">
            <p className="editorial text-canvas/35 max-w-xs text-base lg:text-right">
              {t.team.note}
            </p>
          </Reveal>
        </div>

        {/* The founder stands alone and at full width — he is on every file,
            and the layout should say so before the roster does. */}
        <Reveal delay={0.12} duration={0.9} className="mt-16">
          <Link
            href="/a-propos#equipe"
            aria-label={`${founder.name} — ${founder.role}`}
            className="group border-canvas/10 focus-visible:outline-gold grid overflow-hidden rounded-3xl border focus-visible:outline-2 focus-visible:outline-offset-2 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]"
          >
            <div className="relative aspect-4/5 overflow-hidden md:aspect-auto md:min-h-[26rem]">
              <Image
                src="/work/CEO.png"
                alt={founder.name}
                fill
                sizes="(max-width: 768px) 100vw, 22rem"
                className="object-cover object-top grayscale transition-[filter,transform] duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:transition-none"
              />
            </div>

            <div className="flex flex-col justify-center gap-5 p-7 sm:p-10">
              <p className="eyebrow text-gold">{founder.role}</p>
              <p className="font-display text-canvas text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.03em]">
                {founder.name}
              </p>
              <p className="text-canvas/60 max-w-xl text-[0.9375rem] leading-relaxed">
                {founder.text}
              </p>
            </div>
          </Link>
        </Reveal>

        {/* The specialists behind him. */}
        <RevealGroup className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {t.team.members.map((person, index) => (
            <Member
              key={person.initials}
              initials={person.initials}
              name={person.name}
              role={person.role}
              accent={accents[(index + 1) % accents.length]}
            />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
