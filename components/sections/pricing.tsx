"use client";

import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { RevealGroup } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

export function Pricing() {
  const { t } = useLanguage();
  const highlighted = 1;

  return (
    <section id="tarifs" className="bg-canvas py-24 sm:py-32">
      <div className="container-eiden">
        <SectionHeading
          eyebrow={t.pricing.eyebrow}
          title={t.pricing.title}
          lead={t.pricing.text}
          align="center"
          className="mx-auto max-w-3xl"
        />

        <RevealGroup className="mt-16 grid gap-4 lg:grid-cols-3 lg:items-stretch">
          {t.pricing.plans.map((plan, index) => {
            const featured = index === highlighted;
            return (
              <article
                key={plan.name}
                className={cn(
                  "relative flex h-full flex-col rounded-[1.5rem] p-8 transition-[transform,box-shadow] duration-500 ease-[var(--ease-brand)] sm:p-10",
                  featured
                    ? "grain bg-beige text-ink shadow-[0_40px_90px_-40px_rgba(18,38,32,0.22)] lg:-my-4 lg:py-14"
                    : "border-forest/10 bg-cream text-forest border hover:-translate-y-1.5",
                )}
              >
                {featured ? (
                  <span className="bg-gold font-label text-forest absolute top-6 right-6 rounded-full px-3.5 py-1.5 text-[0.75rem] font-bold tracking-[0.18em] uppercase">
                    {t.pricing.popular}
                  </span>
                ) : null}

                <div className="relative z-[2]">
                  <h3
                    className={cn(
                      "font-display text-xl font-bold tracking-[-0.02em]",
                      featured ? "text-ink" : "text-forest",
                    )}
                  >
                    {plan.name}
                  </h3>

                  <p
                    className={cn(
                      "font-display mt-6 text-[clamp(1.5rem,3vw,2rem)] leading-none font-extrabold tracking-[-0.04em]",
                      featured ? "text-[#8a6412]" : "text-teal",
                    )}
                  >
                    {plan.price}
                  </p>
                  <p
                    className={cn(
                      "mt-2 text-[0.9375rem]",
                      featured ? "text-ink/55" : "text-forest/45",
                    )}
                  >
                    {plan.billing}
                  </p>

                  <p
                    className={cn(
                      "mt-6 text-[0.9375rem] leading-relaxed",
                      featured ? "text-ink/70" : "text-forest/60",
                    )}
                  >
                    {plan.text}
                  </p>

                  <ul className="mt-8 flex flex-col gap-3.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className={cn(
                            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                            featured
                              ? "bg-[#8a6412]/15 text-[#8a6412]"
                              : "bg-teal/10 text-teal",
                          )}
                        >
                          <Check className="size-3" strokeWidth={2.6} />
                        </span>
                        <span
                          className={cn(
                            "text-[0.9375rem] leading-snug",
                            featured ? "text-ink/80" : "text-forest/70",
                          )}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-[2] mt-10 pt-2">
                  <ButtonLink
                    href="/contact"
                    variant={featured ? "gold" : "dark"}
                    size="lg"
                    className="w-full"
                  >
                    {t.pricing.cta}
                  </ButtonLink>
                </div>
              </article>
            );
          })}
        </RevealGroup>

        <p className="text-forest/40 mt-8 text-center text-[0.82rem]">
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
}
