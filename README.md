# Campus Hub

A centralized college announcement and opportunity hub, built as a 5-section
dashboard with a dark glassmorphism sidebar and mock JSON data throughout.

## Sections

1. **Urgent Deadlines** — auto-sorted by urgency (Critical <24h, High <3d,
   Medium after), click a card to open the detail drawer.
2. **Campus Opportunities** — grid of research/internship/hackathon/grant/
   cultural cards with a working bookmark toggle.
3. **Schedule & Clashing Deadlines** — a timeline view plus automatic
   conflict detection (`findClashes` in `ScheduleSection.jsx`) that flags
   deadlines landing within hours of each other.
4. **Campus Societies Directory** — category filter bar, click a card for
   a detail modal (core team, past/upcoming events).
5. **Branch-Specific Announcements** — search bar with Department/Year/
   Notice Type filters.

## Data

All mock data lives in `src/data/*.json`. Every interactive state (drawers,
modals, filters, search, bookmarks) works out of the box against this data —
swap these files for a real API later without touching the components.

## Color palette

Pulled directly from the supplied palette:
`#83B3CA` (sky), `#19719C` (ocean/primary), `#FFFFFF` (surface),
`#5C5C68` (slate), `#000013` (ink/sidebar).

## Run locally

```
npm install
npm run dev
```

## Deploy

Push to GitHub, import into Vercel — it's a static Vite app, no extra config
needed.
