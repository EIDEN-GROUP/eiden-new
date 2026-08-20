"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, type CSSProperties } from "react";
import { Reveal, RevealGroup, RevealWords } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { useMediaQuery } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
/** 0 before `from`, 1 after `to`, linear in between. */
const ramp = (value: number, from: number, to: number) =>
  clamp01((value - from) / (to - from));

export function Idea() {
  const { t } = useLanguage();

  /*
   * The split choreography is a wide-screen affordance: it needs three
   * viewports of scroll room and a horizontal gap to open into. Below `lg`,
   * and for anyone who asked for less motion, every transform below collapses
   * to its resting value and the two cards simply stack.
   *
   * Both queries read through `useSyncExternalStore`, so the server and the
   * hydrating client agree on `false` and the markup never mismatches.
   */
  const wide = useMediaQuery("(min-width: 1024px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const animate = wide && !reduced;

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    if (!animate) {
      stage.removeAttribute("style");
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const span = track.offsetHeight - window.innerHeight;
      if (span <= 0) return;
      const p = clamp01(-track.getBoundingClientRect().top / span);

      // Headline parts to either side, opening the gap the first card lands in.
      stage.style.setProperty("--head-x", `${ramp(p, 0, 0.42)}`);
      stage.style.setProperty("--head-o", `${1 - ramp(p, 0.3, 0.46)}`);
      // One card, centred — then it walks left as the second one arrives.
      stage.style.setProperty("--mission-in", `${ramp(p, 0.16, 0.4)}`);
      stage.style.setProperty("--mission-x", `${1 - ramp(p, 0.5, 0.78)}`);
      stage.style.setProperty("--vision-in", `${ramp(p, 0.52, 0.78)}`);
      stage.style.setProperty("--vision-x", `${1 - ramp(p, 0.5, 0.82)}`);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [animate]);

  const cards = [
    {
      label: t.idea.missionLabel,
      body: t.idea.mission,
      points: t.idea.missionPoints,
      tone: "light" as const,
      style: {
        transform:
          "translateX(calc(var(--mission-x, 0) * 51.6%)) scale(calc(0.94 + var(--mission-in, 1) * 0.06))",
        opacity: "var(--mission-in, 1)",
      } as CSSProperties,
    },
    {
      label: t.idea.visionLabel,
      body: t.idea.vision,
      points: t.idea.visionPoints,
      tone: "dark" as const,
      style: {
        transform: "translateX(calc(var(--vision-x, 0) * 61.6%))",
        opacity: "var(--vision-in, 1)",
      } as CSSProperties,
    },
  ];

  return (
    <section id="idee" className="bg-canvas relative">
      {/* Faint architectural grid, kept under the 4% brand ceiling */}
      <div
        aria-hidden
        className="zellige text-forest pointer-events-none absolute inset-x-0 top-0 h-[70rem] [mask-image:radial-gradient(80%_50%_at_50%_0%,black,transparent)] opacity-70"
      />

      <div className="container-eiden relative pt-24 sm:pt-32">
        {/* ── Statement — the title rises, the prose follows ─────────── */}
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal direction="none" duration={0.5}>
              <p className="eyebrow text-teal flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-px w-8 origin-left bg-current opacity-50 motion-safe:[animation:eiden-underline_0.8s_var(--ease-brand)_0.1s_both]"
                />
                {t.idea.eyebrow}
              </p>
            </Reveal>

            <RevealWords
              as="h2"
              text={t.idea.title}
              delay={0.06}
              className="text-forest mt-6 text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.02]"
            />

            {/* Held back until the headline has finished landing. */}
            <Reveal delay={0.55}>
              <p className="text-forest/65 mt-7 max-w-xl text-base leading-relaxed sm:text-[1.0625rem]">
                {t.idea.lead}
              </p>
            </Reveal>

            <Reveal delay={0.68}>
              <p className="text-forest/65 mt-5 max-w-xl text-base leading-relaxed sm:text-[1.0625rem]">
                {t.idea.lead2}
              </p>
            </Reveal>
          </div>

          {/* Three-step method */}
          <RevealGroup className="flex flex-col">
            {t.idea.pillars.map((pillar) => (
              <article
                key={pillar.n}
                className="group border-forest/12 hover:border-teal/40 border-t py-8 transition-colors duration-500 last:border-b"
              >
                <div className="flex gap-6 sm:gap-8">
                  <span className="font-label text-gold-dk group-hover:text-teal text-sm font-semibold tracking-[0.2em] transition-colors duration-500">
                    {pillar.n}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-forest text-xl font-bold tracking-[-0.02em] sm:text-2xl">
                      {pillar.title}
                    </h3>
                    <p className="text-forest/60 mt-3 text-[0.9375rem] leading-relaxed sm:text-base">
                      {pillar.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </RevealGroup>
        </div>
      </div>

      {/* ── Shift stage — headline parts, one card becomes two ─────── */}
      <div ref={trackRef} className="relative mt-24 lg:mt-0 lg:h-[300vh]">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:overflow-hidden">
          <div ref={stageRef} className="container-eiden relative w-full">
            {/* Headline — one line that splits and clears the frame */}
            <div className="relative z-10 mb-12 flex flex-wrap justify-center gap-x-[0.3em] text-center lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-1/2 lg:mb-0 lg:-translate-y-1/2 lg:flex-nowrap lg:whitespace-nowrap">
              <span
                style={{
                  transform: "translateX(calc(var(--head-x, 0) * -58vw))",
                  opacity: "var(--head-o, 1)",
                }}
                className="font-display text-forest text-[clamp(1.75rem,5.4vw,4rem)] leading-[1.05] font-extrabold tracking-[-0.04em]"
              >
                {t.idea.shiftLead}
              </span>
              <span
                style={{
                  transform: "translateX(calc(var(--head-x, 0) * 58vw))",
                  opacity: "var(--head-o, 1)",
                }}
                className="font-display text-forest/35 text-[clamp(1.75rem,5.4vw,4rem)] leading-[1.05] font-extrabold tracking-[-0.04em]"
              >
                {t.idea.shiftTail}
              </span>
            </div>

            {/* Cards */}
            <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-2">
              {cards.map((card) => (
                <article
                  key={card.label}
                  style={card.style}
                  className={cn(
                    "flex min-h-[24rem] flex-col justify-between rounded-[1.75rem] p-8 sm:p-10 lg:h-[62svh]",
                    card.tone === "light"
                      ? "bg-cream text-forest"
                      : "bg-teal text-canvas",
                  )}
                >
                  <div>
                    <p
                      className={cn(
                        "eyebrow",
                        card.tone === "light" ? "text-forest/40" : "text-canvas/50",
                      )}
                    >
                      {card.label}
                    </p>
                    <p className="mt-6 max-w-md text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.15] font-medium tracking-[-0.02em]">
                      {card.body}
                    </p>
                  </div>

                  <ul className="mt-10 flex flex-col gap-3.5">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className={cn(
                            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                            card.tone === "light"
                              ? "bg-forest/10 text-forest"
                              : "bg-canvas/20 text-canvas",
                          )}
                        >
                          <Check className="size-3" strokeWidth={2.6} />
                        </span>
                        <span
                          className={cn(
                            "text-[0.9375rem] leading-snug",
                            card.tone === "light"
                              ? "text-forest/70"
                              : "text-canvas/85",
                          )}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
