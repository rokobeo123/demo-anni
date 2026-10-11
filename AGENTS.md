# Repository notes

- This is a Vite + React + TypeScript local-only app. Use `npm run dev`, `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`.
- Gift media is intentionally browser-session-only. Do not add remote upload, persistence, share URLs, or URL-encoded gift content without an explicit product decision.
- `src/lib/journey.ts` owns guarded recipient-flow transitions; do not bypass it with timers for core choreography.
- The envelope depends on the visual layer contract documented in `src/styles.css`: back → clipped letter → front pocket → flap → seal. Keep phase-specific styles explicit.
- `MemoryScene` owns and disposes its Three renderer, material, geometry, resize observer, and render loop; preserve cleanup when changing it.
- The heart gateway must dispatch `COMPLETE` from its visible control; it cannot rely on an unrelated animation event.
- Keep `MemoryScene` mounted across heart/constellation/focus phases. Photo cards must sit above the canvas, avoid scene pointer capture, and stop pointer-release propagation so a focus tap never becomes a background return.
- Reader actions must appear only after the final physical-letter transform ends; this prevents the sheet being interacted with while it is still transitioning from the envelope.
