# Video editing workspace

Use this workspace and the user's supplied materials. Treat shared paths below as workspace-relative; edit paths are relative to the selected `videos/<video-name>/`.

## Start

- Setup: read `skills/setup-workspace/SKILL.md`.
- First-time brand or requested brand changes: read `skills/setup-brand/SKILL.md`.
- New video or resume: read `skills/video-project-init/SKILL.md`.
- First cut: read `skills/yt-first-cut/SKILL.md`.
- Graphics and finishing: read `recipes/edit-video.md` and the installed HyperFrames entry skill.
- Generated scenes: read `skills/storyboard-method/SKILL.md`; discover the bundled KIE tools after setup.

These are plain Markdown skills. Read them explicitly if this client has no automatic discovery. `CLAUDE.md` points here; do not require a particular slash command.

## One folder per edit

Copy `templates/video/` into `videos/<video-name>/`. Continue in the existing folder when resuming. A fresh edit of the same footage gets its own folder and Borumi working project.

Keep reusable brand preferences in root `brand/`. Each video's `brand/STYLE.md` records its choices and overrides. Keep that video's assets, first-cut report, edit plan, generation jobs, compositions and exports together. Source recordings stay in Borumi; any separately supplied recordings belong in that video's `footage/`.

## Editing

Borumi owns the master cut, transcript, layouts and final export. HyperFrames owns graphics, media preparation, effects, transitions, previews and audio arrangement. KIE generates optional assets.

Read current tool guides. Identify the intended source and working project before editing. Use Borumi's transcript directly. Keep synchronized picture and audio together and preserve the original recording.

Show the first cut before graphics. Agree visual ideas and exact spoken anchors, render a preview, then insert approved treatments into Borumi. Derive timestamps from the current cut; recheck timeline state inside the transaction before applying changes.

Use HyperFrames' supported workflow for media preparation, graphics and sound. Keep each composition's playback media in `project/work/<segment>/media/`. Keep speech audible once. Review the exported picture, joins and audio.

Quote paid jobs before submission using current model documentation and the user's authorization. Record task IDs immediately in `project/generations.json`. Resume existing jobs after interruptions.

## Files and accounts

Only use the user's supplied assets. Ask for missing references rather than searching other projects or prior chats. No built-in visual theme is prescribed.

The local `.env` is for the user's credentials. Never print keys, paste them into chat, or write them into briefs, prompts or job records. Preserve existing values. Tool setup must target this user's machine and client; preserve unrelated registrations and follow the user's applicable authorization.

Save progress after each stage in `project/STATUS.md`. Review exports use `exports/review-v1.mp4`, incrementing revisions. Publishing is a separate request.
