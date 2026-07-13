import { MapPin } from "lucide-react";

interface CountyCardProps {
  county: string;
}

export default function CountyCard({ county }: CountyCardProps) {
  const listings = Math.floor(Math.random() * 500) + 50;

  return (
    <button className="group rounded-3xl border bg-white p-6 text-left shadow-md transition-all hover:-translate-y-2 hover:border-sky-500 hover:shadow-xl dark:bg-slate-900">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100">
        <MapPin className="text-sky-600" />
      </div>

      <h3 className="text-xl font-bold">{county}</h3>

      <p className="mt-2 text-muted-foreground">
        {listings} Properties
      </p>
    </button>
  );
}