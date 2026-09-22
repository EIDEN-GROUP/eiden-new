"use client";

import { BrandBoard, CaseV2, Caption, Chapter, FULL, Gallery, Hero, ImpactPanel, Pair, PaletteStage, Plate, RealityFracture, useSay, type NextProject, type Say, } from "@/components/case-v2/kit";
import type { PaletteStory } from "@/lib/data/projects/types";

const CLIENT = "Medical Bay";
const YEAR = "2026";
const CATEGORY: Say = { fr: "Santé", en: "Healthcare" };
const LOCATION: Say = { fr: "Agadir, Maroc", en: "Agadir, Morocco" };
const SITE = "https://medicalbay-agadir.vercel.app/";
const SOCIALS = {
  instagram: "https://www.instagram.com/medicalbay.maroc/",
  facebook: "https://www.facebook.com/p/Medical-Bay-100085861093531/",
};

const HERO = {
  statement: {
    fr: "Concevoir la clinique et son logiciel comme une seule chose.",
    en: "Design the clinic and its software as one thing.",
  },
  intro: {
    fr: "Un centre médical qui existait sur le papier   une vision claire, et rien dessous. Nous avons construit l'activité, la marque et le système ensemble.",
    en: "A medical centre that existed on paper   a clear vision, and nothing underneath it. We built the business, the brand and the system together.",
  },
  image: "/work/medical-bay/hero.jpeg",
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

const WEBSITE = {
  title: {
    fr: "La porte d'entrée du parcours, pas une vitrine.",
    en: "The front door of the journey, not a shop window.",
  },
  text: {
    fr: "Le site ne présente pas la clinique : il fait entrer dans le parcours. Dès le premier écran, le patient sait ce qu'il y gagne : jusqu'à 70 % moins cher qu'en Europe, un séjour palace inclus, et un devis gratuit sous 24 heures. Dentisterie, tourisme médical et packs ont chacun leur page, en français comme en anglais, pour le patient d'Agadir comme pour celui qui prend l'avion.",
    en: "The site does not introduce the clinic: it opens the journey. From the first screen, a patient knows what they stand to gain: up to 70% less than in Europe, a palace stay included, and a free quote within 24 hours. Dentistry, medical tourism and packs each have their own page, in French and in English, for the patient from Agadir as much as the one who flies in.",
  },
};

const CRM = {
  title: {
    fr: "L'écran qui fait tourner la clinique.",
    en: "The screen that runs the clinic.",
  },
  text: {
    fr: "Derrière le site, le tableau de bord depuis lequel l'accueil suit rendez-vous, rappels et suivis. La semaine en cours, l'activité récente et le chiffre d'affaires en dirhams se lisent sur un seul écran, sans tableur à côté. C'est l'autre moitié du même chemin : ce que le site promet, le CRM le tient.",
    en: "Behind the site, the dashboard the front desk follows appointments, reminders and follow-ups from. The week ahead, recent activity and revenue in dirhams read on a single screen, with no spreadsheet on the side. It is the other half of the same path: what the site promises, the CRM delivers.",
  },
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
    image: "/work/medical-bay/medical-local.png",
    alt: { fr: "L'accueil Medical Bay", en: "The Medical Bay reception" },
  },
  {
    image: "/work/medical-bay/medical-bay-brand-logo-3.png",
    alt: { fr: "Logo Medical Bay", en: "Medical Bay logo" },
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
    image: "/work/medical-bay/medical-bay-application.png",
    alt: {
      fr: "L'identité Medical Bay en situation",
      en: "The Medical Bay identity in place",
    },
  },
];

const NEXT: NextProject[] = [
  {
    href: "/educazen-kids",
    client: "EducazenKids",
    category: { fr: "Éducation", en: "Education" },
    image: "/work/educazen-kids/educazen-hero.png",
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
  { id: "marque", label: { fr: "La planche de marque", en: "The brand board" } },
  { id: "palette", label: { fr: "Le langage visuel", en: "The visual language" } },
  { id: "site-web", label: { fr: "Site web", en: "Website" } },
  { id: "crm", label: { fr: "CRM & tableau de bord", en: "CRM & dashboard" } },
  { id: "impact", label: { fr: "L'impact", en: "The impact" } },
  { id: "le-travail", label: { fr: "Galerie", en: "Gallery" } },
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
      socials={SOCIALS}
      next={NEXT}
    >
      <Chapter id="le-defi">
        <Hero image={HERO.image} alt={say(HERO.alt)} />
        <Caption index={0} title={say(STATEMENT)} text={say(HERO.intro)} />
        <RealityFracture reality={REALITY} fracture={FRACTURE} />
      </Chapter>

      <Chapter id="marque">
        <Caption
          index={1}
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
          index={2}
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
        <Caption index={3} title={say(WEBSITE.title)} text={say(WEBSITE.text)} />
        <Pair>
          <Plate
            image="/work/medical-bay/desktop.jpeg"
            alt={say({
              fr: "Le site Medical Bay sur écran",
              en: "The Medical Bay site on desktop",
            })}
            caption={say({ fr: "Desktop", en: "Desktop" })}
            shape="aspect-4/4"
          />
          <Plate
            image="/work/medical-bay/medical-bay-web-mobile.jpeg"
            alt={say({
              fr: "Le site Medical Bay sur téléphone",
              en: "The Medical Bay site on a phone",
            })}
            caption={say({ fr: "Mobile", en: "Mobile" })}
            shape="aspect-4/4"
          />
        </Pair>
      </Chapter>

      <Chapter id="crm">
        <Caption index={4} title={say(CRM.title)} text={say(CRM.text)} />
        <Plate
          image="/work/medical-bay/crm-medicalbay.jpeg"
          alt={say({
            fr: "Le tableau de bord Medical Bay",
            en: "The Medical Bay dashboard",
          })}
          caption={say({ fr: "Tableau de bord", en: "Dashboard" })}
          shape="aspect-4/4 sm:aspect-16/9"
          sizes={FULL}
        />
      </Chapter>

      <Chapter id="impact">
        <Caption index={5} title={say(IMPACT.title)} />
        <ImpactPanel
          image={HERO.image}
          metric={IMPACT.metric}
          line={say(IMPACT.text)}
        />
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
