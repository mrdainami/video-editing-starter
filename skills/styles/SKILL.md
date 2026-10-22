---
name: styles
description: Show the user which graphics styles they have and what each one looks like. Lists every style in styles/, shows its preview image in the chat, offers its demo video, and explains how to use it or make a new one. Use when the user asks what styles or templates they have, or wants to see one.
---

# /styles

1. List the folders in `styles/`. Skip `_blank` (that's the empty starting point for a new style).
2. For each style, read the top of its `STYLE.md` and give one line: its name, the feel in a few words, how many graphics it has, and whether it's the default (`Default motion style:` in `brand/BRAND.md`).
3. **Show it.** Each style has `preview.jpg`: a grid with a still of every graphic, numbered and named.
   - If this app can show images in the chat, show `styles/<name>/preview.jpg` there.
   - Otherwise open it for the user (macOS `open`, Windows `start`, Linux `xdg-open`) and say it's open.
   - No `preview.jpg` yet? Make it with `npm run style-preview -- <name>` (takes a minute), then show it.
4. Offer more, one line each:
   - **Watch it move:** `styles/<name>/demo.mp4` (open it the same way), if the style has one.
   - **Click through every graphic:** `npm run hf -- preview styles/<name>/graphics`.
   - **Details:** the Elements table in `styles/<name>/STYLE.md` says what each graphic is for.
5. Finish with what they can do next:
   - `/add-graphics`: put a style on a video ("add my vibe graphics to this video").
   - `/new-style`: design their own style from references.
   - Make a style the default: set `Default motion style:` in `brand/BRAND.md` (offer to do it).
   - Add their logo or images to a style: put them in `styles/<name>/assets/` and note them in its `STYLE.md` (offer to do it).
