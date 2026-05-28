# Agent Guide

This file summarizes the project rules for AI agents working on this codebase.
Before changing behavior, read the relevant source docs in `docs/`.

## Mandatory References

- `docs/PRD.md`: product scope, MVP requirements, stack, domain behavior.
- `docs/FSRS_RULES.md`: non-negotiable scheduler invariants.
- `docs/ARCHITECTURE.md`: folder ownership and feature-based structure.
- `docs/CODE_STYLES.md`: TypeScript, naming, and implementation style.
- `docs/UI_GUIDELINES.md`: visual style, component choices, and UX rules.

## Next.js Warning

This project uses Next.js `16.2.6`.

This is not necessarily the Next.js API shape from model training data. Before
writing Next.js-specific code, read the relevant guide in:

```txt
node_modules/next/dist/docs/
```

Follow current docs and deprecation notices.

## Product Summary

This is a web flashcards app using FSRS spaced repetition. The MVP supports:

- Google-only authentication.
- Deck creation, editing, deletion, listing, and basic stats.
- Card creation/import from JSON.
- Limited rich HTML in card fronts and backs.
- Study sessions with card flip and FSRS ratings.
- Per-user progress storage.

Primary stack:

- Next.js App Router
- TypeScript
- TailwindCSS
- shadcn/ui
- Framer Motion
- Prisma with SQLite
- Auth.js with Google provider only
- `ts-fsrs`
- DOMPurify
- `react-hook-form`
- `zod`

## FSRS Rules

FSRS scheduling is critical. Treat `ts-fsrs` as the single source of truth.

Never implement scheduling manually. Do not manually calculate or modify:

- intervals
- due dates
- difficulty
- stability
- retrievability
- elapsed days
- next reviews
- state transitions

Every review must pass through the official scheduler using only these grades:

- `Again`
- `Hard`
- `Good`
- `Easy`

Persist scheduler output atomically and completely. Required persisted fields:

- `due`
- `stability`
- `difficulty`
- `elapsed_days`
- `scheduled_days`
- `reps`
- `lapses`
- `state`
- `last_review`

The app layer may provide review input, persist scheduler output, and display
scheduling information. Keep scheduler logic isolated from UI, React state,
database concerns, and analytics.

Use real timestamps for reviews and scheduling. Avoid fake, hardcoded, or
client-guessed times.

## Architecture

Use feature-based modular architecture with co-location.

Preferred structure:

```txt
src/
├── app/
├── features/
├── shared/
├── layouts/
├── styles/
├── middleware.ts
└── env.ts
```

The `app/` directory should stay thin and handle routing concerns only:

- routes
- layouts
- loading states
- error boundaries
- metadata

Pages should delegate to feature modules.

Features own their domain code:

```txt
features/<feature>/
├── components/
├── composed/
├── server/
├── hooks/
├── schemas/
├── types/
├── constants/
├── utils/
├── providers/
├── state/
├── tests/
└── index.ts
```

Put reusable, domain-agnostic code in `shared/`. Do not put feature-specific
business logic in `shared/`.

## Code Style

Prioritize clarity over cleverness.

- Keep solutions simple and explicit.
- Prefer composition over inheritance.
- Avoid premature abstractions and excessive indirection.
- Keep files, functions, hooks, components, and modules focused on one clear responsibility.
- Extract duplicated logic locally first, then within the feature, then globally only if truly shared.
- Use TypeScript strict mode.

Naming:

- Components: `PascalCase`, file names in `kebab-case`.
- Hooks: start with `use` and describe behavior.
- Utilities: `camelCase` action or transformation names.
- Types: `PascalCase`, use `Dto` suffix where applicable.
- Constants: `SCREAMING_SNAKE_CASE`.
- Files: `kebab-case`.

## UI Rules

Use `shadcn/ui` as the primary component system.

Preferred UI stack:

- shadcn/ui
- TailwindCSS
- Framer Motion
- Lucide Icons

The interface should feel modern, minimal, clean, elegant, fast, and
professional. Inspirations include Linear, Notion, Vercel, Stripe Dashboard,
Raycast, GitHub, and Supabase.

Avoid:

- unnecessary visual noise
- excessive colors
- oversized shadows
- cluttered layouts
- excessive borders
- aggressive animations
- neon aesthetics
- glassmorphism everywhere
- dense enterprise-style dashboards

Use consistent spacing. Preferred spacing values:

```txt
4, 6, 8, 10, 12, 16, 20, 24, 32
```

Preferred container widths:

```txt
max-w-2xl
max-w-4xl
max-w-6xl
max-w-7xl
```

Use readable typography with clear hierarchy. Prefer Inter, Geist, or
`system-ui`.

## Rich HTML Cards

Card `front` and `back` fields may contain limited HTML.

Supported tags:

- `b`
- `strong`
- `i`
- `em`
- `u`
- `br`
- `p`
- `ul`
- `ol`
- `li`
- `span`
- `img`
- `audio`
- `code`
- `pre`

Always sanitize HTML before rendering. Scripts are forbidden. Inline styles
should be limited or prohibited.

## Commands

Use the existing project scripts:

```sh
npm run dev
npm run build
npm run lint
```

Run lint/build when the change touches implementation behavior or project
configuration.
