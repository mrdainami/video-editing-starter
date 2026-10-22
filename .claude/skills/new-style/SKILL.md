---
name: new-style
description: Design the owner's own motion graphics style (look, sounds, brand assets, rules), show a preview, get approval and save it as a named, reusable style pack in styles/. Use when the user wants their own graphics look, wants to change or add to it, or brings a Claude Motion / Claude Design animation to turn into a template.
---

# Design your motion style

A style pack is a small set of reusable HyperFrames graphics in one look, each
with its own sound effects. Every video can use it through
[add-graphics](../add-graphics/SKILL.md), and the graphics arrive with
their sounds.

Read root `brand/BRAND.md`, `brand/TONE.md` and `styles/README.md`. Read the
installed HyperFrames entry skill and its core, creative and animation guidance
before building. If the brand is not configured, offer
[brand](../brand/SKILL.md) first; a style can still start from
references alone.

## 1. Collect the direction

This is a conversation, not a guess. Ask before building anything. Do not
search other folders, past projects or old chats for brand files or references;
use only this workspace and what the user gives you. If root `brand/` already
has approved settings, show what you found and ask if this style should use it.

Ask, in one short message, for what is still missing:

- A name for the style (kebab-case, e.g. `clean-tech`).
- References: screenshots, clips, links to videos they like, or an animation they
  made in Claude Motion or Claude Design. Use only what the user supplies.
- Feel in plain words (e.g. "snappy, bold, dark, paper cut-out").
- Where it will play (16:9 YouTube, 9:16 shorts or both).
- A short clip of them talking to camera (10–20s, their usual framing). Every
  preview is built on this moving clip, never on a still frame.
- Standard assets that should appear inside the graphics: logo, icons, photos,
  textures. Check root `brand/assets/` first.
- Any rules they already know ("keep the bottom third clear", "no red").

Copy supplied references into `styles/<style>/references/` and standard
assets into `styles/<style>/assets/`. Record sources and permission in that
pack's `STYLE.md`. References show the look; assets are used in the graphics.
Write any rules the user gives into the Rules table.

**From Claude Motion or Claude Design:** if the user has the animation's code or
HTML, read it and carry its colours, type, easing, timing and layout into
HyperFrames. If they only have an MP4 or GIF, treat it as a visual reference.
Do not copy assets they do not own. If they want to design there first, give
them the prompt at the end of this file.

## Know where the person is

Graphics come in two kinds. Label each element as one or the other:

- **Takeover:** fills the frame (topic screens, full transitions). It may cover
  the person, on purpose, and must hand back cleanly.
- **With me:** appears while the person is on screen (labels, callouts, stats,
  words behind them). It must never cover the face, and should avoid the hands.

Before designing, map the talking clip:

1. Run HyperFrames `remove-background` on the clip to get a cut-out of the person.
2. From the cut-out, measure how often each part of the frame is occupied
   (face zone, hand zone, free zones). Save it as `subject-map.md` in the pack,
   with the free zones in pixels.
3. Put "with me" elements in free zones, or behind the person by layering the
   cut-out above the graphic. Record each element's default zone in `STYLE.md`.

## 2. Propose before building

Propose two or three short directions. Each one: palette, fonts, motion feel
(easing and speed), one sentence on why it fits. Build each on the user's
moving talking clip: one "with me" moment, a takeover transition in and out,
and a takeover screen. Render a short clip and show them side by side. Let the user pick one or
mix them. Do not build the full set until a direction is chosen.

## 3. Build the set

Create `styles/<style>/` from `styles/_blank/`. Build each
element as its own HyperFrames composition in `graphics/<element>/`, with the
text, numbers and colours exposed as variables so one component serves many
videos. Before hand-building a named effect (glitch, grain, shimmer, chart,
code window), check the HyperFrames registry for an existing block.

Default set (the user can add or drop items):

| Element | Job |
| --- | --- |
| `title-card` | Video or chapter title |
| `lower-third` | Name, label or source |
| `callout` | Highlight a word, point or screen area |
| `stat-pop` | A number that counts or punches in |
| `list-reveal` | 2–5 points appearing in order |
| `transition` | Move between sections |
| `end-card` | Subscribe / next video / link |

