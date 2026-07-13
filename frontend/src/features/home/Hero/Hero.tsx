import HeroBackground from "./HeroBackground";
import HeroSearch from "./HeroSearch";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-28">
      <HeroBackground />

      <div className="mx-auto max-w-7xl px-6 text-center">
        <span className="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
          🇰🇪 Kenya&apos;s Smart Property Marketplace
        </span>

        <h1 className="mt-8 text-6xl font-extrabold tracking-tight">
          Find Your Perfect Home
          <br />
          with{" "}
          <span className="text-sky-600">
            Ask Nyumba AI
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl text-muted-foreground">
          Search houses, apartments, bedsitters and commercial properties
          anywhere in Kenya using natural language.
        </p>

        <HeroSearch />
      </div>
    </section>
  );
}