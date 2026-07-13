"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSearch() {
  const router = useRouter();

  const [county, setCounty] = useState("");
  const [town, setTown] = useState("");
  const [propertyType, setPropertyType] = useState("");

  function search() {
    const params = new URLSearchParams();

    if (county) params.append("county", county);
    if (town) params.append("town", town);
    if (propertyType) params.append("propertyType", propertyType);

    router.push(`/properties?${params.toString()}`);
  }

  return (
    <div className="mt-12 rounded-3xl bg-white p-6 shadow-xl">
      <div className="grid gap-4 md:grid-cols-4">

        <input
          className="rounded-xl border p-4"
          placeholder="County"
          value={county}
          onChange={(e) => setCounty(e.target.value)}
        />

        <input
          className="rounded-xl border p-4"
          placeholder="Town"
          value={town}
          onChange={(e) => setTown(e.target.value)}
        />

        <select
          className="rounded-xl border p-4"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Property Type</option>
          <option>Bedsitter</option>
          <option>Studio</option>
          <option>Apartment</option>
          <option>Maisonette</option>
          <option>Bungalow</option>
          <option>Office</option>
          <option>Shop</option>
        </select>

        <button
          onClick={search}
          className="rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700"
        >
          Search Properties
        </button>

      </div>
    </div>
  );
}