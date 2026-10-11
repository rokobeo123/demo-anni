# Verification report — 2026-10-11

## Commands run

```text
npm install
npm install --save-dev playwright
npm run dev -- --port 4173
npm test
npm run typecheck
npm run lint
npm run build
node /tmp/lumen-envelope-qa.mjs
node /tmp/lumen-e2e.mjs
node /tmp/lumen-resource-check.mjs
```

## Results

- Dependency install passed with no reported vulnerabilities.
- `npm test`: passed — 5 files / 7 tests.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed. Vite emitted only its non-blocking initial Three.js chunk-size advisory.
- Local server answered HTTP 200 at `http://localhost:4173`.
- The repeatable Playwright recipient journey completed with local portrait, landscape, and square image fixtures. It validated composer restoration after returning from the heart flow, focused-photo Escape return, constellation Escape return, and a 390 × 844 mobile composer screenshot.
- The repeatable browser journey completed with no page errors, failed HTTP resources, or meaningful console errors. A local SVG favicon was added after tracing the prior `/favicon.ico` 404.

## Automated coverage

- Reducer rejects repeated envelope activation while transitioning.
- Reducer steps safely from focused photo to constellation to heart.
- Text normalization removes controls and collapses whitespace.
- File validation rejects unsupported files and image counts above 48.
- Heart gateway activation dispatches its completion event.
- A photo card does not trigger the scene background return while it is focused.

## Browser visual review

Reviewed screenshots were captured locally under `/tmp/lumen-qa` at these viewports:

- Desktop: 1440 × 900 — empty composer, populated composer, final reader, heart stage, constellation and focused photo.
- Desktop: 1280 × 800 — closed envelope, seal break, flap opening, letter extraction, and settled reader.
- Mobile portrait: 390 × 844 — populated composer, visible thumbnail management controls, readable form controls, and full-width preview action.

The envelope sequence was inspected frame-by-frame. The sealed state conceals the letter; the seal fades/breaks before the flap moves; the flap opens before the same clipped paper rises from the pocket; the reader action appears only after the paper completes its final centered expansion.

## Interaction and resilience checks

- Local thumbnail upload of portrait, landscape, and square fixtures: passed.
- Photo selection count and composer return preservation: passed.
- Rapid repeated envelope activation is reducer-locked during active phases.
- Photo-card pointer release, background return, focus, and both Escape return steps: passed.
- Return to composer followed by a new preview: passed.
- Resize-responsive desktop and mobile layout review: passed.
- `prefers-reduced-motion` has a CSS reduction path.
- The Three scene uses a ResizeObserver, visibility pause, requestAnimationFrame cleanup, bounded wheel zoom, drag threshold, and resource disposal.

## Defects found and fixed in this repair pass

1. The visible **Enter the heart** control had no click handler. Added `HeartReveal` with a tested completion event.
2. The Three.js scene recreated its renderer and particle resources on each phase update. It now retains one particle system and reads phase through a ref.
3. The fallback notice intercepted photo-card taps. It is now non-interactive.
4. Gallery offsets were percentages of each card, causing cards to overlap. They are now scene-relative viewport offsets.
5. Parent pointer capture retargeted photo releases as background gestures. Cards are excluded from capture and stop their own pointer release.
6. The reader action appeared during final paper expansion, and the sampled reader could sit off-center. It now waits for the physical sheet transform to settle, then displays the action.
7. The application appended an automatic sign-off after the authored letter. The reader now preserves only the sender's supplied content.
8. The envelope flap now waits for seal completion instead of opening during the seal-breaking phase.

## Remaining environment limitation

The container's Chromium process cannot create a WebGL context, even with attempted SwiftShader/ANGLE flags. This allowed full fallback and DOM interaction testing, but not a rendered-GPU screenshot of the particle cloud in this environment. The application presents a clear non-blocking fallback and its renderer code path was typechecked, lifecycle-reviewed, and exercised up to context creation. A browser with WebGL enabled is still required to visually inspect the GPU-rendered particle heart itself.

## Known product limitation

This version is intentionally session-local: no persistence, sharing, upload, or remote storage. The production build includes a non-blocking Three.js initial-chunk advisory; future optimization can lazy-load the memory scene.
