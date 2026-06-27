import HeroBackground from "./HeroBackground";
import HeroCards from "./HeroCards";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      <HeroBackground />

      <div className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-20 px-6 py-20 lg:grid-cols-2">

        <HeroContent />

        <HeroCards />

      </div>

    </section>
  );
}