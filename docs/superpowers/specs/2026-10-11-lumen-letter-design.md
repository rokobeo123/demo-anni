# Lumen Letter product design

## Intent

Lumen Letter is a local-only, private romantic gift maker. A sender composes names, a letter, local images, and optional local audio, then previews an intimate recipient journey: welcome, sealed envelope, one continuous physical letter, a deep particle heart, and an explorable photo constellation. All content remains in the browser session; nothing is uploaded or encoded in URLs.

## Art direction

The visual language is **midnight atelier**: blue-black paper, antique copper, bone paper, and low amber light. A high-contrast editorial serif is reserved for names and the letter; a humanist sans-serif carries controls. Fine grain, concentric linework, and dim floating specks create atmosphere without obscuring content. The interface avoids generic gradients and romance clichés.

## Core experience

1. The composer collects sender, recipient, letter, up to 48 supported local images, and optional local audio.
2. Preview enters a cinematic welcome with explicit continuation.
3. A sealed envelope accepts button, Enter, and Space activation. Its wax-like seal yields, its hinged flap opens, and the same measured letter rises from behind the front pocket. Clipping keeps only the exposed region visible. Once it clears the fold, that object expands into the reader.
4. Closing the reader reveals a direct Three.js particle heart. Activating it transforms the existing particle cloud into a photo constellation. Cards can be selected, focused, and exited; background interactions step back from focus to constellation and constellation to heart.
5. A persistent exit control returns safely to the populated composer.

## Technical decisions

- Vite + React + TypeScript, direct Three.js, and CSS transitions driven by an explicit reducer.
- The reducer allows only valid phase transitions, has transition identifiers, and settles synchronously after CSS `transitionend` or reduced-motion completion rather than arbitrary timeouts.
- Image validation accepts decodable image MIME types, caps at 48 and 20 MiB each, preserves original object URLs for DOM previews, and creates max-1600px canvas copies for GPU textures.
- The Three scene uses one `BufferGeometry` for heart/constellation particles and CSS/DOM photo cards projected from Three coordinates. This keeps card hit targets accessible while retaining 3D parallax and exact source aspect ratios.
- Request animation frames, ResizeObserver, window listeners, object URLs, textures, materials, and geometries are owned by effect cleanup. The render loop pauses while the document is hidden.

## Accessibility and resilience

Semantic labels, live error messages, keyboard controls, visible focus, Escape handling, and reduced-motion timing are required. The envelope remains one button during physical transition locks. The reader is scrollable on narrow screens. The 3D region offers labelled controls for heart, gallery, zoom, reset, and photo selection; a WebGL failure shows a recoverable message and a DOM still-life rather than breaking the journey.

## Non-goals

No authentication, servers, network uploads, remote storage, sharing links, cloud persistence, or URL payloads. No fixed audio autoplay. No copied content, assets, visual identity, markup, or code from the conceptual reference.
