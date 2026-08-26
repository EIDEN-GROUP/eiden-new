"use client";

import Image from "next/image";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { heroTexture, siteConfig } from "@/lib/data/site";

export function Home2Closing() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
    if (!next) void video.play().catch(() => {});
  }, []);

  const panel =
    "group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[1.75rem] p-7 sm:min-h-[32rem] sm:p-9";

  return (
    <section id="contact" className="bg-cream px-4 pb-20 sm:px-6 sm:pb-28">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
        {/* ── The method ───────────────────────────────────────────── */}
        <Reveal duration={0.9}>
          <article className={panel}>
            <video
              ref={videoRef}
              src="/media/eiden-method.mp4"
              poster={heroTexture}
              muted
              loop
              playsInline
              autoPlay
              aria-hidden
              className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-brand)] group-hover:scale-105 motion-reduce:transition-none"
            />
            <span
              aria-hidden
              className="from-ink via-ink/55 absolute inset-0 -z-10 bg-gradient-to-t to-transparent"
            />

            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? t.vsl.unmute : t.vsl.mute}
              className="bg-canvas/90 text-forest hover:bg-canvas absolute top-6 right-6 flex size-11 items-center justify-center rounded-full backdrop-blur-sm transition-colors duration-300"
            >
              {muted ? (
                <VolumeX className="size-4" strokeWidth={1.8} aria-hidden />
              ) : (
                <Volume2 className="size-4" strokeWidth={1.8} aria-hidden />
              )}
            </button>

            <p className="font-label text-gold text-[0.75rem] font-bold tracking-[0.28em] uppercase">
              {t.vsl.eyebrow}
            </p>
            <h2 className="font-display text-canvas mt-4 max-w-sm text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.02] font-extrabold tracking-[-0.04em]">
              {t.vsl.title}
            </h2>
            <p className="text-canvas/70 mt-4 max-w-md text-[0.9375rem] leading-relaxed">
              {t.vsl.text}
            </p>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {t.vsl.chapters.map((chapter) => (
                <li
                  key={chapter.n}
                  className="border-canvas/25 text-canvas/75 rounded-full border px-3 py-1 text-[0.82rem]"
                >
                  {chapter.label}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        {/* ── The invitation ───────────────────────────────────────── */}
        <Reveal duration={0.9} delay={0.08}>
          <article className={panel}>
            <Image
              src={heroTexture}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="-z-10 object-cover transition-transform duration-[1200ms] ease-[var(--ease-brand)] group-hover:scale-105 motion-reduce:transition-none"
            />
            <span
              aria-hidden
              className="from-teal via-teal/70 absolute inset-0 -z-10 bg-gradient-to-t to-transparent"
            />

            <p className="font-label text-canvas/70 text-[0.75rem] font-bold tracking-[0.28em] uppercase">
              {t.contact.eyebrow}
            </p>
            <h2 className="font-display text-canvas mt-4 max-w-sm text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.02] font-extrabold tracking-[-0.04em]">
              {t.contact.title}
            </h2>
            <p className="text-canvas/75 mt-4 max-w-md text-[0.9375rem] leading-relaxed">
              {t.contact.text}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ButtonLink
                href={siteConfig.bookingUrl}
                variant="light"
                size="lg"
                className="bg-canvas text-ink hover:bg-beige"
              >
                {t.contact.cta}
                <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
              </ButtonLink>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-canvas/80 hover:text-canvas text-[0.9375rem] underline-offset-4 transition-colors hover:underline"
              >
                {siteConfig.email}
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
