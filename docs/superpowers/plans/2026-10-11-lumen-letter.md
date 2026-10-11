# Lumen Letter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local, accessible romantic gift composer and recipient journey with an envelope ritual and an interactive Three.js particle heart.

**Architecture:** React owns composition and a guarded reducer. A CSS envelope uses measured, responsive geometry and one paper element moving between clipped pocket and reader. A Three.js controller owns a single canvas, particle buffer, and disposable textures; React owns photo-card accessibility and controls.

**Tech Stack:** React 18, TypeScript, Vite, Three.js, Vitest, Testing Library, ESLint.

**Spec:** `docs/superpowers/specs/2026-10-11-lumen-letter-design.md`

## Global Constraints

- Keep all gift data local to the browser session; never upload or encode it into a URL.
- Support 0–48 local images and optional local audio without autoplay.
- Drive the journey with typed guarded transitions and clean every resource when leaving preview.
- Keep the letter object continuous: pocket clipping, extraction, then reader expansion.
- Build an original dark premium visual language that works at desktop, tablet, and mobile sizes.

## Review Focus

- Ensure long names and multi-paragraph letters remain readable at 390px wide; cover with responsive browser inspection.
- Reject more than 48, non-image, empty, too-large, and undecodable files before scene creation; cover with unit tests.
- Ignore repeated transition activation while the envelope or gallery is moving; cover reducer guard tests.
- Preserve focused-photo Escape/background return order and keyboard equivalents; cover reducer tests and browser flow.
- Dispose canvas resources and avoid duplicate animation loops after repeated preview/return cycles; inspect browser runtime manually.

---

### Task 1: Establish application foundation and pure logic

**Files:** `package.json`, Vite/TypeScript config, `src/lib/validation.ts`, `src/lib/journey.ts`, tests for both.

- [ ] Write failing tests for valid reducer transitions, locked repeated activations, text normalization, and file-count validation.
- [ ] Verify the tests fail before implementations exist.
- [ ] Implement minimal typed validation and reducer functions.
- [ ] Run targeted and full tests, lint, type check, and build.

### Task 2: Build composer and local media workflow

**Files:** `src/App.tsx`, `src/components/Composer.tsx`, `src/styles.css`.

- [ ] Build semantic name/letter fields, local image tray management, optional audio field, validation feedback, and populated-preview handoff.
- [ ] Use original object URLs only for DOM thumbnails and canvas-safe scene copies later.
- [ ] Preserve content when returning to the composer and revoke discarded URLs.

### Task 3: Build cinematic journey and physical envelope

**Files:** `src/components/Intro.tsx`, `src/components/EnvelopeJourney.tsx`, `src/components/Reader.tsx`, CSS.

- [ ] Implement intro to sealed envelope through letter reader using reducer-approved completion events.
- [ ] Measure envelope geometry and coordinate extraction through CSS custom properties; clip letter within the pocket before its natural exit.
- [ ] Use keyboard activation, reduced-motion alternatives, and a stable return control.

### Task 4: Build particle heart and photo constellation

**Files:** `src/components/MemoryScene.tsx`, `src/lib/threeScene.ts`, CSS.

- [ ] Create an in-place BufferGeometry heart cloud with depth, atmospheric particles, pointer drag/wheel bounds, and resource cleanup.
- [ ] Interpolate particles into constellation positions and map image cards into a readable accessible spatial gallery.
- [ ] Implement focus, Escape/backdrop return, WebGL error fallback, and explicit controls.

### Task 5: Verify and document

**Files:** `README.md`, `VERIFICATION.md`.

- [ ] Run test, lint, typecheck, production build, and a local server.
- [ ] Inspect all required visual checkpoints and stress flows in the browser at 1440×900, 768×1024, and 390×844.
- [ ] Record exact results, fixes, limitations, and commands in `VERIFICATION.md`.

## Self-review

Every user-visible requirement maps to Tasks 2–4. Task 1 protects the deterministic path and hostile input boundaries. Task 5 captures build evidence and visual/state stress outcomes. The design deliberately avoids an unnecessary backend, external assets, route payloads, and complex persistence.
