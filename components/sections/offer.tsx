"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

/** Accent colour rotated across the four expertise rows. */
const accents = ["text-[#8a6412]", "text-teal", "text-[#8a6412]", "text-teal"];

export function Offer() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  return (
    <section
      id="expertises"
      className="grain bg-beige relative overflow-hidden py-24 sm:py-32"
    >
      {/* Geometric wash   architectural, never decorative noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
      >
        <div className="border-teal/40 absolute top-1/4 -right-24 size-[28rem] rounded-full border" />
        <div className="border-teal/30 absolute top-1/3 -right-10 size-[20rem] rotate-45 border" />
        <div className="absolute bottom-10 -left-32 size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(14,122,115,0.35),transparent_70%)]" />
      </div>

      <div className="container-eiden relative z-[2]">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-teal">{t.offer.eyebrow}</p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.05}>
            <h2 className="text-ink max-w-2xl text-[clamp(1.75rem,4vw,3rem)]">
              {t.offer.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12} direction="left">
            <p className="text-ink/50 max-w-sm text-[0.9375rem] leading-relaxed">
              {t.offer.text}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-14">
          {t.offer.items.map((item, index) => {
            const isActive = active === index;
            return (
              <article
                key={item.n}
                onMouseEnter={() => setActive(index)}
                onFocusCapture={() => setActive(index)}
                className={cn(
                  "group border-ink/12 relative border-t transition-colors duration-500 ease-[var(--ease-brand)]",
                  index === t.offer.items.length - 1 && "border-b",
                  isActive ? "bg-ink/[0.055]" : "bg-transparent",
                )}
              >
                <div className="grid gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[auto_minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start lg:gap-10 lg:py-10">
                  <span
                    className={cn(
                      "font-label text-[0.9375rem] font-bold tracking-[0.2em] transition-colors duration-500",
                      isActive ? accents[index % accents.length] : "text-ink/35",
                    )}
                  >
                    {item.n}.
                  </span>

                  <h3 className="font-display text-ink text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[0.98] font-extrabold tracking-[-0.04em] uppercase">
                    {item.title}
                  </h3>

                  <div className="lg:pt-1.5">
                    <p className="text-ink/70 text-[0.9375rem] leading-relaxed">
                      {item.text}
                    </p>
                    <p className="text-ink/45 mt-4 text-[0.9375rem] leading-relaxed">
                      {item.detail}
                    </p>
                    <Link
                      href={item.href}
                      className={cn(
                        "mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] underline-offset-4 transition-colors duration-300 hover:underline",
                        accents[index % accents.length],
                      )}
                    >
                      {item.link}
                      <ArrowUpRight
                        className="size-3.5 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
