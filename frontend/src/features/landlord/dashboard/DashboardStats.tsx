"use client";

import StatCard from "@/components/dashboard/StatCard";

export default function DashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Properties"
        value="0"
      />

      <StatCard
        title="Total Views"
        value="0"
        color="bg-green-600"
      />

      <StatCard
        title="Messages"
        value="0"
        color="bg-orange-500"
      />

      <StatCard
        title="Visit Requests"
        value="0"
        color="bg-purple-600"
      />
    </div>
  );
}