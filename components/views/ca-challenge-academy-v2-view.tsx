"use client";

import {
  CaseV2,
  Caption,
  Chapter,
  Hero,
  LinesRow,
  OutcomePanel,
  RealityFracture,
  useSay,
  type NextProject,
  type Say,
} from "@/components/case-v2/kit";

const CLIENT = "CA Challenge Academy";
const YEAR = "2025";
const CATEGORY: Say = { fr: "Éducation", en: "Education" };
const LOCATION: Say = { fr: "Agadir, Maroc", en: "Agadir, Morocco" };

const HERO = {
  statement: {
    fr: "Accompagner jusqu'au bout.",
    en: "See it through.",
  },
  intro: {
    fr: "Un centre où le travail commence bien avant la première séance et ne s'arrête pas à la dernière   et dont rien, jusque-là, ne le disait.",
    en: "A centre where the work starts well before the first session and does not stop at the last   and where nothing, until now, said so.",
  },
  image: "/media/eiden-hero-poster.jpg",
  alt: { fr: "CA Challenge Academy", en: "CA Challenge Academy" },
};

const STATEMENT: Say = {
  fr: "Le centre accompagnait vraiment. Il se présentait comme s'il donnait des cours.",
  en: "The centre truly accompanied. It introduced itself as if it gave lessons.",
};

const REALITY: Say[] = [
  {
    fr: "Un suivi individuel, tenu dans la durée.",
    en: "One-to-one support, held over time.",
  },
  {
    fr: "Des familles qui reviennent, et qui recommandent.",
    en: "Families who come back, and who recommend.",
  },
  {
    fr: "Une équipe qui connaît chaque dossier.",
    en: "A team who knows every file.",
  },
];

const FRACTURE: Say[] = [
  {
    fr: "Un premier contact qui reposait entièrement sur le téléphone.",
    en: "A first contact resting entirely on the telephone.",
  },
  {
    fr: "Une promesse indistincte de celle du soutien scolaire d'à côté.",
    en: "A promise indistinguishable from the tutoring shop next door.",
  },
  {
    fr: "Un suivi réel, dont il ne restait aucune trace lisible.",
    en: "Real follow-through, leaving no legible trace.",
  },
];

const DECISION: Say = {
  fr: "Faire du suivi la promesse, et non le supplément.",
  en: "Make the follow-through the promise, not the extra.",
};

const CHAIN: Say[] = [
  { fr: "Positionnement", en: "Positioning" },
  { fr: "Identité", en: "Identity" },
  { fr: "Site web", en: "Website" },
  { fr: "Parcours d'inscription", en: "Enrolment journey" },
];

const CHAIN_TEXT: Say = {
  fr: "Le positionnement a déplacé le sujet : ce que le centre vend n'est pas une heure de cours mais un accompagnement qui va au bout, ce qui n'est pas la même promesse ni le même prix. L'identité a été dessinée pour une famille qui hésite plutôt que pour un élève qui compare   plus proche du cabinet que de l'école. Le site raconte le suivi dans l'ordre où il se vit, du premier appel à la dernière séance, parce qu'un parent qui comprend la méthode n'a plus besoin d'être convaincu du tarif. Et le parcours d'inscription a été réduit à ce qu'un parent peut remplir depuis son téléphone, en une fois, sans rappeler pour savoir où en est le dossier.",
  en: "Positioning moved the subject: what the centre sells is not an hour of teaching but support that is seen through, which is neither the same promise nor the same price. The identity was drawn for a family hesitating rather than a pupil comparing   closer to a practice than to a school. The site tells the follow-through in the order it is lived, from the first call to the last session, because a parent who understands the method no longer needs convincing about the fee. And the enrolment journey was cut down to what a parent can complete from a phone, in one pass, without calling back to ask where the file stands.",
};

const POSITIONING = {
  title: {
    fr: "Ce qui se vend, c'est le suivi.",
    en: "What is sold is the follow-through.",
  },
  text: {
    fr: "Un centre qui se présente par ses matières se fait comparer à l'heure. Un centre qui se présente par sa méthode se fait choisir pour l'année   et ce n'est ni la même conversation, ni le même engagement.",
    en: "A centre introducing itself by its subjects gets compared by the hour. A centre introducing itself by its method gets chosen for the year   and that is neither the same conversation nor the same commitment.",
  },
  lines: [
    {
      fr: "Par ses matières, comparé à l'heure.",
      en: "By its subjects, compared by the hour.",
    },
    {
      fr: "Par sa méthode, choisi pour l'année.",
      en: "By its method, chosen for the year.",
    },
  ] as Say[],
};

