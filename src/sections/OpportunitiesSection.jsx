import React, { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Card, Badge } from "../components/ui";
import opportunities from "../data/opportunities.json";

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
        <p className="text-sm text-slate">Research, internships, hackathons, grants, and cultural events.</p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {opportunities.map((o) => {
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
              <p className="text-sm text-ink/70 leading-relaxed">{o.description}</p>
              <div className="mt-auto flex flex-col gap-1 pt-2 text-xs text-slate">
                <span>Eligibility: {o.eligibility}</span>
                <span>Deadline: {new Date(o.deadline).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
              </div>
              <button className="mt-2 rounded-full bg-ocean px-4 py-2 text-sm font-semibold text-white hover:bg-ocean-dark">
                Apply Now
              </button>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
