"use client";

import { Languages } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { useFooterRevealed } from "@/lib/footer-reveal";
import { getDictionary } from "@/lib/i18n";
import { useIntroDone } from "@/lib/intro-store";
import { cn } from "@/lib/utils";

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
 * The right-edge tag: the language switch, alone.
 *
 * It opens itself once when the visitor lands, so the label is seen at least
 * one time without anyone having to go looking for it, then steps aside as
 * the footer comes up   the footer carries its own switch. WhatsApp used to
 * share this edge; it now sits with the way back to the top instead, so both
 * of the page's standing actions are in the one corner.
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
