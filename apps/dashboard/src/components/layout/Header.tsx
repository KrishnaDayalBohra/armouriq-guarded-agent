"use client";

import {
  Bell,
  Search,
  ChevronDown,
  Circle,
} from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-8 backdrop-blur">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold tracking-tight">
          ArmoriQ Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Secure AI Agent Management Platform
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Search */}

        <div className="relative hidden lg:block">

          <Search
            size={18}
            className="absolute left-4 top-3.5 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-80 rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:bg-white"
          />

        </div>

        {/* Notifications */}

        <button className="relative rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100">

          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />

        </button>

        {/* Status */}

        <div className="hidden items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2 lg:flex">

          <Circle
            size={10}
            className="fill-green-500 text-green-500"
          />

          <span className="text-sm font-medium text-green-700">
            System Online
          </span>

        </div>

        {/* User */}

        <button className="flex items-center gap-3 rounded-xl border border-slate-200 p-2 transition hover:bg-slate-50">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 font-bold text-white shadow-md">
            KB
          </div>

          <div className="hidden text-left lg:block">

            <p className="font-semibold">
              Krishna Bohra
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>

          </div>

          <ChevronDown
            size={18}
            className="text-slate-400"
          />

        </button>

      </div>

    </header>
  );
}