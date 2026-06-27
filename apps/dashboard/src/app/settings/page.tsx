"use client";

import SettingsForm from "@/components/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Configure your ArmoriQ dashboard.
        </p>

      </div>

      <SettingsForm />

    </div>
  );
}