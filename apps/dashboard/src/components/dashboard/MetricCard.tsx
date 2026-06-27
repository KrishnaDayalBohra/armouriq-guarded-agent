import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: string;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}: MetricCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-3xl border-0 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* Top Accent */}
      <div className={`absolute left-0 top-0 h-1 w-full ${color}`} />

      <CardContent className="p-7">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              {title}
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight">
              {value}
            </h2>

            <div className="mt-5 flex items-center gap-2">

              <TrendingUp
                size={16}
                className="text-green-500"
              />

              <span className="text-sm font-medium text-green-600">
                Live
              </span>

            </div>

          </div>

          <div
            className={`${color} flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon size={30} />
          </div>

        </div>

        {subtitle && (
          <p className="mt-5 text-sm text-slate-500">
            {subtitle}
          </p>
        )}

      </CardContent>

    </Card>
  );
}