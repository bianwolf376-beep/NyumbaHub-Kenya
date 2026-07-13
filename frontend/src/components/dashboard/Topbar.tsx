"use client";

export default function Topbar() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">
      <div>
        <h2 className="text-2xl font-bold">
          Landlord Dashboard
        </h2>

        <p className="text-gray-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold">
          L
        </div>
      </div>
    </header>
  );
}