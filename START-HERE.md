# Edit your first video

## 1. Open this folder

Open the whole folder in Codex, Claude Code or another local agent with file, terminal and MCP access. Keep it somewhere permanent so its tool connections keep working.

## 2. Set up the tools

Tell your agent:

> Read AGENTS.md and run skills/setup-workspace/SKILL.md. Check what I already have, then help me connect Borumi, set up KIE and install HyperFrames.

Open `.env` when asked and fill in your own `KIE_API_KEY`. Your agent can help you find the file. KIE is needed when you want generated B-roll or music.

## 3. Add your brand

> Run skills/setup-brand/SKILL.md. Ask for my existing brand guide, tone and reference materials. If I don't have them, help me choose a starting direction.

Your choices are saved for future videos.

## 4. Start a video

Open your recording in Borumi, then say:

> Create a video project called [name]. Make a first cut of my Borumi project [project name] and show me the result.

The agent creates `videos/<video-name>/` and keeps the edit there.

## 5. Add graphics and B-roll

Review the cut, then say:

> Suggest graphics and B-roll for this video using my brand. Show me the plan before generating them.

Review the previews and ask for changes. Approve the ones you want added to the edit.

## 6. Export

> Export the approved video into this video's exports folder and save its progress.

To continue later:

> Continue [video name]. Read its brief and saved status, check the current Borumi project and resume the next step.
