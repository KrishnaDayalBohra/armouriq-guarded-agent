"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Bot,
  Shield,
  CheckCircle2,
  FileText,
  Settings,
  Sparkles,
} from "lucide-react";

const links = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "AI Agent",
    href: "/chat",
    icon: Bot,
  },
  {
    title: "Policies",
    href: "/policies",
    icon: Shield,
  },
  {
    title: "Approvals",
    href: "/approvals",
    icon: CheckCircle2,
  },
  {
    title: "Audit Logs",
    href: "/logs",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 text-white">

      {/* Logo */}

      <div className="border-b border-slate-800 p-8">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-3">

            <Shield size={24} />

          </div>

          <div>

            <h1 className="text-2xl font-bold">
              ArmoriQ
            </h1>

            <p className="text-sm text-slate-400">
              Guarded Agent
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6 space-y-2">

        {links.map((link) => {
          const Icon = link.icon;

          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200

                ${
                  active
                    ? "bg-blue-600 shadow-lg"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
            >
              <Icon
                size={20}
                className="transition-transform group-hover:scale-110"
              />

              <span className="font-medium">
                {link.title}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-6">

        <div className="flex items-center gap-3 rounded-xl bg-slate-900 p-4">

          <Sparkles className="text-green-400" />

          <div>

            <p className="font-medium">
              System Healthy
            </p>

            <p className="text-xs text-slate-400">
              All services online
            </p>

          </div>

        </div>

        <p className="mt-5 text-center text-xs text-slate-500">
          ArmoriQ v1.0
        </p>

      </div>

    </aside>
  );
}