import React, { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Card, Badge } from "../components/ui";
import announcements from "../data/announcements.json";

const DEPARTMENTS = ["All", "CSE", "ECE", "ME", "Biotech"];
const YEARS = ["All", "1st Year", "2nd Year", "3rd Year", "4th Year", "All Years"];
const TYPES = ["All", "Academic", "Notice", "Event", "Placement"];

export function SearchSection() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [year, setYear] = useState("All");
  const [type, setType] = useState("All");

  const results = useMemo(() => {
    return announcements.filter((a) => {
      if (dept !== "All" && a.department !== dept) return false;
      if (year !== "All" && a.year !== year) return false;
      if (type !== "All" && a.type !== type) return false;
      if (query && !a.title.toLowerCase().includes(query.toLowerCase()) && !a.summary.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [query, dept, year, type]);

  return (
    <section>
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Branch-Specific Announcements</h1>
        <p className="text-sm text-slate">Search and filter notices targeted to you.</p>
      </header>

      <Card className="mb-6 p-4">
        <div className="mb-4 flex items-center gap-2 rounded-full border border-slate/20 bg-surface px-4 py-2.5">
          <SearchIcon size={16} className="text-slate" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search announcements…"
            className="w-full bg-transparent text-sm text-ink placeholder:text-slate/60 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <Select label="Department" value={dept} onChange={setDept} options={DEPARTMENTS} />
          <Select label="Year" value={year} onChange={setYear} options={YEARS} />
          <Select label="Notice type" value={type} onChange={setType} options={TYPES} />
        </div>
      </Card>

      <div className="flex flex-col gap-3">
        {results.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate">No announcements match these filters.</p>
        ) : (
          results.map((a) => (
            <Card key={a.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-[15px] font-bold text-ink">{a.title}</p>
                  <p className="mt-1 text-sm text-ink/70">{a.summary}</p>
                </div>
                <span className="shrink-0 text-xs text-slate">
                  {new Date(a.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone="ocean">{a.department}</Badge>
                <Badge tone="slate">{a.year}</Badge>
                <Badge tone="medium">{a.type}</Badge>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-slate">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate/20 bg-surface px-3 py-1.5 text-sm text-ink focus:border-ocean focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
