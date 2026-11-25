# FitLedger

A mobile-first fitness, nutrition and food-budget companion built around sustainable training, practical everyday tracking and user-controlled goals.

## Current application features

- **Account access:** Supabase email sign-up/sign-in, verification callback and password reset.
- **Overview:** daily snapshot, activity log, quick navigation and personal rank display.
- **Training:** workout checklist and cloud persistence for completed exercise sets.
- **Nutrition:** manual food diary entries with meal type, serving description, calories, protein, carbohydrates and fat; hydration check-in; macro totals from entries the user adds; optional Filipino meal inspiration with a recipe video.
- **Budget:** food allowance view and quick expense entries.
- **Progress:** body-weight check-in and consistency view.
- **Responsive UI:** mobile bottom navigation, desktop sidebar, transitions and reduced-motion support.
- **Persistence:** browser localStorage plus Supabase profile-state sync and dedicated tables for food, budget and workout records.

## Important data notes

- Nutrition totals are not a personalized medical prescription. Calorie and macro guides are starter references and should be configurable before being treated as personal targets.
- Food nutrition values vary by ingredient, recipe, cooking method and serving size. Manual entries are user-supplied estimates unless a verified food database is integrated.
- Meal photos and external recipe videos are optional inspiration, not verified nutrition data or medical guidance.
- The nutrition diary counts only food entries the user adds; old placeholder nutrition totals are cleared once when the new diary format is first loaded.
- A number of dashboard visuals and progress indicators remain starter UI and need further validation against actual historical records.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, Supabase Auth and Postgres, and Recharts.

## Run locally

```bash
npm install
npm run dev
```

## Backend

Supabase project URL and publishable key are supplied through environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (production origin used for Auth redirects)

Never expose a Supabase service-role key in browser code.

## Media and asset sources

- Fitness UI inspiration: [Dribbble fitness tracker interfaces](https://dribbble.com/search/fitness-tracker-app-ui). Reference only; FitLedger does not copy paid designs or assets.
- Food photography inspiration: [Pexels meal-prep photo](https://www.pexels.com/photo/healthy-meal-prep-with-rice-and-vegetables-30635714/).
- Training photography inspiration: [Pexels strength-training photo](https://www.pexels.com/photo/woman-training-with-gym-equipment-and-dumbbell-6455896/).
- General training video inspiration: [Pexels dumbbell workout clip](https://www.pexels.com/video/intense-gym-workout-with-dumbbells-for-strength-32822147/).
- Pexels permits use of its photos and videos under its license: https://www.pexels.com/legal-pages/license/. External media remains subject to source availability and license terms.
- Exercise-specific technique links open a YouTube search for the exact movement. They are not vetted endorsements; users should choose qualified instruction and stop if a movement causes pain.
- A third-party exercise-video dataset was reviewed but not integrated because its own README says the original video provenance is uncertain. FitLedger will not ship media with unclear rights.

## Design references

Interaction patterns were studied from [Gym Ledger](https://github.com/gym-ledger/web), [Ballast](https://github.com/N-O-P-E/Ballast), and [Personal Gym Tracker](https://github.com/jaredf96/personal-gym-tracker). Their code and assets are not copied into this repository.

## Progression

FitLedger has a personal rank ladder configured in `src/lib/ranks.ts`. XP is currently a local progression feature and should not be treated as a verified measure of fitness or health. Server-authoritative XP and achievements remain future work.

## API

- `GET /api/progression?xp=500` returns a rank calculation.
- `POST /api/progression` currently validates and calculates a rank response; it does not make XP authoritative or persist a transaction.
- `GET /api/health` returns a basic service health response.

## Known gaps / next priorities

- Load relational food, budget and workout history back into their screens on every device/session.
- Add editing and deletion for diary records.
- Add user-controlled nutrition targets and profile-based guidance without guessing personal needs.
- Add optional food photo upload after configuring private Supabase Storage policies.
- Expand exercise learning links with reviewed, movement-specific technique sources; general stock footage is inspiration only, never presented as form instruction.
- Persist body measurements and implement trustworthy history/analytics.
- Replace local-only XP with server-validated, idempotent progression.
- Complete real-device, accessibility, auth and cross-device QA.
