# Set up HyperFrames

Use [Node.js 22 or later](https://nodejs.org/en/download). The starter pins HyperFrames in `package-lock.json`.

From the workspace root:

```sh
npm ci
npm run doctor
```

Install the official skills into this client's supported location:

```sh
npx skills add heygen-com/hyperframes
```

The interactive installer lets the user choose their agent. For automated setup, inspect the current installer's help and specify the intended agent and skills explicitly. Avoid copying another machine's installed skill folders. The official repository documents the current core-skills installation route.

Read the installed HyperFrames entry skill. Resolve any missing rendering runtime through its supported setup. HyperFrames runs through the CLI and skills in this workspace.

Then fetch the 5 extra sounds the vibe style uses (they come with HyperFrames' media-use skill; their licence allows use in videos but not re-sharing the loose files):

```sh
sh styles/vibe/graphics/get-sounds.sh
```

For a video's graphics, from root:

```sh
npm run hf -- check videos/my-video/project/work/graphics
npm run hf -- preview videos/my-video/project/work/graphics
```

Keep the graphics project's media in its `assets/` folder. Use the installed skills to render and review its output, then insert the approved result into Borumi (see `skills/add-graphics/SKILL.md`, step 5). Review exports go in `videos/my-video/exports/`.

[Official repository and setup](https://github.com/heygen-com/hyperframes)
