"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowUpRight,
  CalendarClock,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "message" | "detail", string>>;

const fieldClass =
  "w-full border-b border-ink/25 bg-transparent px-0 py-3 text-[0.9375rem] text-ink " +
  "placeholder:text-ink/30 transition-colors duration-300 " +
  "hover:border-ink/45 focus:border-teal focus:outline-none focus-visible:outline-none";

export function ContactView() {
  const { t, locale } = useLanguage();
  const page = t.pages.contact;
  const form = t.contact.form;
  const book = t.contact.book;
  const map = t.contact.map;

  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [subjectIndex, setSubjectIndex] = useState(0);

  const needsDetail = subjectIndex === form.subjects.length - 1;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = form.subjects[subjectIndex] ?? "";
    const detail = String(data.get("subjectDetail") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = form.required;
    if (!email) nextErrors.email = form.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      nextErrors.email = form.invalidEmail;
    if (!message) nextErrors.message = form.required;
    if (needsDetail && !detail) nextErrors.detail = form.required;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const body = [
      `${form.name}: ${name}`,
      company ? `${form.company}: ${company}` : null,
      `${form.email}: ${email}`,
      phone ? `${form.phone}: ${phone}` : null,
      `${form.subject}: ${subject}${detail ? `   ${detail}` : ""}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `${detail || subject}   ${name}`,
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
      label: `${t.contact.infoLabels.phone} | ${t.footer.phoneMaLabel}`,
      value: siteConfig.phoneMa,
      href: `tel:${siteConfig.phoneMa.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: t.contact.infoLabels.address,
      value: siteConfig.address,
    },
    // {
    //   icon: Clock,
    //   label: t.contact.infoLabels.hours,
    //   value: t.contact.hours,
    // },
  ];

  const bookingHref = `https://wa.me/${siteConfig.phoneMa.replace(/\D/g, "")}?text=${encodeURIComponent(
    book.whatsapp,
  )}`;

  const place = encodeURIComponent(siteConfig.address);
  const mapEmbed = `https://www.google.com/maps?q=${place}&hl=${locale}&z=15&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${place}`;

  return (
    <div data-nav-tone="light" className="bg-canvas text-ink">
      <section className="grain lg:px-24">
        <div className="container-eiden pt-32 pb-14 sm:pt-40 sm:pb-20">
          <Reveal direction="none" duration={0.5}>
            <p className="eyebrow text-teal flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              {page.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="text-ink mt-7 max-w-4xl text-[clamp(2.25rem,min(6vw,10.5vh),4.5rem)]">
              {page.title}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-ink/60 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              {page.lead}
            </p>
          </Reveal>
        </div>

        <div className="container-eiden pb-20 sm:pb-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
            <Reveal>
              <h2 className="font-label text-ink/45 text-[0.8rem] font-bold tracking-[0.2em] uppercase">
                {form.title}
              </h2>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-8 flex flex-col gap-7"
              >
                <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                  <Field id="name" label={form.name} error={errors.name} required>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={cn(fieldClass, errors.name && "border-red-400")}
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
                      className={cn(fieldClass, errors.email && "border-red-400")}
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
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={subjectIndex}
                      onChange={(event) =>
                        setSubjectIndex(Number(event.target.value))
                      }
                      className={cn(
                        fieldClass,
                        "[&_option]:bg-canvas [&_option]:text-ink appearance-none pr-8",
                      )}
                    >
                      {form.subjects.map((option, index) => (
                        <option key={option} value={index}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden
                      strokeWidth={1.8}
                      className="text-ink/45 pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2"
                    />
                  </div>
                </Field>

                {needsDetail ? (
                  <div className="animate-[eiden-fade-in_0.45s_var(--ease-brand)] motion-reduce:animate-none">
                    <Field
                      id="subjectDetail"
                      label={form.otherLabel}
                      error={errors.detail}
                      required
                    >
                      <input
                        id="subjectDetail"
                        name="subjectDetail"
                        type="text"
                        autoFocus
                        placeholder={form.otherPlaceholder}
                        className={cn(
                          fieldClass,
                          errors.detail && "border-red-400",
                        )}
                        aria-invalid={Boolean(errors.detail)}
                        aria-describedby={
                          errors.detail ? "subjectDetail-error" : undefined
                        }
                      />
                    </Field>
                  </div>
                ) : null}

                <Field
                  id="message"
                  label={form.message}
                  error={errors.message}
                  required
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder={form.messagePlaceholder}
                    className={cn(
                      fieldClass,
                      "resize-y",
                      errors.message && "border-red-400",
                    )}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                </Field>

                <div className="flex flex-wrap items-center gap-5 pt-2">
                  <Button type="submit" variant="light" size="lg">
                    {form.submit}
                  </Button>
                  <p aria-live="polite" className="text-teal text-[0.9375rem]">
                    {sent ? form.success : null}
                  </p>
                </div>
              </form>
            </Reveal>

            <Reveal delay={0.08} direction="left">
              <a
                href={bookingHref}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  "group border-ink/15 focus-visible:outline-teal flex flex-col items-center",
                  "glass-light rounded-[1.75rem] border px-8 py-12 text-center transition-colors duration-500 ease-[var(--ease-brand)]",
                  "hover:bg-beige hover:border-ink/30",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-10 sm:py-14",
                )}
              >
                <span className="relative flex size-40 items-center justify-center sm:size-44">
                  <Seal text={book.stamp} />
                  <CalendarClock
                    aria-hidden
                    strokeWidth={1.4}
                    className="text-ink group-hover:text-ink size-9 transition-[color,transform] duration-500 ease-[var(--ease-brand)] group-hover:scale-110 motion-reduce:transition-none"
                  />
                </span>

                <span className="font-display text-ink group-hover:text-ink mt-9 text-[clamp(1.25rem,2.4vw,1.65rem)] leading-tight font-extrabold tracking-[-0.02em] uppercase transition-colors duration-500 ease-[var(--ease-brand)]">
                  {book.title}
                </span>

                <span className="text-ink/55 group-hover:text-ink/60 mt-4 max-w-xs text-[0.9375rem] leading-relaxed transition-colors duration-500 ease-[var(--ease-brand)]">
                  {book.text}
                </span>
              </a>

              <ul className="divide-ink/10 border-ink/10 mt-10 flex flex-wrap justify-between divide-y border-t">
                {details.map((detail) => (
                  <li key={detail.label} className="flex items-start gap-4 py-5">
                    <detail.icon
                      className="text-teal mt-1 size-4 shrink-0"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <p className="eyebrow text-ink/35">{detail.label}</p>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="text-ink hover:text-teal mt-2 block text-[0.9375rem] break-words transition-colors duration-300"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-ink/75 mt-2 text-[0.9375rem] leading-relaxed">
                          {detail.value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-map-label">
        <div className="container-eiden flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pb-6">
          <p id="contact-map-label" className="eyebrow text-ink/35">
            {map.label}
          </p>
          <a
            href={mapLink}
            target="_blank"
            rel="noreferrer noopener"
            className="font-label text-ink/70 hover:text-teal inline-flex items-center gap-2 text-[0.8rem] font-bold tracking-[0.16em] uppercase transition-colors duration-300"
          >
            {map.action}
            <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
          </a>
        </div>

        <div className="border-ink/10 relative h-[68svh] max-h-[46rem] min-h-[22rem] w-full border-y sm:h-[76svh]">
          <iframe
            title={map.frameTitle}
            src={mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-night absolute inset-0 size-full border-0"
          />
        </div>
      </section>
    </div>
  );
}

function Seal({ text }: { text: string }) {
  const id = useId();
  const label = `${text} • ${text} • `;

  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden
      className="absolute inset-0 size-full animate-spin [animation-duration:26s] motion-reduce:animate-none"
    >
      <defs>
        <path id={id} fill="none" d="M 100 26 a 74 74 0 1 1 -0.01 0" />
      </defs>
      <text
        className="font-label fill-canvas/70 group-hover:fill-ink/75 transition-[fill] duration-500 ease-[var(--ease-brand)]"
        fontSize="12"
        fontWeight="700"
      >
        <textPath href={`#${id}`} textLength="465" lengthAdjust="spacing">
          {label.toUpperCase()}
        </textPath>
      </text>
    </svg>
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
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-label text-ink/45 text-[0.8rem] font-bold tracking-[0.16em] uppercase"
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
        <p id={`${id}-error`} className="text-[0.82rem] text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
