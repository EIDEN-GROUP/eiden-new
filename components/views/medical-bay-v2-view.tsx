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
  useSay,
  type NextProject,
  type Say,
} from "@/components/case-v2/kit";
import type { PaletteStory } from "@/lib/data/projects/types";

const CLIENT = "Medical Bay";
const YEAR = "2026";
const CATEGORY: Say = { fr: "Santé", en: "Healthcare" };
const LOCATION: Say = { fr: "Agadir, Maroc", en: "Agadir, Morocco" };
const SITE = "https://medicalbay.vercel.app/";

const HERO = {
  statement: {
    fr: "Concevoir la clinique et son logiciel comme une seule chose.",
    en: "Design the clinic and its software as one thing.",
  },
  intro: {
    fr: "Un centre médical qui existait sur le papier   une vision claire, et rien dessous. Nous avons construit l'activité, la marque et le système ensemble.",
    en: "A medical centre that existed on paper   a clear vision, and nothing underneath it. We built the business, the brand and the system together.",
  },
  image: "/work/medical-bay/medical-bay-lobby.png",
  alt: {
    fr: "Le hall de la clinique Medical Bay",
    en: "The Medical Bay clinic lobby",
  },
};

const STATEMENT: Say = {
  fr: "La vision était claire. Il n'y avait rien dessous.",
  en: "The vision was clear. There was nothing underneath it.",
};

const REALITY: Say[] = [
  {
    fr: "Une vision claire du centre à ouvrir.",
    en: "A clear vision of the centre to open.",
  },
  {
    fr: "Des traitements que les patients cherchent séparément.",
    en: "Treatments patients search for separately.",
  },
  {
    fr: "Des patients qui viennent parfois de l'étranger.",
    en: "Patients who sometimes fly in.",
  },
];

const FRACTURE: Say[] = [
  { fr: "La clinique existait sur le papier.", en: "The clinic existed on paper." },
  {
    fr: "Pas de marque, pas de parcours patient.",
    en: "No brand, no patient journey.",
  },
  { fr: "Pas de CRM, aucun tunnel.", en: "No CRM, no funnel." },
];

const DECISION: Say = {
  fr: "Concevoir l'espace et le logiciel comme un seul travail.",
  en: "Design the space and the software as one piece of work.",
};

const CHAIN_TEXT: Say = {
  fr: "Le premier livrable n'était pas une maquette : c'était le chemin qu'un patient parcourt, de la recherche au suivi. La marque et l'espace physique ont été dessinés ensemble pour ce chemin-là. Le site en est la porte d'entrée, le tableau de bord la salle des machines. Et chaque traitement a sa campagne, sa page et sa preuve, parce qu'un implant et une facette ne se cherchent pas au même moment.",
  en: "The first deliverable was not a mockup: it was the path a patient walks, from search to follow-up. The brand and the physical space were drawn together for that path. The site is its front door, the dashboard its engine room. And each treatment has its own campaign, page and proof, because an implant and a veneer are not searched for at the same moment.",
};

const JOURNEY = {
  title: {
    fr: "Le parcours patient dessiné avant le moindre pixel.",
    en: "The patient journey drawn before a single pixel.",
  },
  text: {
    fr: "Le premier livrable n'était pas une maquette : c'était le chemin qu'un patient parcourt, de la recherche au suivi, et la liste de ce que l'équipe doit tenir à chaque étape. Tout le reste   la marque, le site, l'écran de l'accueil   a été dessiné pour ce chemin-là.",
    en: "The first deliverable was not a mockup: it was the path a patient walks, from search to follow-up, and the list of what the team has to hold at every step. Everything after it   the brand, the site, the screen at the front desk   was drawn for that path.",
  },
  signals: [
    { fr: "La marque.", en: "The brand." },
    { fr: "Le site.", en: "The site." },
    { fr: "L'écran de l'accueil.", en: "The screen at the front desk." },
  ] as Say[],
};

