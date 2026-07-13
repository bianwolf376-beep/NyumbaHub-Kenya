"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import propertyService from "@/services/property/property.service";

interface Property {
  id: string;
  title: string;
  county: string;
  town: string;
  estate: string;
  rent: number;
  status: string;
  images: {
    imageUrl: string;
  }[];
}

export default function MyProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    try {
      const data = await propertyService.getMine();
      setProperties(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading properties...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          My Properties
        </h1>

        <Link
          href="/dashboard/add-property"
          className="rounded-xl bg-sky-600 px-5 py-3 text-white hover:bg-sky-700"
        >
          + Add Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <h2 className="text-2xl font-semibold">
            No properties yet
          </h2>

          <p className="mt-3 text-gray-500">
            Start by adding your first rental property.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className="overflow-hidden rounded-2xl border bg-white shadow"
            >
              <img
                src={
                  property.images.length
                    ? property.images[0].imageUrl
                    : "https://placehold.co/600x400?text=No+Image"
                }
                alt={property.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold">
                  {property.title}
                </h2>

                <p className="mt-2 text-gray-500">
                  {property.estate}, {property.town}
                </p>

                <p className="mt-3 text-2xl font-bold text-sky-600">
                  KSh {Number(property.rent).toLocaleString()}
                </p>

                <div className="mt-5 flex gap-3">
                  <button className="rounded-lg bg-sky-600 px-4 py-2 text-white">
                    View
                  </button>

                  <button className="rounded-lg border px-4 py-2">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}