"use client";

import {
  CaseV2,
  Caption,
  Chapter,
  Gallery,
  Grid,
  Hero,
  OutcomePanel,
  Pair,
  Plate,
  RealityFracture,
  SignalsPanel,
  useSay,
  type NextProject,
  type Say,
} from "@/components/case-v2/kit";

const CLIENT = "Mabrouk Hôtel";
const YEAR = "2026";
const CATEGORY: Say = { fr: "Hôtellerie", en: "Hospitality" };

const HERO = {
  statement: {
    fr: "Une maison qui se reconnaît à sa lumière.",
    en: "A house you recognise by its light.",
  },
  intro: {
    fr: "Un hôtel dont tout le caractère est dans la matière   le laiton, le bois, le velours   et dont rien de tout cela n'arrivait jusqu'au client avant sa réservation. Nous l'avons fait voir par le marketing, la photographie et le contenu.",
    en: "A hotel whose whole character is in its materials   brass, wood, velvet   and none of which reached a guest before they booked. We made it visible through marketing, photography and content.",
  },
  image: "/work/mabrouk/imgg1 (18).png",
  alt: {
    fr: "L'escalier du Mabrouk Hôtel sous ses lanternes de laiton",
    en: "The Mabrouk Hôtel staircase under its brass lanterns",
  },
};

const STATEMENT: Say = {
  fr: "La maison avait un caractère. Personne ne le voyait avant d'entrer.",
  en: "The house had a character. Nobody saw it before walking in.",
};

const REALITY: Say[] = [
  {
    fr: "Un bâtiment qui a tout son caractère : le laiton, le bois, le velours.",
    en: "A building with all its character: brass, wood, velvet.",
  },
  {
    fr: "Une lumière qui n'appartient qu'à cette maison.",
    en: "A light that belongs to this house alone.",
  },
  {
    fr: "Des clients qui repartent en parlant du calme et de l'accueil.",
    en: "Guests who leave talking about the quiet and the welcome.",
  },
];

const FRACTURE: Say[] = [
  {
    fr: "Rien de tout cela n'arrivait au client avant sa réservation.",
    en: "None of it reached a guest before they booked.",
  },
  {
    fr: "Ni photographie, ni ton, ni direction.",
    en: "No photography, no tone, no direction.",
  },
  {
    fr: "Un marché qui ne vend que des étoiles et des équipements.",
    en: "A market that sells nothing but stars and amenities.",
  },
];

const DECISION: Say = {
  fr: "Partir de la matière et de la lumière plutôt que de la catégorie.",
  en: "Start from the materials and the light rather than from the category.",
};

const CHAIN_TEXT: Say = {
  fr: "Le marketing a laissé la liste d'équipements aux comparateurs, et réglé l'offre comme la dépense séparément sur la haute saison et sur le reste de l'année, dirigées vers la réservation directe plutôt que vers les plateformes. La photographie montre la maison à l'heure où elle est le plus elle-même. Et le contenu fait vivre ces images sur les réseaux sociaux, pour que le client voie la maison avant de la réserver.",
  en: "Marketing left the amenity list to the comparison sites, and tuned the offer and the spend separately against high season and against the rest of the year, pointed at direct booking rather than at the platforms. The photography shows the house at the hour it is most itself. And the content keeps those pictures alive on social media, so guests see the house before they book it.",
};

const MARKETING = {
  title: {
    fr: "Vendre les nuits que personne ne vient chercher.",
    en: "Selling the nights nobody comes looking for.",
  },
  text: {
    fr: "Un hôtel n'a pas un problème de remplissage : il en a deux, et ils ne se ressemblent pas. La haute saison se vend seule et se défend sur le prix ; le reste de l'année se gagne en donnant une raison de venir. L'offre et la dépense ont été réglées séparément sur ces deux-là, et le budget dirigé vers la réservation directe plutôt que vers les plateformes.",
    en: "A hotel does not have one occupancy problem: it has two, and they look nothing alike. High season sells itself and is defended on price; the rest of the year is won by giving someone a reason to come. The offer and the spend were tuned separately against each, and the budget pointed at direct booking rather than at the platforms.",
  },
  signals: [
    {
      fr: "La haute saison se défend sur le prix.",
      en: "High season is defended on price.",
    },
    {
      fr: "Le reste de l'année se gagne en donnant une raison de venir.",
      en: "The rest of the year is won by giving a reason to come.",
    },
    {
      fr: "La réservation directe plutôt que les plateformes.",
      en: "Direct booking rather than the platforms.",
    },
  ] as Say[],
};

