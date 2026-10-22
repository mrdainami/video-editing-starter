---
name: add-music
description: Add background music and any extra sound effects to a video, then balance the whole mix. Graphics already bring their own sounds from the style pack. Reuses the owner's sound library first, generates through KIE only when needed (quoted first), keeps everything under the voice, and saves good sounds back to the library. Use after motion graphics, or after the cut for a video without graphics.
---

# Sound design

Use the selected `videos/<video-name>/` folder. Read its `BRIEF.md` (music and
sound preferences), `brand/STYLE.md`, `project/edit-plan.md` and
`project/STATUS.md`. Read root `sounds/LIBRARY.md` and the HyperFrames
audio guidance before mixing.

The voice comes first. Every sound must sit under the speech, never over it.

## 1. Plan the sound

Make a short sound plan:

- **Music bed:** mood, where it starts and stops, where it changes (e.g. calmer
  under the tutorial, lift at the reveal). Silence is a valid choice.
- **Extra effects:** only moments with no graphic that still need a sound, or
  ones the user asks for. Graphics marked `from pack` in `project/edit-plan.md`
  already have their sounds; don't add a second one on top. Keep extras few and
  soft.

Add the sound rows to `project/edit-plan.md` with exact spoken anchors and status
`proposed`. Show the plan and wait for the user's go.

## 2. Find the sounds

In this order:

1. **Library:** match by cue name or mood in `sounds/LIBRARY.md`. For an
   extra effect, the style pack's `sounds/` folder is a good match too.
2. **User files:** music or effects the user supplies. Record source and licence.
3. **KIE:** only if 1 and 2 have nothing. Read KIE's current model index for music
   and sound-effect models and their docs. Ask for instrumental music unless the
   user wants vocals. Quote the price before submitting, record the task ID in
   `project/generations.json` straight away, and resume recorded jobs after an
   interruption.

Put this video's copies in `assets/audio/`. Record every file in `ASSETS.md`.

## 3. Mix

Music style: use the motion style's `Music:` line in its STYLE.md (mood, tempo, level) unless the brief says otherwise. Mix the bed about 15 dB under the voice. In Borumi set the music segment's `volume_filter` to 1.0 (its default plays music at about a quarter).

Arrange in HyperFrames with its audio guidance: fades in and out, music ducked
under speech, extra effects lined up to their frame, gain checked in the right
units. Balance the whole mix together: voice, music, and the graphics' own
sounds. If music and a graphic's sound clash, lower the music there first. Keep the arrangement editable. Keep playback files inside the video's
folder (`assets/music/` for music beds).

Place the result on the Borumi timeline through its current MCP guides, keeping
speech audible once. Re-read the timeline inside the transaction before changing
it. If Borumi can't hold the mix as needed, render the mixed section from
HyperFrames and insert that.

## 4. Review

Render or export a review and listen through: speech clear, no clipping, effects
in sync, music not tiring. Fix on request. Mark approved rows in
`project/edit-plan.md` and update `project/STATUS.md`.

## 5. Grow the library

Offer to save approved new sounds to `sounds/bgm/` or `sounds/sfx/`
with a cue name, mood, length, source, licence and KIE task ID in
`sounds/LIBRARY.md`. Only save sounds the user may reuse. Next video starts
with more to pick from and costs less.
