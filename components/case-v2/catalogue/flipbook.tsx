"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  List,
  Maximize2,
  Search,
  Volume2,
  VolumeX,
  X,
  ZoomIn,
} from "lucide-react";
import { products, type Product } from "./products";
import {
  BackCover,
  Brands,
  Cover,
  Divider,
  Editorial,
  FormatPage,
  FullBleed,
  Grid,
  Sommaire,
  PAGE_W,
  PAGE_H,
  PH,
} from "./pages";
import { useFlipSound } from "./flip-sound";
import { Book, type BookHandle } from "./book";

const TITLE = "CATALOGUE SOUSS DROGUERIE 2026";
const PER_GRID = 9;

function readFormat(d?: string | null): [number, number] | null {
  const m = d?.match(/format\s+(\d+)\s*[×x]\s*(\d+)/i);
  return m ? [Number(m[1]), Number(m[2])] : null;
}
function readOrigin(d?: string | null): string | null {
  const m = d?.match(/-\s*([^.]+)\./);
  return m ? m[1].trim() : null;
}
const fmtKey = (f: [number, number]) => `${f[0]}×${f[1]}`;

const FORMAT_PHOTO: Record<string, { photo: string; caption: string }> = {
  "19×57": {
    photo: `${PH}showroom-gayafores.webp`,
    caption: "Présentoirs Gayaforés · showroom Dcheira",
  },
  "20×60": {
    photo: `${PH}ambiance-bois-restaurant.webp`,
    caption: "Carreau effet bois 20×60 · restaurant",
  },
  "20×120": {
    photo: `${PH}ambiance-cuisine.webp`,
    caption: "Grand format effet bois · cuisine ouverte",
  },
  "25×75": { photo: `${PH}showroom-multicerame.webp`, caption: "Multicérame & Argenta · 25×75 mat" },
  "25×50": { photo: `${PH}ambiance-sdb.webp`, caption: "Faïence murale · salle de bain" },
  "30×60": { photo: `${PH}ambiance-sdb-rose.webp`, caption: "Marbré rosé 30×60 · salle de bain" },
  "30×90": { photo: `${PH}showroom-deco.webp`, caption: "Décors et listels · présentoir Gayaforés" },
  "45×45": { photo: `${PH}ambiance-salon.webp`, caption: "Effet parquet 45×45 · séjour" },
  "41×41": { photo: `${PH}showroom-cerpa.webp`, caption: "Présentoirs Cerpa · formats carrés" },
  "60×60": {
    photo: `${PH}ambiance-reception.webp`,
    caption: "Marbré poli 60×60 · réception d'hôtel",
  },
  "120×60": { photo: `${PH}showroom-premium.webp`, caption: "Multicérame Premium · grands formats" },
  "240×120": { photo: `${PH}beton-cire.webp`, caption: "Dalle grand format · effet béton ciré" },
};

const FAMILY_PHOTO: Record<string, string> = {
  Céramique: `${PH}showroom-premium.webp`,
  Carrelage: `${PH}showroom-deco.webp`,
  Marbre: `${PH}ambiance-reception.webp`,
  Zellige: `${PH}ambiance-sdb.webp`,
  "Sanitaire, Robinetterie, Plomberie": `${PH}showroom-sanitaire.webp`,
  Plomberie: `${PH}showroom-sanitaire.webp`,
  "Ciment Colle & Mortiers": `${PH}ciment-colle.webp`,
  "Béton Armé, Ciments, Agrégats": `${PH}beton-cire.webp`,
  "Ciment & Granulats": `${PH}beton-cire.webp`,
  "Plâtres, Mono & Bicouche": `${PH}ambiance-salon.webp`,
  Plâtre: `${PH}ambiance-salon.webp`,
  "Peinture & Décoration": `${PH}ambiance-cuisine.webp`,
  Peinture: `${PH}ambiance-cuisine.webp`,
  "Étanchéité, Isolation, Bitume": `${PH}beton-cire.webp`,
  "Fer à Béton, Treillis Soudé": `${PH}beton-cire.webp`,
  Métallurgie: `${PH}showroom-cerpa.webp`,
  "Produits Préfabriqués": `${PH}beton-cire.webp`,
  "Énergie Solaire, Électricité": `${PH}ambiance-cuisine.webp`,
  Électricité: `${PH}ambiance-cuisine.webp`,
  "Sécurité au travail": `${PH}showroom-gayafores.webp`,
};

