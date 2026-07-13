import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100">
        <Icon className="h-8 w-8 text-sky-600" />
      </div>

      <h3 className="mb-3 text-2xl font-bold">
        {title}
      </h3>

      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
}