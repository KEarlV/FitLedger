# FitLedger

A mobile-first fitness, nutrition and food-budget companion built around sustainable body recomposition and practical everyday tracking.

## Current preview
- Overview dashboard: training focus, nutrition snapshot, hydration, food spending and activity log
- Training checklist with session progress and local activity logging
- Nutrition diary with sample Filipino staples, calories, protein and water check-in
- Food allowance tracker with spending controls and affordable meal ideas
- Progress page with body-weight check-in and weekly consistency
- Responsive mobile navigation, page transitions and reduced-motion support
- Local browser persistence (no account or backend required yet)

## Stack
Next.js App Router, React, TypeScript, Tailwind CSS v4, Framer Motion and Lucide React.

## Run locally
```bash
npm install
npm run dev
```

## Data
The preview stores entries in browser localStorage. Export/restore, a richer IndexedDB layer and optional Supabase sync are planned before production use. Sample targets and prices are editable starting points, not medical advice.

## Design references
Interaction patterns were studied from [Gym Ledger](https://github.com/gym-ledger/web), [Ballast](https://github.com/N-O-P-E/Ballast), and [Personal Gym Tracker](https://github.com/jaredf96/personal-gym-tracker). Their code and assets are not copied into this repository.


## Fitness rank progression
FitLedger includes a personal, Honor of Kings-inspired rank ladder: Unranked → Bronze → Silver → Gold → Platinum → Diamond → Master → Grandmaster → Epic → Legend → Mythic → Greek Physique. XP is earned from logged activity (25 XP per completed exercise entry, 5 XP per food/water/budget log). This is a personal consistency game, not a measure of health or body worth. Rank thresholds are configurable in `src/lib/ranks.ts`.

## Backend API
- `GET /api/progression?xp=500` returns rank, progress, XP to next tier and the rank ladder.
- `POST /api/progression` with JSON `{ "xp": 500 }` validates the XP value and returns the current rank state.
- `GET /api/health` returns a basic service health response.

The API is stateless and validates requests. User progress remains in browser localStorage; a persistent multi-user leaderboard and cross-device account sync require authentication and a database such as the planned Supabase integration. The rank displayed now is a personal progression tier, not a live global leaderboard.
