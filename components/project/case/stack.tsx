"use client";

import type { ReactNode } from "react";
import { TONES, type DisplayTone } from "./tone";
import { cn } from "@/lib/utils";

export function CaseStack({ children }: { children: ReactNode }) {
  return <div className="bg-canvas relative">{children}</div>;
}


export function CaseSection({
  tone,
  id,
  className,
  children,
}: {
  tone: DisplayTone;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const skin = TONES[tone];
  const deep = tone === "ink" || tone === "forest";

  if (!deep) {
    return (
      <section id={id} data-nav-tone={skin.nav} className={cn("relative scroll-mt-24", skin.panel, className)}>
        {children}
      </section>
    );
  }

  return (
    <section id={id} className={cn("bg-canvas scroll-mt-24 px-2.5 sm:px-4", className)}>
      <div
        data-nav-tone={skin.nav}
        className={cn(
          "relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem]",
          skin.panel,
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function CaseBlock({
  className,
  tight = false,
  children,
}: {
  className?: string;
  tight?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "container-eiden pb-24 sm:pb-28 lg:pb-32",
        !tight && "pt-24 sm:pt-28 lg:pt-32",
        className,
      )}
    >
      {children}
    </div>
  );
}
