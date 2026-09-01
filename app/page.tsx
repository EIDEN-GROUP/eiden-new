import { Hero } from "@/components/sections/hero";
import { Idea } from "@/components/sections/idea";
import { Services } from "@/components/sections/services";
import { Vsl } from "@/components/sections/vsl";
import { Team } from "@/components/sections/team";
import { Proof } from "@/components/sections/proof";
import { Offer } from "@/components/sections/offer";
import { BookCall } from "@/components/sections/book-call";
import { Pricing } from "@/components/sections/pricing";
import { ContactBanner } from "@/components/sections/contact-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* The problem, then the philosophy that answers it: both live in `Idea`,
          which opens on "most businesses don't lack ideas, they lack structure"
          and closes on "we don't give advice, we build". */}
      <Idea />
      {/* Capabilities, read as one architecture rather than a service menu. */}
      <Services />
      {/* Proof and the featured cases come before the people. Scale is
          established first; the team is credibility earned late, once the work
          has already made the case. */}
      <Proof />
      {/* The method, and then the team it is run by. These two are one block:
          the split in `Vsl` is 150svh tall and `vsl-split-under` pulls what
          follows up underneath it, so whatever sits here is what the leaves
          part to reveal. Nothing may be inserted between them. */}
      <Vsl />
      <div className="vsl-split-under relative z-0">
        <Team />
      </div>
      {/* <Offer /> */}
      {/* <BookCall /> */}
      {/* <Pricing /> */}
      <ContactBanner />
    </>
  );
}
