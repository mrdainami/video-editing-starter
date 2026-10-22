# vibe: example graphics style

A ready-made style: 22 graphics, each with its own sound, in one look (paper, ink, coral; mixed-font kinetic type).

- **See it:** `preview.jpg` (every graphic, numbered) and `demo.mp4` (an AI presenter using it).
- **What each graphic is for:** the Elements table in `STYLE.md`.
- **Use it on a video:** `/add-graphics` ("add my vibe graphics to this video").
- **Click through every graphic:** `npm run hf -- preview styles/vibe/graphics`.
- **Change the look:** edit `graphics/src/` and `graphics/assets/vibe/vibe.css`, then `python3 graphics/build.py`. Or ask `/new-style` to adjust it.
- **Add your logo:** put it in `assets/` and ask the agent to use it in the graphics.

Fonts are SIL Open Font License (licence files next to the fonts). 13 sounds were generated for this style with KIE (Suno Sounds) and are free to use in your videos. 5 more (pop, whoosh, whoosh-short, click-soft, impact-bass-1) come from HyperFrames' bundled library: `/setup` fetches them with `graphics/get-sounds.sh`.
