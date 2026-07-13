"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyService from "@/services/property/property.service";

interface Property {
  id: string;
  title: string;
  county: string;
  town: string;
  estate: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  images: {
    imageUrl: string;
  }[];
}

interface PropertyGridProps {
  filters?: {
    county?: string;
    town?: string;
    estate?: string;
    propertyType?: string;
    bedrooms?: number;
    bathrooms?: number;
    minRent?: number;
    maxRent?: number;
  };
}

export default function PropertyGrid({
  filters,
}: PropertyGridProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, [filters]);

  async function loadProperties() {
    setLoading(true);

    try {
      const data = await PropertyService.getAll(filters);
      setProperties(data);
    } catch (error) {
      console.error("Failed to load properties:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-20 text-center text-xl">
        Loading properties...
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold">No properties found</h2>

        <p className="mt-3 text-gray-500">
          Try changing your search filters.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="mb-10 text-4xl font-bold">
        Available Properties
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property.id}
            className="overflow-hidden rounded-2xl border bg-white shadow transition hover:shadow-xl"
          >
            <img
              src={
                property.images.length
                  ? property.images[0].imageUrl
                  : "https://placehold.co/800x500?text=NyumbaHub"
              }
              alt={property.title}
              className="h-56 w-full object-cover"
            />

            <div className="space-y-3 p-5">
              <h3 className="text-xl font-bold">
                {property.title}
              </h3>

              <p className="text-gray-500">
                {property.estate}, {property.town}
              </p>

              <p className="text-sm text-gray-400">
                {property.propertyType}
              </p>

              <div className="flex justify-between text-sm">
                <span>{property.bedrooms} Beds</span>
                <span>{property.bathrooms} Baths</span>
              </div>

              <div className="text-2xl font-bold text-sky-600">
                KSh {property.rent.toLocaleString()}
              </div>

              <Link
                href={`/dashboard/properties/${property.id}`}
                className="block rounded-xl bg-sky-600 py-3 text-center font-semibold text-white hover:bg-sky-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}