Keep every element seek-safe and deterministic, inside safe zones, readable on a
phone and short (most under 4 seconds).

**Build rules that keep graphics reusable** (see `styles/vibe/` for a
working example):

- One file per element, everything inside its `<template>`: styles, markup,
  sounds, script. Linked stylesheets are dropped, so keep shared CSS in
  `graphics/assets/<style>/<style>.css` and inline it with a small build step
  (`graphics/build.py`).
- Fill-ins go in `data-composition-variables`; read them with
  `window.__hyperframes.getVariables()`.
- In the script, find the element's own box with
  `host.querySelector('[data-hf-inner-root]')`, not the host div, so anything
  the script creates inherits the pack's styles.
- Put each element's sounds inside it as `<audio>` with local start times.
- An element mounted twice in one video needs a renamed copy (unique id).
- Prove it: place every element on one timeline (`graphics/index.html`) on
  the talking clip, and compare it frame by frame with the approved preview.

## 4. Give each element its sound

Each element carries its own sound effects, so the look and the sound always
come together. Music is not part of the pack; that stays in
[add-music](../add-music/SKILL.md).

For each element, decide where a sound hits (entrance, number landing, exit) and
the feel (soft click, airy whoosh, paper rustle). Silence is fine for some
elements. Find each sound in this order: root `sounds/` library, files the
user supplies, then KIE (read the current sound-effect model docs, quote the
price first, record task IDs in `styles/<style>/generations.json`).

Save the files in `styles/<style>/sounds/` with the cue name
(`stat-pop_land.wav`). Wire each one into its component as framework-owned
audio, timed to the frame it belongs to, with a low default gain so it sits under
speech. Use the HyperFrames audio guidance for timing and gain.

## 5. Preview and approve

Render `styles/<style>/preview/preview-v1.mp4` on the talking clip: every
element once, with its sound, and sample text from the user's real content where possible. Run
HyperFrames check first. Show it. Revise a single element's look or sound on
request without changing the rest. Increment the preview version on each round.

## 6. Save

When the user approves:

- Fill `styles/<style>/STYLE.md`: tokens (colours, fonts, sizes, easing,
  durations), the element list with variables, each element's sound files and
  gain, sound sources and licences, references and `status: approved`, version
  and date.
- Offer to add the new sounds to root `sounds/LIBRARY.md` too, so other
  styles can reuse them.
- Set `Default motion style:` in root `brand/BRAND.md` if this is their first or
  preferred style. Keep older styles; a user can have several.
- Make the style's picture for `/styles`: run `npm run style-preview -- <style>`
  (writes `styles/<style>/preview.jpg`, every graphic numbered). Copy the approved
  preview video to `styles/<style>/demo.mp4`.

Later changes (look or sound): edit the element, re-render the preview and `preview.jpg`, bump the version. Videos
already exported keep the version they used.

## Keep improving the style

The pack grows each time it's used. Add to it, with the user's OK:

- **New rules** from feedback ("text bigger on mobile", "never cover my face",
  "slower exits"). Write them in the Rules table with where they came from.
  If a rule clashes with an older one, ask which wins and update the table.
- **New references** the user likes. Add them to `references/`.
- **New elements** built for one video. Move them into `graphics/` with
  their sounds.
- **New assets** (a new logo, product shots). Add them to `assets/`.

A change to how existing elements look or sound means a new preview and a
version bump. A new rule alone does not.

## Prompt for Claude Motion / Claude Design

Claude Motion is in Artifacts → Motion on Team and Enterprise plans. On Pro or
Max, use Artifacts → Design and ask it to "build an animation".

```text
Build a [length]-second [16:9 / 9:16] motion graphics style sheet for my
YouTube videos. Show these one after another on a plain background:
title card, lower third, callout, stat pop, list reveal, transition, end card.
Style: [feel in plain words]. Colours: [hex codes]. Fonts: [fonts].
Use my attached references for the look. Keep text short and readable on a phone.
Use the same easing and timing across every element so they feel like one set.
```

Bring the result back (code if you can, or the MP4) and continue at step 1.
Sounds are added in step 4 here, whether or not the animation had any.
