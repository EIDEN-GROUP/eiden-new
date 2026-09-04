"use client";

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
  { lane: "idea-card-first", enter: "--first-in", lean: "-1" },
  { lane: "idea-card-second", enter: "--second-in", lean: "1" },
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
    /* `offsetHeight` is a second layout flush for a number that only
       changes on resize, so it is measured there instead of per frame. */
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
        stage.style.setProperty("--first-in", `${ramp(p, 0.1, 0.4)}`);
        stage.style.setProperty("--second-in", `${ramp(p, 0.28, 0.58)}`);
        return;
      }

      stage.style.setProperty("--head-x", `${ramp(p, 0, 0.42)}`);
      stage.style.setProperty("--head-o", `${1 - ramp(p, 0.3, 0.46)}`);
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

    /* Watching the body, not the track: what moves this section is the
       page growing above it   an image landing in the hero shifts where the
       track starts without changing its own size at all. */
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
      <div
        ref={trackRef}
        data-nav-tone="light"
        className="relative pt-24 pb-24 lg:h-[300vh] lg:py-0"
      >
        <div aria-hidden className="idea-wash">
          <FixedBackdrop src={ideaTexture} imageClassName="scale-110 blur-md" />
        </div>

        <div className="relative z-10 lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:overflow-hidden">
          <div ref={stageRef} className="container-eiden relative w-full">
            <h2 className="relative z-10 mb-12 flex flex-wrap justify-center gap-x-[0.3em] text-center lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-1/2 lg:mb-0 lg:-translate-y-1/2 lg:flex-nowrap lg:whitespace-nowrap">
              <span
                style={{
                  transform: "translateX(calc(var(--head-x, 0) * -58vw))",
                  opacity: "var(--head-o, 1)",
                }}
                className="font-display idea-lit text-[clamp(1.75rem,5.4vw,4rem)] leading-[1.05] font-extrabold tracking-[-0.04em]"
              >
                {t.idea.shiftLead}
              </span>
              <span
                style={{
                  transform: "translateX(calc(var(--head-x, 0) * 58vw))",
                  opacity: "var(--head-o, 1)",
                }}
                className="font-display idea-lit text-[clamp(1.75rem,5.4vw,4rem)] leading-[1.05] font-extrabold tracking-[-0.04em] opacity-35"
              >
                {t.idea.shiftTail}
              </span>
            </h2>

            <SwipeDeck className="mx-auto grid max-w-7xl auto-rows-fr gap-5">
              {cards.map((card) => (
                <article
                  key={card.label}
                  style={
                    {
                      "--card-in": `var(${card.enter}, 1)`,
                      "--lean": card.lean,
                    } as CSSProperties
                  }
                  className={cn(
                    "idea-card relative flex flex-col rounded-[1.75rem]",
                    card.lane,
                  )}
                >
                  <div className="idea-face idea-glass text-canvas relative z-1 flex flex-1 flex-col p-8 sm:p-10 lg:px-12 lg:py-7">
                    <div>
                      <p className="eyebrow text-canvas/85">{card.label}</p>
                      <p className="text-canvas mt-6 max-w-full text-[clamp(0.875rem,2.6vw,2rem)] leading-[1.14] font-medium tracking-[-0.02em]">
                        {card.body}
                      </p>
                    </div>

                    <ol className="border-canvas/15 mt-6 grid border-t sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 lg:gap-x-8">
                      {card.points.map((point, index) => (
                        <li
                          key={point}
                          className={cn(
                            "border-canvas/15 grid grid-cols-[2.25rem_1fr] gap-4 py-4 lg:grid-cols-[1.75rem_1fr] lg:gap-3",
                            index > 0 && "border-t",
                            // The first item of each column sits against the
                            // list’s own rule, so it carries none of its own.
                            index === 1 && "sm:border-t-0",
                            index === 2 && "lg:border-t-0",
                          )}
                        >
                          <span
                            aria-hidden
                            className="eyebrow numeral text-cream pt-0.5"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-canvas/80 text-[0.9375rem] leading-snug">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </article>
              ))}
            </SwipeDeck>
          </div>
        </div>
      </div>
    </section>
  );
}
