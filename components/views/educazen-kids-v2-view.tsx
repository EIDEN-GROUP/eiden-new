"use client";

import {
  BrandBoard,
  CaseV2,
  Caption,
  Chapter,
  FULL,
  Gallery,
  Grid,
  Hero,
  ImpactPanel,
  Pair,
  PaletteStage,
  Plate,
  RealityFracture,
  SignalsPanel,
  Slides,
  useSay,
  type NextProject,
  type Say,
} from "@/components/case-v2/kit";
import type { PaletteStory } from "@/lib/data/projects/types";

const CLIENT = "EducazenKids";
const YEAR = "2024";
const CATEGORY: Say = { fr: "Éducation", en: "Education" };
const LOCATION: Say = { fr: "Agadir, Maroc", en: "Agadir, Morocco" };
const SITE = "https://educazenkids.com";
const SOCIALS = {
  instagram: "https://www.instagram.com/educazenkids/",
  facebook: "https://www.facebook.com/p/Educazen-Kids-61563794544686/",
};

const HERO = {
  statement: {
    fr: "Que le dehors ressemble au dedans.",
    en: "Make the outside feel like the inside.",
  },
  intro: {
    fr: "Un centre qui change la vie d'enfants tous les jours, avec une présence digitale qui n'en montrait rien. Nous avons rafraîchi la marque et mis les inscriptions sur rails.",
    en: "A centre changing children's lives daily, with a digital presence that showed none of it. We refreshed the brand and put enrolment on rails.",
  },
  image: "/work/educazen-kids/educazen-hero.png",
  alt: {
    fr: "Le centre EducazenKids à Agadir",
    en: "The EducazenKids centre in Agadir",
  },
};

const STATEMENT: Say = {
  fr: "Le dedans était juste. Le dehors ne lui ressemblait pas.",
  en: "The inside was right. The outside looked nothing like it.",
};

const REALITY: Say[] = [
  {
    fr: "Un centre qui change la vie d'enfants tous les jours.",
    en: "A centre changing children's lives every day.",
  },
  {
    fr: "Des familles qui se parlent entre elles.",
    en: "Families who talk to each other.",
  },
  {
    fr: "Un nombre de places fini, dans un rayon de vingt minutes.",
    en: "A finite number of places, within a twenty-minute radius.",
  },
];

const FRACTURE: Say[] = [
  {
    fr: "Une présence digitale qui n'en montrait rien.",
    en: "A digital presence that showed none of it.",
  },
  {
    fr: "Des familles qui peinaient à trouver le centre.",
    en: "Families who struggled to find the centre.",
  },
  { fr: "Des places suivies sur papier.", en: "Places tracked on paper." },
];

const DECISION: Say = {
  fr: "Aligner la marque sur la salle, et mettre l'inscription sur un seul chemin.",
  en: "Align the brand with the room, and put enrolment on a single path.",
};

const CHAIN_TEXT: Say = {
  fr: "La refonte a fait ressembler le dehors au dedans. Le site répond aux deux questions d'un parent avant de parler du centre. Derrière lui, le CRM compte les places et ne laisse plus les relances à la mémoire de quelqu'un. Le contenu a été construit pour être reconnu une deuxième fois plutôt que vu une première. Et le payant vise une ville, pas un pays   coupé dès que les places sont prises.",
  en: "The refresh made the outside look like the inside. The site answers a parent's two questions before it talks about the centre. Behind it, the CRM counts the places and no longer leaves follow-ups to someone's memory. Content was built to be recognised a second time rather than seen a first. And the paid spend is aimed at one city, not one country   switched off the moment the places are taken.",
};

