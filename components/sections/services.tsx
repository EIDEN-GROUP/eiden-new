"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealWords } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { serviceMedia } from "@/lib/data/site";
import { cn } from "@/lib/utils";

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="bg-canvas">
      <div className="container-eiden">
        <Reveal direction="none" duration={0.5}>
          <p className="eyebrow text-teal flex items-center gap-3">
            <span
              aria-hidden
              className="h-px w-8 origin-left bg-current opacity-50 motion-safe:[animation:eiden-underline_0.8s_var(--ease-brand)_0.1s_both]"
            />
            {t.services.eyebrow}
          </p>
        </Reveal>

        <RevealWords
          as="h2"
          text={t.services.title}
          delay={0.05}
          className="text-ink mt-6 max-w-4xl text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.02]"
        />
        <Reveal delay={0.1} direction="none">
          <p className="eyebrow text-ink/50 mt-8 hidden lg:block">
            {t.services.hint}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 lg:mt-16">
        {t.services.items.map((item, index) => {
          const media = serviceMedia[item.slug as keyof typeof serviceMedia];
          return (
            <Link
              key={item.slug}
              href="/nos-solutions"
              className={cn(
                "group border-ink/10 relative isolate block border-t",
                index === t.services.items.length - 1 && "border-b",
              )}
            >
              {media ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 -z-10 overflow-hidden transition-opacity duration-700 ease-[var(--ease-brand)] motion-reduce:transition-none",
                    "opacity-100 lg:opacity-0 lg:group-hover:opacity-100",
                  )}
                >
                  <Image
                    src={media}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                  <span className="bg-ink/50 absolute inset-0" />
                </span>
              ) : null}

              <div className="container-eiden flex flex-col gap-5 py-9 sm:py-10 lg:flex-row lg:items-center lg:gap-10 lg:py-10 xl:gap-14">
                <span className="numeral border-canvas/40 text-canvas lg:border-ink/25 lg:text-ink/50 lg:group-hover:border-canvas lg:group-hover:text-canvas flex size-9 shrink-0 items-center justify-center rounded-full border text-[0.8rem] transition-colors duration-500 ease-[var(--ease-brand)]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="lg:w-[15rem] lg:shrink-0 xl:w-[30rem]">
                  <p className="eyebrow text-canvas mb-2 lg:hidden">
                    {item.kicker}
                  </p>
                  <p className="text-canvas/90 lg:text-ink/70 lg:group-hover:text-canvas flex flex-wrap items-center gap-1 text-[0.9375rem] leading-relaxed transition-colors duration-500 ease-[var(--ease-brand)] lg:text-[0.875rem]">
                    {item.deliverables.map((deliverable, index) => (
                      <span key={deliverable} className="flex items-center gap-2">
                        <span className="border-canvas/30 lg:border-ink/20 lg:group-hover:border-canvas/30 rounded-full border px-2 py-1 transition-colors duration-500">
                          {deliverable}
                        </span>

                        {/* {index < item.deliverables.length - 1 && (
                          <span className="opacity-50">·</span>
                        )} */}
                      </span>
                    ))}
                  </p>
                  <p className="text-canvas/75 lg:text-ink/40 lg:group-hover:text-canvas mt-3 text-[0.82rem] transition-opacity delay-100 duration-500 ease-[var(--ease-brand)] motion-reduce:transition-none lg:opacity-0 lg:group-hover:opacity-100">
                    {item.text}
                  </p>
                </div>

                <h3 className="font-display text-canvas lg:text-ink lg:group-hover:text-canvas min-w-0 flex-1 text-[clamp(2.25rem,9vw,4rem)] leading-[1.04] font-light tracking-[-0.03em] lg:text-center">
                  <span className="relative inline-block pb-2">
                    {item.title}
                    <span
                      aria-hidden
                      className="bg-canvas absolute bottom-0 left-0 h-1 w-full origin-left scale-x-100 transition-transform duration-600 ease-[var(--ease-brand)] motion-reduce:transition-none lg:scale-x-0 lg:group-hover:scale-x-100"
                    />
                  </span>
                </h3>

                <span className="flex justify-end lg:block lg:shrink-0">
                  <span className="border-canvas/40 text-canvas lg:border-ink/25 lg:text-ink/70 lg:group-hover:text-canvas flex size-11 items-center justify-center rounded-full border transition-[transform,color] duration-500 ease-[var(--ease-brand)] group-hover:translate-x-2 motion-reduce:transition-none lg:size-auto lg:border-0">
                    <ArrowRight
                      aria-hidden
                      strokeWidth={1.4}
                      className="size-5 lg:size-12 xl:size-14"
                    />
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