const PHOTOGRAPHY = {
  title: {
    fr: "Photographier la maison comme on l'habite, pas comme on l'inventorie.",
    en: "Photograph the house the way it is lived in, not the way it is inventoried.",
  },
  text: {
    fr: "Une chambre d'hôtel photographiée de face, au flash, ressemble à toutes les autres. Chaque prise a donc été faite à l'heure où la maison est la plus elle-même, et cadrée sur ce qu'un client remarque vraiment : une matière, une lumière, un coin.",
    en: "A hotel bedroom shot square on, with flash, looks like every other one. So each frame was made at the hour the house is most itself, and framed on what a guest actually notices: a material, a light, a corner.",
  },
  plates: [
    {
      image: "/work/mabrouk/imgg1 (1).png",
      alt: { fr: "L'accueil du Mabrouk Hôtel", en: "The Mabrouk Hôtel reception" },
    },
    {
      image: "/work/mabrouk/imgg1 (19).png",
      alt: {
        fr: "Les lanternes de laiton du Mabrouk Hôtel",
        en: "The Mabrouk Hôtel brass lanterns",
      },
    },
    {
      image: "/work/mabrouk/imgg1 (20).png",
      alt: {
        fr: "Le salon du Mabrouk Hôtel derrière son claustra",
        en: "The Mabrouk Hôtel lounge behind its fretwork screen",
      },
    },
    {
      image: "/work/mabrouk/imgg1 (12).png",
      alt: { fr: "Une chambre du Mabrouk Hôtel", en: "A Mabrouk Hôtel bedroom" },
    },
  ],
  signals: [
    { fr: "Une matière.", en: "A material." },
    { fr: "Une lumière.", en: "A light." },
    { fr: "Un coin.", en: "A corner." },
  ] as Say[],
};

const CONTENT = {
  title: {
    fr: "Des images qui continuent de vivre entre deux séjours.",
    en: "Pictures that keep living between two stays.",
  },
  text: {
    fr: "Une séance photo ne sert à rien si elle reste dans un dossier. Le contenu décline ces prises sur les réseaux sociaux, publication après publication : une chambre au matin, une lanterne le soir, un salon avant l'arrivée des clients. La maison se montre telle qu'on la vit, et le client la reconnaît avant même d'avoir réservé.",
    en: "A photo shoot is worth nothing if it stays in a folder. The content turns those frames into social media, post after post: a bedroom in the morning, a lantern at night, a lounge before the guests arrive. The house shows itself the way it is lived in, and guests recognise it before they have even booked.",
  },
  plates: [
    {
      image: "/work/mabrouk/imgg1 (38).png",
      alt: { fr: "Une chambre du Mabrouk Hôtel", en: "A Mabrouk Hôtel bedroom" },
    },
    {
      image: "/work/mabrouk/imgg1 (29).png",
      alt: {
        fr: "Un peignoir brodé au logo du Mabrouk Hôtel",
        en: "A bathrobe embroidered with the Mabrouk Hôtel logo",
      },
    },
    {
      image: "/work/mabrouk/imgg1 (33).png",
      alt: {
        fr: "Le plateau d'accueil d'une chambre du Mabrouk Hôtel",
        en: "The welcome tray in a Mabrouk Hôtel bedroom",
      },
    },
    {
      image: "/work/mabrouk/imgg1 (58).png",
      alt: {
        fr: "Le salon de velours du Mabrouk Hôtel",
        en: "The velvet lounge of the Mabrouk Hôtel",
      },
    },
  ],
};

const IMPACT = {
  title: {
    fr: "Un hôtel qui ressemble enfin à ce qu'il fait ressentir.",
    en: "A hotel that finally looks like what it feels like.",
  },
  outcomes: [
    {
      fr: "Une offre et une dépense dirigées vers la réservation directe.",
      en: "An offer and a spend pointed at direct booking.",
    },
    {
      fr: "Une photographie qui montre la maison à son heure.",
      en: "Photography that shows the house at its own hour.",
    },
    {
      fr: "Des réseaux sociaux qui montrent la maison avant la réservation.",
      en: "Social media that shows the house before the booking.",
    },
  ] as Say[],
};

