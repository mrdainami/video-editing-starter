---
name: setup
description: Set up this video editing starter step by step. Runs a checklist, shows what is done and what is missing, and walks the user through the next missing step (with its link or command) until everything required is done. Use on first open, or whenever a tool stops working.
---

# /setup

Keep it simple. One step at a time, in plain words.

## The loop

1. Run `npm run check` from the starter folder. It prints the checklist:
   ✅ done · ❌ to do · ⭕ optional · ❔ the agent checks it.
2. Show the user the checklist exactly as printed, then the **NEXT** step with its link or command.
3. Do the next step:
   - **A command** (`npm ci`, `npm run commands`, `npx skills add …`, `sh …get-sounds.sh`): run it yourself, then say what it did in one line.
   - **Something only the user can do** (install Node.js or Borumi, create a KIE account, type a key): give the link and one short instruction, then wait until they say done.
4. Run `npm run check` again and repeat until there is no NEXT.
5. Then check the ❔ items yourself:
   - **Borumi:** register its MCP connection for this agent (`_system/setup/borumi.md`), reconnect if needed, and list the user's Borumi projects. Borumi is done only when the list works.
   - If the user added a KIE key: register the KIE connector (`_system/setup/kie.md`) and check the account balance (no generation).
6. Offer the optional steps once: KIE (generated B-roll, music, sound effects) and `/brand` (logo, colours, fonts, tone). Skipping is fine.
7. Save where things stand in `_system/setup/STATUS.md` (no keys), and finish with what they can do next:
   - `/new-video` to start a video (it makes the folder and the first cut)
   - `/styles` to see the graphics styles
   - `/new-style` to design their own style

## Rules

- Never ask for an API key in chat. The user types it into `.env` themselves.
- If `npm run commands` was just run, tell the user to restart the agent (or open a new chat) so the `/` commands appear.
- Keep existing installs and other agents' settings. Ask before changing anything outside this folder.
- If this agent can't run commands or connect apps (a chat-only app), say so and suggest Claude Code, Codex or Cursor.

Details for each tool, if something goes wrong: `_system/setup/hyperframes.md`, `_system/setup/borumi.md`, `_system/setup/kie.md`.
