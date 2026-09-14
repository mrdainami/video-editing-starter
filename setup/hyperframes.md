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

For a video segment, from root:

```sh
npm run hf -- check videos/my-video/project/work/my-segment
npm run hf -- preview videos/my-video/project/work/my-segment
```

Keep the segment's playback files in its `media/` folder. Use the installed skills to render and review its output, then insert the approved result into Borumi. Review exports go in `videos/my-video/exports/`.

[Official repository and setup](https://github.com/heygen-com/hyperframes)
