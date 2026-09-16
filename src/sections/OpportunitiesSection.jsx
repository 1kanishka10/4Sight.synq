import React, { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, Eye, Layers, CalendarDays } from "lucide-react";
import { Card, Badge } from "../components/ui";
import opportunities from "../data/opportunities.json";

const STORE_KEY = "synq.saved.opportunities";

function loadSaved() {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

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
  const [saved, setSaved] = useState(loadSaved);
  const [onlySaved, setOnlySaved] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify([...saved]));
    } catch {
      // Private browsing or blocked storage — saving just won't persist.
    }
  }, [saved]);

  const toggle = (id) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const visible = onlySaved ? sorted.filter((o) => saved.has(o.id)) : sorted;

  return (
    <section>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Campus Opportunities</h1>
          <p className="text-sm text-slate">
            Things worth knowing about that were announced once and buried. Nothing here was
            filtered out for being unexpected.
          </p>
        </div>

        <button
          onClick={() => setOnlySaved((v) => !v)}
          className={
            onlySaved
              ? "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ocean px-3.5 py-2 text-xs font-semibold text-white"
              : "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate/25 px-3.5 py-2 text-xs font-medium text-slate hover:border-ocean hover:text-ink"
          }
        >
          <BookmarkCheck size={14} />
          Saved ({saved.size})
        </button>
      </header>

      {visible.length === 0 ? (
        <div className="py-16 text-center">
          <Bookmark size={22} className="mx-auto mb-3 text-slate" />
          <p className="text-sm text-slate">
            Nothing saved yet. Tap the bookmark on any card to keep it here.
          </p>
          <button
            onClick={() => setOnlySaved(false)}
            className="mt-3 text-xs font-semibold text-ocean hover:underline"
          >
            Show all opportunities
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((o) => {
            const isSaved = saved.has(o.id);
            return (
              <Card key={o.id} className="flex flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <Badge tone="ocean">{o.category}</Badge>
                  <button
                    onClick={() => toggle(o.id)}
                    aria-label={isSaved ? "Remove from saved" : "Save for later"}
                    title={isSaved ? "Remove from saved" : "Save for later"}
                    className={isSaved ? "text-ocean" : "text-slate hover:text-ocean"}
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
      )}

      {saved.size > 0 && !onlySaved && (
        <p className="mt-5 text-xs text-slate">
          {saved.size} saved. They stay saved on this device after you close the tab.
        </p>
      )}
    </section>
  );
}
