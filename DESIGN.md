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

The creations chapter offers accessible painted-thumbnail project selectors and a factual preview with a direct detail link. It uses LinkedIn-verified text; no invented screenshots or impact claims. The writing chapter offers an open-notebook invitation without fictitious articles. Click/tap on open water creates a finite, reused ripple pool. Optional synthesized breeze audio starts only on explicit interaction, pauses when hidden, and closes when leaving the journey. Reduced motion removes camera/hover transforms, reveals, and ripples.

## Portrait and reading preference

Use `public/images/riska-portrait.webp`, an original impressionist transformation of the user’s latest beige-hijab portrait, on the profile chapter and About page. Exact prompt and provenance: `docs/riska-portrait-artwork.md`. The user rejected the extra dark reading panels: remove content-area pseudo-element washes and keep the painting continuous behind text. Preserve the roomier 16–18px body typography and the original scene-wide shadow treatment.

## Project painting gallery

The project collection now behaves visually as a gallery of framed impressionist studies. Each real project has a decorative artwork, a narrow muted-bronze rim, a paper mat, and its title/summary/technologies beneath as a museum-style label. Desktop uses two staggered columns; tablet/mobile use a single column. The entire artwork and label link to the existing project discussion. Artwork is stored separately from real screenshots and labeled as a painted cover study. Five original paintings supply the covers; newer entries may reuse a painting.

## Living garden — interaction refinement

The approved direction keeps the blue-green painted world and makes project discovery the focal interaction. A brief GSAP aperture opens the artwork without a loader or blocked controls. A separate, bounded fine-pointer depth wrapper preserves the scroll camera. Chapter text changes have a short, interruptible transition. No perpetual new animation is introduced.

The creations chapter is an exhibition: seven thumbnail buttons, a framed selected painting, a live project description and previous/next controls with wraparound. Selection does not autoplay. The strip scrolls internally; keyboard focus stays on the chosen control. On short mobile screens the cover sits beside the description, whose full text remains on the detail route.

Project opening uses normal same-origin anchor navigation with progressive native cross-document view transitions between named cover images. Browsers without support use standard navigation. Detail pages show the same labeled decorative cover. Reduced motion removes spatial sequences. All motion listeners and GSAP contexts are scoped and cleaned up; sound remains opt-in.

References inspected: Shopify Winter ’26, Zero University and Daiki Fujita. Borrow the idea of an explorable world and purposeful response; retain original portfolio content and assets. No external scripts or reference artwork are embedded.

### Shared behavior on every route

About, project collection, project details, writing, and missing/error states share a scoped painting surface: small fine-pointer depth, gentle background scroll camera, a brief content arrival, and once-only reveals for actual reading sections. Text stays stationary during reading. A thin reading-progress rule and an in-flow return-to-top control support long discussions. The cat is now a real next-destination link, including on mobile. Context prevents nested shells when a detail route resolves to 404.

Gallery links and selected project covers use native document navigation with unique, matching cover transition names on the destination. Route navigation retains standard links and browser history. Keyboard focus moves to the main content when returning to the top. No loops, autoplay, external embeds, or added animation dependencies.

## Scroll-authored painting sequence

The homepage now has a reversible, scrubbed object sequence inside each chapter: a suspended pond painting grows into the scene; the portrait reveals through a vertical painted-window mask; the project frame settles into the exhibition; the notebook turns open; a lily study drifts into the closing composition. The existing scroll camera and pointer depth remain separate from these object transforms. Reading intervals hold text and controls steady.

A decorative Canvas 2D layer samples colors from the original pond artwork. At chapter boundaries its finite pigment field disperses and settles with native scroll (1,800 marks desktop, 900 mobile). Rendering is event-driven, coalesced through requestAnimationFrame, capped at 1.5× pixel density, and stops when hidden. Media-query cleanup removes it for reduced motion. Failed canvas/image support leaves the normal painted scene available.

Project collection frames now have entry/hold/exit scroll poses while their labels stay stationary. Discussion text remains still; its section rules draw on arrival. Fragment restoration explicitly resolves chapter links after layout settles, keeping native cross-document returns reliable with the extra ScrollTriggers. No new content, runtime libraries or external art were added.

## Latest opening preference — the cat leads

The owner rejected the framed pond painting at the beginning. Remove the opening portal entirely; retain the other chapter scenes and the project gallery. The opening's focal object is now the original pearl-wearing impressionist cat, enlarged with a clear invitation. It follows a small reversible scroll pose and guides visitors to the next chapter on click/tap/keyboard activation.

New aligned transparent expressions (awake, blink, meow) replace the static guide image. A single fixed-size image changes frames so its body stays in place. Idle blinking pauses when hidden, outside the viewport, or reduced motion is requested. A short mouth expression acknowledges an explicit guide click. Cat voice is enabled by default per the owner’s latest preference, with a mute toggle; playback occurs only when the guide is clicked, never on load or scroll. Its small HUD control stays separate from the cat's navigation button. Playback stops on hide/unmount and failures retain visual navigation with an accessible status.

### Project guide placement

Remove the old project-chapter rules that hid the cat on mobile and tablet. Wide desktop gives the larger cat a slot between the introductory copy and project preview. Tablet places it above the introductory copy. Mobile places it beside a narrower chapter heading, above the thumbnail strip, leaving the project action and chapter index clear. The cat remains a full visible navigation button at 360×667, 360×900, 768×900 and 1440×900. Alternate expression images are decoded before use and render eagerly with synchronous decoding to prevent a blank frame during greeting.

## About — integrated technology exploration

The technology explorer uses ivory typography directly over the painting. On wide desktops biography and tools sit side by side; experience occupies the full content width beneath them. Smaller screens stack content in reading order. The owner's exact two-paragraph biography is kept separate from the short homepage introduction.

Ten tools form an aligned two-column grid. Labels and explanatory copy match the About body size (17px desktop, 16px mobile); hover/focus gently enlarges the label without reflow. A temporary dark-ink pop-out appears beside the selected tool on hover or keyboard focus, and on tap for touch. No permanent explanation area reserves space. Pop-outs contain the definition, purpose, related verified projects and official documentation. They stay inside the viewport, allow pointer travel into their links, dismiss outside or with Escape/close, and restore focus after explicit dismissal. Keyboard arrows, Home/End and Tab reach tools and their links. Reduced motion removes decorative transitions. No-JavaScript visitors retain a definition list.

Definitions are typed local content based on linked primary documentation. Project associations are derived on the server from existing project data; only the small technology entries reach the client. Radix/shadcn Popover supplies the nonmodal portal, collision handling and dismissal behavior.
