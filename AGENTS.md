# Video editing workspace

Use this workspace and the user's supplied materials. Treat shared paths below as workspace-relative; edit paths are relative to the selected `videos/<video-name>/`.

## Commands

Each command is a skill in `skills/<name>/SKILL.md`. In Claude Code, Codex and Cursor they also appear in the `/` menu (installed in `.claude/skills/` and `.agents/skills/`; refresh with `npm run commands` after editing a skill). When the user types a command, or says it in plain words, read and follow that skill.

| Command | Plain words that mean it | What it does |
| --- | --- | --- |
| `/setup` | "set up", "setup", "install", "connect" | Checklist loop until everything is ready |
| `/brand` | "my brand", "colours", "logo", "fonts", "tone" | Save brand, logo, colours, fonts, tone |
| `/new-video` | "new video", "start a video", "continue <video>" | Make or reopen `videos/<name>/`, then the first cut |
| `/first-cut` | "first cut", "cut this", "remove repeats" | Cut repeats, false starts and pauses in Borumi |
| `/styles` | "what styles do I have", "show me vibe", "templates" | List styles and show their preview |
| `/new-style` | "new style", "design my own style" | Design a graphics style with its sounds |
| `/add-graphics` | "add graphics", "add my vibe graphics" | Plan, preview and insert graphics |
| `/add-music` | "add music", "sound", "mix" | Music bed, extra effects, final mix |
| `/b-roll` | "b-roll", "generate scenes" | Generated B-roll scenes (KIE) |

Full edit order and finishing: `_system/recipes/edit-video.md` and the installed HyperFrames entry skill.

## Where things live

- `skills/`: the commands. `styles/`: graphics styles (`vibe/` example, `_blank/` start). `brand/`: the user's brand. `sounds/`: their sound library. `videos/`: one folder per video.
- `_system/`: setup guides, video template, recipes, scripts and the KIE connector. Users don't need to open it.

## One folder per edit

`/new-video` copies `_system/templates/video/` into `videos/<video-name>/`. Continue in the existing folder when resuming. A fresh edit of the same footage gets its own folder and Borumi working project.

Keep reusable preferences at the root: brand in `brand/`, graphics styles in `styles/`, the sound library in `sounds/`. Videos copy from them and never edit them in place. Each video's `brand/STYLE.md` records its choices and overrides. Keep that video's assets, first-cut report, edit plan, generation jobs, compositions and exports together. Source recordings stay in Borumi; any separately supplied recordings belong in that video's `footage/`.

## Editing

Borumi owns the master cut, transcript, layouts and final export. HyperFrames owns graphics, media preparation, effects, transitions, previews and audio arrangement. KIE generates optional assets.

Read current tool guides. Identify the intended source and working project before editing. Use Borumi's transcript, and the piece-by-piece check in `/first-cut` for repeats. Keep synchronized picture and audio together and preserve the original recording.

Show the first cut before graphics. Agree visual ideas and exact spoken anchors, render a preview, then insert approved treatments into Borumi. Derive timestamps from the current cut; recheck timeline state inside the transaction before applying changes.

Use HyperFrames' supported workflow for media preparation, graphics and sound. Build graphics in `project/work/graphics/` and keep its playback media in its `assets/`. Keep speech audible once. Review the exported picture, joins and audio.

Quote paid jobs before submission using current model documentation and the user's authorization. Record task IDs immediately in `project/generations.json`. Resume existing jobs after interruptions.

## Files and accounts

Only use the user's supplied assets. Ask for missing references rather than searching other projects or prior chats. `styles/vibe/` is a ready example style; the user can use it or design their own with `/new-style`.

The local `.env` is for the user's credentials. Never print keys, paste them into chat, or write them into briefs, prompts or job records. Preserve existing values. Tool setup must target this user's machine and client; preserve unrelated registrations and follow the user's applicable authorization.

Save progress after each stage in `project/STATUS.md`. Review exports use `exports/review-v1.mp4`, incrementing revisions. Publishing is a separate request.
