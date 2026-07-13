"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Topbar />

          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}