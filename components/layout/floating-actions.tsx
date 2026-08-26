"use client";

import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { scrollToTop } from "@/components/providers/smooth-scroll";
import { useFooterRevealed } from "@/lib/footer-reveal";
import { useScrolledPast } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * The way back to the top, alone in the bottom-right corner once the page has
 * scrolled about a screen.
 *
 * It steps aside as the footer curtain comes up   the footer carries its own,
 * and a light pill over the dark panel reads as a stray sticker.
 */
export function FloatingActions() {
  const { t } = useLanguage();
  const footerRevealed = useFooterRevealed();
  const scrolled = useScrolledPast(560);

  const skin =
    "border-forest/8 bg-canvas/85 text-forest/70 hover:text-forest shadow-[0_10px_40px_-16px_rgba(18,38,32,0.35)] backdrop-blur-xl";
  const swap =
    "transition-[opacity,transform] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none";

  return (
    <div className="pointer-events-none fixed right-5 bottom-5 z-40 flex flex-col items-end sm:right-8 sm:bottom-8">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={t.common.backToTop}
        title={t.common.backToTop}
        tabIndex={scrolled && !footerRevealed ? undefined : -1}
        aria-hidden={scrolled && !footerRevealed ? undefined : true}
        className={cn(
          "flex size-11 items-center justify-center rounded-full border",
          skin,
          swap,
          scrolled && !footerRevealed
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "translate-y-2 opacity-0",
        )}
      >
        <ArrowUp className="size-4" strokeWidth={1.8} aria-hidden />
      </button>
    </div>
  );
}