const BLURB: Record<string, string> = {
  Céramique:
    "Du 19×57 effet parquet au 240×120 grand format. Collections exclusives, production nationale et importation, en mat, poli, semi-poli et relief.",
  "Sanitaire, Robinetterie, Plomberie":
    "Un choix complet d'équipements sanitaires et accessoires pour la salle de bain et la cuisine, alliant qualité, confort et design.",
  "Ciment Colle & Mortiers":
    "Produits de collage et de jointoiement de haute performance, pour une adhérence optimale et une durabilité maximale sur tous supports.",
  "Béton Armé, Ciments, Agrégats":
    "Une gamme diversifiée de matières premières sélectionnées pour accompagner vos travaux, du gros œuvre à la finition.",
  Métallurgie:
    "Fer, acier, tôles, tubes et profilés, répondant aux besoins des professionnels du BTP et de la construction métallique.",
  "Produits Préfabriqués":
    "Agglos, pavés autobloquants, hourdis, bordures et poutrelles précontraintes, garantissant solidité et fiabilité.",
  "Peinture & Décoration":
    "Peintures vinyliques, laquées, décoratives, aquatiques et alimentaires, pour apporter de l'esthétique à vos projets.",
  "Énergie Solaire, Électricité":
    "Chauffe-eaux, kits solaires, onduleurs, batteries et accessoires, pour un habitat plus économe et plus durable.",
  "Plâtres, Mono & Bicouche":
    "Plâtres et enduits projetés mono et bicouche, pour des surfaces régulières et durables, en intérieur comme en façade.",
  "Étanchéité, Isolation, Bitume":
    "Laine de verre, rouleaux bitumés et systèmes d'étanchéité répondant aux exigences d'imperméabilité et d'isolation.",
  "Fer à Béton, Treillis Soudé":
    "Indispensables au béton armé, ils assurent la résistance et la stabilité de vos ouvrages.",
};

const FAMILY_ORDER = [
  "Céramique",
  "Carrelage",
  "Marbre",
  "Zellige",
  "Ciment Colle & Mortiers",
  "Sanitaire, Robinetterie, Plomberie",
  "Plomberie",
  "Étanchéité, Isolation, Bitume",
  "Fer à Béton, Treillis Soudé",
  "Métallurgie",
  "Produits Préfabriqués",
  "Béton Armé, Ciments, Agrégats",
  "Ciment & Granulats",
  "Plâtres, Mono & Bicouche",
  "Plâtre",
  "Peinture & Décoration",
  "Peinture",
  "Énergie Solaire, Électricité",
  "Électricité",
  "Sécurité au travail",
];

const SHEETS =
  "repeating-linear-gradient(to right, rgba(0,0,0,.16) 0 1px, rgba(255,255,255,.92) 1px 3px)";

const TOOL =
  "grid h-9 w-9 place-items-center rounded transition-colors hover:bg-sd-mint hover:text-sd-brand";

function ToolButton({
  label,
  onClick,
  active,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`${TOOL} ${active ? "text-sd-brand" : "text-sd-ink-soft"}`}
    >
      {children}
    </button>
  );
}

const SETTINGS = {
  width: PAGE_W,
  height: PAGE_H,
  size: "fixed",
  minWidth: PAGE_W,
  maxWidth: PAGE_W,
  minHeight: PAGE_H,
  maxHeight: PAGE_H,
  usePortrait: true,
  drawShadow: true,
  flippingTime: 700,
  maxShadowOpacity: 0.4,
  showCover: true,
  mobileScrollSupport: true,
};

