# Edit a video

Use the selected `videos/<video-name>/` folder for all paths below. Shared skills
and tools remain at the workspace root.

1. **Cut:** use `skills/first-cut/SKILL.md` to inspect Borumi's transcript and
   cut through MCP. Show the first cut for review.
2. **Style:** if the owner has no approved style in `styles/`, offer
   `skills/new-style/SKILL.md`. Skip when they already have one.
3. **Agree visuals:** use `skills/add-graphics/SKILL.md`. For each key line
   it picks a picture from `skills/add-graphics/VISUAL-IDEAS.md`, follows the
   style's rules, runs its self-check, and saves the plan (exact spoken phrase,
   time, graphic, sound) in `project/edit-plan.md`. Wait for the user's go.
4. **Build:** in `project/work/graphics/` (a HyperFrames project) with the
   installed HyperFrames skills. Export the cut range from Borumi as an MP4 and
   build the graphics on top of it, so times match the timeline. Copy the style's
   graphics and sounds in; logos and images go in `assets/`. Use KIE only when
   needed: quote paid jobs first and record their IDs immediately. For generated
   b-roll read `_system/recipes/generate-broll.md` and `skills/b-roll/SKILL.md`.
5. **Preview:** stills first (one frame per moment from `hyperframes snapshot`),
   then the moving render once the stills are approved. Revise on request. Wait
   for approval before adding anything to Borumi.
6. **Insert:** follow step 5 of the add-graphics skill: render with the voice
   muted, cut it into clips on exact frames (ffmpeg is fine here), and add them
   to Borumi as full-frame `media_overlay` clips on their exact ranges. Borumi
   plays no sound from overlays, so the graphics' sounds go in as one
   `sound_effect` track (check its timing in an export). Keep speech once.
7. **Sound:** use `skills/add-music/SKILL.md` for the music bed (the style's
   `Music:` line), extra effects and the final mix. In Borumi set the music
   segment's `volume_filter` to 1.0.
8. **Finish:** review picture, joins and audio in Borumi, then export to
   `exports/review-v1.mp4`, incrementing revisions. Update `project/STATUS.md`.

Publishing is separate from exporting a review.
