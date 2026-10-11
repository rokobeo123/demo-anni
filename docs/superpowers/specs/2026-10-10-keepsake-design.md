# Keepsake product design

## Intent

Keepsake is a private digital gift for one recipient. It turns a personal letter and a deliberately small set of photographs into a paced, intimate journey: arrival, opening a physical envelope, reading, exploring a dimensional heart-shaped memory composition, viewing each photograph, and closing or replaying. The chosen emotional tone is warm nostalgia: an after-hours artifact saved in a drawer, not a social product or generic romance template.

## Goals

- Build an original local web product with a dark, cinematic, accessible primary interface.
- Let a sender create a keepsake with sender and recipient names, optional title/occasion/date, letter, 1–12 photos, captions, ordering, draft recovery, preview, and an opaque recipient link.
- Let a recipient complete the complete interaction with pointer, touch, and keyboard.
- Make the envelope interaction spatially credible and driven by a guarded, interruptible state machine.
- Provide a real-time 3D heart memory scene with photo cards arranged in depth around an explorable heart core; provide a coherent DOM fallback.
- Model expiry, revocation, unavailable, offline, loading, invalid link, and deletion states.

## Non-goals

- Accounts, public profiles, feeds, reactions, notifications, audio, or public image hosting.
- More than 12 images per keepsake.
- A production identity system or remote deployment in this iteration.

## Experience and art direction

The visual system uses charcoal-green black, walnut, parchment, aged brass, muted clay red, and quiet firelight. Typography pairs an editorial serif for intimate headings and a plain sans-serif for controls and form labels. Background movement is low contrast and never competes with text.

Arrival offers the recipient a direct, named invitation. The opening ritual places an umber paper envelope on a stable stage. Its flap hinges upward from the top edge, while the letter stays hidden behind the front pocket until the flap is fully open. A partial reveal then exposes the paper, and an explicit extract action moves the same physical letter into the reading position. The reading scene presents a calm parchment surface. Continuing reveals the heart memory space.

The heart is a faceted 3D geometry with warm lighting and a restrained idle rotation. Photograph cards orbit in three-dimensional rings only after activation, and each is selectable. Drag or touch-drag rotates the scene; wheel/pinch changes distance; buttons supply equivalent keyboard-accessible rotation, zoom, expansion, reset, and photo selection. The fallback is a dark DOM composition of a dimensional heart core and positioned memory cards with the same controls and focused viewer.

## Technical design

Use a single-page React + TypeScript application built with Vite. Implement a local Express API in the same repository for persistence and static media access. SQLite stores only structured keep metadata and media identifiers; generated opaque recipient tokens and separate sender-management tokens are stored as hashes. Locally optimized image binaries live under a non-public data directory and are served only after token validation through API routes. For the prototype, sender studio links are browser-local and the API can return a management URL only to the sender. Production replaces local disk with encrypted private object storage and SQLite with a managed relational database; signed, short-lived media authorization remains server-side.

Client state uses a reducer with explicit `arrival`, `closed`, `opening`, `flapOpen`, `letterRevealed`, `extracting`, `reading`, `memories`, and `dismissed` states. A transition generation counter cancels outdated animation completions. Resize, focus changes, pointer cancellation, reduced motion, and replay use state-aware cleanup rather than arbitrary delays.

Photo processing validates MIME type, decode success, count, and size. Browser-side Canvas processing strips metadata and produces aspect-ratio-preserving JPEG/WebP variants before upload. The server repeats MIME and byte validation. The UI caps creation at 12 photos.

## Envelope state-transition matrix

| Current state | Intent | Next state | Observable result |
| --- | --- | --- | --- |
| arrival | Begin | closed | Envelope stage becomes available |
| closed | Open seal | opening | Flap rotates from top hinge |
| opening | Transition end | flapOpen | Open flap settles; letter remains pocketed |
| flapOpen | Reveal letter | letterRevealed | Paper rises to pocket edge |
| letterRevealed | Extract letter | extracting | The visible physical paper exits the envelope |
| extracting | Transition end | reading | Same paper expands into the readable view |
| reading | View memories | memories | Heart scene activates |
| memories | Reset | closed | Scene collapses and envelope returns closed |
| any active state | Replay/reset | closed | Cancel in-flight transition and restore stable stage |
| any state | Dismiss | dismissed | Informational end state with replay option |

Only reducer-approved transitions run. Pointer and keyboard handlers reject input while a transition is pending. Each scheduled completion carries its generation identifier and verifies it before dispatching.

## Accessibility and resilience

Use landmarks, form labels, live status messages, visible focus indicators, dialog semantics for the image viewer, meaningful button labels, and accessible descriptive labels for interactive 3D controls. Keyboard interaction supports Enter/Space, Escape, arrow navigation, and tab order. `prefers-reduced-motion` replaces transform animation with immediate but continuous state transitions. A capability check and explicit fallback toggle choose the DOM memory version when WebGL is unavailable or the device is constrained.

Recipient loading checks connection state and provides a retry. Invalid, expired, revoked, deleted, and unavailable responses use the same privacy-preserving generic recipient response while sender management remains distinct. Offline drafts remain available locally and recipient content already loaded can continue without network.

## Verification standards

Automated unit tests cover validation, token handling, state-machine guards, transition cancellation, expiry/revocation, and media ordering. Browser E2E covers sender creation and recipient completion with 1, 6, and 12 images, keyboard navigation, error states, and fallback mode. Manual/automated visual capture covers every envelope and memory state at desktop, phone, tablet, and short landscape viewports. The implementation must run formatting, linting, type checking, unit tests, E2E tests, and production build before completion.

## Known local limitation

The local server is a functional development implementation, not a production security boundary: its data directory is only private to the local process and it uses development token hashing configuration. Production needs a managed secret, rate limiting, encrypted private object storage, malware scanning, observability, and operational deletion guarantees.
