# Design system — Inside the painting

The current user direction supersedes both the playful portfolio and the conventional gallery layout: every scroll should carry the visitor further into a world inspired by Claude Monet's blue-green water-lily paintings.

## Experience

A full-screen, sticky painted world spans a native scroll journey. Three original impressionist paintings move slowly closer and dissolve into one another: a wide pond, a garden bridge, and intimate water lilies. Five chapters reveal arrival, profile, projects, writing, and contact. There are no stacked homepage cards, conventional hero, or detached image banner.

The interface stays quiet: ivory serif text at the left, a small wordmark, chapter markers at the right, a chapter count and next control at the foot, and a subtle cat companion. Mobile uses a short horizontal chapter indicator. Native wheel/touch scroll remains intact; the chapter index and keyboard controls offer direct navigation.

## Visual system

Cormorant Garamond regular is the large editorial voice, paired with Manrope for small readable UI. Full-bleed artwork is never inside a card. A fine inset rule and botanical shadow wash ground the text without obscuring the whole painting.

Garden tokens in `src/styles/garden.css`: paper `#fffbed`, ink `#132c27`, pale foliage `#d8e1cc`, translucent paper rules. Existing paper/sage tokens in `globals.css` style collection and detail pages. Root layout supplies fonts only; route groups keep conventional site chrome off the painted journey.

## Assets and motion

Paintings: `public/images/water-lily-pond.webp`, `garden-bridge.webp`, `lilies-close.webp`. All are original built-in imagegen assets, not copies of particular Monet paintings. Their provenance and exact prompts are in the corresponding `docs/*artwork.md` files. Original cat artwork preserves the supplied gray tabby reference.

GSAP ScrollTrigger connects scroll to camera scale, position, and crossfades. Reduced motion swaps scenes without camera movement. All effects are scoped and cleaned up. No autoplay audio, forced scroll, or pointer capture. Keep focus visible, responsive text, touch access, no-JavaScript fallback and direct content routes.

## Collection and detail pages

Projects, writing, and their detail routes stay inside the same painted world: a fixed garden-bridge painting, botanical shadow wash, ivory serif text, inset frame and chapter-style side navigation. Long content scrolls naturally over the painting. Empty states are left-aligned narrative notes rather than centered cards. A contextual return link restores the matching chapter on the homepage. The earlier paper gallery shell has been removed.
