"use client";

import { Languages } from "lucide-react";
import { useEffect, useState, type ReactNode, type SVGProps } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { siteConfig } from "@/lib/data/site";
import { useFooterRevealed } from "@/lib/footer-reveal";
import { getDictionary } from "@/lib/i18n";
import { useIntroDone } from "@/lib/intro-store";
import { cn } from "@/lib/utils";

/** The WhatsApp mark, filled   the silhouette is what carries it at 18px. */
function WhatsAppGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/** How long the tags hold themselves open on arrival, once the intro is out. */
const PEEK_MS = 2600;

const shell =
  "flex items-center rounded-l-full py-2.5 pr-3 pl-3 shadow-[0_12px_40px_-14px_rgba(18,38,32,0.55)] transition-colors duration-300";

/**
 * One tag on the right edge: the glyph alone at rest, its label unrolling out
 * to the right of it.
 *
 * The tag is pinned by its right edge, so the label has nowhere to grow but
 * into the page   it pushes the glyph ahead of it, and the tag reads as being
 * pulled open from the edge rather than as a pill sliding across the screen.
 */
function SideTag({
  label,
  title,
  tone,
  peek,
  glyph,
  href,
  onClick,
}: {
  label: string;
  title: string;
  /** Background and hover colours; the family is what ties the stack together. */
  tone: string;
  /** Held open from the outside, for the one-time peek on arrival. */
  peek: boolean;
  glyph: ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const [engaged, setEngaged] = useState(false);
  const open = peek || engaged;

  const handlers = {
    "aria-label": title,
    title,
    onMouseEnter: () => setEngaged(true),
    onMouseLeave: () => setEngaged(false),
    onFocus: () => setEngaged(true),
    onBlur: () => setEngaged(false),
    className: cn(shell, tone),
  };

  /* `0fr → 1fr` animates to the label's own width, so nothing has to be
     measured and it still opens where JS animation is unavailable. */
  const body = (
    <>
      {glyph}
      <span
        className={cn(
          "grid transition-[grid-template-columns] duration-600 ease-[var(--ease-brand)] motion-reduce:transition-none",
          open ? "grid-cols-[1fr]" : "grid-cols-[0fr]",
        )}
      >
        <span className="overflow-hidden">
          <span className="font-display block pl-2 text-[0.86rem] font-bold tracking-[0.01em] whitespace-nowrap">
            {label}
          </span>
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...handlers}>
        {body}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} {...handlers}>
      {body}
    </button>
  );
}

/**
 * The right-edge stack: WhatsApp over the language switch.
 *
 * Each one answers its own pointer   hovering WhatsApp says nothing about the
 * language switch. What they do share is the arrival: both open themselves
 * once when the visitor lands, so each label is seen at least one time
 * without anyone having to go looking for it. Both step
 * aside as the footer comes up   the footer carries its own language switch,
 * and its own way back to the top.
 */
export function SideTags() {
  const { t, locale, toggleLocale } = useLanguage();
  const introDone = useIntroDone();
  const footerRevealed = useFooterRevealed();
  const [peeking, setPeeking] = useState(false);

  useEffect(() => {
    if (!introDone) return;
    const open = window.setTimeout(() => setPeeking(true), 500);
    const shut = window.setTimeout(() => setPeeking(false), 500 + PEEK_MS);
    return () => {
      window.clearTimeout(open);
      window.clearTimeout(shut);
    };
  }, [introDone]);

  // The label names where the switch lands, not where the visitor already is.
  const targetLocale = locale === "fr" ? "en" : "fr";

  return (
    <div
      aria-hidden={footerRevealed || undefined}
      inert={footerRevealed || undefined}
      className={cn(
        "fixed top-1/2 right-0 z-40 flex -translate-y-1/2 flex-col items-end gap-2",
        "transition-[opacity,transform] duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none",
        footerRevealed
          ? "pointer-events-none translate-x-4 opacity-0"
          : "translate-x-0 opacity-100",
      )}
    >
      <SideTag
        href={`https://wa.me/${siteConfig.phoneMa.replace(/\D/g, "")}`}
        label={siteConfig.phoneMa}
        title={`${t.common.whatsapp} ${siteConfig.phoneMa}`}
        tone="bg-teal hover:bg-teal-lt text-canvas"
        peek={peeking}
        glyph={<WhatsAppGlyph className="size-[1.15rem] shrink-0" />}
      />

      <SideTag
        onClick={toggleLocale}
        label={getDictionary(targetLocale).common.langName}
        title={t.common.langSwitch}
        tone="bg-forest hover:bg-teal text-canvas"
        peek={peeking}
        glyph={
          <Languages
            className="size-[1.15rem] shrink-0"
            strokeWidth={1.9}
            aria-hidden
          />
        }
      />
    </div>
  );
}
