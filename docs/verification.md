# Verification — Inside the painting

Verified locally on 2026-11-08:

- Production build (`bun run build`): passed, Next.js with Webpack.
- TypeScript (`bun run typecheck`), ESLint and Prettier checks: passed.
- Unit tests: 6 passed, covering chapter math and existing detail rendering/404 behavior.
- Playwright/Chrome: 38 passed. Native scrolling, five-chapter navigation, scene crossfades, touch, keyboard skip, no-JavaScript fallback, reduced motion, redirect and missing routes.
- Responsive screenshots reviewed at 360 and 1440 pixels; layout/automated WCAG A/AA checks passed in all five chapters at 360, 768 and 1440 pixels. This is automated checking, not a full manual screen-reader audit.
- No deployment or Git staging/commit/push.

Profile and five project summaries now use the public LinkedIn snapshot documented in `profile-source.md`. Articles remain empty; project images and demo URLs were not provided by that source. Sentry reporting is optional and inactive without a DSN. Legacy credential revocation remains a service-owner task.

Living-garden verification: painterly cat image loads and guides chapter navigation; project selectors open the matching real detail route; ripples use four reusable elements and disappear for reduced motion; optional audio starts only on click, suspends on mute, closes on navigation, and exposes an unavailable state. Preview links remain inside the usable area at 360×667 and 360×900. Scroll anchoring is disabled and the pinned stage uses overflow clipping so changing preview text does not pull visitors into a different chapter.

Overlap regression: verified actual element bounds after homepage-to-Writing navigation and in the contact chapter at 1280×720, 2576×1408 and 360×667. Garden sound now occupies a normal-flow header slot; the collection header no longer inherits the journey’s absolute-positioned header class. Removed the redundant collection Back home link.

Latest visual preference: the user-supplied portrait is now an impressionist artwork in both profile locations. Removed the rejected local reading-panel pseudo-elements from the journey, previews and detail shell; retained 16–18px body copy. New checks assert minimum body text size, absence of boxed overlays, and room for the project action above mobile navigation.
