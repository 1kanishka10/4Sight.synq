import React, { useState } from "react";
import { Bookmark, BookmarkCheck, Eye, Layers, CalendarDays } from "lucide-react";
import { Card, Badge } from "../components/ui";
import opportunities from "../data/opportunities.json";

// Dated first, nearest deadline leading; undated at the end.
const sorted = [...opportunities].sort((a, b) => {
  if (!a.deadline && !b.deadline) return 0;
  if (!a.deadline) return 1;
  if (!b.deadline) return -1;
  return new Date(a.deadline) - new Date(b.deadline);
});

function dueLabel(o) {
  if (!o.deadline) return o.deadlineText || "No deadline stated";
  const d = new Date(o.deadline);
  if (Number.isNaN(d.getTime())) return o.deadlineText || "No deadline stated";
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

export function OpportunitiesSection() {
  const [bookmarked, setBookmarked] = useState(new Set());

  const toggle = (id) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section>
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Campus Opportunities</h1>
        <p className="text-sm text-slate">
          Things worth knowing about that were announced once and buried. Nothing here was
          filtered out for being unexpected.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sorted.map((o) => {
          const isSaved = bookmarked.has(o.id);
          return (
            <Card key={o.id} className="flex flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-2">
                <Badge tone="ocean">{o.category}</Badge>
                <button
                  onClick={() => toggle(o.id)}
                  aria-label="Bookmark"
                  className="text-ocean"
                >
                  {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                </button>
              </div>

              <h3 className="font-display text-[15px] font-bold text-ink">{o.title}</h3>
              <p className="text-sm leading-relaxed text-ink/70">{o.description}</p>

              {o.whyHere && (
                <div className="rounded-lg border border-sky/20 bg-sky/5 p-2.5">
                  <p className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-sky">
                    <Eye size={11} />
                    Why you're seeing this
                  </p>
                  <p className="text-xs leading-relaxed text-ink/75">{o.whyHere}</p>
                </div>
              )}

              <div className="mt-auto flex flex-col gap-1.5 pt-2 text-xs text-slate">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={12} />
                  {dueLabel(o)}
                </span>
                <span>Eligibility: {o.eligibility}</span>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {o.sourceCount > 1 && (
                    <span className="inline-flex items-center gap-1">
                      <Layers size={11} />
                      {o.sourceCount} sources
                    </span>
                  )}
                  {o.confidence !== "stated" && <Badge tone="slate">Not confirmed</Badge>}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
