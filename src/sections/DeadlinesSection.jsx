import React, { useState } from "react";
import { Clock3, User, Link as LinkIcon, FileText } from "lucide-react";
import { Card, Badge, Drawer } from "../components/ui";
import deadlines from "../data/deadlines.json";

function urgencyOf(hours) {
  if (hours < 24) return { tone: "critical", label: "Critical" };
  if (hours < 72) return { tone: "high", label: "High" };
  return { tone: "medium", label: "Medium" };
}

function countdown(hours) {
  if (hours < 24) return `${hours}h left`;
  const days = Math.floor(hours / 24);
  const rem = hours % 24;
  return `${days}d ${rem}h left`;
}

export function DeadlinesSection() {
  const [selected, setSelected] = useState(null);
  const sorted = [...deadlines].sort((a, b) => a.dueInHours - b.dueInHours);

  return (
    <section>
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Urgent Deadlines</h1>
        <p className="text-sm text-slate">Sorted automatically by how soon they close.</p>
      </header>

      <div className="flex flex-col gap-3">
        {sorted.map((d) => {
          const urgency = urgencyOf(d.dueInHours);
          return (
            <Card
              key={d.id}
              className="cursor-pointer p-4 transition-transform hover:-translate-y-0.5"
              onClick={() => setSelected(d)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="mb-1 font-display text-[15px] font-bold text-ink">{d.title}</p>
                  <Badge tone="slate">{d.tag}</Badge>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <Badge tone={urgency.tone}>{urgency.label}</Badge>
                  <span className="flex items-center gap-1 text-xs text-slate">
                    <Clock3 size={12} />
                    {countdown(d.dueInHours)}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.title ?? ""}>
        {selected && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Badge tone={urgencyOf(selected.dueInHours).tone}>
                {urgencyOf(selected.dueInHours).label}
              </Badge>
              <Badge tone="slate">{selected.tag}</Badge>
            </div>
            <p className="text-sm leading-relaxed text-ink/80">{selected.description}</p>
            <DetailRow icon={FileText} label="Submission" value={selected.submission} />
            <DetailRow icon={User} label="Contact" value={selected.contact} />
            <a
              href={selected.actionLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-5 py-2.5 text-sm font-semibold text-white hover:bg-ocean-dark"
            >
              <LinkIcon size={15} />
              Open submission link
            </a>
          </div>
        )}
      </Drawer>
    </section>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div>
      <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-slate">
        <Icon size={13} />
        {label}
      </p>
      <p className="text-sm text-ink/80">{value}</p>
    </div>
  );
}
