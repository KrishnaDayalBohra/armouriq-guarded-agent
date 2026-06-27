import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    tool: "create_note",
    status: "Allowed",
  },
  {
    tool: "delete_note",
    status: "Blocked",
  },
  {
    tool: "list_notes",
    status: "Allowed",
  },
];

export default function RecentActivityCard() {
  return (
    <Card className="rounded-2xl">

      <CardContent className="p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Recent Activity
        </h2>

        <div className="space-y-4">

          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <span className="font-medium">
                {activity.tool}
              </span>

              <Badge
                variant={
                  activity.status === "Allowed"
                    ? "default"
                    : "destructive"
                }
              >
                {activity.status}
              </Badge>
            </div>
          ))}

        </div>

      </CardContent>

    </Card>
  );
}