import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const services = [
  "Gemini API",
  "MCP Server",
  "Database",
  "Policy Engine",
];

export default function SystemHealthCard() {
  return (
    <Card className="rounded-3xl border-0 bg-white shadow-sm">

      <CardContent className="p-8">

        <h2 className="mb-6 text-2xl font-bold">
          System Health
        </h2>

        <div className="space-y-5">

          {services.map((service) => (
            <div
              key={service}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <span className="font-medium">
                {service}
              </span>

              <span className="flex items-center gap-2 text-green-600">

                <CheckCircle2 size={18} />

                Healthy

              </span>

            </div>
          ))}

        </div>

      </CardContent>

    </Card>
  );
}