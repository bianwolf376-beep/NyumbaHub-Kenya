import { Building2, MapPinned, ShieldCheck, Sparkles } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "25,000+",
    label: "Verified Homes",
  },
  {
    icon: MapPinned,
    value: "47",
    label: "Counties Covered",
  },
  {
    icon: Sparkles,
    value: "AI",
    label: "Powered Search",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Verified Landlords",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl border bg-background/70 p-6 backdrop-blur"
          >
            <Icon className="mb-4 h-8 w-8 text-primary" />

            <h3 className="text-2xl font-bold">
              {item.value}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}