const BRANDING = {
  title: {
    fr: "Le calme, avant le rendez-vous.",
    en: "Calm, before the appointment.",
  },
  text: {
    fr: "Medical Bay n'est pas une clinique : c'est le pont entre un patient et le bon spécialiste, et la marque devait porter cette confiance-là avant d'expliquer quoi que ce soit. Montserrat pour l'autorité, Cormorant en italique pour la part humaine, et un teal choisi contre le bleu clinique   une identité qui rassure en français, en anglais et en arabe.",
    en: "Medical Bay is not a clinic: it is the bridge between a patient and the right specialist, and the brand had to carry that trust before it explained anything. Montserrat for the authority, Cormorant italic for the human half, and a teal chosen against clinical blue   an identity that reassures in French, in English and in Arabic.",
  },
  plates: [
    {
      image: "/work/medical-bay/medical-bay-brand-logo-1.jpg",
      alt: {
        fr: "L'identité Medical Bay en application",
        en: "The Medical Bay identity applied",
      },
    },
    {
      image: "/work/medical-bay/medical-bay-brand.png",
      alt: { fr: "L'identité Medical Bay", en: "The Medical Bay identity" },
    },
    {
      image: "/work/medical-bay/medical-bay-reception.png",
      alt: { fr: "L'accueil de Medical Bay", en: "The Medical Bay reception" },
    },
    {
      image: "/work/medical-bay/medical-bay-application.png",
      alt: {
        fr: "L'identité Medical Bay en situation",
        en: "The Medical Bay identity in place",
      },
    },
  ],
};

