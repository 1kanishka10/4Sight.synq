import React, { useMemo } from "react";
import { AlertTriangle, CalendarDays } from "lucide-react";
import { Card, Badge } from "../components/ui";
import deadlines from "../data/deadlines.json";

// Group deadlines whose due-times land within 6 hours of each other.
function findClashes(items, toleranceHours = 6) {
  const sorted = [...items].sort((a, b) => a.dueInHours - b.dueInHours);
  const groups = [];
  let current = [];

  for (const item of sorted) {
    if (current.length === 0 || item.dueInHours - current[current.length - 1].dueInHours <= toleranceHours) {
      current.push(item);
    } else {
      if (current.length > 1) groups.push(current);
      current = [item];
    }
  }
  if (current.length > 1) groups.push(current);
  return groups;
}

export function ScheduleSection() {
  const timeline = [...deadlines].sort((a, b) => a.dueInHours - b.dueInHours);
  const clashes = useMemo(() => findClashes(deadlines), []);

  return (
    <section>
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Schedule & Clashing Deadlines</h1>
        <p className="text-sm text-slate">A timeline of what's active, with automatic conflict detection.</p>
      </header>

      {clashes.length > 0 && (
        <div className="mb-6 flex flex-col gap-3">
          {clashes.map((group, i) => (
            <Card key={i} className="border-critical/30 bg-critical/5 p-4">
              <div className="flex items-start gap-2.5">
                <AlertTriangle size={18} className="mt-0.5 shrink-0 text-critical" />
                <div>
                  <p className="text-sm font-semibold text-critical">
                    Conflict: {group.length} deadlines fall within hours of each other
                  </p>
                  <p className="mt-1 text-sm text-ink/70">
                    {group.map((g) => g.title).join(" · ")}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
          <CalendarDays size={16} className="text-ocean" />
          Timeline
        </div>
        <div className="flex flex-col">
          {timeline.map((d, i) => (
            <div key={d.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="h-2.5 w-2.5 rounded-full bg-ocean" />
                {i < timeline.length - 1 && <span className="w-px flex-1 bg-slate/20" />}
              </div>
              <div className="pb-6">
                <p className="text-xs text-slate">
                  {d.dueInHours < 24 ? `In ${d.dueInHours}h` : `In ${Math.floor(d.dueInHours / 24)}d`}
                </p>
                <p className="text-sm font-medium text-ink">{d.title}</p>
                <Badge tone="slate" className="mt-1">{d.tag}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
