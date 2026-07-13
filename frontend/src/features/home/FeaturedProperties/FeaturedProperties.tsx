import { featuredProperties } from "./featured.data";
import PropertyCard from "./PropertyCard";

export default function FeaturedProperties() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">

      <div className="mb-16 text-center">

        <h2 className="text-5xl font-bold">
          Featured Properties
        </h2>

        <p className="mt-5 text-muted-foreground">
          Discover verified homes across Kenya.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        {featuredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}

      </div>

    </section>
  );
}