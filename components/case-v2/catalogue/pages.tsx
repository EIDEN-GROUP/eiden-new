import { forwardRef, type CSSProperties, type ReactNode } from "react";
import { Fraunces } from "next/font/google";
import { products, type Product } from "./products";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
});

export const SERIF = fraunces.className;

export const PAGE_W = 500;
export const PAGE_H = 707;

const ROOT = "/work/droguerie-souss/catalogue/";
export const PH = `${ROOT}photos/`;
const SHOTS = `${ROOT}products/`;
const LOGO = `${ROOT}logo.png`;

/* ─────────── primitives */

export const Sheet = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  function Sheet({ children, className = "" }, ref) {
    return (
      <div ref={ref} className="h-full w-full bg-sd-paper">
        <div className={`relative h-full w-full overflow-hidden ${className}`}>
          {children}
          {/* gutter shadow travels with the sheet as it turns */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              boxShadow:
                "inset 14px 0 22px -16px rgba(0,0,0,.55), inset -14px 0 22px -16px rgba(0,0,0,.55)",
            }}
          />
        </div>
      </div>
    );
  },
);

export const FOLIO_H = 34;

function Folio({ n, label, light }: { n: number; label?: string; light?: boolean }) {
  return (
    <div
      className={`absolute inset-x-8 bottom-4 z-30 flex items-end justify-between text-[8px] uppercase tracking-[0.2em] ${
        light ? "text-sd-paper/60" : "text-sd-ink-soft"
      }`}
    >
      <span className="truncate pr-4">{label ?? "Souss Droguerie · Catalogue 2026"}</span>
      <span className={`font-semibold tabular-nums ${light ? "text-sd-paper" : "text-sd-brand"}`}>
        {String(n).padStart(2, "0")}
      </span>
    </div>
  );
}

function Title({
  light,
  bold,
  size = "text-[30px]",
  tone = "text-sd-ink",
}: {
  light: string;
  bold: string;
  size?: string;
  tone?: string;
}) {
  return (
    <h2 className={`${SERIF} ${size} ${tone} leading-[0.95] tracking-[-0.035em]`}>
      <span className="font-light">{light} </span>
      <span className="font-extrabold">{bold}</span>
    </h2>
  );
}

function Kicker({ children, tone = "text-sd-red" }: { children: ReactNode; tone?: string }) {
  return <p className={`text-[7.5px] font-bold uppercase tracking-[0.26em] ${tone}`}>{children}</p>;
}

function Rule({ tone = "bg-sd-red" }: { tone?: string }) {
  return <span className={`block h-[2px] w-9 ${tone}`} />;
}