const WORK: { image: string; alt: Say }[] = [
  "imgg1 (2).png",
  "imgg1 (13).png",
  "imgg1 (14).png",
  "imgg1 (15).png",
  "imgg1 (22).png",
  "imgg1 (23).png",
  "imgg1 (26).png",
  "imgg1 (27).png",
  "imgg1 (32).png",
  "imgg1 (44).png",
].map((file) => ({
  image: `/work/mabrouk/${file}`,
  alt: { fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" },
}));

const NEXT: NextProject[] = [
  {
    href: "/medical-bay",
    client: "Medical Bay",
    category: { fr: "Santé", en: "Healthcare" },
    image: "/work/medical-bay/medical-bay-lobby.png",
  },
  {
    href: "/rihab-residence",
    client: "Résidence Rihab",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    image: "/work/rihab-residence/HERO PAGE RIHAB.png",
  },
];

const CHAPTERS = [
  { id: "le-defi", label: { fr: "Le défi", en: "The challenge" } },
  { id: "architecture", label: { fr: "L'architecture", en: "The architecture" } },
  { id: "marketing", label: { fr: "Marketing", en: "Marketing" } },
  { id: "photographie", label: { fr: "Photographie", en: "Photography" } },
  {
    id: "contenu",
    label: { fr: "Contenu · Réseaux sociaux", en: "Content · Social media" },
  },
  { id: "impact", label: { fr: "L'impact", en: "The impact" } },
  { id: "le-travail", label: { fr: "Le travail", en: "The work" } },
];

export function MabroukV2View() {
  const say = useSay();

  return (
    <CaseV2
      chapters={CHAPTERS}
      client={CLIENT}
      statement={HERO.statement}
      category={CATEGORY}
      year={YEAR}
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
            image="/work/mabrouk/imgg1 (2).png"
            alt={say({ fr: "Le Mabrouk Hôtel", en: "The Mabrouk Hôtel" })}
            shape="aspect-square"
            delay={0.08}
          />
        </Pair>
      </Chapter>

      <Chapter id="marketing">
        <Caption
          index={2}
          title={say(MARKETING.title)}
          text={say(MARKETING.text)}
        />
        <Pair>
          <Plate
            image="/work/mabrouk/imgg1 (48).png"
            alt={say({
              fr: "Le salon du Mabrouk Hôtel",
              en: "The Mabrouk Hôtel lounge",
            })}
            shape="aspect-4/5"
          />
          <SignalsPanel items={MARKETING.signals.map(say)} />
        </Pair>
      </Chapter>

      <Chapter id="photographie">
        <Caption
          index={3}
          title={say(PHOTOGRAPHY.title)}
          text={say(PHOTOGRAPHY.text)}
        />
        <Grid>
          {PHOTOGRAPHY.plates.map((plate, index) => (
            <Plate
              key={plate.image}
              image={plate.image}
              alt={say(plate.alt)}
              shape="aspect-4/5"
              delay={(index % 2) * 0.08}
            />
          ))}
        </Grid>
        <Pair>
          <Plate
            image="/work/mabrouk/imgg1 (53).png"
            alt={say({
              fr: "Les lanternes de laiton du Mabrouk Hôtel",
              en: "The Mabrouk Hôtel brass lanterns",
            })}
            shape="aspect-4/5"
          />
          <SignalsPanel items={PHOTOGRAPHY.signals.map(say)} />
        </Pair>
      </Chapter>

      <Chapter id="contenu">
        <Caption index={4} title={say(CONTENT.title)} text={say(CONTENT.text)} />
        <Grid>
          {CONTENT.plates.map((plate, index) => (
            <Plate
              key={plate.image}
              image={plate.image}
              alt={say(plate.alt)}
              shape="aspect-4/5"
              delay={(index % 2) * 0.08}
            />
          ))}
        </Grid>
      </Chapter>

      <Chapter id="impact">
        <Caption index={5} title={say(IMPACT.title)} />
        <OutcomePanel image={HERO.image} items={IMPACT.outcomes.map(say)} />
      </Chapter>

      <Chapter id="le-travail">
        <Caption
          index={6}
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
