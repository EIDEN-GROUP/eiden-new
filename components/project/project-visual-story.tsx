"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useLocalized } from "@/components/project/shared";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import type { ProjectStory } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

/**
 * The look of the thing, dealt one card at a time.
 *
 * The track underneath is a real scroller   one slot per slide, snapped to
 * its centre   so the swipe, its momentum and its keyboard belong to the
 * browser. All this reads back out of it is `--p`, the scroll position
 * measured in slots, which the CSS turns into the fall-off either side of
 * the card in hand: the further a slide is from the centre, the smaller and
 * fainter it stands, and the further back it sits.
 *
 * The controls drive the same scroller rather than a state of their own, so
 * the dots cannot fall out of step with what is on screen.
 */
export function ProjectVisualStory({
  label,
  visual,
}: {
  label: string;
  visual: ProjectStory["visual"];
}) {
  const say = useLocalized();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const total = visual.slides.length;

  /** The distance from one slide to the next, read off the layout. */
  const pitch = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return 0;
    const first = track.children[0] as HTMLElement;
    const second = track.children[1] as HTMLElement;
    return second.offsetLeft - first.offsetLeft;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const read = () => {
      frame = 0;
      const step = pitch();
      const p = step ? track.scrollLeft / step : 0;
      track.style.setProperty("--p", `${p}`);
      setIndex(Math.max(0, Math.min(total - 1, Math.round(p))));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pitch, total]);

  const go = (next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.max(0, Math.min(total - 1, next));
    track.scrollTo({ left: target * pitch(), behavior: "smooth" });
  };

  return (
    <section className="py-20 sm:py-28">
      <div className="container-eiden">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-ink/35">{label}</p>
        </Reveal>

        <RevealWords
          as="h2"
          text={say(visual.title)}
          delay={0.06}
          className="font-display text-ink mt-6 block max-w-3xl text-[clamp(1.75rem,4vw,3rem)] leading-[1.06] font-bold tracking-[-0.03em]"
        />

        <Reveal delay={0.14}>
          <p className="text-ink/60 mt-5 max-w-xl text-[0.9375rem] leading-relaxed sm:text-base">
            {say(visual.text)}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mt-12 sm:mt-16">
        <div
          ref={trackRef}
          className="story-track"
          style={{ "--n": `${total}` } as CSSProperties}
        >
          {visual.slides.map((slide, i) => (
            <div
              key={slide.image}
              className="story-slide"
              style={{ "--i": `${i}` } as CSSProperties}
            >
              <figure className="story-card">
                <div className="bg-ink/5 relative aspect-4/3 w-full overflow-hidden rounded-xl">
                  <Image
                    src={slide.image}
                    alt={say(slide.alt)}
                    fill
                    sizes="(max-width: 64rem) 78vw, 44rem"
                    className="object-cover"
                  />
                </div>
                {slide.caption ? (
                  <figcaption className="eyebrow text-ink/35 mt-4">
                    {say(slide.caption)}
                  </figcaption>
                ) : null}
              </figure>
            </div>
          ))}
        </div>
      </Reveal>

      {/* The dots say where in the run this is; the arrows move it. Both
          drive the scroller, so neither can disagree with the picture. */}
      <div className="container-eiden mt-10 flex items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          {visual.slides.map((slide, i) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => go(i)}
              aria-label={`${i + 1} / ${total}`}
              aria-current={i === index}
              className={cn(
                "h-1.5 rounded-full transition-[width,background-color] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
                i === index ? "bg-ink w-8" : "bg-ink/20 hover:bg-ink/40 w-1.5",
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Arrow
            onClick={() => go(index - 1)}
            disabled={index === 0}
            label="Previous"
          >
            <ArrowLeft className="size-4" strokeWidth={1.8} aria-hidden />
          </Arrow>
          <Arrow
            onClick={() => go(index + 1)}
            disabled={index === total - 1}
            label="Next"
          >
            <ArrowRight className="size-4" strokeWidth={1.8} aria-hidden />
          </Arrow>
        </div>
      </div>
    </section>
  );
}

function Arrow({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="border-ink/20 text-ink hover:bg-ink hover:text-canvas flex size-10 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)] disabled:pointer-events-none disabled:opacity-25 motion-reduce:transition-none"
    >
      {children}
    </button>
  );
}
