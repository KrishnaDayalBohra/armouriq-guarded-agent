import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  href: string;
}

export default function QuickActionCard({
  title,
  href,
}: Props) {
  return (
    <Link href={href}>

      <Card className="group rounded-3xl border-0 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        <CardContent className="flex items-center justify-between p-7">

          <div>

            <p className="text-lg font-semibold">
              {title}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Open →
            </p>

          </div>

          <ArrowRight
            className="transition-transform group-hover:translate-x-2"
            size={24}
          />

        </CardContent>

      </Card>

    </Link>
  );
}