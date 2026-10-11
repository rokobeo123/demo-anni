# Verification report — 2026-10-11

## Commands run

```text
npm install
npm run typecheck
npm run lint
npm test
npm run build
npm run dev -- --port 4173
```

## Results

- `npm install`: passed; 0 vulnerabilities reported.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test`: passed — 3 files / 5 tests (including existing ignored-worktree test discovery).
- `npm run build`: passed. Vite reports one non-failing chunk-size advisory because Three.js is bundled with the initial local experience.
- Local server: started and answered HTTP 200 on `http://localhost:4173`.

## Automated coverage

- Reducer rejects repeated envelope activation while transitioning.
- Reducer steps safely from focused photo to constellation to heart.
- Text normalization removes controls and collapses whitespace.
- File validation rejects unsupported files and image counts above 48.

## Live browser visual review

Desktop browser checkpoints inspected at the browser’s desktop viewport:

- Composer with zero images: reviewed.
- Cinematic sender/recipient intro: reviewed.
- Closed envelope: reviewed. Initially found paper leaked through the front fold; fixed by adding explicit sealed/seal-breaking clipping states.
- Envelope activation and reader: reviewed. Initially found the reader sheet inherited the extraction transform and appeared off-canvas; fixed with a final reader transform override.
- Fully extracted reader: reviewed after repair; sheet is centered, readable, and retains the original continuous letter object.

## Interaction and resilience checks performed

- Composer validation with no sender/recipient/letter was manually exercised during development.
- Zero-photo preview completed through reader successfully.
- Repeated open input is reducer-locked while phase is non-stable.
- Return-to-composer remains available from intro/envelope/reader.
- `prefers-reduced-motion` has a CSS reduction path.
- The Three scene has ResizeObserver, visibility pause, requestAnimationFrame cleanup, texture-free geometry/material disposal, drag threshold, bounded wheel zoom, and Escape reducer handling implemented.

## Remaining verification limitations

The available browser interaction adapter could not attach local filesystem files, so live thumbnail/reorder and photo-card focus visual checkpoints were not executed with selected fixtures. The implementation includes those paths and local raster fixtures were generated under `/tmp/lumen-qa`, but full file-input and multi-viewport automation should be completed with Playwright in a follow-up. Tablet/mobile orientation, WebGL context-loss recovery, and reduced-motion browser emulation were not directly run in this session.

## Defects found and fixed

1. Closed envelope allowed paper content to show beneath the fold. Fixed with explicit phase classes and concealed clipping before flap opening.
2. Completion handlers used animation events for CSS transitions, which stalled phase progression. Fixed to use `transitionend` tied to the transformed element.
3. Reader sheet was positioned off-canvas after extraction because a later extraction selector overrode the reader transform. Fixed with final reader-state transform specificity.
4. Updating photos would revoke already selected object URLs due to effect cleanup on every list change. Fixed by keeping current URLs in a ref and revoking only on application teardown.

## Known product limitations

This version is intentionally session-local. There is no persistence or sharing. The production bundle has a non-blocking Three.js chunk-size warning; splitting the memory scene into a lazy route is the appropriate future optimization.
