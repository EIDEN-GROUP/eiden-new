"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocalized } from "@/components/project/shared";
import { Reveal } from "@/components/ui/reveal";
import { SwipeDeck } from "@/components/ui/swipe-deck";
import { useMediaQuery } from "@/lib/hooks";
import type { Shot } from "@/lib/data/projects/types";

/**
 * Selected work — held while it is read across.
 *
 * From `lg` the section pins to the top of the frame and the page's own scroll
 * drives the row sideways: the visitor keeps scrolling the way they already
 * were, the cards travel, and when the last one lands the page carries on
 * down. The trick is that the block is made as tall as the row is wide, so the
 * vertical distance spent equals the horizontal distance travelled — nothing
 * is stolen from the scroll, only turned ninety degrees.
 *
 * `--x` is written by one rAF-throttled listener and applied as a transform,
 * so the row never causes a layout and React never re-renders mid-scroll.
 *
 * Below `lg` none of this runs. Pinning the frame on a touch screen fights the
 * gesture the reader already has, so the row falls back to the swipe track the
 * rest of the site uses — same cards, same order, thumb instead of wheel. It
 * is also the reduced-motion path at every width, because a held page is
 * exactly what that setting is asking us not to do.
 */
export function CaseWork({ work }: { work: Shot[] }) {
  const say = useLocalized();
  const wide = useMediaQuery("(min-width: 64rem)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const pinned = wide && !reduced;

  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  /* How far the row has to travel, which is also how tall the block is. */
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const frame = frameRef.current;
    const track = trackRef.current;
    if (!frame || !track || !pinned) {
      setTravel(0);
      return;
    }

    let raf = 0;

    const measure = () => {
      /* The row is wider than the frame by exactly this much; that overflow is
         the distance to travel, and the height the block needs to spend. */
      const over = Math.max(0, track.scrollWidth - track.clientWidth);
      setTravel(over);
      return over;
    };

    const paint = () => {
      raf = 0;
      const over = Math.max(0, track.scrollWidth - track.clientWidth);
      const box = frame.getBoundingClientRect();
      const span = frame.offsetHeight - window.innerHeight;
      const progress = span > 0 ? Math.min(Math.max(-box.top / span, 0), 1) : 0;
      track.style.setProperty("--x", `${(progress * over).toFixed(2)}px`);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    measure();
    paint();

    const observer = new ResizeObserver(() => {
      measure();
      paint();
    });
    observer.observe(track);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      track.style.removeProperty("--x");
    };
  }, [pinned, work.length]);

  const label = say({ fr: "Travaux choisis", en: "Selected work" });

  /* ── Touch, and anyone asking for less motion ──────────────────── */
  if (!pinned) {
    return (
      <section className="py-20 sm:py-28">
        <div className="container-eiden">
          <Reveal direction="none" duration={0.5}>
            <p className="eyebrow text-ink/35">{label}</p>
          </Reveal>

          <div className="mx-auto mt-10 max-w-6xl">
            <SwipeDeck className="grid gap-4 lg:grid-cols-2">
              {work.map((shot) => (
                <Card key={shot.image} shot={shot} say={say} />
              ))}
            </SwipeDeck>
          </div>
        </div>
      </section>
    );
  }

  /* ── Held, and read across ─────────────────────────────────────── */

  /* Only worth holding the frame if the row actually overflows it. A short
     row on a wide screen would otherwise pin for a whole viewport with
     nothing moving, which reads as the page having frozen. `travel` is 0 on
     the first paint and measured immediately after, so the fallback below is
     also what renders for that one frame — same cards either way, so there is
     nothing to see flip. */
  const held = travel > 0;

  return (
    <section>
      <div
        ref={frameRef}
        /* One viewport to be held for, plus the row's own overflow. */
        style={held ? { height: `calc(100svh + ${travel}px)` } : undefined}
        className="relative"
      >
        <div
          className={
            held
              ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden"
              : "flex flex-col justify-center overflow-hidden py-20 sm:py-28"
          }
        >
          <div className="container-eiden">
            <p className="eyebrow text-ink/35">{label}</p>
          </div>

          <div
            ref={trackRef}
            style={{ transform: "translate3d(calc(var(--x, 0px) * -1), 0, 0)" }}
            className="mt-8 flex w-full gap-6 px-[max(1.25rem,calc((100vw-80rem)/2))] will-change-transform"
          >
            {work.map((shot) => (
              <div key={shot.image} className="w-[min(38vw,30rem)] shrink-0">
                <Card shot={shot} say={say} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
  shot,
  say,
}: {
  shot: Shot;
  say: (value: Shot["alt"]) => string;
}) {
  return (
    <figure className="flex flex-col">
      <div className="bg-ink/5 relative aspect-4/3 w-full overflow-hidden rounded-[1.6rem]">
        <Image
          src={shot.image}
          alt={say(shot.alt)}
          fill
          sizes="(max-width: 64rem) 80vw, 30rem"
          className="object-cover"
        />
      </div>
      <figcaption className="eyebrow text-ink/35 mt-4">
        {say(shot.label)}
      </figcaption>
    </figure>
  );
}
