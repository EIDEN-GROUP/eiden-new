"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import type { Localized } from "@/lib/data/localized";
import { cn } from "@/lib/utils";

/** Reads a `Localized` in the visitor's language. */
export function useSay() {
  const { locale } = useLanguage();
  return (value: Localized) => value[locale];
}

/** The page's measure. Sections are separated by air, not by boxes. */
export function Band({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <section
      data-nav-tone={tone === "dark" ? "dark" : undefined}
      className={cn(
        tone === "dark" && "grain bg-ink text-canvas",
        "py-20 sm:py-28",
        className,
      )}
    >
      <div className="container-eiden">{children}</div>
    </section>
  );
}

/** Numbered rule, the same mark the project pages use. */
export function BandLabel({
  number,
  children,
  tone = "light",
}: {
  number: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <Reveal direction="none" duration={0.5}>
      <div
        className={cn(
          "flex items-baseline gap-4 border-t pt-5",
          tone === "dark" ? "border-canvas/15" : "border-ink/15",
        )}
      >
        <span
          className={cn(
            "eyebrow tabular-nums",
            tone === "dark" ? "text-canvas/35" : "text-ink/35",
          )}
        >
          {number}
        </span>
        <span
          className={cn("eyebrow", tone === "dark" ? "text-canvas" : "text-ink")}
        >
          {children}
        </span>
      </div>
    </Reveal>
  );
}

/**
 * A product shown in its own browser chrome.
 *
 * The frame is drawn whether or not a capture exists: with one it holds the
 * screenshot, without one it holds the live address and stays honest. What
 * it never does is stand in a mocked-up dashboard — a made-up screen would
 * be the one thing on this page that isn't a real product.
 */
export function SystemScreenshot({
  screenshot,
  alt,
  url,
  className,
}: {
  screenshot?: string;
  alt: string;
  url: string;
  className?: string;
}) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div
      className={cn(
        "border-ink/12 bg-cream overflow-hidden rounded-xl border shadow-[0_40px_80px_-60px_rgba(10,15,12,0.55)]",
        className,
      )}
    >
      {/* The chrome: three lights and the address, nothing else. */}
      <div className="border-ink/10 flex items-center gap-2 border-b px-4 py-3">
        <span aria-hidden className="flex gap-1.5">
          <span className="bg-ink/15 size-2 rounded-full" />
          <span className="bg-ink/15 size-2 rounded-full" />
          <span className="bg-ink/15 size-2 rounded-full" />
        </span>
        <span className="font-label text-ink/40 ml-2 truncate text-[0.78rem] tracking-[0.06em]">
          {host}
        </span>
      </div>

      {screenshot ? (
        <div className="relative aspect-16/10 w-full">
          <Image
            src={screenshot}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 92vw, 55vw"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="group bg-cream hover:bg-beige flex aspect-16/10 w-full flex-col items-center justify-center gap-4 transition-colors duration-500"
        >
          <span className="border-ink/20 text-ink group-hover:bg-ink group-hover:text-canvas flex size-14 items-center justify-center rounded-full border transition-colors duration-500 ease-[var(--ease-brand)]">
            <ArrowUpRight className="size-5" strokeWidth={1.6} aria-hidden />
          </span>
          <span className="font-label text-ink/50 text-[0.8rem] font-bold tracking-[0.16em] uppercase">
            {host}
          </span>
        </a>
      )}
    </div>
  );
}
