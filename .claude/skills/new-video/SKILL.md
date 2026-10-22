---
name: new-video
description: Start a new video (or reopen one) - makes its folder in videos/, records the Borumi project, then goes straight into the first cut. Use when the user says new video, start a video or continue a video.
---

# Select the video

1. Identify whether the user is starting a new edit or continuing one. For a continuation, read its existing `BRIEF.md` and `project/STATUS.md`.
2. For a new edit, choose a short kebab-case name from the request. Copy `_system/templates/video/` to `videos/<name>/` only when that destination does not exist. Never overwrite an existing video. A fresh edit of the same source gets a new folder and a separate Borumi working project.
3. Read the shared `brand/BRAND.md` and `brand/TONE.md`. Copy their approved text into this video's brand folder to preserve the chosen direction. Record this video's changes in `brand/STYLE.md`. Copy only selected owner-supplied assets, recording their sources in `ASSETS.md`. Never copy another video's jobs, footage or edit history by default.
4. Fill the video's brief with title, audience, scope, format and the verified source/working Borumi project. Use the current MCP guides to create or identify a working copy; preserve the source project.
5. For a new video, go straight on to the first cut: follow `skills/first-cut/SKILL.md`. For a continuation, resume the next step in `project/STATUS.md`.
6. Save status and next action. All first-cut reports, generation records, assets and exports belong under this video's folder. Shared skills, tools and setup stay at root.

Create folders through ordinary filesystem operations. Source recordings may remain in Borumi; store separately supplied recordings in `footage/`. Graphics are built in one HyperFrames project at `project/work/graphics/`, which keeps its own playback media in its `assets/`.
