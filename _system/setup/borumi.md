# Connect Borumi

Borumi does the master cut, the transcript and the final export. Your agent edits in Borumi through Borumi's MCP: a small program inside the Borumi app that the agent talks to. The Borumi app must be open while the agent works.

## Steps

1. **Install Borumi** from [borumi.com](https://borumi.com/?atp=dainami). Open it and sign in.
2. **Turn on MCP in Borumi:** **Settings → AI → Enable MCP**. Leave it on.
3. **Connect it to your agent:** the agent runs `npm run connect`. This writes the connection into this folder for Claude Code (`.mcp.json`), Codex (`.codex/config.toml`) and Cursor (`.cursor/mcp.json`).
4. **Restart the agent** in this folder (or start a new chat here). Codex: say yes when it asks to trust the folder.
5. **Check:** the agent calls Borumi's `get_guides`, then lists your open projects. Borumi also shows a small "connected" icon in its top bar.

`npm run check` tests step 2 for real: it starts Borumi's MCP program and lists your open projects.

## The connection itself

What `npm run connect` writes, on a standard Mac install:

```text
Name: borumi
Command: /Applications/Borumi.app/Contents/MacOS/borumi
Argument: mcp
```

Borumi shows the exact command for any computer in **Settings → AI → Setup instructions → Other AI apps**. If `npm run connect` can't find Borumi (Windows, or a custom location), copy that command and run:

```sh
npm run connect -- --borumi-path "<the command>"
```

## If it doesn't work

- **"Borumi MCP turned on" stays ❌:** Borumi is closed, or Enable MCP is off. Open Borumi, check Settings → AI, run `npm run check` again.
- **The check works but the agent has no Borumi tools:** the agent was not restarted, or (Codex) the folder isn't trusted, or (Cursor) Borumi is switched off in Settings → MCP.
- **A request times out:** Borumi is busy (loading or exporting). Wait a moment and try again.

Before cutting, find the intended recording and its separate working project, and check its transcript is ready. If transcription is pending, use Borumi's transcription tools and report the state.

[Borumi](https://borumi.com/?atp=dainami)
