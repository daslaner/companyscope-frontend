# CompanyScope Frontend

Senior frontend-engineering portfolio project for a global company-intelligence SaaS. It keeps the same CompanyScope domain and secure BFF boundary as the fullstack edition, but the engineering story is deliberately frontend-first: adaptive information density, multiple data representations, keyboard-driven navigation, accessible visualization, responsive behavior, Storybook and production-grade browser testing.

**Author:** Deniz Aslaner

## Frontend focus

- React 19 + strict TypeScript + Tailwind CSS 4
- Route-level lazy loading and TanStack Query server-state boundaries
- Global command palette (`Cmd/Ctrl + K`) with company and route navigation
- User-persisted **table/cards** explorer modes
- User-persisted **comfortable/compact** density modes
- Responsive data-heavy layouts with 44px interaction targets
- Semantic tables and cards backed by the same company model
- Recharts with accessible text summaries
- Leaflet map with keyboard-accessible list/table equivalents
- Theme support, reduced-motion handling, skip navigation and visible focus states
- Storybook design-system documentation and accessibility checks
- 90% Vitest coverage thresholds + Playwright production-runtime journeys
- Hardened parallel GitHub Actions, CodeQL, Dependency Review and SHA-pinned actions
- Build-once artifact promotion to Storybook Pages and a smoke-tested runtime container

## Run locally

```bash
nvm install
nvm use
npm ci
cp .env.example .env
npm run dev:api
```

In another terminal:

```bash
npm run dev
```

Open `http://localhost:5173`.

## Frontend workflows to demo

1. Register and enter the workspace.
2. Switch between **Table** and **Cards** without changing the underlying data contract.
3. Switch between **Comfortable** and **Compact** density; preferences persist locally.
4. Press `Cmd/Ctrl + K`, search a company and navigate without touching the mouse.
5. Inspect chart summaries, map alternatives, saved companies and responsive states.
6. Open Storybook with `npm run storybook` to review primitives and adaptive explorer stories.

## Quality gates

```bash
npm run verify
npm run audit:prod
npx playwright install chromium
npm run test:e2e:local
```

`verify` covers lint, strict browser/BFF/E2E TypeScript checks, 90% V8 coverage thresholds, production app/runtime build and Storybook build.

## Why the BFF remains in a frontend portfolio

The repository intentionally keeps the same small Node BFF used by CompanyScope so frontend decisions are tested against realistic auth, CSRF, session and API failure states rather than a permanently mocked happy path. The portfolio emphasis is still the browser architecture and interaction layer; durable persistence is deliberately outside this reference implementation.

## CI/CD

CI runs lint, typecheck, unit/coverage, build, audit, Playwright E2E and a container smoke test in parallel, then exposes one stable **`CI / Quality Gate`** for branch protection. Storybook and the runtime promote the exact artifacts already tested by CI. External GitHub Actions are pinned to full commit SHAs.

See `docs/frontend-architecture.md`, `docs/design-system.md`, `docs/accessibility.md`, `docs/testing.md`, `docs/ci-cd.md` and `SECURITY.md` for the engineering rationale.