const BRAND = {
  ground: "#4BBDBD",
  wordmark: "/work/medical-bay/medical-bay-brand-logo-1.jpg",
  wordmarkAlt: { fr: "Marque Medical Bay", en: "Medical Bay brand mark" },
  lead: {
    fr: "Un parcours de soin doit rassurer avant d'expliquer. La couleur s'en charge en premier.",
    en: "A care journey has to reassure before it explains. Colour does that first.",
  },
  essence: {
    fr: "Medical Bay n'est pas une clinique : c'est le pont entre un patient et le bon spécialiste, et la marque devait porter cette confiance-là avant d'expliquer quoi que ce soit.",
    en: "Medical Bay is not a clinic: it is the bridge between a patient and the right specialist, and the brand had to carry that trust before it explained anything.",
  },
  colors: [
    { name: "Teal", hex: "#2BBAA5", role: { fr: "Signature", en: "Signature" } },
    {
      name: "Teal Profond",
      hex: "#1F9187",
      role: { fr: "Profondeur", en: "Depth" },
    },
    { name: "Mist", hex: "#E8F5F3", role: { fr: "Calme", en: "Calm" } },
    { name: "Encre", hex: "#0D1A18", role: { fr: "Ancrage", en: "Anchor" } },
  ],
  type: [
    {
      name: "DM Sans",
      stack: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
      role: { fr: "Titres et interface", en: "Titles and interface" },
    },
    {
      name: "Montserrat",
      stack: "'Montserrat', ui-sans-serif, system-ui, sans-serif",
      role: { fr: "Corps de texte", en: "Body copy" },
    },
    {
      name: "Cormorant Garamond",
      stack: "'Cormorant Garamond', Georgia, serif",
      role: { fr: "Étiquettes", en: "Labels" },
    },
  ],
  notes: [
    {
      title: { fr: "Ce qu'on ressent en entrant", en: "What you feel walking in" },
      text: {
        fr: "Le teal est choisi contre le bleu clinique.",
        en: "The teal was chosen against clinical blue.",
      },
    },
    {
      title: {
        fr: "La hiérarchie, sans hausser le ton",
        en: "Hierarchy, without raising the voice",
      },
      text: {
        fr: "Le teal profond sépare ce qui compte de ce qui accompagne.",
        en: "The deep teal separates what matters from what supports it.",
      },
    },
    {
      title: { fr: "L'espace autour", en: "The space around it" },
      text: {
        fr: "La brume est ce qui manque à la plupart des cliniques : du vide.",
        en: "Mist is what most clinics do without: emptiness.",
      },
    },
    {
      title: { fr: "Ce qui doit être lu", en: "What has to be read" },
      text: {
        fr: "L'encre est réservée à l'information dont dépend un rendez-vous.",
        en: "Ink is kept for the information an appointment depends on.",
      },
    },
    {
      title: { fr: "Une clinique, pas un cabinet", en: "A clinic, not a practice" },
      text: {
        fr: "L'ensemble tient de l'accueil au tableau de bord.",
        en: "The set holds from the reception desk to the dashboard.",
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
    fr: "La porte d'entrée du parcours, et l'écran qui le fait tourner.",
    en: "The front door of the journey, and the screen that runs it.",
  },
  text: {
    fr: "Devant, un site qui ne présente pas la clinique mais fait entrer dans le parcours : prendre rendez-vous, comprendre un traitement, savoir ce qui vient après. Derrière, le tableau de bord depuis lequel l'accueil suit rendez-vous, rappels et suivis. Les deux moitiés du même chemin, dessinées ensemble.",
    en: "In front, a site that does not introduce the clinic but opens the journey: booking, understanding a treatment, knowing what comes next. Behind it, the dashboard the front desk follows appointments, reminders and follow-ups from. Two halves of one path, drawn together.",
  },
};

const MARKETING = {
  title: {
    fr: "Des campagnes par traitement, pas par saison.",
    en: "Campaigns per treatment, not per season.",
  },
  text: {
    fr: "Un implant, une facette et une couronne ne se décident pas de la même façon et ne se cherchent pas au même moment. Chaque traitement a donc sa campagne, sa page et sa preuve   y compris pour les patients qui viennent de l'étranger.",
    en: "An implant, a veneer and a crown are not decided the same way and are not searched for at the same moment. So each treatment has its own campaign, its own page and its own proof   including for the patients who fly in.",
  },
  posts: [
    {
      image: "/work/medical-bay/medical-bay-campaign-implant.png",
      alt: {
        fr: "Campagne Medical Bay   implants",
        en: "Medical Bay campaign   implants",
      },
    },
    {
      image: "/work/medical-bay/medical-bay-campaign-veneer.png",
      alt: {
        fr: "Campagne Medical Bay   facettes",
        en: "Medical Bay campaign   veneers",
      },
    },
    {
      image: "/work/medical-bay/medical-bay-campaign-zirconia.png",
      alt: {
        fr: "Campagne Medical Bay   zircone",
        en: "Medical Bay campaign   zirconia",
      },
    },
    {
      image: "/work/medical-bay/medical-bay-tourism-medical.png",
      alt: {
        fr: "Campagne tourisme médical Medical Bay",
        en: "Medical Bay medical tourism campaign",
      },
    },
  ],
};

const IMPACT = {
  title: {
    fr: "Une clinique qui tourne sur un système, plus sur des tableurs.",
    en: "A clinic that runs on a system instead of on spreadsheets.",
  },
  text: {
    fr: "Un parcours patient continu, une équipe qui travaille depuis un seul écran, et une marque qui rassure avant que quiconque ait poussé la porte.",
    en: "One continuous patient journey, a team working from a single screen, and a brand that reassures before anyone walks in.",
  },
  metric: "+120",
};

const WORK: { image: string; alt: Say }[] = [
  {
    image: "/work/medical-bay/medical-bay-brand-reception-mockup.png",
    alt: { fr: "L'accueil Medical Bay", en: "The Medical Bay reception" },
  },
  {
    image: "/work/medical-bay/medical-bay-brand-logo-3.png",
    alt: { fr: "Logo Medical Bay", en: "Medical Bay logo" },
  },
  {
    image: "/work/medical-bay/medical-bay-application.png",
    alt: {
      fr: "L'identité Medical Bay en situation",
      en: "The Medical Bay identity in place",
    },
  },
  {
    image: "/work/medical-bay/medical-bay-office.png",
    alt: { fr: "Un cabinet de Medical Bay", en: "A Medical Bay treatment room" },
  },
  {
    image: "/work/medical-bay/medical-bay-dental-campaign.png",
    alt: { fr: "Campagne dentaire Medical Bay", en: "Medical Bay dental campaign" },
  },
  {
    image: "/work/medical-bay/medical-bay-brand-logo-site.png",
    alt: { fr: "Le logo Medical Bay en ligne", en: "The Medical Bay logo online" },
  },
  {
    image: "/work/medical-bay/medical-bay-hero-flatlay.png",
    alt: { fr: "Medical Bay", en: "Medical Bay" },
  },
  {
    image: "/work/medical-bay/medical-bay-lobby.png",
    alt: { fr: "Le hall de Medical Bay", en: "The Medical Bay lobby" },
  },
];

const NEXT: NextProject[] = [
  {
    href: "/rihab-residence",
    client: "Résidence Rihab",
    category: { fr: "Hôtellerie", en: "Hospitality" },
    image: "/work/rihab-residence/HERO PAGE RIHAB.png",
  },
  {
    href: "/chillout-lounge",
    client: "CHILLOUT Lounge",
    category: { fr: "Lounge", en: "Lounge" },
    image: "/work/chillout-lounge/chilout hero.png",
  },
];

const CHAPTERS = [
  { id: "le-defi", label: { fr: "Le défi", en: "The challenge" } },
  { id: "architecture", label: { fr: "L'architecture", en: "The architecture" } },
  {
    id: "architecture-activite",
    label: { fr: "Architecture d'activité", en: "Business architecture" },
  },
  { id: "branding", label: { fr: "Branding", en: "Branding" } },
  { id: "marque", label: { fr: "La planche de marque", en: "The brand board" } },
  { id: "palette", label: { fr: "Le langage visuel", en: "The visual language" } },
  { id: "site-web", label: { fr: "Site web · CRM", en: "Website · CRM" } },
  { id: "marketing", label: { fr: "Marketing", en: "Marketing" } },
  { id: "impact", label: { fr: "L'impact", en: "The impact" } },
  { id: "le-travail", label: { fr: "Le travail", en: "The work" } },
];

export function MedicalBayV2View() {
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
          <Plate
            image="/work/medical-bay/medical-bay-brand-reception-mockup.png"
            alt={say({
              fr: "L'accueil Medical Bay",
              en: "The Medical Bay reception",
            })}
            shape="aspect-square"
          />
          <Plate
            image="/work/medical-bay/medical-bay-brand-logo-3.png"
            alt={say({ fr: "Logo Medical Bay", en: "Medical Bay logo" })}
            shape="aspect-square"
            delay={0.08}
          />
        </Pair>
      </Chapter>

      <Chapter id="architecture-activite">
        <Caption index={2} title={say(JOURNEY.title)} text={say(JOURNEY.text)} />
        <Pair>
          <Plate
            image="/work/medical-bay/medical-bay-office.png"
            alt={say({
              fr: "Un cabinet de Medical Bay",
              en: "A Medical Bay treatment room",
            })}
            shape="aspect-4/5"
          />
          <SignalsPanel items={JOURNEY.signals.map(say)} />
        </Pair>
      </Chapter>

      <Chapter id="branding">
        <Caption index={3} title={say(BRANDING.title)} text={say(BRANDING.text)} />
        <Grid>
          {BRANDING.plates.map((plate, index) => (
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
          index={4}
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
          index={5}
          title={say({
            fr: "Teal, Teal Profond, Mist, Encre.",
            en: "Teal, Teal Profond, Mist, Encre.",
          })}
          text={say(BRAND.notes[BRAND.colors.length].text)}
          meta={`${BRAND.colors.length} ${say({ fr: "couleurs", en: "colours" })}`}
        />
        <PaletteStage story={PALETTE} />
      </Chapter>

      <Chapter id="site-web">
        <Caption index={6} title={say(PLATFORM.title)} text={say(PLATFORM.text)} />
        <Pair>
          <Plate
            image="/work/medical-bay/medical-bay-web-desktop.png"
            alt={say({
              fr: "Le site Medical Bay sur écran",
              en: "The Medical Bay site on desktop",
            })}
            caption={say({ fr: "Desktop", en: "Desktop" })}
            shape="aspect-4/3"
          />
          <Plate
            image="/work/medical-bay/medical-bay-web-mobile.png"
            alt={say({
              fr: "Le site Medical Bay sur téléphone",
              en: "The Medical Bay site on a phone",
            })}
            caption={say({ fr: "Mobile", en: "Mobile" })}
            shape="aspect-4/3"
            contain
            delay={0.08}
          />
        </Pair>
        <Plate
          image="/work/medical-bay/medical-bay-dashboard.png"
          alt={say({
            fr: "Le tableau de bord Medical Bay",
            en: "The Medical Bay dashboard",
          })}
          caption={say({ fr: "Tableau de bord", en: "Dashboard" })}
          shape="aspect-4/3 sm:aspect-16/9"
          sizes={FULL}
        />
      </Chapter>

      <Chapter id="marketing">
        <Caption
          index={7}
          title={say(MARKETING.title)}
          text={say(MARKETING.text)}
        />
        <Grid>
          {MARKETING.posts.map((post, index) => (
            <Plate
              key={post.image}
              image={post.image}
              alt={say(post.alt)}
              shape="aspect-4/5"
              delay={(index % 2) * 0.08}
            />
          ))}
        </Grid>
      </Chapter>

      <Chapter id="impact">
        <Caption index={8} title={say(IMPACT.title)} />
        <ImpactPanel
          image={HERO.image}
          metric={IMPACT.metric}
          line={say(IMPACT.text)}
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
