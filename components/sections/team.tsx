"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

const accents = [
  "from-teal/70 to-teal/25 text-canvas",
  "from-gold/70 to-gold/25 text-forest",
  "from-teal-lt/70 to-teal-lt/25 text-canvas",
  "from-gold-dk/70 to-gold-dk/25 text-canvas",
  "from-beige/80 to-beige/30 text-forest",
];

function Member({
  initials,
  name,
  role,
  accent,
  image,
  onPreview,
}: {
  initials: string;
  name: string;
  role: string;
  accent: string;
  image?: string;
  onPreview?: () => void;
}) {
  return (
    <Link
      href="/a-propos#equipe"
      aria-label={`${name} | ${role}`}
      onClick={(event) => {
        const desktop = window.matchMedia("(min-width: 1024px)").matches;
        if (desktop) {
          event.preventDefault();
          return;
        }
        event.preventDefault();
        onPreview?.();
      }}
      className="group glass-dark glass-top focus-visible:outline-teal relative block aspect-4/5 overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {image ? (
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            quality={90}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover grayscale transition-[filter,transform] duration-700 ease-[var(--ease-brand)] group-focus-within:grayscale-0 group-hover:grayscale-0 group-focus-within:scale-105 group-hover:scale-105 motion-reduce:transition-none"
          />
        </div>
      ) : (
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
      )}

      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,rgba(18,38,32,0.88),transparent)]",
          "opacity-0 transition-opacity duration-500 ease-[var(--ease-brand)]",
          "group-focus-within:opacity-100 group-hover:opacity-100",
          "motion-reduce:transition-none",
        )}
      />

      <div className="absolute inset-x-0 bottom-0 overflow-hidden">
        <div
          className={cn(
            "translate-y-full p-5 transition-transform duration-600 ease-[var(--ease-brand)]",
            "group-focus-within:translate-y-0 group-hover:translate-y-0",
            "motion-reduce:translate-y-0 motion-reduce:transition-none",
          )}
        >
          <h3 className="font-label text-canvas text-[0.9375rem] font-bold tracking-[0.08em] uppercase">
            {name}
          </h3>
          <p className="text-canvas/65 mt-1 text-[0.875rem] leading-snug">{role}</p>
        </div>
      </div>
    </Link>
  );
}

export function Team() {
  const { t } = useLanguage();
  const founder = t.team.founder;
  const [preview, setPreview] = useState<(typeof t.team.members)[number] | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewClosing, setPreviewClosing] = useState(false);

  const closePreview = () => {
    setPreviewClosing(true);
    window.setTimeout(() => {
      setPreview(null);
      setPreviewVisible(false);
      setPreviewClosing(false);
      try {
        (document.activeElement as HTMLElement | null)?.blur();
      } catch {}
    }, 180);
  };

  const openPreview = (person: (typeof t.team.members)[number]) => {
    setPreviewClosing(false);
    setPreview(person);
    setPreviewVisible(false);
    window.requestAnimationFrame(() => setPreviewVisible(true));
  };

  useEffect(() => {
    if (!preview) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [preview]);

  return (
    <section id="equipe" className="grain bg-canvas text-ink py-24 sm:py-32">
      <div className="container-eiden">
        <RevealWords
          as="h2"
          text={t.team.title}
          delay={0.04}
          className="max-w-4xl text-[clamp(2rem,5.6vw,4.5rem)] leading-[1.02] font-extrabold tracking-[-0.03em] uppercase"
        />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.5}>
            <p className="text-ink/55 max-w-xl text-base leading-relaxed">
              {t.team.text}
            </p>
          </Reveal>
          <Reveal delay={0.58} direction="left">
            <p className="editorial text-ink/45 max-w-xs text-base lg:text-right">
              {t.team.note}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} duration={0.9} className="mt-16">
          <Link
            href="/a-propos#equipe"
            aria-label={`${founder.name}   ${founder.role}`}
            className="group glass-light glass-top border-ink/10 focus-visible:outline-teal grid overflow-hidden rounded-3xl border focus-visible:outline-2 focus-visible:outline-offset-2 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]"
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
              <p className="eyebrow text-teal">{founder.role}</p>
              <p className="font-display text-ink text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.03em]">
                {founder.name}
              </p>
              <p className="text-ink/60 max-w-xl text-[0.9375rem] leading-relaxed">
                {founder.text}
              </p>
            </div>
          </Link>
        </Reveal>

        {/* The specialists behind him. */}
        <RevealGroup className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {t.team.members.map((person, index) => (
            <Member
              key={person.initials}
              initials={person.initials}
              name={person.name}
              role={person.role}
              accent={accents[(index + 1) % accents.length]}
              image={person.image}
              onPreview={() => openPreview(person)}
            />
          ))}
        </RevealGroup>

        {preview ? (
          <div
            className={`fixed inset-0 z-[200] flex items-center justify-center bg-ink/85 p-4 transition-opacity duration-200 ${
              previewVisible && !previewClosing ? "opacity-100" : "opacity-0"
            }`}
            onClick={closePreview}
            role="dialog"
            aria-modal="true"
            aria-label={`${preview.name} | ${preview.role}`}
          >
            <div
              className={`relative w-full max-w-sm overflow-hidden rounded-3xl bg-canvas shadow-[0_30px_90px_-30px_rgba(18,38,32,0.65)] transition-all duration-200 ${
                previewVisible && !previewClosing ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closePreview}
                className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-ink/80 text-canvas transition-colors hover:bg-ink"
                aria-label="Close preview"
              >
                ×
              </button>
              {preview.image ? (
                <Image
                  src={preview.image}
                  alt={preview.name}
                  width={1080}
                  height={1350}
                  quality={95}
                  className="h-auto w-full object-cover"
                />
              ) : null}
              <div className="p-5">
                <h3 className="font-label text-ink text-[0.9375rem] font-bold tracking-[0.08em] uppercase">
                  {preview.name}
                </h3>
                <p className="text-ink/65 mt-1 text-[0.875rem] leading-snug">{preview.role}</p>
                {preview.text ? (
                  <p className="text-ink/55 mt-3 text-[0.875rem] leading-relaxed">{preview.text}</p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
