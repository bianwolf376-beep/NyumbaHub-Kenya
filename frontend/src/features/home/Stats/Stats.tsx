import StatCard from "./StatCard";

export default function Stats() {
  return (
    <section className="bg-sky-600 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold">
            Trusted Across Kenya
          </h2>

          <p className="mt-5 text-sky-100">
            Growing every single day.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            value="15K+"
            label="Properties"
          />

          <StatCard
            value="8K+"
            label="Landlords"
          />

          <StatCard
            value="120K+"
            label="Monthly Searches"
          />

          <StatCard
            value="47"
            label="Counties Covered"
          />

        </div>

      </div>
    </section>
  );
}