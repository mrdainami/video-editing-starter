# Set up the tools

Type `/setup` (or say "set me up"). Your agent runs a live checklist, does what it can, and walks you through the rest. You don't need to open this folder.

- [Borumi](borumi.md): record and edit the video. Needs the app, its MCP switch, and a connection to your agent.
- [HyperFrames](hyperframes.md): graphics, effects and previews. A program plus skills, FFmpeg and Chrome.
- [KIE](kie.md): generated B-roll, music and sound effects. Needs an account, a key in `.env`, and a connection.

Useful commands (the agent runs them):

- `npm run check`: the checklist. Tests Borumi and KIE for real.
- `npm run connect`: connects Borumi and KIE to Claude Code, Codex and Cursor, inside this folder only.

Your agent records progress in [STATUS.md](STATUS.md), so setup can continue after a restart.
