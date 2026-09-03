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
      <Idea />
      <Vsl />
      <Services />
      <Proof />
      <Team />
      {/* <Offer /> */}
      {/* <BookCall /> */}
      {/* <Pricing /> */}
      {/* <ContactBanner /> */}
    </>
  );
}
