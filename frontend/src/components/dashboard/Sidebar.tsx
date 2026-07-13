"use client";

import Link from "next/link";
import { Home, Building2, PlusSquare, MessageCircle, CalendarDays, Heart, User, Settings, LogOut } from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "My Properties", href: "/dashboard/properties", icon: Building2 },
  { name: "Add Property", href: "/dashboard/add-property", icon: PlusSquare },
  { name: "Messages", href: "/dashboard/messages", icon: MessageCircle },
  { name: "Visit Requests", href: "/dashboard/visits", icon: CalendarDays },
  { name: "Favorites", href: "/favorites", icon: Heart },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-white border-r shadow-sm">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-sky-600">
          NyumbaHub
        </h1>

        <p className="text-sm text-gray-500">
          Kenya Rentals
        </p>
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-sky-50 hover:text-sky-600 transition"
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </Link>
          );
        })}

        <button
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
}