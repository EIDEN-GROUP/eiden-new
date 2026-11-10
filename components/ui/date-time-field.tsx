"use client";

import { useEffect, useRef, useState, type WheelEvent } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type DateTimeLocale = "fr" | "en";
export type DateTimeValue = { date: string; time: string };

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (year: number, month: number, day: number) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

const parseISO = (iso: string): Date | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
};

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

/* Localized copy, kept with the component's own wiring. */
const t = {
  fr: {
    prev: "Mois précédent",
    next: "Mois suivant",
    clear: "Effacer",
    summaryEmpty: "Sélectionnez une date et une heure.",
    summarySet: "Votre réservation est prévue le {date} à {time}.",
  },
  en: {
    prev: "Previous month",
    next: "Next month",
    clear: "Clear",
    summaryEmpty: "Select a date and time.",
    summarySet: "Your reservation is set for {date} at {time}.",
  },
} as const;

/* The bookable window is 09:00–18:00, half-hour slots. */
const TIME_SLOTS = Array.from({ length: 19 }, (_, index) => {
  const minutes = 9 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${pad(
    minutes % 60,
  )}`;
});

/**
 * The reservation moment in one card: a calendar on the left, a scrollable
 * column of time slots on the right, a one-line summary underneath. The
 * whole card is fixed to the viewport, so it floats above any clipping
 * (the modal, the page), and the time column carries `data-lenis-prevent`
 * so the page's smooth-scroll hands the wheel back to it natively.
 */
export function DateTimeField({
  id,
  labelledBy,
  locale,
  value,
  onChange,
  placeholder,
  className,
}: {
  id: string;
  labelledBy?: string;
  locale: DateTimeLocale;
  value: DateTimeValue;
  onChange: (value: DateTimeValue) => void;
  placeholder: string;
  className?: string;
}) {
  const lang = locale === "fr" ? "fr-FR" : "en-GB";
  const weekStartsOn = locale === "fr" ? 1 : 0; // Monday in fr, Sunday in en
  const localeT = t[locale];

  const today = new Date();
  const todayISO = toISO(today.getFullYear(), today.getMonth(), today.getDate());

  const [open, setOpen] = useState(false);
  /* Rough card height: everything is visible at once on desktop. */
  const estimated = 430;
  const [popover, setPopover] = useState<{
    placement: "up" | "down";
    left: number;
    width: number;
    top?: number;
    bottom?: number;
    maxHeight: number;
  } | null>(null);
  const [cursor, setCursor] = useState<Date>(() => {
    const initial = value.date ? parseISO(value.date) : null;
    const base = initial ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  const close = () => setOpen(false);

  const toggleOpen = () => {
    if (!open) {
      const rect = root.current?.getBoundingClientRect();
      if (!rect) {
        setOpen(true);
        return;
      }
      const below = window.innerHeight - rect.bottom - 12;
      const above = rect.top - 12;
      const placement = below < estimated + 12 && above > below ? "up" : "down";
      const space = placement === "up" ? above : below;
      setPopover({
        placement,
        left: rect.left,
        width: Math.max(rect.width, 560 > rect.width ? Math.min(560, window.innerWidth - 24) : rect.width),
        top: placement === "down" ? rect.bottom + 9 : undefined,
        bottom: placement === "up" ? window.innerHeight - rect.top + 9 : undefined,
        maxHeight: Math.max(280, Math.min(estimated, space)),
      });
    }
    setOpen((isOpen) => !isOpen);
  };

  /* Sync the visible month when the value is set from outside (reset on send). */
  useEffect(() => {
    const picked = value.date ? parseISO(value.date) : null;
    if (picked) setCursor(new Date(picked.getFullYear(), picked.getMonth(), 1));
  }, [value.date]);

  useEffect(() => {
    if (!open) return;
    const away = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  /* Re-pin on scroll/resize so the card never detaches from its trigger. */
  useEffect(() => {
    if (!open) return;

    const reposition = () => {
      const rect = root.current?.getBoundingClientRect();
      if (!rect) return;
      setPopover((previous) => {
        if (!previous) return previous;
        const below = window.innerHeight - rect.bottom - 12;
        const above = rect.top - 12;
        const placement = previous.placement;
        const space = placement === "up" ? above : below;
        return {
          ...previous,
          left: rect.left,
          width: Math.max(rect.width, Math.min(560, window.innerWidth - 24)),
          top: placement === "down" ? rect.bottom + 9 : undefined,
          bottom: placement === "up" ? window.innerHeight - rect.top + 9 : undefined,
          maxHeight: Math.max(280, Math.min(estimated, space)),
        };
      });
    };

    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [open]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const valueDate = value.date ? parseISO(value.date) : null;
  const monthLabel = capitalize(
    new Intl.DateTimeFormat(lang, { month: "long", year: "numeric" }).format(cursor),
  );
  const valueLabel = valueDate
    ? new Intl.DateTimeFormat(lang, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(valueDate)
    : null;
  const shortLabel = valueDate
    ? new Intl.DateTimeFormat(lang, {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(valueDate)
    : null;
  /* Weekday headers, Monday-first for fr and Sunday-first for en. */
  const weekdays = Array.from({ length: 7 }, (_, index) =>
    new Intl.DateTimeFormat(lang, { weekday: "short" }).format(
      new Date(2026, 0, 4 + weekStartsOn + index),
    ),
  );
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const leading = (firstWeekday - weekStartsOn + 7) % 7;

  const shiftMonth = (delta: number) =>
    setCursor(new Date(year, month + delta, 1));

  const pickDay = (day: number) => {
    const iso = toISO(year, month, day);
    if (iso < todayISO) return;
    onChange({ ...value, date: iso });
  };

  const summary =
    valueDate && value.time
      ? localeT.summarySet
          .replace("{date}", valueLabel ?? "")
          .replace("{time}", value.time)
      : localeT.summaryEmpty;

  const triggerLabel = shortLabel
    ? value.time
      ? `${shortLabel} · ${value.time}`
      : shortLabel
    : placeholder;

  return (
    <div ref={root} className={cn("relative", className)}>
      <button
        ref={trigger}
        type="button"
        id={id}
        aria-haspopup="dialog"
        aria-labelledby={labelledBy}
        aria-expanded={open}
        onClick={toggleOpen}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            event.preventDefault();
            setOpen(false);
          }
        }}
        className={cn(
          "border-ink/25 text-ink flex w-full items-center justify-between gap-3 border-b",
          "bg-transparent px-0 py-3 text-left text-[0.9375rem] transition-colors duration-300",
          "hover:border-ink/45 focus:outline-none focus-visible:outline-none",
          open && "border-teal",
        )}
      >
        <span
          className={cn(
            "truncate",
            shortLabel ? "text-ink" : "text-[#55635F]/60",
          )}
        >
          {triggerLabel}
        </span>
        <Calendar
          aria-hidden
          strokeWidth={1.8}
          className={cn(
            "size-4 shrink-0 transition-colors duration-300",
            open ? "text-teal" : "text-ink/45",
          )}
        />
      </button>

      {open && popover ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-label={monthLabel}
          data-lenis-prevent
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              setOpen(false);
              trigger.current?.focus();
            }
          }}
          onWheel={(event: WheelEvent<HTMLDivElement>) => event.stopPropagation()}
          style={{
            position: "fixed",
            left: popover.left,
            width: popover.width,
            top: popover.top,
            bottom: popover.bottom,
            maxHeight: popover.maxHeight,
          }}
          className={cn(
            "border-ink/10 bg-canvas/90 z-30 overflow-y-auto rounded-2xl border",
            "backdrop-blur-[12px] backdrop-saturate-125",
            "shadow-[0_30px_70px_-30px_rgba(18,38,32,0.6)]",
            "motion-safe:animate-[eiden-fade-in_0.22s_var(--ease-brand)]",
          )}
        >
          <div className="flex flex-col md:flex-row">
            {/* Calendar */}
            <div className="min-w-0 flex-1 p-4">
              <div className="flex items-center justify-between gap-2 px-1 pb-2">
                <button
                  type="button"
                  onClick={() => shiftMonth(-1)}
                  aria-label={localeT.prev}
                  className="hover:bg-beige text-ink/70 flex size-8 items-center justify-center rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                >
                  <ChevronLeft aria-hidden strokeWidth={2} className="size-4" />
                </button>
                <p className="font-label text-ink text-[0.8rem] font-bold tracking-[0.14em] uppercase">
                  {monthLabel}
                </p>
                <button
                  type="button"
                  onClick={() => shiftMonth(1)}
                  aria-label={localeT.next}
                  className="hover:bg-beige text-ink/70 flex size-8 items-center justify-center rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                >
                  <ChevronRight aria-hidden strokeWidth={2} className="size-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-0.5 pb-1.5">
                {weekdays.map((weekday, index) => (
                  <span
                    key={`${weekday}-${index}`}
                    aria-hidden
                    className="text-ink/40 text-center text-[0.68rem] font-bold tracking-[0.08em] uppercase"
                  >
                    {weekday}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: leading }, (_, index) => (
                  <span key={`pad-${index}`} aria-hidden />
                ))}
                {Array.from({ length: daysInMonth }, (_, index) => {
                  const day = index + 1;
                  const iso = toISO(year, month, day);
                  const disabled = iso < todayISO;
                  const selected = iso === value.date;
                  const isToday = iso === todayISO;

                  return (
                    <button
                      key={iso}
                      type="button"
                      disabled={disabled}
                      aria-pressed={selected}
                      onClick={() => pickDay(day)}
                      className={cn(
                        "flex size-9 items-center justify-center rounded-lg text-[0.82rem] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal",
                        disabled && "text-ink/20 cursor-not-allowed",
                        !disabled && !selected && "hover:bg-beige text-ink/80",
                        isToday &&
                          !selected &&
                          "text-teal font-semibold ring-1 ring-teal/50",
                        selected && "bg-teal text-canvas font-semibold",
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slots */}
            <div
              className="no-scrollbar flex max-h-56 w-full shrink-0 flex-col gap-2 overflow-y-auto border-t border-ink/10 p-4 md:max-h-[25.5rem] md:w-44 md:border-t-0 md:border-l md:p-5"
              data-lenis-prevent
            >
              {TIME_SLOTS.map((slot) => {
                const selected = value.time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onChange({ ...value, time: slot })}
                    className={cn(
                      "w-full shrink-0 rounded-xl border py-2 text-[0.82rem] font-medium tabular-nums transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal",
                      selected
                        ? "border-teal bg-teal text-canvas"
                        : "border-ink/15 text-ink hover:border-teal hover:text-teal",
                    )}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2 border-t border-ink/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.82rem] leading-snug text-ink/80">{summary}</p>
            {value.date || value.time ? (
              <button
                type="button"
                onClick={() => onChange({ date: "", time: "" })}
                className="inline-flex w-fit items-center gap-1.5 text-[0.78rem] font-semibold text-ink/55 transition-colors duration-200 hover:text-teal"
              >
                <X aria-hidden strokeWidth={2} className="size-3.5" />
                {localeT.clear}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
