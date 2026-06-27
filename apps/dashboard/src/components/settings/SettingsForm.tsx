"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsForm() {
  return (
    <div className="max-w-2xl rounded-2xl border bg-white p-8">

      <h2 className="mb-6 text-xl font-semibold">
        API Configuration
      </h2>

      <div className="space-y-6">

        <div>
          <label className="mb-2 block font-medium">
            Backend URL
          </label>

          <Input
            value="http://localhost:4000"
            disabled
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            MCP Server
          </label>

          <Input
            value="notes-mcp"
            disabled
          />
        </div>

        <Button>
          Save Settings
        </Button>

      </div>

    </div>
  );
}