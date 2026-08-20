import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-eiden flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow text-teal">404</p>
      <h1 className="text-forest mt-6 text-[clamp(2rem,5vw,3.5rem)]">
        Page introuvable.
      </h1>
      <p className="text-forest/60 mt-5 max-w-md text-base leading-relaxed">
        Le lien que vous avez suivi n&apos;existe pas ou a été déplacé.
      </p>
      <Link
        href="/"
        className="bg-forest text-canvas hover:bg-teal mt-9 inline-flex h-12 items-center rounded-full px-7 text-sm transition-colors duration-300"
      >
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
