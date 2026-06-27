import { Inbox } from "lucide-react";

export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white py-20">

      <Inbox
        size={64}
        className="text-slate-300"
      />

      <h2 className="mt-6 text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        {description}
      </p>

    </div>
  );
}