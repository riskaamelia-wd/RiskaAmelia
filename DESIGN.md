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

## Living garden interactions

The original vector cat has been replaced by `public/images/monet-cat.webp`, an alpha-preserving imagegen illustration with impressionist brushwork. The clickable cat guides visitors between chapters and reacts gently to hover/focus. `willow-foreground.webp` moves faster than the water, then drifts out of view during the camera journey. Exact prompts are documented beside the other artwork sources.

The creations chapter offers five accessible petal-shaped project selectors and a factual preview with a direct detail link. It uses LinkedIn-verified text; no invented screenshots or impact claims. The writing chapter offers an open-notebook invitation without fictitious articles. Click/tap on open water creates a finite, reused ripple pool. Optional synthesized breeze audio starts only on explicit interaction, pauses when hidden, and closes when leaving the journey. Reduced motion removes camera/hover transforms, reveals, and ripples.

## Portrait and reading preference

Use `public/images/riska-portrait.webp`, an original impressionist transformation of the user’s latest beige-hijab portrait, on the profile chapter and About page. Exact prompt and provenance: `docs/riska-portrait-artwork.md`. The user rejected the extra dark reading panels: remove content-area pseudo-element washes and keep the painting continuous behind text. Preserve the roomier 16–18px body typography and the original scene-wide shadow treatment.
