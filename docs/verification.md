# Verification — Inside the painting

Verified locally on 2026-11-08:

- Production build (`bun run build`): passed, Next.js with Webpack.
- TypeScript (`bun run typecheck`), ESLint and Prettier checks: passed.
- Unit tests: 6 passed, covering chapter math and existing detail rendering/404 behavior.
- Playwright/Chrome: 19 passed. Native scrolling, five-chapter navigation, scene crossfades, touch, keyboard skip, no-JavaScript fallback, reduced motion, redirect and missing routes.
- Responsive screenshots reviewed at 360 and 1440 pixels; layout/automated WCAG A/AA checks passed in all five chapters at 360, 768 and 1440 pixels. This is automated checking, not a full manual screen-reader audit.
- No deployment or Git staging/commit/push.

Profile and five project summaries now use the public LinkedIn snapshot documented in `profile-source.md`. Articles remain empty; project images and demo URLs were not provided by that source. Sentry reporting is optional and inactive without a DSN. Legacy credential revocation remains a service-owner task.
