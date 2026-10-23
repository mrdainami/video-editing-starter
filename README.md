# AI Video Editing Starter

A reusable workspace for cutting recordings, adding graphics and B-roll, and keeping each video together.

[Download the starter ZIP](https://github.com/mrdainami/video-editing-starter/releases/latest/download/video-editing-starter.zip)

Unzip it and open the folder in Claude Code, Codex or Cursor.

Works with agents that can read local files, run commands and connect to MCP tools. Borumi handles the edit. HyperFrames makes graphics. KIE supplies optional generated assets, music and sound effects.

New in v2.1: `/setup` starts from nothing. Never installed anything? It installs what it can, opens each page or app you need, connects [Borumi](https://borumi.com/?atp=dainami) and KIE to Claude Code, Codex or Cursor, and checks they really work.

New in v2: design your own motion graphics style once, with its own sound effects, then every video uses it. It comes with an example style, `vibe` (22 graphics with sounds and a demo video), and a "you say X → show Y" list so the agent picks a picture for each line. The first cut now catches repeated takes with a piece-by-piece transcript. Plus a reusable music and sound effects library.

Type `/setup`, then follow [START-HERE.md](START-HERE.md): `/new-video`, `/styles`, `/new-style`, `/add-graphics`, `/add-music`. The commands work in Claude Code, Codex and Cursor; any agent can also run them from plain words.

- `skills/`: the commands
- `styles/`: graphics styles (`vibe` example, `_blank` to start your own)
- `brand/`: your brand and tone
- `sounds/`: your sound library
- `videos/<name>/`: each video's brief, assets, work and exports
- `_system/`: setup guides, video template, scripts and the KIE connector

The release ZIP includes a blank `.env`. If you download GitHub's source archive or clone this repository, setup creates it from `.env.example`.
