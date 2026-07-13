"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const [county, setCounty] = useState("");
  const [town, setTown] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  function search() {
    const params = new URLSearchParams();

    if (county) params.set("county", county);
    if (town) params.set("town", town);
    if (propertyType) params.set("propertyType", propertyType);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (minRent) params.set("minRent", minRent);
    if (maxRent) params.set("maxRent", maxRent);

    router.push(`/properties?${params.toString()}`);
  }

  return (
    <section className="bg-white shadow-xl rounded-3xl p-6 -mt-12 relative z-20 mx-auto max-w-7xl">

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">

        <select
          value={county}
          onChange={(e) => setCounty(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option value="">County</option>
          <option>Nakuru</option>
          <option>Nairobi</option>
          <option>Kiambu</option>
          <option>Mombasa</option>
          <option>Kisumu</option>
        </select>

        <input
          placeholder="Town"
          value={town}
          onChange={(e) => setTown(e.target.value)}
          className="rounded-xl border p-3"
        />

        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option value="">Property Type</option>
          <option>Single Room</option>
          <option>Bedsitter</option>
          <option>Studio</option>
          <option>1 Bedroom</option>
          <option>2 Bedroom</option>
          <option>3 Bedroom</option>
          <option>Maisonette</option>
        </select>

        <input
          type="number"
          placeholder="Bedrooms"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="rounded-xl border p-3"
        />

        <input
          type="number"
          placeholder="Min Rent"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
          className="rounded-xl border p-3"
        />

        <input
          type="number"
          placeholder="Max Rent"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
          className="rounded-xl border p-3"
        />

      </div>

      <button
        onClick={search}
        className="mt-6 w-full rounded-xl bg-sky-600 py-4 text-lg font-semibold text-white hover:bg-sky-700"
      >
        Search Properties
      </button>

    </section>
  );
}