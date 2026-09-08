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

  /* A long list would otherwise open with the chosen row out of sight. */
  useEffect(() => {
    if (!open) return;
    list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const show = () => {
    setActive(value);
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

      {open ? (
        <ul
          ref={list}
          id={listId}
          role="listbox"
          aria-labelledby={labelledBy ?? id}
          className={cn(
            "glass-light border-ink/10 bg-canvas absolute inset-x-0 top-[calc(100%+0.55rem)] z-30",
            "max-h-64 overflow-y-auto rounded-2xl border p-1.5",
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
