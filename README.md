# EIDEN GROUP   site web

Site vitrine bilingue (FR par défaut / EN) de l'agence digitale EIDEN GROUP,
basée à Agadir.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4**   tokens de marque déclarés dans `app/globals.css`
- **Framer Motion**   overlays et micro-interactions
- **Lenis**   défilement fluide
- **Lucide React**   icônes

## Démarrage

```bash
npm run dev
```

Autres scripts : `npm run build`, `npm run start`, `npm run lint`.

## Architecture

```
app/                    routes (une page par route, rendu statique)
  layout.tsx            polices, métadonnées, providers, header/footer
  globals.css           tokens de marque, utilitaires, keyframes, reveals
  page.tsx              accueil
  a-propos/ clients/ nos-solutions/ contact/
  robots.ts sitemap.ts

components/
  layout/               header, footer, loader, masthead des pages internes
  providers/            langue, motion, smooth scroll
  sections/             sections de l'accueil, réutilisables sur les autres pages
  ui/                   primitives (bouton, reveal, marquee, wordmark, glyphes)
  views/                composition des pages internes (client components)

lib/
  data/site.ts          coordonnées, routes, logos clients, études de cas
  i18n/fr.ts            contenu français   source de vérité
  i18n/en.ts            traduction anglaise, typée `Dictionary`
  hooks.ts              media query / scroll via `useSyncExternalStore`
  utils.ts              `cn()`
```

### Bilinguisme

Le français est la langue par défaut. `lib/i18n/en.ts` est typé
`Dictionary` (= `typeof fr`) : toute clé ajoutée en français doit être traduite
en anglais, sinon le projet ne compile pas.

La langue est stockée dans `localStorage` et lue via `useSyncExternalStore`, ce
qui évite tout décalage d'hydratation. `document.documentElement.lang` suit le
choix de l'utilisateur.

> Les métadonnées `<head>` (titre, description, Open Graph) sont rendues côté
> serveur en français. Pour des métadonnées traduites, il faudra passer à des
> routes localisées (`/en/...`).

### Animations et accessibilité

Les apparitions au défilement sont pilotées **en CSS**, pas en JavaScript :
l'état masqué n'existe que sous `@media (prefers-reduced-motion: no-preference)`.
Conséquence : les visiteurs qui demandent moins d'animations   et ceux dont le
JavaScript échoue   voient toujours un contenu entièrement rendu.

Un `<noscript>` dans `app/layout.tsx` couvre le cas sans JavaScript.

## Identité de marque

Couleurs et typographies proviennent du *EIDEN Brand Identity System v2.0* :

| Rôle              | Valeur                       |
| ----------------- | ---------------------------- |
| Canvas / Beige    | `#FEFDFB` / `#F4EBD0`        |
| Forest / Ink      | `#122620` / `#0A0F0C`        |
| EIDEN Teal        | `#0C5752` (accent, CTA)      |
| Authority Gold    | `#CFC292` (moments premium)  |
| Titres            | Outfit                       |
| Éditorial         | DM Serif Display             |
| Labels            | Cormorant Garamond           |
| Corps de texte    | Inter                        |

Le logo est vectorisé dans `public/brand/eiden-wordmark.svg` et appliqué en
masque CSS (`components/ui/wordmark.tsx`), ce qui le garde net à toute taille et
lui fait hériter de `currentColor`.

## À compléter avant mise en ligne

- **Chiffres**: les métriques des études de cas (`lib/data/site.ts`) et les
  statistiques (`lib/i18n/fr.ts` → `proof.stats`, `idea.stats`) sont éditoriales.
  Les remplacer par des valeurs vérifiées.
- **Tarifs**: les montants dans `pricing.plans` sont indicatifs.
- **Équipe**: la section équipe présente quatre pôles. Ajouter les personnes
  réelles (nom, rôle, photo) si souhaité.
- **Formulaire de contact**: il compose un e-mail via `mailto:` faute de backend.
  Brancher un Route Handler + fournisseur transactionnel pour un envoi direct.
- **Vidéo VSL**: `public/media/eiden-method.mp4` est un fichier temporaire.