const REFRESH = {
  title: {
    fr: "Une identité qui ressemble enfin à ce qui se passe à l'intérieur.",
    en: "An identity that finally looks like what happens inside.",
  },
  text: {
    fr: "Le seul projet du portfolio où la refonte peut se montrer en comparaison : l'ancienne marque à côté de la nouvelle. Le cœur-puzzle vient du centre lui-même   quatre pièces différentes, et c'est ce qui le rend entier. Il vit seul en avatar, en favicon et en filigrane à trois pour cent, toujours sans le slogan, et jamais sur un fond sombre.",
    en: "The one project in this portfolio where the refresh can be shown as a comparison: the old mark beside the new one. The puzzle heart came out of the centre itself   four different pieces, which is what makes it whole. It stands alone as an avatar, a favicon and a three per cent watermark, always without the strapline, and never on a dark ground.",
  },
  plates: [
    {
      image: "/work/educazen-kids/educazenkids-before.png",
      alt: {
        fr: "L'identité EducazenKids avant la refonte",
        en: "The EducazenKids identity before the refresh",
      },
    },
    {
      image: "/work/educazen-kids/educazenkids-after.png",
      alt: {
        fr: "L'identité EducazenKids après la refonte",
        en: "The EducazenKids identity after the refresh",
      },
    },
    {
      image: "/work/educazen-kids/educazenkids-logo.png",
      alt: { fr: "Logo EducazenKids", en: "EducazenKids logo" },
    },
    {
      image: "/work/educazen-kids/educazenkids-brand-identity.png",
      alt: { fr: "Identité EducazenKids", en: "EducazenKids identity" },
    },
  ],
};

const BRAND = {
  ground: "#C3016C",
  wordmark: "/work/educazen-kids/educazenkids-logo.png",
  wordmarkAlt: { fr: "Marque EducazenKids", en: "EducazenKids brand mark" },
  lead: {
    fr: "Quatre couleurs, quatre promesses   une par pièce du cœur-puzzle.",
    en: "Four colours, four promises   one for each piece of the puzzle heart.",
  },
  essence: {
    fr: "Le seul projet du portfolio où la refonte peut se montrer en comparaison : l'ancienne marque à côté de la nouvelle.",
    en: "The one project in this portfolio where the refresh can be shown as a comparison: the old mark beside the new one.",
  },
  colors: [
    { name: "Magenta", hex: "#C2185B", role: { fr: "Signature", en: "Signature" } },
    {
      name: "Violet",
      hex: "#7B1FA2",
      role: { fr: "Créativité", en: "Creativity" },
    },
    { name: "Teal", hex: "#00897B", role: { fr: "Sérénité", en: "Calm" } },
    { name: "Or", hex: "#F9A825", role: { fr: "Optimisme", en: "Optimism" } },
  ],
  type: [
    {
      name: "Nunito",
      stack: "'Nunito', ui-rounded, ui-sans-serif, system-ui, sans-serif",
      role: { fr: "Titres", en: "Titles" },
    },
    {
      name: "Playfair Display",
      stack: "'Playfair Display', Georgia, serif",
      role: { fr: "Accroches", en: "Pull lines" },
    },
    {
      name: "Quicksand",
      stack: "'Quicksand', ui-rounded, ui-sans-serif, system-ui, sans-serif",
      role: { fr: "Corps de texte", en: "Body copy" },
    },
  ],
  notes: [
    {
      title: { fr: "La pièce qui commence", en: "The piece that starts it" },
      text: {
        fr: "Le magenta porte l'énergie et la passion éducative.",
        en: "Magenta carries the energy and the teaching passion.",
      },
    },
    {
      title: {
        fr: "La neuro-diversité, en couleur",
        en: "Neurodiversity, in colour",
      },
      text: {
        fr: "Le violet dit la créativité et l'imagination.",
        en: "Violet is creativity and imagination.",
      },
    },
    {
      title: { fr: "Le zen du nom", en: "The zen in the name" },
      text: {
        fr: "Le teal est l'équilibre   littéralement le « zen » d'EducazenKids.",
        en: "Teal is the balance   literally the “zen” in EducazenKids.",
      },
    },
    {
      title: { fr: "Le potentiel", en: "The potential" },
      text: {
        fr: "L'or, c'est la lumière et l'optimisme : le progrès d'un enfant, célébré.",
        en: "Gold is light and optimism   a child's progress, marked.",
      },
    },
    {
      title: { fr: "Chaque pièce, un enfant", en: "Every piece, a child" },
      text: {
        fr: "Les quatre ne se hiérarchisent pas.",
        en: "None of the four outranks the others.",
      },
    },
  ],
};

