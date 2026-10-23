# Set up HyperFrames

HyperFrames makes the graphics, effects and previews. It has no MCP connection: it is a program in this folder plus skills that teach your agent how to use it. It needs Node.js 22+, FFmpeg and its own copy of Chrome.

## Steps (the agent runs these)

```sh
npm ci                                   # the HyperFrames program, pinned in package-lock.json
npx hyperframes browser ensure           # downloads the Chrome it renders with
npx -y skills add heygen-com/hyperframes --skill '*' -a claude-code -a codex -a cursor -y --copy
sh styles/vibe/graphics/get-sounds.sh    # 5 extra sounds the vibe style uses
npm run doctor                           # checks everything HyperFrames needs
```

The skills land inside this folder (`.claude/skills/` and `.agents/skills/`), so Claude Code, Codex and Cursor all see them after a restart.

**FFmpeg:**

- Mac: `brew install ffmpeg`. No Homebrew yet? The user installs it first in the Terminal app (it asks for their password):
  `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- Windows: `winget install --id Gyan.FFmpeg -e`, then restart the agent.
- Linux: `sudo apt install ffmpeg`.

`npm run doctor` may also list Docker and Kokoro TTS as missing. Both are optional; ignore them.

## Using it

For a video's graphics, from this folder:

```sh
npm run hf -- check videos/my-video/project/work/graphics
npm run hf -- preview videos/my-video/project/work/graphics
```

Keep the graphics project's media in its `assets/` folder. Render and review with the installed skills, then insert the approved result into Borumi (see `skills/add-graphics/SKILL.md`, step 5). Review exports go in `videos/my-video/exports/`.

[Official repository and setup](https://github.com/heygen-com/hyperframes)
