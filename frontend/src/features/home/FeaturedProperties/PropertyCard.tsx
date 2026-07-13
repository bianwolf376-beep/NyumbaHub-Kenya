import Image from "next/image";
import { Bath, BedDouble, Heart, MapPin, ShieldCheck } from "lucide-react";

interface Property {
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  verified: boolean;
}

export default function PropertyCard({
  property,
}: {
  property: Property;
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900">

      <div className="relative h-72 overflow-hidden">

        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-lg">
          <Heart size={18} />
        </button>

      </div>

      <div className="space-y-4 p-6">

        <div className="flex items-center justify-between">

          <h3 className="text-2xl font-bold">
            {property.title}
          </h3>

          {property.verified && (
            <ShieldCheck className="text-green-500" />
          )}

        </div>

        <p className="flex items-center gap-2 text-muted-foreground">
          <MapPin size={18} />
          {property.location}
        </p>

        <div className="flex gap-6">

          <span className="flex items-center gap-2">
            <BedDouble size={18} />
            {property.bedrooms}
          </span>

          <span className="flex items-center gap-2">
            <Bath size={18} />
            {property.bathrooms}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <h4 className="text-2xl font-bold text-sky-600">
            {property.price}
          </h4>

          <button className="rounded-xl bg-sky-600 px-5 py-2 text-white hover:bg-sky-700">
            View
          </button>

        </div>

      </div>

    </div>
  );
}