const PALETTE: PaletteStory = {
  title: { fr: "Le langage visuel", en: "The visual language" },
  lead: BRAND.lead,
  colors: BRAND.colors,
  states: BRAND.notes.slice(0, BRAND.colors.length).map((note, index) => ({
    title: note.title,
    text: note.text,
    colorIndex: index,
  })),
};

const PLATFORM = {
  title: {
    fr: "Une seule route, du premier clic à la place confirmée.",
    en: "One route, from the first click to the confirmed place.",
  },
  text: {
    fr: "Devant, un site qui répond aux deux questions d'un parent avant de parler du centre : est-ce qu'on prend un profil comme le sien, et combien de temps il faut attendre. Derrière, le tableau de bord où arrivent les demandes, où se comptent les places, et où les relances ne dépendent plus de la mémoire de quelqu'un.",
    en: "In front, a site that answers a parent's two questions before it talks about the centre: is a profile like theirs taken, and how long is the wait. Behind it, the dashboard where enquiries land, places are counted, and follow-ups no longer depend on someone remembering.",
  },
  plates: [
    {
      image: "/work/educazen-kids/desktop.jpeg",
      caption: { fr: "Desktop", en: "Desktop" },
      alt: {
        fr: "Le site EducazenKids sur écran",
        en: "The EducazenKids site on desktop",
      },
      contain: false,
    },
    {
      image: "/work/educazen-kids/mobile.jpeg",
      caption: { fr: "Mobile", en: "Mobile" },
      alt: {
        fr: "Le site EducazenKids sur téléphone",
        en: "The EducazenKids site on a phone",
      },
      contain: true,
    },
    {
      image: "/work/educazen-kids/educazenkids-crm.png",
      caption: { fr: "CRM", en: "CRM" },
      alt: { fr: "Le CRM EducazenKids", en: "The EducazenKids CRM" },
      contain: false,
    },
    {
      image: "/work/educazen-kids/educazenkids-dashboard.png",
      caption: { fr: "Tableau de bord", en: "Dashboard" },
      alt: {
        fr: "Tableau de bord des inscriptions",
        en: "The enrolment dashboard",
      },
      contain: false,
    },
  ],
};

const MARKETING = {
  title: {
    fr: "Une présence que les parents croisent vraiment.",
    en: "A presence parents actually come across.",
  },
  text: {
    fr: "Les familles concernées ne se trouvent pas par volume : elles se parlent entre elles, dans des groupes, autour d'une école. La présence a donc été construite pour être reconnue une deuxième fois plutôt que vue une première.",
    en: "The families this matters to are not found by volume: they talk to each other, in groups, around a school. So the presence was built to be recognised a second time rather than seen a first.",
  },
};

const PAID = {
  title: {
    fr: "Un budget qui vise une ville, pas un pays.",
    en: "A budget aimed at one city, not one country.",
  },
  text: {
    fr: "Le centre a un nombre de places fini et un rayon d’une vingtaine de minutes en voiture. Le payant est réglé sur cette contrainte-là : peu de portée, beaucoup d’intention, et coupé dès que les places sont prises. Les familles trouvent le centre seules, et l’équipe ne court plus après l’administratif.",
    en: "The centre has a finite number of places and a radius of about twenty minutes by car. The paid spend is tuned to that constraint: little reach, a lot of intent, and switched off the moment the places are taken. Families find the centre on their own, and the team is no longer chasing admin.",
  },
  signals: [
    { fr: "Peu de portée.", en: "Little reach." },
    { fr: "Beaucoup d'intention.", en: "A lot of intent." },
    {
      fr: "Coupé dès que les places sont prises.",
      en: "Switched off the moment the places are taken.",
    },
  ] as Say[],
  slides: [
    "/work/educazen-kids/educazenkids-scroll-2.png",
    "/work/educazen-kids/educazenkids-scroll-1.png",
    "/work/educazen-kids/educazenkids-scroll-3.png",
  ],
};

