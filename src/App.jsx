import React, { useState } from "react";
import { GraduationCap, Bell } from "lucide-react";
import { Sidebar, MobileNav } from "./components/Sidebar";
import { DeadlinesSection } from "./sections/DeadlinesSection";
import { OpportunitiesSection } from "./sections/OpportunitiesSection";
import { ScheduleSection } from "./sections/ScheduleSection";
import { SocietiesSection } from "./sections/SocietiesSection";
import { SearchSection } from "./sections/SearchSection";

const SECTION_LABEL = {
  deadlines: "Urgent Deadlines",
  opportunities: "Campus Opportunities",
  schedule: "Schedule & Clashes",
  societies: "Societies Directory",
  search: "Announcements",
};

export default function App() {
  const [tab, setTab] = useState("deadlines");

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar active={tab} onChange={setTab} />

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="glass sticky top-0 z-30 flex items-center justify-between border-b border-white/60 px-5 py-4 lg:px-8">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ocean text-white">
              <GraduationCap size={16} />
            </div>
            <span className="font-display text-base font-bold text-ink">Campus Hub</span>
          </div>
          <span className="hidden text-sm font-medium text-slate lg:block">{SECTION_LABEL[tab]}</span>
          <button className="relative rounded-full p-2 text-slate hover:bg-white" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-critical" />
          </button>
        </header>

        <main className="flex-1 px-5 pb-24 pt-6 lg:px-8 lg:pb-10">
          {tab === "deadlines" && <DeadlinesSection />}
          {tab === "opportunities" && <OpportunitiesSection />}
          {tab === "schedule" && <ScheduleSection />}
          {tab === "societies" && <SocietiesSection />}
          {tab === "search" && <SearchSection />}
        </main>
      </div>

      <MobileNav active={tab} onChange={setTab} />
    </div>
  );
}
