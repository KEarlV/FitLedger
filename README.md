# FitLedger

A mobile-first fitness, nutrition and food-budget companion built around sustainable training, practical everyday tracking and user-controlled goals.

## Current application features

- **Account access:** Supabase email sign-up/sign-in, verification callback and password reset.
- **Overview:** daily nutrition and spending snapshot, saved workout-day consistency, recent activity and personal rank display.
- **Training:** workout builder, searchable exercise library, custom exercises, equipment preferences, reusable templates, weekly split planner, optional AI/smart suggestions, set/repetition/load logging, session completion and cloud-backed workout history.
- **Nutrition:** manual food diary entries with meal type, serving description, calories, protein, carbohydrates and fat; editable entries, confirmed deletion, quick-meal favorites, user-controlled daily targets, hydration check-ins and seven-day history.
- **Budget:** daily expense logging, category tracking, confirmed deletion and a current-day spending summary.
- **Progress:** saved body-weight and optional waist check-ins, weekly comparisons, 30-day workout consistency and loaded-set trends, nutrition summaries and private device-only progress photos.
- **Responsive UI:** mobile bottom navigation, desktop sidebar, touch-sized controls, keyboard skip navigation, clear focus states, transitions and reduced-motion support.
- **PWA:** web app manifest, branded install icon and standalone display metadata. Offline caching is not enabled yet; authenticated fitness data is not cached by a service worker.
- **Persistence:** browser localStorage plus Supabase profile-state sync and dedicated tables for food, budget, body metrics, workout sessions and workout sets.

## Data and privacy notes

- Nutrition totals count only food entries the user saves. Manual nutrition values are estimates unless a verified food database is integrated.
- Calorie and macro targets are optional user-entered tracking preferences, not personalized medical prescriptions.
- Body weight and optional waist measurements are stored together as one check-in when submitted together.
- Workout consistency counts distinct local calendar days with at least one saved workout session. A rest day is part of sustainable training; the streak is descriptive, not a target.
- Progress photos are resized and saved only in the current browser on the current device. They are not uploaded to Supabase or included in cross-device sync.
- XP and ranks are a local motivational feature, not a verified measure of health or fitness. Server-authoritative XP and achievements remain future work.
- The AI workout suggestion endpoint requires an authenticated Supabase user, validates the supplied exercise list, and never assigns a working weight automatically.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, Supabase Auth and Postgres, and Recharts.

## Run locally

```bash
npm install
npm run dev
```

Available scripts:

- `npm run build` — production build, including Next.js lint/type validation.
- `npm run lint` — ESLint.

## Backend

Supabase project URL and publishable key are supplied through environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (configured origin used for Auth redirects)

The AI workout suggestion endpoint optionally uses `OPENAI_API_KEY` and `OPENAI_MODEL`. Never expose a Supabase service-role key or OpenAI API key in browser code.

## API

- `GET /api/progression?xp=500` returns a rank calculation.
- `POST /api/progression` validates and calculates a rank response; it does not persist XP.
- `POST /api/workout-suggestions` generates a conservative session for an authenticated user when an OpenAI key is configured. A local smart-suggestion fallback remains available in the client.
- `GET /api/health` returns a basic service health response.

## Remaining priorities

- Add dated browsing, editing and export for older budget records; the current budget screen focuses on today's entries.
- Add paginated historical food browsing beyond the seven-day summary.
- Consider private Supabase Storage for optional progress-photo sync after storage and row-level security policies are reviewed.
- Replace local-only XP with server-validated, idempotent progression.
- Add account data export/deletion and a dedicated settings screen.
- Design privacy-safe offline behavior before caching authenticated fitness data.
- Complete real-device QA for authentication, Supabase persistence, responsive layouts, PWA installation and accessibility.
