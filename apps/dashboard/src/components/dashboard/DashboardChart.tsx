"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", executions: 24 },
  { day: "Tue", executions: 31 },
  { day: "Wed", executions: 18 },
  { day: "Thu", executions: 42 },
  { day: "Fri", executions: 56 },
  { day: "Sat", executions: 37 },
  { day: "Sun", executions: 61 },
];

export default function DashboardChart() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Tool Executions
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="color"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#2563eb"
                  stopOpacity={0.8}
                />

                <stop
                  offset="100%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="executions"
              stroke="#2563eb"
              fill="url(#color)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}