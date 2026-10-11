# Lumen Letter

A local-only cinematic gift maker for a personal letter, optional local audio, and up to 48 local photographs. No account, server, upload, link sharing, or cloud persistence is used.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local Vite address (normally `http://localhost:5173`).

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Experience controls

- Compose sender/recipient names, a letter, optional photos, and optional audio; select **Preview gift**.
- Use **Begin slowly**, then activate the envelope using pointer, Enter, or Space.
- The reader’s **Follow the light** continues to the particle heart.
- Tap/click the heart or use **Open constellation** to open the gallery. Drag rotates; mouse wheel zooms; Escape moves focus → constellation → heart.
- **Edit gift** safely returns to the populated local composer.

## Local limitations

- Content is held in browser memory for the current page session only; refreshing clears it.
- WebGL is required for the live particle scene. A readable recoverable message is shown if WebGL initialization fails.
- Audio never autoplays and remains optional.
- The app uses a GPU-friendly single particle buffer but does not yet dynamically benchmark hardware capability beyond the mobile particle-count reduction.