const IDENTITY = {
  title: {
    fr: "Dessinée pour le parent qui hésite.",
    en: "Drawn for the parent who hesitates.",
  },
  text: {
    fr: "L'interlocuteur n'est pas l'élève. C'est une famille qui confie quelque chose, et qui cherche des signes de sérieux plutôt que des signes d'enthousiasme. L'identité a été réglée sur ce registre.",
    en: "The audience is not the pupil. It is a family entrusting something, looking for signs of seriousness rather than signs of enthusiasm. The identity was tuned to that register.",
  },
};

const ENROLMENT = {
  title: {
    fr: "Du premier appel à la dernière séance.",
    en: "From the first call to the last session.",
  },
  text: {
    fr: "Le site suit l'ordre réel de l'accompagnement plutôt que l'ordre d'un catalogue. L'inscription se termine depuis un téléphone, en une fois, et le dossier n'a plus besoin d'un rappel pour avancer.",
    en: "The site follows the real order of the support rather than the order of a catalogue. Enrolment finishes from a phone, in one pass, and a file no longer needs a call-back to move.",
  },
  lines: [
    { fr: "Depuis un téléphone.", en: "From a phone." },
    { fr: "En une fois.", en: "In one pass." },
    { fr: "Sans rappel pour avancer.", en: "No call-back to move." },
  ] as Say[],
};

const IMPACT = {
  title: {
    fr: "Un centre qu'on choisit pour sa méthode, pas pour son tarif horaire.",
    en: "A centre chosen for its method, not its hourly rate.",
  },
  outcomes: [
    {
      fr: "Une promesse qui ne se confond plus avec celle du soutien scolaire d'à côté.",
      en: "A promise no longer confused with the tutoring shop next door.",
    },
    {
      fr: "Un premier contact qui ne dépend plus du téléphone.",
      en: "A first contact no longer resting on the telephone.",
    },
    {
      fr: "Une inscription qui se termine en une fois.",
      en: "An enrolment that finishes in one pass.",
    },
  ] as Say[],
};

const NEXT: NextProject[] = [
  {
    href: "/educazen-kids",
    client: "EducazenKids",
    category: { fr: "Éducation", en: "Education" },
    image: "/work/educazen-kids/educazen-hero.png",
  },
  {
    href: "/anisal",
    client: "Anisal",
    category: { fr: "Coopérative", en: "Cooperative" },
    image: "/media/bg-2.jpeg",
  },
];

const CHAPTERS = [
  { id: "le-defi", label: { fr: "Le défi", en: "The challenge" } },
  { id: "architecture", label: { fr: "L'architecture", en: "The architecture" } },
  { id: "positionnement", label: { fr: "Positionnement", en: "Positioning" } },
  { id: "identite", label: { fr: "Identité", en: "Identity" } },
  {
    id: "inscription",
    label: { fr: "Parcours d'inscription", en: "Enrolment journey" },
  },
  { id: "impact", label: { fr: "L'impact", en: "The impact" } },
];

export function CaChallengeAcademyV2View() {
  const say = useSay();

  return (
    <CaseV2
      chapters={CHAPTERS}
      client={CLIENT}
      statement={HERO.statement}
      category={CATEGORY}
      location={LOCATION}
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
        <LinesRow items={CHAIN.map(say)} />
      </Chapter>

      <Chapter id="positionnement">
        <Caption
          index={2}
          title={say(POSITIONING.title)}
          text={say(POSITIONING.text)}
        />
        <LinesRow items={POSITIONING.lines.map(say)} tone="beige" />
      </Chapter>

      <Chapter id="identite">
        <Caption index={3} title={say(IDENTITY.title)} text={say(IDENTITY.text)} />
      </Chapter>

      <Chapter id="inscription">
        <Caption
          index={4}
          label={say({
            fr: "Site web · Parcours d'inscription",
            en: "Website · Enrolment journey",
          })}
          title={say(ENROLMENT.title)}
          text={say(ENROLMENT.text)}
        />
        <LinesRow items={ENROLMENT.lines.map(say)} tone="forest" />
      </Chapter>

      <Chapter id="impact">
        <Caption index={5} title={say(IMPACT.title)} />
        <OutcomePanel image={HERO.image} items={IMPACT.outcomes.map(say)} />
      </Chapter>
    </CaseV2>
  );
}
