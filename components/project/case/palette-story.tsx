"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useLocalized } from "@/components/project/shared";
import { useMediaQuery } from "@/lib/hooks";
import type { PaletteStory } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

/**
 * Where on the rim the live colour is presented.
 *
 * 0deg is due right in the ring's own coordinates, which is the outermost
 * point of the arc still on screen once the ring is hung off the left edge —
 * so the live colour is turned to the one place the reader is looking.
 */
const POINTER = 0;

/**
 * Relative luminance, so the writing can be told which way to go.
 *
 * sRGB is not linear, so the channels are expanded before they are weighted;
 * skipping that is what makes naive contrast checks call mid greens dark.
 */
function luminance(hex: string, dim = 0) {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;

  const channels = [0, 2, 4].map((i) => {
    /* `dim` is a black scrim laid over the colour, which composites in sRGB
       — so it is applied before the transfer function, not after. */
    const c = (parseInt(full.slice(i, i + 2), 16) / 255) * (1 - dim);
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/** Contrast of white against a colour dimmed by `dim`. */
const againstWhite = (hex: string, dim = 0) => 1.05 / (luminance(hex, dim) + 0.05);

/**
 * How much the ground has to be deepened for white to be readable on it.
 *
 * White type on a mid-luminance colour — a teal, a gold — cannot reach AA on
 * its own: that is arithmetic, not taste. So the ground is taken down until it
 * can, and the swatch beside the writing still reports the true hex. The cap
 * is where deepening would stop reading as the brand's colour at all; past it
 * the writing goes dark instead, which is why the creams and the yellow keep
 * black type.
 */
const SCRIM_CAP = 0.38;

function scrimFor(hex: string) {
  for (let dim = 0; dim <= SCRIM_CAP + 0.001; dim += 0.02) {
    if (againstWhite(hex, dim) >= 4.5) return dim;
  }
  return null;
}

/** Outer radius of the ring, in the 100×100 user space. */
const OUTER = 50;
/** Inner radius. The hole is what makes it an object rather than a pie chart. */
const INNER = 29;

/**
 * One segment of the ring, as a closed path.
 *
 * Drawn as an annulus rather than a wedge — out along the outer arc, in across
 * the end, back along the inner arc — so the hole is genuinely cut out of every
 * slice instead of being a disc parked on top of them. That matters once a
 * slice is lifted: a covering disc would clip the lifted edge.
 */
function slicePath(index: number, total: number) {
  const step = (Math.PI * 2) / total;
  /* Start at twelve o'clock so the first colour is the one at the top. */
  const from = index * step - Math.PI / 2;
  const to = from + step;
  const wide = step > Math.PI ? 1 : 0;

  const at = (radius: number, angle: number) =>
    `${(50 + radius * Math.cos(angle)).toFixed(3)} ${(50 + radius * Math.sin(angle)).toFixed(3)}`;

  return [
    `M${at(OUTER, from)}`,
    `A${OUTER} ${OUTER} 0 ${wide} 1 ${at(OUTER, to)}`,
    `L${at(INNER, to)}`,
    `A${INNER} ${INNER} 0 ${wide} 0 ${at(INNER, from)}`,
    "Z",
  ].join(" ");
}

/**
 * The visual language, turned rather than listed.
 *
 * The section is held at the top of the frame and the page's own scroll drives
 * it: the disk turns, the ground crossfades from one brand colour to the next,
 * and the writing beside it says what each colour is actually for. A palette
 * is a set of decisions, and a row of circles with hex codes under them says
 * none of them out loud.
 *
 * Everything continuous — the rotation and the ground — is a CSS custom
 * property written by one rAF-throttled listener, so nothing here re-renders
 * per frame. The only React state is which beat is live, which changes four or
 * five times in the whole section; the contrast colour for the writing is
 * derived there, once, rather than every frame.
 *
 * The grounds are stacked as one layer per beat and crossfaded by their
 * distance from the live position, which is what keeps the change gradual —
 * a single element whose `background` is swapped would cut, and transitioning
 * `background-color` between five values cannot hold a scrub.
 *
 * Under reduced motion the whole apparatus is dropped for the same content as
 * a plain read-down list: a section that pins the page is precisely what that
 * setting is asking us not to do.
 */
export function CasePaletteStory({ story }: { story: PaletteStory }) {
  const say = useLocalized();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const frameRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(0);

  const { colors, states } = story;
  const beats = states.length;

  /* The rotation that brings each beat's colour to the pointer. Precomputed:
     the loop below only ever interpolates between two of these. */
  const angles = useMemo(() => {
    const step = 360 / colors.length;
    /* Unwrapped as we go: each beat takes the shortest way round from the one
       before it. Without this a story that returns to its first colour makes
       the disk spin most of a turn backwards to get there, which reads as the
       thing snapping rather than being turned. */
    let previous = 0;
    return states.map((state, index) => {
      const centre = state.colorIndex * step + step / 2 - 90;
      let angle = POINTER - centre;
      if (index > 0) {
        while (angle - previous > 180) angle -= 360;
        while (angle - previous < -180) angle += 360;
      }
      previous = angle;
      return angle;
    });
  }, [colors.length, states]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || reduced || beats < 2) return;

    let raf = 0;
    let painted = -1;

    const paint = () => {
      raf = 0;
      const box = frame.getBoundingClientRect();
      const span = frame.offsetHeight - window.innerHeight;
      const p = span > 0 ? Math.min(Math.max(-box.top / span, 0), 1) : 0;

      /* Position along the run of beats, as a real number: the whole numbers
         are the beats, everything between them is the travel. */
      const at = p * (beats - 1);
      const from = Math.min(Math.floor(at), beats - 2);
      const blend = at - from;
      const turn = angles[from] + (angles[from + 1] - angles[from]) * blend;

      frame.style.setProperty("--p", p.toFixed(4));
      frame.style.setProperty("--turn", `${turn.toFixed(2)}deg`);

      const next = Math.round(at);
      if (next !== painted) {
        painted = next;
        setLive(next);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [angles, beats, reduced]);

  const beat = states[Math.min(live, beats - 1)];
  const colour = colors[beat.colorIndex] ?? colors[0];

  /* Dark ground, or a ground black cannot carry.

     White wins outright below L ≈ 0.183, where it still clears AA on its own.
     Above that there is a band — the saturated teals, mostly — where black
     technically scores higher but only just, and reads as harsh on a colour
     that is already doing work. So black is kept only where it is comfortably
     ahead (7:1, AAA); anything less and the writing goes white. */
  /* White wherever white can be made to work. `scrimFor` returns how far the
     ground has to come down for that — 0 on the colours that are already dark
     enough, null on the creams and the yellow, where nothing short of ruining
     the colour would do it and black is the honest answer. */
  const scrim = scrimFor(colour.hex);
  const onDark = scrim !== null;

  /* ── Read down, for anyone asking for less motion ──────────────── */
  if (reduced || beats < 2) {
    return (
      <section className="bg-ink text-canvas py-20 sm:py-28" data-nav-tone="dark">
        <div className="container-eiden">
          <p className="eyebrow text-canvas/35">{say(story.title)}</p>
          <p className="editorial text-canvas mt-6 max-w-2xl text-[clamp(1.25rem,2.6vw,1.875rem)] leading-snug">
            {say(story.lead)}
          </p>

          <ul className="mt-12 flex flex-col">
            {states.map((state, index) => {
              const swatch = colors[state.colorIndex] ?? colors[0];
              return (
                <li
                  key={say(state.title)}
                  className="border-canvas/12 flex gap-6 border-t py-6"
                >
                  <span
                    aria-hidden
                    style={{ backgroundColor: swatch.hex }}
                    className="ring-canvas/15 mt-1 size-10 shrink-0 rounded-full ring-1"
                  />
                  <div className="min-w-0">
                    <p className="eyebrow text-canvas/40 tabular-nums">
                      {String(index + 1).padStart(2, "0")} · {swatch.name}
                    </p>
                    <h3 className="font-display text-canvas mt-2 text-xl font-bold tracking-[-0.02em]">
                      {say(state.title)}
                    </h3>
                    <p className="text-canvas/60 mt-2 max-w-xl text-[0.9375rem] leading-relaxed">
                      {say(state.text)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }

  /* ── Held, and turned ──────────────────────────────────────────── */
  return (
    <section data-nav-tone={onDark ? "dark" : "light"}>
      <div
        ref={frameRef}
        style={
          {
            /* One viewport to be held for, plus a handover per beat. How
               long a handover runs is a token: a phone spends less of itself
               on the same story, because five screens of hold on a small
               device stops reading as an effect and starts reading as a
               stuck page. */
            "--beats": `${beats - 1}`,
            "--n": `${beats}`,
            "--on": onDark ? "var(--color-canvas)" : "var(--color-ink)",
          } as CSSProperties
        }
        className="palette-frame relative"
      >
        <div className="sticky top-0 h-svh overflow-hidden">
          {/* The ground: one layer per beat, crossfaded by distance. */}
          {states.map((state, index) => (
            <span
              key={`ground-${index}`}
              aria-hidden
              style={
                {
                  backgroundColor: (colors[state.colorIndex] ?? colors[0]).hex,
                  "--k": `${index}`,
                } as CSSProperties
              }
              className="palette-ground absolute inset-0"
            />
          ))}

          {/* Title, disk, then the beat. That is the reading order on a
              phone and it is what the grid rebuilds sideways at `lg`: the
              disk moved to its own column, spanning both rows, with the
              writing stacked beside it. */}
          {/* Laid over the grounds so white type can hold on the mid tones.
              Transitioned on the same curve as the colour it deepens, so the
              two arrive together rather than one chasing the other. */}
          <span
            aria-hidden
            style={{ opacity: scrim ?? 0 }}
            className="palette-scrim absolute inset-0 bg-black"
          />

          <div className="palette-copy container-eiden relative flex h-full flex-col justify-end gap-8 pb-16 lg:justify-center lg:pb-0">
            {/* ── The claim ───────────────────────────────────────── */}
            <div className="min-w-0">
              <p className="eyebrow palette-on opacity-45">{say(story.title)}</p>
              <p className="editorial palette-on mt-4 max-w-md text-[clamp(1rem,1.7vw,1.25rem)] leading-snug opacity-70 lg:mt-5">
                {say(story.lead)}
              </p>
            </div>

            {/* ── The ring ────────────────────────────────────────── */}
            <div className="palette-shell">
              <div className="palette-disk relative aspect-square size-full">
                <svg
                  viewBox="0 0 100 100"
                  className="palette-wheel size-full"
                  aria-hidden
                >
                  {colors.map((entry, index) => (
                    <path
                      key={entry.hex}
                      d={slicePath(index, colors.length)}
                      fill={entry.hex}
                      style={{ "--i": `${index}` } as CSSProperties}
                      className={cn(
                        "palette-slice",
                        index === beat.colorIndex && "is-live",
                      )}
                    />
                  ))}
                  {/* The hole, filled rather than cut, so the ring keeps an
                      edge against whichever colour is behind it. */}
                  <circle cx="50" cy="50" r={INNER} className="palette-well" />
                </svg>

                {/* The mark the live colour is turned to meet. */}
                <span aria-hidden className="palette-pointer" />
              </div>
            </div>

            {/* ── The beat. Keyed on its index, so it re-enters on change. */}
            <div className="min-w-0">
              <div key={live} className="palette-beat">
                <p className="eyebrow palette-on tabular-nums opacity-45">
                  {String(live + 1).padStart(2, "0")} / {String(beats).padStart(2, "0")}
                </p>

                <h3 className="font-display palette-on mt-4 max-w-lg text-[clamp(1.75rem,4vw,3rem)] leading-[1.04] font-extrabold tracking-[-0.04em]">
                  {say(beat.title)}
                </h3>

                <p className="palette-on mt-5 max-w-md text-[0.9375rem] leading-relaxed sm:text-base">
                  {say(beat.text)}
                </p>

                <div className="palette-rule mt-8 flex items-baseline gap-5 border-t pt-4 lg:mt-10">
                  <span className="font-display palette-on text-[1.0625rem] font-bold tracking-[-0.02em]">
                    {colour.name}
                  </span>
                  <span className="font-label palette-on text-[0.75rem] tracking-[0.14em] uppercase opacity-50 tabular-nums">
                    {colour.hex}
                  </span>
                  <span className="eyebrow palette-on ml-auto hidden opacity-40 sm:block">
                    {say(colour.role)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
