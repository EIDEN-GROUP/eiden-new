"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

export function Services() {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="services" className="bg-canvas py-24 sm:py-32">
      <div className="container-eiden">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-forest/45">{t.services.eyebrow}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-forest mt-6 max-w-4xl text-[clamp(2rem,5vw,3.5rem)]">
            {t.services.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1} direction="none">
          <p className="eyebrow text-forest/30 mt-6 hidden lg:block">
            {t.services.hint}
          </p>
        </Reveal>

        {/* ── Desktop: a dark detail bar wipes over the title row ── */}
        <div
          className="mt-12 hidden lg:block"
          onMouseLeave={() => setHovered(null)}
        >
          {t.services.items.map((item, index) => {
            const active = hovered === index;
            return (
              <div
                key={item.slug}
                onMouseEnter={() => setHovered(index)}
                className={cn(
                  "border-forest/12 relative overflow-hidden border-t",
                  index === t.services.items.length - 1 && "border-b",
                )}
              >
                {/*
                  The row keeps one fixed height across both states. Animating
                  it was what made the old hover feel jumpy — every row below
                  had to be re-laid out mid-transition.
                */}
                <div className="relative h-[clamp(6rem,8.5vw,8rem)]">
                  {/* Resting state — oversized title */}
                  <div
                    aria-hidden={active}
                    className={cn(
                      "absolute inset-0 flex items-center justify-between gap-8",
                      "transition-[opacity,transform] duration-500 ease-[var(--ease-brand)]",
                      active
                        ? "-translate-x-4 opacity-0"
                        : "translate-x-0 opacity-100 delay-100",
                    )}
                  >
                    <h3 className="font-display text-forest text-[clamp(1.75rem,4.6vw,3.75rem)] leading-none font-extrabold tracking-[-0.045em] uppercase">
                      {item.title}
                    </h3>
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.4}
                      className="text-forest/30 size-10 shrink-0 xl:size-12"
                    />
                  </div>

                  {/* Hovered state — dark bar wiping in from the left */}
                  <div
                    className={cn(
                      "bg-ink absolute inset-0 flex items-center justify-between gap-8 px-8 xl:px-12",
                      "transition-[clip-path] duration-600 ease-[var(--ease-brand)]",
                      active
                        ? "[clip-path:inset(0_0%_0_0)]"
                        : "pointer-events-none [clip-path:inset(0_100%_0_0)]",
                    )}
                  >
                    <div
                      className={cn(
                        "flex min-w-0 flex-1 items-center gap-10",
                        "transition-[opacity,transform] duration-500 ease-[var(--ease-brand)]",
                        active
                          ? "translate-x-0 opacity-100 delay-200"
                          : "-translate-x-3 opacity-0",
                      )}
                    >
                      <div className="max-w-md min-w-0 shrink-0">
                        <p className="eyebrow text-gold">{item.kicker}</p>
                        <p className="text-canvas/85 mt-3 text-[0.9375rem] leading-snug">
                          {item.text}
                        </p>
                      </div>

                      {/* Deliverables straight from the EIDEN catalogue */}
                      <div className="min-w-0 flex-1">
                        <p className="eyebrow text-canvas/30 mb-2.5">
                          {t.services.deliverablesLabel}
                        </p>
                        <ul className="flex flex-wrap gap-x-2 gap-y-1.5">
                          {item.deliverables.map((entry) => (
                            <li
                              key={entry}
                              className="border-canvas/15 text-canvas/75 rounded-full border px-3 py-1 text-xs whitespace-nowrap"
                            >
                              {entry}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.4}
                      className={cn(
                        "text-gold size-10 shrink-0 xl:size-12",
                        "transition-transform duration-600 ease-[var(--ease-brand)]",
                        active
                          ? "translate-x-0 rotate-45"
                          : "-translate-x-3 rotate-0",
                      )}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Mobile / tablet: tap to expand ── */}
        <div className="mt-10 lg:hidden">
          {t.services.items.map((item, index) => {
            const open = expanded === index;
            return (
              <div
                key={item.slug}
                className={cn(
                  "border-forest/12 border-t",
                  index === t.services.items.length - 1 && "border-b",
                )}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setExpanded(open ? null : index)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-5 py-6 text-left"
                  >
                    <span className="font-display text-forest text-[clamp(1.25rem,5.6vw,2rem)] leading-none font-extrabold tracking-[-0.04em] uppercase">
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        "border-forest/15 text-forest flex size-9 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-500 ease-[var(--ease-brand)]",
                        open && "border-teal bg-teal text-canvas rotate-45",
                      )}
                    >
                      <ArrowUpRight
                        className="size-4"
                        strokeWidth={1.8}
                        aria-hidden
                      />
                    </span>
                  </button>
                </h3>

                {/* `grid-template-rows: 0fr → 1fr` animates to intrinsic
                    height in pure CSS, so the panel opens with or without JS
                    animation support. */}
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-brand)]",
                    open
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="bg-ink mb-6 rounded-2xl p-5">
                      <p className="eyebrow text-gold">{item.kicker}</p>
                      <p className="text-canvas/85 mt-2.5 text-[0.9375rem] leading-relaxed">
                        {item.text}
                      </p>

                      <p className="eyebrow text-canvas/30 mt-5 mb-2.5">
                        {t.services.deliverablesLabel}
                      </p>
                      <ul className="flex flex-wrap gap-1.5">
                        {item.deliverables.map((entry) => (
                          <li
                            key={entry}
                            className="border-canvas/15 text-canvas/75 rounded-full border px-3 py-1 text-xs"
                          >
                            {entry}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