export default function Flipbook() {
  const bookRef = useRef<BookHandle | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [thumbs, setThumbs] = useState(false);
  const [finder, setFinder] = useState(false);
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  const [sound, setSound] = useState(true);
  const [fit, setFit] = useState(0.6);
  const [spread, setSpread] = useState(false);
  const playFlip = useFlipSound(sound);

  const { nodes, total, entries, index } = useMemo(() => {
    const enriched = products.map((p) => ({
      ...p,
      dims: readFormat(p.description),
      origin: readOrigin(p.description),
    }));

    const families = [...new Set(enriched.map((p) => p.category))].sort((a, b) => {
      const ia = FAMILY_ORDER.indexOf(a);
      const ib = FAMILY_ORDER.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
    });

    const nodes: ReactNode[] = [];
    const entries: { label: string; page: number; note?: string }[] = [];
    const index: { name: string; category: string; page: number }[] = [];
    let n = 1;

    nodes.push(<Cover key="cover" />);
    n++;

    nodes.push(
      <Editorial
        key="mot"
        page={n}
        kicker="Mot du directeur"
        light="Construire avec"
        bold="expérience"
        photo={`${PH}facade-jour.webp`}
        caption="Notre siège · 29 Bd Mohamed V, Dcheira - Inezgane"
        body={[
          "Chers clients et partenaires, depuis 1993 Souss Droguerie accompagne les professionnels et les particuliers dans leurs projets de construction à travers une offre complète de matériaux fiables et performants.",
          "Notre priorité a toujours été d'apporter qualité, disponibilité et conseil technique afin de garantir la réussite de vos réalisations, du gros œuvre à la finition.",
          "Nous remercions l'ensemble de nos clients, partenaires et collaborateurs pour leur confiance continue.",
        ]}
        signature="La Direction"
      />,
    );
    n++;

    nodes.push(
      <Brands
        key="brands"
        page={n}
        stats={[
          [String(products.length), "Références"],
          [String(families.length), "Familles"],
          ["1993", "Depuis"],
        ]}
        brands={[
          "Gayaforés",
          "Multicérame",
          "Argenta",
          "Cerpa",
          "Somalaval",
          "Daoud Building",
          "Super Cérame",
          "Sika Maroc",
          "Lafarge Holcim",
          "Ciment du Maroc",
        ]}
      />,
    );
    n++;

    const sommaireAt = nodes.length;
    nodes.push(<Sommaire key="sommaire" page={n} entries={[]} />);
    n++;

    nodes.push(
      <FullBleed
        key="ouverture"
        page={n}
        photo={`${PH}beton-cire.webp`}
        quote="Chaque chantier commence par le choix d'une matière."
        caption="Effet béton ciré · grand format"
      />,
    );
    n++;

    families.forEach((fam, fi) => {
      const group = enriched.filter((p) => p.category === fam);
      entries.push({ label: fam, page: n, note: `${group.length} réf.` });

      nodes.push(
        <Divider
          key={`d-${fam}`}
          index={fi + 1}
          category={fam}
          count={group.length}
          page={n}
          photo={FAMILY_PHOTO[fam] ?? `${PH}showroom-gayafores.webp`}
          blurb={
            BLURB[fam] ??
            "Une sélection de références disponibles en stock sur nos dépôts d'Agadir, Inezgane et Ait Melloul."
          }
        />,
      );
      n++;

      const byFormat = new Map<string, typeof group>();
      for (const p of group) {
        if (!p.dims) continue;
        const k = fmtKey(p.dims);
        byFormat.set(k, [...(byFormat.get(k) ?? []), p]);
      }
      const allFormats = [...byFormat.keys()]
        .map((k) => k.split("×").map(Number) as [number, number])
        .sort((a, b) => b[0] * b[1] - a[0] * a[1]);

      const formatted = new Set<string>();
      for (const [key, items] of [...byFormat.entries()].sort(
        (a, b) => b[1].length - a[1].length,
      )) {
        if (items.length < 3) continue;
        const meta = FORMAT_PHOTO[key];
        for (const it of items) {
          index.push({ name: it.name, category: fam, page: n });
          formatted.add(it.name);
        }
        nodes.push(
          <FormatPage
            key={`fmt-${fam}-${key}`}
            page={n}
            family={fam}
            origin={items[0].origin ?? fam}
            format={`${key} cm`}
            dims={key.split("×").map(Number) as [number, number]}
            items={items as Product[]}
            photo={meta?.photo}
            caption={meta?.caption}
            allFormats={allFormats}
          />,
        );
        n++;
      }

      const rest = group.filter((p) => !formatted.has(p.name));
      for (let i = 0; i < rest.length; i += PER_GRID) {
        const slice = rest.slice(i, i + PER_GRID);
        for (const it of slice) index.push({ name: it.name, category: fam, page: n });
        nodes.push(
          <Grid key={`g-${fam}-${i}`} category={fam} items={slice as Product[]} page={n} />,
        );
        n++;
      }
    });

    nodes[sommaireAt] = <Sommaire key="sommaire" page={4} entries={entries} />;
    nodes.push(<BackCover key="back" page={n} />);

    // A bound book has an even page count.
    if (nodes.length % 2 !== 0)
      nodes.splice(nodes.length - 1, 0, <Grid key="pad" category="" items={[]} page={n} />);

    return { nodes, total: nodes.length, entries, index };
  }, []);

  const flip = useCallback(
    (to: number) => bookRef.current?.pageFlip()?.flip(Math.min(Math.max(to, 0), total - 1)),
    [total],
  );
  const onFlip = useCallback(
    (to: number) => {
      setPage(to);
      playFlip();
    },
    [playFlip],
  );
  const next = useCallback(() => bookRef.current?.pageFlip()?.flipNext(), []);
  const prev = useCallback(() => bookRef.current?.pageFlip()?.flipPrev(), []);

  // Arrow keys only while the reader is pointed at, focused or fullscreen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const shell = shellRef.current;
      if (!shell) return;
      const here =
        shell.matches(":hover") ||
        shell.contains(document.activeElement) ||
        document.fullscreenElement === shell;
      if (!here || (e.target as HTMLElement).tagName === "INPUT") return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") {
        setThumbs(false);
        setFinder(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter((i) => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q))
      .slice(0, 12);
  }, [query, index]);

  // Pages are laid out at a fixed 500 × 707 and the whole book is scaled to the stage.
  // Two pages side by side only when the stage is wide enough, e.g. in fullscreen.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const h = Math.max(240, r.height - 12) / PAGE_H;
      const one = Math.min(h, Math.max(240, r.width - 8) / PAGE_W);
      const two = Math.min(h, Math.max(240, r.width - 72) / (PAGE_W * 2));
      const wide = two >= one * 0.85;
      setSpread(wide);
      setFit(wide ? two : one);
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const later = () => {
      measure();
      requestAnimationFrame(measure);
      setTimeout(measure, 120);
      setTimeout(measure, 400);
    };
    document.addEventListener("fullscreenchange", later);
    return () => {
      ro.disconnect();
      document.removeEventListener("fullscreenchange", later);
    };
  }, []);

  // page-flip picks portrait or landscape from its box width: re-read it when the box changes.
  useEffect(() => {
    bookRef.current?.pageFlip()?.update();
  }, [spread]);

  const solo = page === 0 || page >= total - 1 || !spread;
  const w = PAGE_W;
  const h = PAGE_H;
  const k = fit * zoom;

  const progress = total > 1 ? page / (total - 1) : 0;
  const stackL = Math.round(2 + progress * 13);
  const stackR = Math.round(2 + (1 - progress) * 13);

  const fullscreen = () => {
    const el = shellRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  };

  return (
    <div
      ref={shellRef}
      className="relative flex h-full w-full flex-col overflow-hidden bg-sd-ground font-sans leading-normal text-sd-ink [&:fullscreen]:h-screen"
    >
      <div className="flex items-center justify-between gap-3 px-5 pb-2 pt-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="truncate text-[12px] font-semibold tracking-[0.02em] text-sd-ink">
            {TITLE}
          </span>
          <span className="shrink-0 rounded bg-sd-mint px-2.5 py-1 text-[11px] tabular-nums text-sd-ink">
            {solo
              ? `page ${page + 1} sur ${total}`
              : `pages ${page + 1} - ${Math.min(page + 2, total)} sur ${total}`}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setFinder((v) => !v)}
          aria-label="Rechercher"
          className={`${TOOL} shrink-0 text-sd-ink-soft`}
        >
          <Search className="h-[18px] w-[18px]" />
        </button>
      </div>

      <div
        ref={stageRef}
        className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-2 sm:px-12"
      >
        <button
          type="button"
          onClick={prev}
          disabled={page === 0}
          aria-label="Page précédente"
          className="absolute left-1 z-10 grid h-14 w-9 place-items-center text-sd-ink-soft/50 transition-colors hover:text-sd-ink disabled:opacity-20 sm:left-4"
        >
          <ChevronLeft className="h-9 w-9" strokeWidth={1.2} />
        </button>

        <div
          className="relative shrink-0 transition-[width,height] duration-500"
          style={{ width: (solo ? w : w * 2) * k, height: h * k }}
        >
          {spread && !solo && (
            <>
              <div
                className="pointer-events-none absolute top-[1%] z-10 h-[98%] rounded-l-sm shadow-[-2px_0_6px_-2px_rgba(0,0,0,.25)] transition-[width] duration-500"
                style={{ right: "100%", width: stackL, backgroundImage: SHEETS }}
              />
              <div
                className="pointer-events-none absolute top-[1%] z-10 h-[98%] rounded-r-sm shadow-[2px_0_6px_-2px_rgba(0,0,0,.25)] transition-[width] duration-500"
                style={{ left: "100%", width: stackR, backgroundImage: SHEETS }}
              />
            </>
          )}

          <div className="overflow-hidden" style={{ width: (solo ? w : w * 2) * k, height: h * k }}>
            <div
              className="origin-top-left shadow-[0_30px_70px_-30px_rgba(17,17,20,0.55)] transition-transform duration-500"
              style={{
                width: spread ? w * 2 : w,
                transform: `scale(${k}) translateX(${spread && page === 0 ? -w : 0}px)`,
              }}
            >
              <Book ref={bookRef} settings={SETTINGS} onFlip={onFlip}>
                {nodes}
              </Book>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          disabled={page >= total - 1}
          aria-label="Page suivante"
          className="absolute right-1 z-10 grid h-14 w-9 place-items-center text-sd-ink-soft/50 transition-colors hover:text-sd-ink disabled:opacity-20 sm:right-4"
        >
          <ChevronRight className="h-9 w-9" strokeWidth={1.2} />
        </button>
      </div>

      <div className="relative flex items-center justify-center px-5 pb-3 pt-2">
        <button
          type="button"
          onClick={() => flip(0)}
          aria-label="Première page"
          className={`${TOOL} absolute left-5 text-sd-ink-soft`}
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1">
          <ToolButton label="Sommaire" onClick={() => setThumbs(true)}>
            <List className="h-[18px] w-[18px]" />
          </ToolButton>
          <span className="mx-1.5 h-5 w-px bg-sd-line" />
          <ToolButton
            label={sound ? "Couper le son" : "Activer le son"}
            onClick={() => setSound((s) => !s)}
            active={sound}
          >
            {sound ? <Volume2 className="h-[18px] w-[18px]" /> : <VolumeX className="h-[18px] w-[18px]" />}
          </ToolButton>
          <ToolButton
            label="Agrandir"
            onClick={() => setZoom((z) => (z >= 1.5 ? 1 : Math.round((z + 0.25) * 100) / 100))}
            active={zoom > 1}
          >
            <ZoomIn className="h-[18px] w-[18px]" />
          </ToolButton>
          <ToolButton label="Plein écran" onClick={fullscreen}>
            <Maximize2 className="h-[18px] w-[18px]" />
          </ToolButton>
        </div>

        <button
          type="button"
          onClick={() => flip(total - 1)}
          aria-label="Dernière page"
          className={`${TOOL} absolute right-5 text-sd-ink-soft`}
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>

      {finder && (
        <div className="absolute right-5 top-14 z-30 w-[min(320px,90%)] rounded-lg border border-sd-line bg-sd-paper p-3 shadow-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-sd-ink-soft" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Référence ou famille…"
              className="w-full rounded border border-sd-line bg-sd-cream py-2 pl-9 pr-3 text-sm outline-none focus:border-sd-brand"
            />
          </div>
          {query && (
            <ul className="mt-2 max-h-64 overflow-y-auto">
              {results.length === 0 && (
                <li className="px-2 py-3 text-xs text-sd-ink-soft">Aucun résultat.</li>
              )}
              {results.map((r, i) => (
                <li key={`${r.name}-${i}`}>
                  <button
                    type="button"
                    onClick={() => {
                      flip(r.page - 1);
                      setFinder(false);
                      setQuery("");
                    }}
                    className="flex w-full items-baseline justify-between gap-3 rounded px-2 py-1.5 text-left transition hover:bg-sd-cream"
                  >
                    <span className="truncate text-xs font-medium text-sd-ink">{r.name}</span>
                    <span className="shrink-0 text-[10px] tabular-nums text-sd-ink-soft">
                      p. {r.page}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {thumbs && (
        <div className="absolute inset-0 z-40 overflow-y-auto bg-sd-ink/95 p-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sd-paper">
                Sommaire
              </p>
              <button
                type="button"
                onClick={() => setThumbs(false)}
                aria-label="Fermer"
                className="grid h-9 w-9 place-items-center rounded-full border border-sd-paper/30 text-sd-paper transition hover:bg-sd-paper/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul>
              {entries.map((e) => (
                <li key={e.label}>
                  <button
                    type="button"
                    onClick={() => {
                      flip(e.page - 1);
                      setThumbs(false);
                    }}
                    className="flex w-full items-baseline gap-3 border-b border-sd-paper/10 py-2.5 text-left transition hover:border-sd-red"
                  >
                    <span className="text-[13px] font-medium text-sd-paper">{e.label}</span>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-sd-sky">
                      {e.note}
                    </span>
                    <span className="mx-1 flex-1 border-b border-dotted border-sd-paper/20" />
                    <span className="text-[12px] font-bold tabular-nums text-sd-paper">
                      {String(e.page).padStart(2, "0")}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
