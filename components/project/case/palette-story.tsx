"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useLocalized } from "@/components/project/shared";
import { useMediaQuery } from "@/lib/hooks";
import type { ToneSkin } from "./tone";
import type { PaletteStory } from "@/lib/data/projects/types";
import { cn } from "@/lib/utils";

const POINTER = 0;

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
    const c = (parseInt(full.slice(i, i + 2), 16) / 255) * (1 - dim);
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/** Contrast of white against a colour dimmed by `dim`. */
const againstWhite = (hex: string, dim = 0) => 1.05 / (luminance(hex, dim) + 0.05);


const SCRIM_CAP = 0.38;

function scrimFor(hex: string) {
  for (let dim = 0; dim <= SCRIM_CAP + 0.001; dim += 0.02) {
    if (againstWhite(hex, dim) >= 4.5) return dim;
  }
  return null;
}
const OUTER = 50;
const INNER = 29;


function slicePath(index: number, total: number) {
  const step = (Math.PI * 2) / total;
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

export function CasePaletteStory({
  story,
  skin,
}: {
  story: PaletteStory;
  skin: ToneSkin;
}) {
  const say = useLocalized();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const frameRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(0);
  const { colors, states } = story;
  const beats = states.length;
  const angles = useMemo(() => {
    const step = 360 / colors.length;
    const turns: number[] = [];
    let previous = 0;
    for (const [index, state] of states.entries()) {
      const centre = state.colorIndex * step + step / 2 - 90;
      let angle = POINTER - centre;
      if (index > 0) {
        while (angle - previous > 180) angle -= 360;
        while (angle - previous < -180) angle += 360;
      }
      previous = angle;
      turns.push(angle);
    }
    return turns;
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
  const scrim = scrimFor(colour.hex);
  const onDark = scrim !== null;

  /* ── Read down, for anyone asking for less motion ──────────────── */
  if (reduced || beats < 2) {
    return (
      <div className="pb-20 sm:pb-24 lg:pb-28">
        <div className={cn("container-eiden border-t pt-14 sm:pt-16", skin.rule)}>
          <p className={cn("eyebrow", skin.label)}>{say(story.title)}</p>
          <p className={cn("editorial mt-6 max-w-2xl text-[clamp(1.25rem,2.6vw,1.875rem)] leading-snug", skin.title)}>
            {say(story.lead)}
          </p>

          <ul className="mt-12 flex flex-col">
            {states.map((state, index) => {
              const swatch = colors[state.colorIndex] ?? colors[0];
              return (
                <li key={say(state.title)} className={cn("flex gap-6 border-t py-6", skin.rule)} >
                  <span aria-hidden style={{ backgroundColor: swatch.hex }} className={cn("mt-1 size-10 shrink-0 rounded-full ring-1", skin.ring)} />
                  <div className="min-w-0">
                    <p className={cn("eyebrow tabular-nums", skin.caption)}>
                      {String(index + 1).padStart(2, "0")} · {swatch.name}
                    </p>
                    <h3 className={cn("font-display mt-2 text-xl font-bold tracking-[-0.02em]", skin.title)}>
                      {say(state.title)}
                    </h3>
                    <p className={cn("mt-2 max-w-xl text-[0.9375rem] leading-relaxed", skin.body)}>
                      {say(state.text)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  /* ── Held, and turned ──────────────────────────────────────────── */
  return (
    <section data-nav-tone={onDark ? "dark" : "light"}>
      <div
        ref={frameRef}
        style={
          {
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
                  <circle cx="50" cy="50" r={INNER} className="palette-well" />
                </svg>

                <span aria-hidden className="palette-pointer" />
              </div>
            </div>

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
