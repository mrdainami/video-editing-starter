---
name: add-graphics
description: Add motion graphics to a video in the owner's saved style pack, each with its own saved sound effects. Picks the moments, fills each element with the right words, previews, and inserts approved graphics into Borumi. Use after the first cut is approved.
---

# Motion graphics for this video

Use the selected `videos/<video-name>/` folder (see
[new-video](../new-video/SKILL.md)). Read its `BRIEF.md`,
`brand/STYLE.md`, `project/edit-plan.md` and `project/STATUS.md`. Read the
installed HyperFrames entry skill before building.

## 1. Pick the style

Use the style named in this video's `BRIEF.md`, else `Default motion style:` in
root `brand/BRAND.md`. Read `styles/<style>/STYLE.md`. If no approved style
exists, offer [new-style](../new-style/SKILL.md) first, or build plainly
from `brand/BRAND.md` if the user wants to skip it. Record the style name and
version in this video's `brand/STYLE.md`.

Read the pack's Rules table and follow every rule in this video. Use the pack's
`assets/` (logo, images) where the elements call for them.

The user can name the style in plain words, e.g. "add my vibe graphics to
this video". That is enough to start.

## 2. Plan the moments

First map where the person is in this video's footage, the same way as in
[new-style](../new-style/SKILL.md) ("Know where the person is"): cut-out
plus free zones, per shot if the framing changes. Save it to
`project/subject-map.md`. "With me" elements use the free zones or sit behind
the cut-out; takeovers may cover the frame. Never cover the face.

Read the current cut's transcript from Borumi. Mark the key lines: the claim,
the problem, the example, numbers, lists, titles, the turn, the end. For each key
line pick **what picture shows it** from [VISUAL-IDEAS.md](VISUAL-IDEAS.md), then the
pack element that draws it, and write the exact text. Show the idea, not the words:
no name cards or lower thirds unless asked. When the speaker talks about
themselves, cut back to them. No row fits? Invent a literal picture of the idea,
mark it `new idea`, and add it to VISUAL-IDEAS.md once approved.

Save the plan in `project/edit-plan.md`: exact spoken anchor, time, element,
kind (takeover / with me / behind me), what it shows, images needed, sound,
status `proposed`.

Before showing the plan, check it yourself and fix anything that fails:

- [ ] Every key line has a picture of the idea (not just its words).
- [ ] Big ideas are takeovers; lines about the speaker cut back to them.
- [ ] No two graphics on screen at once: each leaves before the next arrives.
- [ ] A takeover that runs over several lines changes with the speech instead of cutting out and back in.
- [ ] Main graphic centred; a second idea slides it aside and points at the new thing.
- [ ] No filler transitions that carry no meaning.
- [ ] Nothing in the caption strip (below y 880 on 1080p).
- [ ] "With me" graphics stay out of the face (subject map).
- [ ] Sounds: whooshes for moves, at most one pop per graphic, nothing beepy.
- [ ] The style's own Rules table is followed.

Then show the plan and wait for the user's go.

## 3. Build

Work in one HyperFrames project for the cut: `project/work/graphics/`. Copy the
pack's `graphics/compositions/` into its `compositions/`, and the pack's
`graphics/assets/` (style folder with fonts and sounds, `logos/`, `gsap.min.js`)
into its `assets/`. The graphics find their sounds at `assets/<style>/sfx/`, so the
sounds travel with them. Put the Borumi export of the cut (and its cut-out, for
behind-me graphics) in `assets/` too. Mount each element with
`data-composition-src` and set its fill-ins with `data-variable-values`, placing
each at its spoken cue from the transcript. Using one element twice: make a
renamed copy (`python3 build.py --instance <id> <id>-2`, with the pack's
`build.py` copied in). Need to change a graphic for this video only? Copy its
source into the project's `src/` and build there. Never edit the style pack from
inside a video. Keep the project's media in its own `assets/`.

Go easy on pops: one per graphic at most. Use swooshes for moves and transitions; a pop only for the one key thing appearing. Check each element's sound against the speech at that moment. If it fights the
voice, lower its gain for this video only, or mute it if the user prefers.

