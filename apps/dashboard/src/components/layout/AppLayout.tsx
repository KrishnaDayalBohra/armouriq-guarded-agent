"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Header />

        <main className="flex-1 overflow-y-auto p-8">

          {children}

        </main>

      </div>

    </div>
  );
}