const IMPACT = {
  title: {
    fr: "Du premier clic à la place confirmée.",
    en: "From the first click to the confirmed place.",
  },
  text: {
    fr: "Une marque qui ressemble enfin à ce qui se passe à l'intérieur, une inscription qui tient sur un seul chemin, et une équipe qui ne court plus après l'administratif.",
    en: "A brand that finally looks like what happens inside, enrolment held on a single path, and a team no longer chasing admin.",
  },
  metric: "+62%",
  line: {
    fr: "Les familles trouvent le centre seules.",
    en: "Families find the centre on their own.",
  },
};

const WORK: { image: string; alt: Say }[] = [
  {
    image: "/work/educazen-kids/educazenkids-brand-book.png",
    alt: { fr: "Livre de marque EducazenKids", en: "EducazenKids brand book" },
  },
  {
    image: "/work/educazen-kids/educazenkids-scroll-1.png",
    alt: { fr: "Le site EducazenKids", en: "The EducazenKids site" },
  },
  {
    image: "/work/educazen-kids/educazenkids-scroll-2.png",
    alt: { fr: "Le site EducazenKids", en: "The EducazenKids site" },
  },
  {
    image: "/work/educazen-kids/educazenkids-scroll-3.png",
    alt: { fr: "Le site EducazenKids", en: "The EducazenKids site" },
  },
  {
    image: "/work/educazen-kids/educazenkids-cover.png",
    alt: { fr: "EducazenKids", en: "EducazenKids" },
  },
  {
    image: "/work/educazen-kids/educazenkids-brand-logo-site.png",
    alt: {
      fr: "Le logo EducazenKids appliqué",
      en: "The EducazenKids logo applied",
    },
  },
  {
    image: "/work/educazen-kids/educazenkids-application.png",
    alt: {
      fr: "L'identité EducazenKids en situation",
      en: "The EducazenKids identity in place",
    },
  },
  {
    image: "/work/educazen-kids/educazenkids-web.png",
    alt: { fr: "Le site EducazenKids", en: "The EducazenKids site" },
  },
];

const NEXT: NextProject[] = [
  {
    href: "/lunja-village",
    client: "Lunja Village",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    image: "/work/lunja-village/image lunja hero 1.png",
  },
  {
    href: "/mabrouk",
    client: "Mabrouk Hôtel",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    image: "/work/mabrouk/imgg1 (18).png",
  },
];

const CHAPTERS = [
  { id: "le-defi", label: { fr: "Le défi", en: "The challenge" } },
  { id: "architecture", label: { fr: "L'architecture", en: "The architecture" } },
  {
    id: "refonte-de-marque",
    label: { fr: "Refonte de marque", en: "Brand refresh" },
  },
  { id: "marque", label: { fr: "La planche de marque", en: "The brand board" } },
  { id: "palette", label: { fr: "Le langage visuel", en: "The visual language" } },
  { id: "site-web", label: { fr: "Site web · CRM", en: "Website · CRM" } },
  { id: "marketing", label: { fr: "Marketing", en: "Marketing" } },
  { id: "media-payant", label: { fr: "Média payant", en: "Paid media" } },
  { id: "impact", label: { fr: "L'impact", en: "The impact" } },
  { id: "le-travail", label: { fr: "Galerie", en: "Gallery" } },
];

