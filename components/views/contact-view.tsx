"use client";

import { useState, type FormEvent } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const fieldClass =
  "w-full rounded-xl border border-forest/15 bg-canvas px-4 py-3.5 text-[0.9375rem] text-forest " +
  "placeholder:text-forest/35 transition-colors duration-300 focus:border-teal focus:outline-none " +
  "focus-visible:outline-none";

export function ContactView() {
  const { t } = useLanguage();
  const page = t.pages.contact;
  const form = t.contact.form;

  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  /**
   * There is no mail backend yet, so a valid submission hands the composed
   * message to the visitor's own mail client. Swap this for a route handler
   * once a transactional provider is connected.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = form.required;
    if (!email) nextErrors.email = form.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      nextErrors.email = form.invalidEmail;
    if (!message) nextErrors.message = form.required;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const body = [
      `${form.name}: ${name}`,
      company ? `${form.company}: ${company}` : null,
      `${form.email}: ${email}`,
      phone ? `${form.phone}: ${phone}` : null,
      `${form.subject}: ${subject}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `${subject} — ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const details = [
    {
      icon: Mail,
      label: t.contact.infoLabels.email,
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: Phone,
      label: `${t.contact.infoLabels.phone} — ${t.footer.phoneMaLabel}`,
      value: siteConfig.phoneMa,
      href: `tel:${siteConfig.phoneMa.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: t.contact.infoLabels.address,
      value: siteConfig.address,
    },
    {
      icon: Clock,
      label: t.contact.infoLabels.hours,
      value: t.contact.hours,
    },
  ];

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      <section className="bg-canvas py-24 sm:py-32">
        <div className="container-eiden grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:gap-16">
          {/* Form */}
          <Reveal>
            <div className="border-forest/10 bg-cream rounded-2xl border p-7 sm:p-10">
              <h2 className="font-display text-forest text-2xl font-bold tracking-[-0.025em]">
                {form.title}
              </h2>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-8 flex flex-col gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label={form.name} error={errors.name} required>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={cn(fieldClass, errors.name && "border-red-500")}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                  </Field>

                  <Field id="company" label={`${form.company} (${form.optional})`}>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      className={fieldClass}
                    />
                  </Field>

                  <Field
                    id="email"
                    label={form.email}
                    error={errors.email}
                    required
                  >
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={cn(fieldClass, errors.email && "border-red-500")}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </Field>

                  <Field id="phone" label={`${form.phone} (${form.optional})`}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={fieldClass}
                    />
                  </Field>
                </div>

                <Field id="subject" label={form.subject}>
                  <select id="subject" name="subject" className={fieldClass}>
                    {form.subjects.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  id="message"
                  label={form.message}
                  error={errors.message}
                  required
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={form.messagePlaceholder}
                    className={cn(
                      fieldClass,
                      "resize-y",
                      errors.message && "border-red-500",
                    )}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                </Field>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <Button type="submit" variant="dark" size="lg" dot>
                    {form.submit}
                  </Button>
                  <p aria-live="polite" className="text-teal text-[0.9375rem]">
                    {sent ? form.success : null}
                  </p>
                </div>
              </form>
            </div>
          </Reveal>

          {/* Direct details */}
          <Reveal delay={0.08} direction="left">
            <div className="bg-forest/10 flex flex-col gap-px overflow-hidden rounded-2xl">
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className="bg-canvas flex items-start gap-4 p-6"
                >
                  <detail.icon
                    className="text-teal mt-0.5 size-4 shrink-0"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="eyebrow text-forest/40">{detail.label}</p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="text-forest hover:text-teal mt-2 block text-[0.9375rem] break-words transition-colors duration-300"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-forest mt-2 text-[0.9375rem] leading-relaxed">
                        {detail.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-label text-forest/55 text-[0.8rem] font-bold tracking-[0.16em] uppercase"
      >
        {label}
        {required ? (
          <span aria-hidden className="text-teal ml-1">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[0.82rem] text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