**Highlights on screen recordings or images:** before drawing a box, grab frames
of the recording across the highlight's whole duration and find the full bounds
of the thing being pointed at (the whole panel, card or button, not a slice of
it). Map those source pixels into the graphic's frame (its position and scale),
add a little padding, and check a snapshot that nothing is cut off. If the
layout moves during the highlight, follow it or shorten the highlight.

**Match the speaker's gestures:** when they point or wave to a side ("this side",
"over here"), check frames at that moment and put the matching graphic on the side
their hand goes (screen left/right, not their left/right).

**Font swaps and mixed fonts:** a word that changes font must keep one width and
one baseline. Measure each font's width and size the variants to match, so the
words around it never move or overlap.

Need something the pack doesn't have? Build it in the pack's tokens (colours,
fonts, easing, timing) and pick a sound in the same feel, so it still matches. After approval, offer to save it to
the pack through [new-style](../new-style/SKILL.md).

## 4. Preview

First **stills**: run HyperFrames check, then `npx hyperframes snapshot --at <one
time per moment> --no-end --describe false` and show the contact sheet. Look at
it yourself against the checklist above before the user sees it. Fix notes on
the stills; they cost seconds, a render costs minutes.

Once the stills are approved, render and show the moving version. Revise on request.
Mark each row `approved` in `project/edit-plan.md` when the user says so.

When feedback sounds like it applies to every video ("always", "never", "too
small again"), ask: "Save this as a rule for the <style> style?" On yes, add it
to the pack's Rules table through [new-style](../new-style/SKILL.md). Fixes
that only fit this video stay in this video's `brand/STYLE.md`.

## 5. Insert

Follow steps 5–6 of [_system/recipes/edit-video.md](../../_system/recipes/edit-video.md):
resolve each spoken anchor again on the current Borumi timeline, re-read inside
the transaction, insert, keep speech once. Music comes after, through
[add-music](../add-music/SKILL.md).

How the graphics get into Borumi (tested):

1. Export the cut range from Borumi as an MP4 and build the graphics on top of
   it, so every time matches the timeline. Use that export's transcript
   (`npx hyperframes transcribe`) for cue times.
2. Render the whole composite with the voice **muted** (only the graphics'
   sounds). Keep a second copy with voice for the preview.
3. Cut the render into clips at the edges of each graphic group, on exact frames
   (`ffmpeg -ss <start> -to <end>`, re-encode). Save the ranges in
   `exports/overlays/slices.json`.
4. Pull the sound out of the full render as one WAV
   (`ffmpeg -i overlay-full.mp4 -vn -c:a pcm_s16le sfx-track.wav`).
5. In one Borumi edit: `import_media` each clip and the WAV, then `add_segments`:
   each clip as a `media_overlay` on its exact range with
   `position {kind:"custom", x_ratio:0, y_ratio:0, width_ratio:1, height_ratio:1}`
   and `entrance_transition`/`exit_transition` `{kind:"instant"}`; the WAV as one
   `sound_effect` from 0. Borumi plays **no sound from overlays**, so the
   graphics' sounds must go in as the sound effect. In testing Borumi played
   that sound effect 44 ms late and about 2.5 dB louder: measure it in the
   check export, and if it is late, trim that much off the start of the WAV
   (`-af atrim=start=0.044,asetpts=PTS-STARTPTS`) and swap it in.
   Music goes in as one `music` segment. Borumi plays music at about a quarter
   volume unless you set `volume_filter: 1.0`, so pre-mix the bed about 15 dB
   under the voice (around -31 LUFS) and set 1.0.
6. Check: `inspect_timeline` contact sheet, then export the range and confirm the
   voice plays once and the effect sounds are there (compare with the cut audio).

Leave out compositions you are not using; `hyperframes check` fails on them.
If Borumi tools say `app_not_running` or `incompatible_version`, ask the user to
restart Borumi, then call `get_guides` again before any edit.

Update `project/STATUS.md` with what was added and what is waiting for review.
