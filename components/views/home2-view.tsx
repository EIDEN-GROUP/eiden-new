import { Home2Hero } from "@/components/home2/hero";
import { Home2Trust } from "@/components/home2/trust";
import { Home2Manifesto } from "@/components/home2/manifesto";
import { Home2Vision } from "@/components/home2/vision";
import { Home2Expertise } from "@/components/home2/expertise";
import { Home2Work } from "@/components/home2/work";
import { Home2Team } from "@/components/home2/team";
import { Home2Strip } from "@/components/home2/strip";
import { Home2Closing } from "@/components/home2/closing";

/**
 * The homepage, rebuilt on the reference layout.
 *
 * Every word here came off the previous homepage   this is the same content
 * under a different composition: a light ground, one editorial column, cards
 * dealt across the page, and headlines that light up word by word as they
 * arrive.
 *
 * The sections it replaced are still in `components/sections`; several of them
 * are load-bearing for the about, clients and solutions pages, and the four
 * that are not   hero, idea, vsl, offer   are what a rollback would need.
 */
export function Home2View() {
  return (
    <>
      <Home2Hero />
      <Home2Trust />
      <Home2Manifesto />
      <Home2Vision />
      <Home2Expertise />
      <Home2Work />
      <Home2Team />
      <Home2Strip />
      <Home2Closing />
    </>
  );
}