function Ghost({
  n,
  className = "",
  style,
}: {
  n: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none select-none font-extrabold leading-none tracking-[-0.05em] ${className}`}
      style={{
        WebkitTextStrokeWidth: "1.4px",
        WebkitTextStrokeColor: "currentColor",
        color: "transparent",
        ...style,
      }}
    >
      {n}
    </span>
  );
}

function Photo({
  src,
  alt = "",
  className = "",
  fit = "cover",
  style,
}: {
  src?: string | null;
  alt?: string;
  className?: string;
  fit?: "cover" | "contain";
  style?: CSSProperties;
}) {
  if (!src)
    return (
      <div className={`flex items-center justify-center bg-sd-mint ${className}`} style={style}>
        <span className="text-[7px] uppercase tracking-[0.24em] text-sd-sky">Visuel à venir</span>
      </div>
    );
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      style={style}
      className={`${className} ${fit === "cover" ? "object-cover" : "object-contain"}`}
    />
  );
}

function Caption({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`mt-1.5 text-[7px] uppercase tracking-[0.16em] ${
        light ? "text-sd-paper/70" : "text-sd-ink-soft"
      }`}
    >
      {children}
    </p>
  );
}

function Logo({ width }: { width: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO}
      alt="Souss Droguerie"
      width={2337}
      height={1102}
      draggable={false}
      className="h-auto shrink-0 self-start brightness-0 invert"
      style={{ width }}
    />
  );
}

/* ─────────── couverture */

export const Cover = forwardRef<HTMLDivElement, object>(function Cover(_, ref) {
  return (
    <Sheet ref={ref}>
      <div className="relative flex h-full flex-col">
        <Photo
          src={`${PH}cover.webp`}
          alt="Siège de Sté. Souss Droguerie, Dcheira - Inezgane"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sd-navy/60 via-sd-navy/25 to-sd-navy/95" />
        <div className="absolute left-0 top-0 h-full w-[7px] bg-sd-red" />

        <div className="relative flex h-full flex-col px-9 pt-10 text-sd-paper">
          <Logo width={150} />
          <p className="mt-2 text-[7.5px] uppercase tracking-[0.3em] text-sd-paper/70">
            Matériaux de construction · Agadir
          </p>

          <div className="mt-auto pb-2">
            <Kicker tone="text-sd-paper/70">Édition 2026</Kicker>
            <h1 className={`${SERIF} mt-3 leading-[0.88] tracking-[-0.045em]`}>
              <span className="block text-[52px] font-extrabold">Catalogue</span>
              <span className="block text-[52px] font-light italic">Général</span>
            </h1>
            <div className="mt-5 flex items-center gap-4">
              <span className="h-px flex-1 bg-sd-paper/30" />
              <span className="border border-sd-paper/40 px-3 py-1 text-[8px] tracking-[0.3em]">
                DEPUIS 1993
              </span>
            </div>
            <p className="mt-6 max-w-[80%] text-[9px] leading-[1.7] text-sd-paper/75">
              Céramique, sanitaire, ciments, métallurgie, peinture et électricité. Distributeur
              agréé dans la région du Souss Massa.
            </p>
          </div>

          <div className="mt-6 border-t border-sd-paper/20 pb-8 pt-3">
            <p className="text-[7.5px] uppercase tracking-[0.24em] text-sd-paper/60">
              www.soussdroguerie.com
            </p>
          </div>
        </div>
      </div>
    </Sheet>
  );
});

/* ─────────── mot du directeur */

export const Editorial = forwardRef<
  HTMLDivElement,
  {
    page: number;
    kicker: string;
    light: string;
    bold: string;
    body: string[];
    photo: string;
    caption: string;
    signature?: string;
  }
>(function Editorial({ page, kicker, light, bold, body, photo, caption, signature }, ref) {
  return (
    <Sheet ref={ref}>
      <div className="flex h-full flex-col">
        <div className="relative h-[42%] w-full">
          <Photo src={photo} className="h-full w-full" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sd-ink/70 to-transparent px-8 pb-3 pt-10">
            <Caption light>{caption}</Caption>
          </div>
        </div>
        <div
          className="flex min-h-0 flex-1 flex-col overflow-hidden px-9 pt-7"
          style={{ paddingBottom: FOLIO_H }}
        >
          <Kicker>{kicker}</Kicker>
          <div className="mt-2.5">
            <Title light={light} bold={bold} size="text-[26px]" />
          </div>
          <div className="mt-2.5">
            <Rule />
          </div>
          <div className="mt-4 space-y-2.5">
            {body.map((t, i) => (
              <p key={i} className="text-[8.5px] leading-[1.75] text-sd-ink-soft">
                {t}
              </p>
            ))}
          </div>
          {signature && (
            <p className="mt-auto text-[8px] font-bold uppercase tracking-[0.2em] text-sd-brand">
              {signature}
            </p>
          )}
        </div>
      </div>
      <Folio n={page} label="L'entreprise" />
    </Sheet>
  );
});

/* ─────────── chiffres + marques */

export const Brands = forwardRef<
  HTMLDivElement,
  { page: number; stats: [string, string][]; brands: string[] }
>(function Brands({ page, stats, brands }, ref) {
  return (
    <Sheet ref={ref}>
      <div
        className="flex h-full flex-col overflow-hidden px-9 pt-11"
        style={{ paddingBottom: FOLIO_H }}
      >
        <Kicker>En quelques chiffres</Kicker>
        <div className="mt-2.5">
          <Title light="Notre" bold="maison" size="text-[26px]" />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-px bg-sd-line">
          {stats.map(([v, l]) => (
            <div key={l} className="bg-sd-paper px-2 py-4">
              <div className="text-[24px] font-extrabold leading-none tracking-[-0.04em] text-sd-brand">
                {v}
              </div>
              <div className="mt-1.5 text-[6.5px] font-bold uppercase tracking-[0.18em] text-sd-ink-soft">
                {l}
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-6 h-[28%] w-full">
          <Photo
            src={`${PH}showroom-multicerame.webp`}
            alt="Présentoirs Multicérame et Argenta, showroom de Dcheira"
            className="h-full w-full"
          />
        </div>
        <Caption>Présentoirs Multicérame &amp; Argenta · notre showroom</Caption>

        <div className="mt-5">
          <Kicker>Marques distribuées</Kicker>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-[5px]">
            {brands.map((b) => (
              <div key={b} className="flex items-baseline gap-2 border-b border-sd-line pb-[4px]">
                <span className="h-[5px] w-[5px] shrink-0 bg-sd-red" />
                <span className="truncate text-[8px] font-medium text-sd-ink">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Folio n={page} label="Nos partenaires" />
    </Sheet>
  );
});

/* ─────────── sommaire */

export const Sommaire = forwardRef<
  HTMLDivElement,
  { page: number; entries: { label: string; page: number; note?: string }[] }
>(function Sommaire({ page, entries }, ref) {
  return (
    <Sheet ref={ref}>
      <div
        className="flex h-full flex-col overflow-hidden px-9 pt-11"
        style={{ paddingBottom: FOLIO_H }}
      >
        <Kicker>Dans ce catalogue</Kicker>
        <div className="mt-2.5">
          <Title light="Le" bold="sommaire" size="text-[26px]" />
        </div>
        <div className="mt-2.5">
          <Rule />
        </div>
        <ul className="mt-6 space-y-[7px]">
          {entries.map((e) => (
            <li key={e.label} className="flex items-baseline gap-2.5">
              <span className="text-[9px] font-medium text-sd-ink">{e.label}</span>
              {e.note && (
                <span className="text-[7px] uppercase tracking-[0.14em] text-sd-ink-soft">
                  {e.note}
                </span>
              )}
              <span className="mx-1 flex-1 border-b border-dotted border-sd-line" />
              <span className="text-[8.5px] font-bold tabular-nums text-sd-brand">
                {String(e.page).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-auto text-[7.5px] leading-[1.7] text-sd-ink-soft">
          {"Prix sur demande. Chaque référence fait l'objet d'un devis nominatif établi sous 24 heures."}
        </p>
      </div>
      <Folio n={page} label="Sommaire" />
    </Sheet>
  );
});

/* ─────────── page pleine image */

export const FullBleed = forwardRef<
  HTMLDivElement,
  { photo: string; caption?: string; quote?: string; page: number }
>(function FullBleed({ photo, caption, quote, page }, ref) {
  return (
    <Sheet ref={ref}>
      <div className="relative h-full">
        <Photo src={photo} className="h-full w-full" />
        {quote && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-sd-ink/80 via-transparent to-transparent" />
            <div className="absolute inset-x-9 bottom-14">
              <p className={`${SERIF} text-[19px] font-light italic leading-[1.35] text-sd-paper`}>
                {quote}
              </p>
            </div>
          </>
        )}
        {caption && (
          <div className="absolute inset-x-9 bottom-7">
            <Caption light>{caption}</Caption>
          </div>
        )}
      </div>
      <Folio n={page} light />
    </Sheet>
  );
});

/* ─────────── ouverture de famille */

export const Divider = forwardRef<
  HTMLDivElement,
  { index: number; category: string; count: number; page: number; photo: string; blurb: string }
>(function Divider({ index, category, count, page, photo, blurb }, ref) {
  const num = String(index).padStart(2, "0");
  return (
    <Sheet ref={ref}>
      <div className="relative flex h-full flex-col">
        <div className="relative h-[52%] w-full shrink-0 overflow-hidden">
          <Photo src={photo} alt={category} className="h-full w-full" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-sd-navy" />
        </div>

        <div className="relative flex flex-1 flex-col bg-sd-navy px-9 pt-9 text-sd-paper">
          <Kicker tone="text-sd-red">Famille {num}</Kicker>
          <div className="mt-3">
            <Title light="La gamme" bold={category} size="text-[27px]" tone="text-sd-paper" />
          </div>
          <div className="mt-3">
            <Rule />
          </div>
          <p className="mt-5 max-w-[74%] text-[9px] leading-[1.75] text-sd-paper/70">{blurb}</p>
          <p className="mt-auto pb-8 text-[8px] uppercase tracking-[0.24em] text-sd-paper/45">
            {count} référence{count > 1 ? "s" : ""}
          </p>
        </div>

        <Ghost
          n={num}
          className="absolute right-7 text-[128px] text-sd-paper/70"
          style={{ top: "52%", transform: "translateY(-58%)" }}
        />
        <div className="absolute left-0 top-0 h-full w-[6px] bg-sd-red" />
      </div>
      <Folio n={page} label={category} light />
    </Sheet>
  );
});

/* ─────────── page format */

export const FormatPage = forwardRef<
  HTMLDivElement,
  {
    page: number;
    family: string;
    origin: string;
    format: string;
    dims: [number, number] | null;
    items: Product[];
    photo?: string;
    caption?: string;
    allFormats: [number, number][];
  }
>(function FormatPage(
  { page, family, origin, format, dims, items, photo, caption, allFormats },
  ref,
) {
  const biggest = allFormats.length ? Math.max(...allFormats.map(([w, h]) => w * h)) : 1;
  return (
    <Sheet ref={ref}>
      <div className="flex h-full flex-col">
        {photo && (
          <div className="relative h-[34%] w-full">
            <Photo src={photo} className="h-full w-full" />
            {caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sd-ink/75 to-transparent px-8 pb-2.5 pt-9">
                <Caption light>{caption}</Caption>
              </div>
            )}
          </div>
        )}

        <div
          className="flex min-h-0 flex-1 flex-col overflow-hidden px-8 pt-6"
          style={{ paddingBottom: FOLIO_H }}
        >
          <div className="flex shrink-0 items-start justify-between">
            <div>
              <Kicker>{origin}</Kicker>
              <div className="mt-2">
                <Title light="Format" bold={format} size="text-[26px]" />
              </div>
            </div>
            <span className="mt-1 text-[7px] uppercase tracking-[0.18em] text-sd-ink-soft">
              {items.length} réf.
            </span>
          </div>

          <div className="mt-4 grid shrink-0 grid-cols-3 gap-x-3 gap-y-3">
            {items.slice(0, 6).map((p) => (
              <figure key={p.name} className="min-w-0">
                <Photo
                  src={p.image ? `${SHOTS}${p.image}` : null}
                  alt={p.name}
                  className="w-full border border-sd-line"
                  style={{
                    aspectRatio: dims ? `${dims[0]} / ${dims[1]}` : "4 / 3",
                    maxHeight: 62,
                  }}
                />
                <figcaption className="mt-1 truncate text-[7.5px] font-semibold text-sd-ink">
                  {p.name}
                </figcaption>
              </figure>
            ))}
          </div>

          {allFormats.length > 1 && (
            <div className="mt-auto shrink-0 pt-3">
              <p className="mb-2 text-[6.5px] font-bold uppercase tracking-[0.2em] text-sd-ink">
                Formats de la gamme
              </p>
              <div className="flex flex-wrap items-end gap-x-2 gap-y-3">
                {allFormats.slice(0, 6).map(([w, h]) => {
                  const s = Math.sqrt((w * h) / biggest);
                  const long = Math.max(w, h);
                  const on = dims && dims[0] === w && dims[1] === h;
                  return (
                    <div
                      key={`${w}x${h}`}
                      className="flex min-w-[34px] shrink-0 flex-col items-center"
                    >
                      <div
                        className={on ? "bg-sd-brand" : "border border-sd-ink-soft/60"}
                        style={{
                          width: Math.max(4, 34 * s * (w / long)),
                          height: Math.max(4, 34 * s * (h / long)),
                        }}
                      />
                      <span
                        className={`mt-[3px] whitespace-nowrap text-[5.5px] leading-none tabular-nums ${
                          on ? "font-bold text-sd-brand" : "text-sd-ink-soft"
                        }`}
                      >
                        {w}×{h}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <Folio n={page} label={family} />
    </Sheet>
  );
});

/* ─────────── planche de références */

export const Grid = forwardRef<
  HTMLDivElement,
  { category: string; items: Product[]; page: number }
>(function Grid({ category, items, page }, ref) {
  return (
    <Sheet ref={ref}>
      <div
        className="flex h-full flex-col overflow-hidden px-8 pt-10"
        style={{ paddingBottom: FOLIO_H }}
      >
        <div className="flex shrink-0 items-baseline justify-between border-b-2 border-sd-brand pb-2">
          <Title light="La gamme" bold={category} size="text-[14px]" />
          <span className="text-[7px] uppercase tracking-[0.2em] text-sd-ink-soft">
            {items.length} références
          </span>
        </div>
        <div className="mt-4 grid min-h-0 grid-cols-3 content-start gap-x-3 gap-y-3 overflow-hidden">
          {items.map((p) => (
            <figure key={p.name} className="min-w-0">
              <Photo
                src={p.image ? `${SHOTS}${p.image}` : null}
                alt={p.name}
                className="w-full border border-sd-line"
                style={{ aspectRatio: "4 / 3", maxHeight: 94 }}
              />
              <figcaption className="mt-1.5">
                <p className="truncate text-[8px] font-semibold leading-tight text-sd-ink">
                  {p.name}
                </p>
                <p className="mt-[2px] line-clamp-2 text-[6px] leading-[1.45] text-sd-ink-soft">
                  {p.description}
                </p>
                <p className="mt-[3px] text-[6px] font-bold uppercase tracking-[0.14em] text-sd-red">
                  Sur devis{p.unit ? ` · ${p.unit}` : ""}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <Folio n={page} label={category} />
    </Sheet>
  );
});

/* ─────────── contact */

export const BackCover = forwardRef<HTMLDivElement, { page: number }>(function BackCover(
  { page },
  ref,
) {
  return (
    <Sheet ref={ref}>
      <div className="relative h-full">
        <Photo src={`${PH}ambiance-restaurant.webp`} className="h-full w-full" />
        <div className="absolute inset-0 bg-sd-navy/88" />
        <div className="absolute inset-0 flex flex-col px-9 pt-11 text-sd-paper">
          <Logo width={135} />
          <h2 className={`${SERIF} mt-7 leading-[0.9] tracking-[-0.04em]`}>
            <span className="block text-[30px] font-extrabold">Parlons de</span>
            <span className="block text-[34px] font-light italic">votre projet</span>
          </h2>
          <div className="mt-3">
            <Rule />
          </div>

          <dl className="mt-7 space-y-3.5 text-[9px]">
            {[
              ["Adresse", "29, Bd Mohamed V, Dcheira - Inezgane\nQI Tassila, 80360 · Agadir"],
              ["Fixe", "+212 528 83 66 91 · +212 528 83 89 92"],
              ["GSM / WhatsApp", "+212 661 55 54 63 · +212 661 84 77 59"],
              ["Email", "contact@soussdroguerie.com"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[6.5px] font-bold uppercase tracking-[0.22em] text-sd-sky">
                  {k}
                </dt>
                <dd className="mt-[3px] whitespace-pre-line leading-[1.6] text-sd-paper/90">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto pb-9">
            <span className="inline-block bg-sd-red px-5 py-2 text-[8px] font-bold uppercase tracking-[0.18em]">
              Devis sous 24 h
            </span>
            <p className="mt-4 text-[7px] uppercase tracking-[0.24em] text-sd-paper/55">
              www.soussdroguerie.com · {products.length} références
            </p>
          </div>
        </div>
      </div>
      <Folio n={page} light />
    </Sheet>
  );
});
