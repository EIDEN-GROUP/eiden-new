"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The one choice on the site, drawn rather than handed to the browser.
 *
 * A native `<select>` opens an operating-system list   system blue, system
 * type, nothing of it themeable   which is the one place the interface stops
 * looking like itself. This paints the list in the site's own colours and
 * keeps the contract a select owes the keyboard: the `aria-activedescendant`
 * listbox pattern, so focus never leaves the trigger and the arrows, Home,
 * End, Enter and Escape all land where a select would put them.
 */
export function SelectField({
  id,
  labelledBy,
  options,
  value,
  onChange,
  className,
}: {
  id: string;
  /**
   * Id of the element that names the field. A `<button>` takes its name from
   * its own content   here the chosen option   so without this the field is
   * announced as its value and never as the question it answers.
   */
  labelledBy?: string;
  options: readonly string[];
  /** Index into `options`. */
  value: number;
  onChange: (index: number) => void;
  className?: string;
}) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  /* Where the floating list is pinned: fixed to the viewport (never clipped by a modal),
     on whichever side of the trigger has room, capped to the space available there. */
  const [popover, setPopover] = useState<{
    placement: "up" | "down";
    left: number;
    width: number;
    top?: number;
    bottom?: number;
    maxHeight: number;
  } | null>(null);
  /* The row the keyboard is on, which is only the chosen one until it moves. */
  const [active, setActive] = useState(value);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  /* Keep the floating list pinned to its trigger when the document or the modal scrolls. */
  useEffect(() => {
    if (!open) return;

    const reposition = () => {
      const rect = root.current?.getBoundingClientRect();
      if (!rect) return;
      setPopover((previous) => {
        const rowEstimate = Math.min(options.length * 47 + 14, 256);
        const below = window.innerHeight - rect.bottom - 12;
        const above = rect.top - 12;
        const placement =
          previous?.placement ??
          (below < rowEstimate + 12 && above > below ? "up" : "down");
        const space = placement === "up" ? above : below;
        return {
          ...previous!,
          placement,
          left: rect.left,
          width: rect.width,
          top: placement === "down" ? rect.bottom + 9 : undefined,
          bottom: placement === "up" ? window.innerHeight - rect.top + 9 : undefined,
          maxHeight: Math.max(140, Math.min(rowEstimate, space)),
        };
      });
    };

    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [open, options.length]);

  /* A long list would otherwise open with the chosen row out of sight. */
  useEffect(() => {
    if (!open) return;
    list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const show = () => {
    setActive(value);
    const rect = root.current?.getBoundingClientRect();
    if (!rect) {
      setOpen(true);
      return;
    }
    /* Roughly: 47px rows plus a hairline of chrome, capped by the max height. */
    const rowEstimate = Math.min(options.length * 47 + 14, 256);
    const below = window.innerHeight - rect.bottom - 12;
    const above = rect.top - 12;
    const placement =
      below < rowEstimate + 12 && above > below ? "up" : "down";
    const space = placement === "up" ? above : below;
    setPopover({
      placement,
      left: rect.left,
      width: rect.width,
      top: placement === "down" ? rect.bottom + 9 : undefined,
      bottom: placement === "up" ? window.innerHeight - rect.top + 9 : undefined,
      maxHeight: Math.max(140, Math.min(rowEstimate, space)),
    });
    setOpen(true);
  };

  const commit = (index: number) => {
    onChange(index);
    setActive(index);
    setOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        if (!open) return show();
        const step = event.key === "ArrowDown" ? 1 : -1;
        setActive((index) => Math.min(last, Math.max(0, index + step)));
        return;
      }
      case "Home":
      case "End": {
        if (!open) return;
        event.preventDefault();
        setActive(event.key === "Home" ? 0 : last);
        return;
      }
      case "Enter":
      case " ": {
        event.preventDefault();
        return open ? commit(active) : show();
      }
      case "Escape": {
        if (!open) return;
        event.preventDefault();
        setOpen(false);
        setActive(value);
        return;
      }
      case "Tab": {
        setOpen(false);
      }
    }
  };

  return (
    <div ref={root} className={cn("relative", className)}>
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-labelledby={labelledBy}
        aria-controls={listId}
        aria-expanded={open}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        className={cn(
          "border-ink/25 text-ink flex w-full items-center justify-between gap-3 border-b",
          "bg-transparent px-0 py-3 text-left text-[0.9375rem] transition-colors duration-300",
          "hover:border-ink/45 focus:outline-none focus-visible:outline-none",
          open && "border-teal",
        )}
      >
        <span className="truncate">{options[value]}</span>
        <ChevronDown
          aria-hidden
          strokeWidth={1.8}
          className={cn(
            "size-4 shrink-0 transition-[transform,color] duration-300 ease-[var(--ease-brand)] motion-reduce:transition-none",
            open ? "text-teal rotate-180" : "text-ink/45",
          )}
        />
      </button>

      {open && popover ? (
        <ul
          ref={list}
          id={listId}
          role="listbox"
          aria-labelledby={labelledBy ?? id}
          style={{
            position: "fixed",
            left: popover.left,
            width: popover.width,
            top: popover.top,
            bottom: popover.bottom,
            maxHeight: popover.maxHeight,
          }}
          className={cn(
            "border-ink/10 bg-canvas/85 z-30",
            "backdrop-blur-[10px] backdrop-saturate-125",
            "overflow-y-auto rounded-2xl border p-1.5",
            "shadow-[0_30px_60px_-34px_rgba(18,38,32,0.55)]",
            "motion-safe:animate-[eiden-fade-in_0.22s_var(--ease-brand)]",
          )}
        >
          {options.map((option, index) => {
            const chosen = index === value;
            const on = index === active;

            return (
              <li
                key={option}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={chosen}
                onPointerEnter={() => setActive(index)}
                onClick={() => commit(index)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-2.5",
                  "text-[0.9375rem] transition-colors duration-200",
                  chosen ? "text-teal font-medium" : "text-ink/75",
                  on && (chosen ? "bg-teal/15" : "bg-beige text-ink"),
                  chosen && !on && "bg-teal/10",
                )}
              >
                <span className="truncate">{option}</span>
                {chosen ? (
                  <Check
                    aria-hidden
                    strokeWidth={2.4}
                    className="text-teal size-4 shrink-0"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
