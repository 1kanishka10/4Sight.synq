import React, { createContext, useContext, useMemo, useState } from "react";
import deadlinesSeed from "./deadlines.json";
import opportunitiesSeed from "./opportunities.json";
import announcementsSeed from "./announcements.json";
import societiesSeed from "./societies.json";
import missedSeed from "./missed.json";
import statsSeed from "./stats.json";

// The sample corpus the app ships with. An import replaces it at runtime.
const SEED = {
  deadlines: deadlinesSeed,
  opportunities: opportunitiesSeed,
  announcements: announcementsSeed,
  societies: societiesSeed,
  missed: missedSeed,
  stats: statsSeed,
  source: "sample",
};

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(SEED);

  const value = useMemo(
    () => ({
      ...data,
      // Called by ImportButton once a chat has been processed.
      replaceAll: (next) => setData({ ...next, source: "imported" }),
      resetToSample: () => setData(SEED),
    }),
    [data]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be called inside <DataProvider>");
  return ctx;
}
