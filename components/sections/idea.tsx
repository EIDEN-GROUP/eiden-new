"use client";

import Image from "next/image";
import { Ban, CircleSlash2, Pause, Play, Pyramid, Sparkles, Sprout } from "lucide-react";
import { useEffect, useRef, type CSSProperties } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { FixedBackdrop } from "@/components/ui/fixed-backdrop";
import { SwipeDeck } from "@/components/ui/swipe-deck";
import { ideaTexture } from "@/lib/data/site";
import { useMediaQuery } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const ramp = (value: number, from: number, to: number) =>
  clamp01((value - from) / (to - from));

const lanes = [
  {
    lane: "idea-card-first",
    enter: "--first-in",
    Glyph: Ban,
    image: "/work/card-1.jpeg",
  },
  {
    lane: "idea-card-second",
    enter: "--second-in",
    Glyph: Pyramid,
    image: "/work/card-2.jpeg",
  },
];

export function Idea() {
  const { t } = useLanguage();
  const wide = useMediaQuery("(min-width: 1024px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const animate = wide && !reduced;

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    if (reduced) {
      track.removeAttribute("style");
      stage.removeAttribute("style");
      track.setAttribute("data-nav-tone", "light");
      return;
    }

    let frame = 0;
    let span = track.offsetHeight - window.innerHeight;
    let docTop = track.getBoundingClientRect().top + window.scrollY;

    const update = () => {
      frame = 0;
      const top = docTop - window.scrollY;
      const p = animate
        ? span > 0
          ? clamp01(-top / span)
          : 0
        : clamp01((window.innerHeight - top) / (window.innerHeight * 0.9));

      const dim = animate ? ramp(p, 0.34, 0.6) : ramp(p, 0.05, 0.45);
      track.style.setProperty("--dim", `${dim}`);
      const tone = "light";
      if (track.dataset.navTone !== tone) {
        track.setAttribute("data-nav-tone", tone);
      }

      if (!animate) {
        stage.style.setProperty("--deck-in", `${ramp(p, 0.02, 0.26)}`);
        stage.style.setProperty("--first-in", `${ramp(p, 0.1, 0.4)}`);
        stage.style.setProperty("--second-in", `${ramp(p, 0.28, 0.58)}`);
        return;
      }

      stage.style.setProperty("--head-x", `${ramp(p, 0, 0.42)}`);
      stage.style.setProperty("--head-o", `${1 - ramp(p, 0.3, 0.46)}`);
      stage.style.setProperty("--deck-in", `${ramp(p, 0.1, 0.32)}`);
      stage.style.setProperty("--first-in", `${ramp(p, 0.16, 0.42)}`);
      stage.style.setProperty("--second-in", `${ramp(p, 0.5, 0.78)}`);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      span = track.offsetHeight - window.innerHeight;
      docTop = track.getBoundingClientRect().top + window.scrollY;
      onScroll();
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(document.body);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [animate, reduced]);

  const cards = t.idea.cards.map((card, index) => ({
    ...card,
    ...lanes[index],
  }));

  return (
    <section id="idee" className="bg-cream relative">
      <div ref={trackRef} data-nav-tone="light" className="relative pt-24 pb-24 lg:h-[300vh] lg:py-0">
        <div aria-hidden className="idea-wash">
          <FixedBackdrop src={ideaTexture} imageClassName="scale-110 blur-md" />
        </div>
        <span aria-hidden className="idea-seam" />

        <div className="relative z-10 lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:overflow-hidden">
          <div ref={stageRef} className="container-eiden relative w-full">
            <h2 className="relative z-10 mb-12 flex flex-wrap justify-center gap-x-[0.3em] text-center lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-1/2 lg:mb-0 lg:-translate-y-1/2 lg:flex-nowrap lg:whitespace-nowrap">
              <span style={{ transform: "translateX(calc(var(--head-x, 0) * -58vw))", opacity: "var(--head-o, 1)", }} className="font-display idea-lit text-[clamp(1.75rem,5.4vw,4rem)] leading-[1.05] font-extrabold tracking-[-0.04em]">
                {t.idea.shiftLead}
              </span>
              <span style={{ transform: "translateX(calc(var(--head-x, 0) * 58vw))", opacity: "var(--head-o, 1)", }} className="font-display idea-lit text-[clamp(1.75rem,5.4vw,4rem)] leading-[1.05] font-extrabold tracking-[-0.04em] opacity-35">
                {t.idea.shiftTail}
              </span>
            </h2>

            <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-10 lg:max-w-none lg:grid-cols-[minmax(14rem,0.72fr)_minmax(0,1.62fr)] lg:gap-12 xl:gap-16">
              <h3 className="hidden lg:block idea-deck-head font-display idea-lit text-[clamp(1.5rem,3.6vw,2.6rem)] leading-[1.06] font-extrabold tracking-[-0.04em] text-balance">
                {t.idea.deckTitle}
              </h3>

              <SwipeDeck className="grid auto-rows-fr gap-4 sm:gap-5 lg:grid-cols-2">
                {cards.map(({ Glyph, ...card }) => (
                  <article
                    key={card.label}
                    style={
                      { "--card-in": `var(${card.enter}, 1)` } as CSSProperties
                    }
                    className={cn(
                      "idea-card idea-shot relative flex flex-col justify-between",
                      "min-h-[24rem] overflow-hidden rounded-[1.5rem] p-5",
                      "sm:min-h-[26rem] sm:p-6 lg:h-[clamp(23rem,62svh,33rem)] xl:p-7",
                      card.lane,
                    )}
                  >
                    <Image src={card.image} alt="" fill sizes="(min-width: 1024px) 32vw, (min-width: 640px) 60vw, 88vw" className="idea-shot-img object-cover" />
                    <span aria-hidden className="idea-shot-veil" />

                    <div className="relative z-1">
                      <p className="idea-chip flex items-center">
                        <Glyph className="size-4 shrink-0" strokeWidth={3} aria-hidden />
                        {card.label}
                      </p>

                      <h4 className="idea-shot-title text-canvas capitalize mt-4 text-[26px] lg:text-[36px] leading-[1.16] font-semibold tracking-[-0.03em] text-balance">
                        {card.body}
                      </h4>
                    </div>

                    <ol className="border-canvas/15 relative z-1 mt-6 grid border-t">
                      {card.points.map((point, index) => (
                        <li key={point} className={cn( "border-canvas/15 grid grid-cols-[1.5rem_1fr] gap-3 py-2", index > 0 && "border-t", )} >
                          <span aria-hidden className="numeral text-cream/55 pt-[0.15em] text-[0.6875rem] font-bold tracking-[0.08em]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-canvas/80 text-[0.8125rem] leading-[1.4]">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </article>
                ))}
              </SwipeDeck>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
