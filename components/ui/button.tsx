import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "dark" | "light" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-medium " +
  "whitespace-nowrap transition-[background-color,color,border-color,transform,box-shadow] duration-300 " +
  "ease-[var(--ease-brand)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal text-canvas hover:bg-teal-lt shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset]",
  gold: "bg-gold text-forest hover:bg-gold-dk",
  dark: "bg-forest text-canvas hover:bg-teal",
  light: "bg-canvas text-forest hover:bg-beige",
  outline:
    "border border-current/25 bg-transparent text-current hover:border-current/60 hover:bg-current/5",
  ghost: "bg-transparent text-current hover:bg-current/8",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-6 text-[0.8125rem]",
  md: "h-10 px-8 text-sm",
  lg: "h-12 px-10 text-[0.9375rem]",
};

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Small trailing dot, as used on the primary hero action. */
  dot?: boolean;
};

function content(children: ReactNode, dot?: boolean) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      {dot ? (
        <span
          aria-hidden
          className="relative z-10 size-2 rounded-full bg-current opacity-70 transition-transform duration-300 ease-[var(--ease-brand)] group-hover/btn:scale-125"
        />
      ) : null}
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  dot,
  ...props
}: ButtonBaseProps & Omit<ComponentProps<"button">, "children" | "className">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {content(children, dot)}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  dot,
  href,
  ...props
}: ButtonBaseProps & Omit<ComponentProps<typeof Link>, "children" | "className">) {
  const external = typeof href === "string" && /^(https?:|mailto:|tel:)/.test(href);

  if (external) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], sizes[size], className)}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        {content(children, dot)}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {content(children, dot)}
    </Link>
  );
}