export function EducazenKidsV2View() {
  const say = useSay();

  return (
    <CaseV2
      chapters={CHAPTERS}
      client={CLIENT}
      statement={HERO.statement}
      category={CATEGORY}
      location={LOCATION}
      year={YEAR}
      site={SITE}
      socials={SOCIALS}
      next={NEXT}
    >
      <Chapter id="le-defi">
        <Hero image={HERO.image} alt={say(HERO.alt)} />
        <Caption index={0} title={say(STATEMENT)} text={say(HERO.intro)} />
        <RealityFracture reality={REALITY} fracture={FRACTURE} />
      </Chapter>

      <Chapter id="architecture">
        <Caption index={1} title={say(DECISION)} text={say(CHAIN_TEXT)} />
        <Pair>
          <Plate image={HERO.image} alt={say(HERO.alt)} shape="aspect-square" />
          <Plate
            image="/work/educazen-kids/educazenkids-brand-book.png"
            alt={say({
              fr: "Livre de marque EducazenKids",
              en: "EducazenKids brand book",
            })}
            shape="aspect-square"
            delay={0.08}
          />
        </Pair>
      </Chapter>

      <Chapter id="refonte-de-marque">
        <Caption index={2} title={say(REFRESH.title)} text={say(REFRESH.text)} />
        <Grid>
          {REFRESH.plates.map((plate, index) => (
            <Plate
              key={plate.image}
              image={plate.image}
              alt={say(plate.alt)}
              shape="aspect-4/3"
              delay={(index % 2) * 0.08}
            />
          ))}
        </Grid>
      </Chapter>

      <Chapter id="marque">
        <Caption
          index={3}
          title={say(BRAND.essence)}
          meta={`${BRAND.type.length} ${say({ fr: "polices", en: "typefaces" })}`}
        />
        <BrandBoard
          ground={BRAND.ground}
          wordmark={BRAND.wordmark}
          wordmarkAlt={say(BRAND.wordmarkAlt)}
          contain
          faces={BRAND.type}
        />
      </Chapter>

      <Chapter id="palette">
        <Caption
          index={4}
          title={say({
            fr: "Magenta, Violet, Teal, Or.",
            en: "Magenta, Violet, Teal, Or.",
          })}
          text={say(BRAND.notes[BRAND.colors.length].text)}
          meta={`${BRAND.colors.length} ${say({ fr: "couleurs", en: "colours" })}`}
        />
        <PaletteStage story={PALETTE} />
      </Chapter>

      <Chapter id="site-web">
        <Caption index={5} title={say(PLATFORM.title)} text={say(PLATFORM.text)} />
        <Grid>
          {PLATFORM.plates.map((plate, index) => (
            <Plate
              key={plate.image}
              image={plate.image}
              alt={say(plate.alt)}
              caption={say(plate.caption)}
              shape="aspect-4/3"
              delay={(index % 2) * 0.08}
            />
          ))}
        </Grid>
      </Chapter>

      <Chapter id="marketing">
        <Caption
          index={6}
          title={say(MARKETING.title)}
          text={say(MARKETING.text)}
        />
        <Pair>
          <Plate
            image="/work/educazen-kids/educazenkids-website-banner.png"
            alt={say({ fr: "Bannière EducazenKids", en: "EducazenKids banner" })}
            shape="aspect-4/5"
            sizes={FULL}
          />
          <Plate
            image="/work/educazen-kids/educazenkids-application.png"
            alt={say({
              fr: "L'identité EducazenKids en situation",
              en: "The EducazenKids identity in place",
            })}
            shape="aspect-4/5"
            sizes={FULL}
          />
        </Pair>
      </Chapter>

      <Chapter id="media-payant" fit>
        <Caption
          index={7}
          label={say({ fr: "Média payant", en: "Paid media" })}
          title={say(PAID.title)}
          text={say(PAID.text)}
        />
        <Pair>
          <Slides
            items={PAID.slides.map((image) => ({
              image,
              alt: say({ fr: "Le site EducazenKids", en: "The EducazenKids site" }),
            }))}
          />
          <SignalsPanel items={PAID.signals.map(say)} />
        </Pair>
      </Chapter>

      <Chapter id="impact">
        <Caption index={8} title={say(IMPACT.title)} text={say(IMPACT.text)} />
        <ImpactPanel
          image={HERO.image}
          metric={IMPACT.metric}
          line={say(IMPACT.line)}
        />
      </Chapter>

      <Chapter id="le-travail">
        <Caption
          index={9}
          title={say({
            fr: "La preuve, après l'argument.",
            en: "The proof, after the argument.",
          })}
          meta={`${WORK.length} ${say({ fr: "images", en: "pictures" })}`}
        />
        <Gallery items={WORK} />
      </Chapter>
    </CaseV2>
  );
}
