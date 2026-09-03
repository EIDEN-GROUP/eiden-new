"use client";

import { ArrowUp } from "lucide-react";
import type { SVGProps } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { scrollToTop } from "@/components/providers/smooth-scroll";
import { siteConfig } from "@/lib/data/site";
import { useFooterRevealed } from "@/lib/footer-reveal";
import { useScrolledPast } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/** The WhatsApp mark, filled   the silhouette is what carries it at 18px. */
function WhatsAppGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/**
 * The bottom-right corner: the way back to the top, and WhatsApp beneath it.
 *
 * The two share the corner rather than a side of the screen each   one
 * standing action a visitor already expects to find there, the other beside
 * it rather than off on its own edge. Back-to-top only shows itself once
 * there's somewhere to go back to; WhatsApp is there from the start. Both
 * step aside as the footer curtain comes up   the footer carries its own way
 * back to the top, and a light pill over the dark panel reads as a stray
 * sticker.
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
    <div className="pointer-events-none fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3 sm:right-8 sm:bottom-8">
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

      <a
        href={`https://wa.me/${siteConfig.phoneMa.replace(/\D/g, "")}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${t.common.whatsapp} ${siteConfig.phoneMa}`}
        title={`${t.common.whatsapp} ${siteConfig.phoneMa}`}
        tabIndex={footerRevealed ? -1 : undefined}
        aria-hidden={footerRevealed || undefined}
        className={cn(
          "bg-teal hover:bg-teal-lt text-canvas flex size-11 items-center justify-center rounded-full shadow-[0_10px_40px_-16px_rgba(18,38,32,0.55)]",
          swap,
          footerRevealed
            ? "translate-y-2 opacity-0"
            : "pointer-events-auto translate-y-0 opacity-100",
        )}
      >
        <WhatsAppGlyph className="size-[1.15rem]" />
      </a>
    </div>
  );
}
