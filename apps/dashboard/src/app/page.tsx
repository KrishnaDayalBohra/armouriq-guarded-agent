"use client";

import MetricCard from "@/components/dashboard/MetricCard";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import SystemHealthCard from "@/components/dashboard/SystemHealthCard";

import { useDashboard } from "@/hooks/useDashboard";

import {
  Shield,
  CircleCheckBig,
  Ban,
  Clock3,
  Bot,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  const { stats, loading } = useDashboard();

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor your guarded AI agent platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">

        <MetricCard
          title="Policies"
          value={stats.policies}
          icon={Shield}
          color="bg-blue-600"
        />

        <MetricCard
          title="Allowed"
          value={stats.allowed}
          icon={CircleCheckBig}
          color="bg-green-600"
        />

        <MetricCard
          title="Blocked"
          value={stats.blocked}
          icon={Ban}
          color="bg-red-600"
        />

        <MetricCard
          title="Pending"
          value={stats.pending}
          icon={Clock3}
          color="bg-orange-500"
        />

        <MetricCard
          title="Tools"
          value={stats.tools}
          icon={Bot}
          color="bg-purple-600"
        />

        <MetricCard
          title="Executions"
          value={stats.executions}
          icon={Activity}
          color="bg-cyan-600"
        />

      </div>

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <RecentActivityCard />
        </div>

        <SystemHealthCard />

      </div>

      <div>

        <h2 className="mb-4 text-xl font-semibold">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <QuickActionCard
            title="Open AI Agent"
            href="/chat"
          />

          <QuickActionCard
            title="Policies"
            href="/policies"
          />

          <QuickActionCard
            title="Approvals"
            href="/approvals"
          />

          <QuickActionCard
            title="Audit Logs"
            href="/logs"
          />

        </div>

      </div>

    </div>
  );
}