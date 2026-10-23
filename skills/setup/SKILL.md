---
name: setup
description: Set up this video editing starter from nothing, step by step. Assumes the user has never installed anything. Runs a live checklist, does every step the agent can do itself, and hand-holds the user through the rest (opens the page, the app or the .env file for them). Order - Node, HyperFrames, Borumi (connect, restart, prove it works), then KIE last and skippable. Use on first open, when the user says "set up", "setup", "install", "connect", "set up Borumi", "connect KIE", "set up HyperFrames", or whenever a tool stops working.
---

# /setup

The user may have never used a terminal, an API key or MCP. Talk like a patient friend: one step at a time, short sentences, no jargon. Do everything you can yourself. Only hand the user what a person must do, make it one click away, and wait for "done".

The order is fixed: **Node → HyperFrames → Borumi (connect, restart, check) → KIE (last, can skip) → finish.**

## Start: read where things stand

1. If `_system/setup/STATUS.md` says setup is in progress, continue from there (for example "next: check Borumi in chat after restart").
2. Run `node -v`.
   - **Missing or below v22:** open https://nodejs.org/en/download for them (see "Opening things"). Say:
     "First, your computer needs Node.js. It runs the editing tools. I opened the download page. Click the **LTS** button, open the file and follow the installer (it asks for your Mac password). Then close me, open me again in this folder, and type /setup."
     Stop here.
   - **v22 or newer:** go on.

## The loop

1. Run `npm run check`. It prints the checklist and tests Borumi and KIE for real:
   ✅ done · ❌ to do · ⭕ optional · ⏭️ skipped.
2. Show the checklist as printed, then the **NEXT** step in plain words.
3. Do the NEXT step (below).
4. Run `npm run check` again. Repeat.

If the user asked for one tool only ("set up Borumi", "connect KIE", "set up HyperFrames"), still run the check, but work only on that tool's steps, then finish.

## Part 1: HyperFrames (the agent does it)

Say "I'll do the next few steps myself. This takes a few minutes." Then run each NEXT command and report it in one line:

| Step | Command |
| --- | --- |
| / commands | `npm run commands` |
| HyperFrames program | `npm ci` |
| FFmpeg | Mac with Homebrew: `brew install ffmpeg` · Windows: `winget install --id Gyan.FFmpeg -e` |
| Chrome for rendering | `npx hyperframes browser ensure` |
| HyperFrames skills | `npx -y skills add heygen-com/hyperframes --skill '*' -a claude-code -a codex -a cursor -y --copy` |
| Vibe sounds | `sh styles/vibe/graphics/get-sounds.sh` |

**Mac without Homebrew (only if FFmpeg needs it):** this one needs the user's password, so they run it. Open the Terminal app for them (`open -a Terminal`) and say:
"Paste this line into the Terminal window I opened and press Enter. It asks for your Mac password. **Nothing shows while you type. That's normal.** It can take 5 to 10 minutes, and your Mac may ask to install developer tools: click Install. Say done when it finishes."
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
Then run `brew install ffmpeg` yourself (if `brew` isn't found, use `/opt/homebrew/bin/brew`).

End with: "✅ HyperFrames is ready."

## Part 2: Borumi

1. **Install Borumi.** Open https://borumi.com/?atp=dainami . Say: "Next is Borumi, the app that edits your video. I opened the Borumi website. Click **Download**, install it (on Mac, drag it into Applications), open it and sign in. Say done."
2. **Turn on Borumi MCP.** Open the Borumi app for them. Say: "In Borumi, click **Settings → AI** and turn on **Enable MCP**. That lets me edit in Borumi for you. Keep Borumi open. Say done."
   Borumi must stay open: the agent talks to the running app.
3. When the check shows Borumi answering, run `npm run connect`.
4. Update `_system/setup/STATUS.md` (no keys): "Borumi connected. Next: check Borumi in chat after restart, then KIE."
5. Say: "Borumi is connected to this folder. Close me, open me again here, and type /setup. **If I ask you to trust this folder or approve 'borumi', say yes.**"
   - Codex: "If Codex asks whether to trust this folder, say yes."
   - Cursor: "If Cursor shows Borumi as off in Settings → MCP, turn it on."
   Stop and wait.
6. **After the restart:** call Borumi's `get_guides` tool, then list the open projects. Say: "✅ I can see Borumi from here. Borumi is done."
   If the Borumi tools are missing in this chat, the connection didn't load: ask them to fully quit and reopen the agent in this folder (Codex: trust the folder; Cursor: Settings → MCP).

## Part 3: KIE (last, can skip)

1. Ask: "Last one is optional. KIE makes AI B-roll, music and sound effects. It uses paid credits. Set it up now, or skip?"
2. **Skip:** add the line `KIE_SETUP=skipped` to `.env`, update STATUS.md, go to "Finish". They can add it later by removing that line and typing /setup.
3. **Set it up:**
   1. Open https://kie.ai?ref=41abfa41934c4f15a97d88d2d4f8162a . Say: "Make an account. Say done."
   2. Open https://kie.ai/api-key . Say: "Click to create a key, and copy it."
   3. Open `.env` for them (it is hidden in Finder because the name starts with a dot). Say: "Paste the key right after `KIE_API_KEY=` with no spaces. Press Cmd+S to save (Ctrl+S on Windows), close the window, and say done."
   4. Run `npm run check`. If KIE answered, say: "✅ KIE accepted your key." If the balance is 0, add: "You'll need to add credits on kie.ai before making anything."
      If the key is rejected: "KIE didn't accept that key. Copy it again and paste it with no spaces."
   5. Run `npm run connect`. Update STATUS.md: "KIE connected. Next: check KIE in chat after restart."
   6. Say: "Close me and open me again here one last time, then type /setup." Stop and wait.
   7. **After the restart:** check the credit balance with the KIE tools (the account-credit GET endpoint, no generation). Say: "✅ KIE works from here."

## Finish

1. Update `_system/setup/STATUS.md` (no keys): setup complete.
2. Say: "You're all set! 🎉 Want to add your logo, colours and fonts? Type /brand. Or open your recording in Borumi and type /new-video to start your first edit."
   Also mention `/styles` to see the graphics styles.

## Opening things

Open pages, apps and files for the user so they never have to hunt for them.

| What | Mac | Windows |
| --- | --- | --- |
| A web page | `open "<url>"` | `start "" "<url>"` |
| The Borumi app | `open -a Borumi` | start it from the Start menu |
| The `.env` file | `open -e .env` (TextEdit) | `notepad .env` |
| The Terminal app | `open -a Terminal` | — |

If `.env` is missing, `npm run check` creates it from `.env.example` first.

## Rules

- Never ask for the key in chat, and never print it. The user pastes it into `.env`.
- Never read `.env` back to the user. To check the key, run `npm run check`.
- One step at a time. Wait for "done" before checking again.
- If a command fails, read the error, fix what you can, and explain the rest in one plain sentence.
- `npm run connect` is safe to run again; it updates the same entries. It only writes inside this folder.
- Keep other tools and settings as they are. Ask before changing anything outside this folder (installing Node, Homebrew, FFmpeg and Borumi is the user's own step or an install they agreed to).
- If this agent can't run commands (a chat-only app), say so and suggest Claude Code, Codex or Cursor.

Details if something goes wrong: `_system/setup/borumi.md`, `_system/setup/kie.md`, `_system/setup/hyperframes.md`.
