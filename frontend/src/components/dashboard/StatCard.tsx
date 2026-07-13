interface StatCardProps {
    title: string;
    value: string | number;
    color?: string;
  }
  
  export default function StatCard({
    title,
    value,
    color = "bg-sky-600",
  }: StatCardProps) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm border">
        <div
          className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white text-xl font-bold`}
        >
          📊
        </div>
  
        <h3 className="mt-4 text-gray-500">
          {title}
        </h3>
  
        <p className="mt-2 text-3xl font-bold">
          {value}
        </p>
      </div>
    );
  }