# Riska Amelia — Inside the painting

An immersive personal portfolio: native scrolling carries visitors through three original impressionist paintings and five chapters — arrival, profile, creations, notebook, conversation. Inspired by Claude Monet's cool blue-green water-lily worlds.

## Local development

Use Node.js 26.x (see `.nvmrc`) and Bun 1.2.19. Bun remains the package manager; Node runs Next.js build/server processes.

```sh
bun install --frozen-lockfile
bun run dev
```

Open the URL printed by Next.js (normally http://localhost:3000). Production: `bun run build` then `bun run start`.

## Checks

```sh
bun run build
bun run typecheck
bun run lint
bun run format:check
bun run test
bun run test:e2e
```

Browser checks start an isolated production server on port 3100 and use local Google Chrome on macOS when available. Else install Chromium with `bunx playwright install chromium`. `PLAYWRIGHT_CHROME_PATH` can override the executable. Screenshots go into ignored `test-results/`.

## Change the experience

- Journey: `src/features/garden/components/PaintingJourney.tsx`.
- Chapter copy: `src/features/garden/chapters.ts` and `components/JourneyContent.tsx`.
- Composition and garden colors: `src/styles/garden.css`; shared content pages: `src/styles/globals.css`.
- Scene assets: `public/images/`. These are original built-in imagegen illustrations. Exact prompts and provenance: `docs/pond-artwork.md`, `docs/garden-bridge-artwork.md`, `docs/lilies-close-artwork.md`.
- The user retired the old technical contract and gallery homepage. The current direction is recorded in `AGENTS.md` and `DESIGN.md`.

## Real content

Direct contact details come from the original repository. The displayed portrait is an impressionist edit of the user’s newly supplied photo; provenance is in `docs/riska-portrait-artwork.md`. Profile, experience and five project summaries now use the public LinkedIn profile; provenance and unresolved degree labeling are documented in `docs/profile-source.md`. Articles remain empty until original writing is available. No sample work is presented as real. Add entries to `src/features/projects/content.ts` and `src/features/writing/content.ts`. Collection/detail URLs remain available independently of the scroll experience, with the same full-screen painting, ivory text and chapter navigation.

Native scrolling is never intercepted. Chapter navigation works by keyboard or touch. Reduced motion removes camera transforms and dissolves. A no-JavaScript fallback provides direct content links. The gray tabby companion is an original transparent impressionist painting, inspired by the user’s cat reference; it guides visitors between chapters. A transparent willow foreground adds depth. Tap open water for ripples and explore project previews inside the painting. Garden sound is a quiet synthesized breeze, explicitly opt-in, suspended in hidden tabs and closed on navigation.

Self-hosted Manrope and Cormorant Garamond font licenses are retained in `public/fonts/`.

## Optional error reporting

Copy `.env.example` to `.env.local` and set Sentry DSNs to enable the configured browser/server reporting. Reporting stays inactive without a DSN; automatic user, cookies, body and header collection is disabled.

The legacy Hasura credential was removed from active source; its owner still needs to revoke/rotate it. No Git history rewriting, staging, commits, pushes or deployment was performed.

## Vercel deployment

The repository pins `engines.node` to `26.x` and supplies the Next.js preset, Bun installation and build commands in `vercel.json`. This overrides the retired Node.js 18 setting for new deployments.

In Vercel → Project → Settings → Build and Deployment:

- Set Node.js Version to **26.x** to keep the dashboard aligned with the repository.
- Use the repository root as Root Directory and **Next.js** as the framework.
- Install: `bun install --frozen-lockfile`; build: `bun run build`; output: `.next`.
- Remove any old Vite build overrides (`vite build` or `dist`).
- Sentry DSNs are optional; no API credentials are required to build the portfolio.

Commit/push these changes manually, then create a new deployment from that commit. Redeploying an older commit will keep its old configuration. No deployment is triggered by the local checks.

Node version reference: https://vercel.com/changelog/node-js-26-lts-is-now-generally-available-on-vercel
