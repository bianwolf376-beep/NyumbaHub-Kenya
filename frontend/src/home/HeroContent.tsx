import HeroSearch from "./HeroSearch";
import HeroStats from "./HeroStats";

const popularSearches = [
  "Nairobi",
  "Nakuru",
  "Mombasa",
  "Kisumu",
  "Eldoret",
];

export default function HeroContent() {
  return (
    <div className="max-w-3xl">

      <div className="inline-flex items-center rounded-full border bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
        ✨ Kenya's AI Powered Property Marketplace
      </div>

      <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-7xl">
        Find Your Next Home
        <span className="block text-primary">
          With AI
        </span>
      </h1>

      <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
        Search thousands of verified houses, apartments and rentals
        across Kenya using natural language.

        Just ask NyumbaAI.
      </p>

      <HeroSearch />

      <div className="mt-8 flex flex-wrap gap-3">

        {popularSearches.map((county) => (
          <button
            key={county}
            className="rounded-full border px-5 py-2 text-sm transition hover:bg-primary hover:text-white"
          >
            {county}
          </button>
        ))}

      </div>

      <HeroStats />

    </div>
  );
}