interface StatCardProps {
    value: string;
    label: string;
  }
  
  export default function StatCard({
    value,
    label,
  }: StatCardProps) {
    return (
      <div className="rounded-3xl border bg-white p-8 text-center shadow-lg dark:bg-slate-900">
        <h3 className="text-5xl font-extrabold text-sky-600">
          {value}
        </h3>
  
        <p className="mt-3 text-muted-foreground">
          {label}
        </p>
      </div>
    );
  }