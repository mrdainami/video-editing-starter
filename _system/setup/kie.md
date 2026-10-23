# Connect KIE

KIE makes generated B-roll, music and sound effects. It costs credits per job. Setup only checks your balance; it never generates anything.

KIE is the **last** setup step and can be skipped. Borumi is connected and checked first.

## Steps

1. **Make an account** at [KIE](https://kie.ai?ref=41abfa41934c4f15a97d88d2d4f8162a).
2. **Create a key** at [kie.ai/api-key](https://kie.ai/api-key) and copy it.
3. **Paste it into `.env`** in this folder, right after `KIE_API_KEY=`, with no spaces. Save. The agent opens the file for you (Mac: `open -e .env`, Windows: `notepad .env`), because files starting with a dot are hidden.
4. **Connect it to your agent:** the agent runs `npm run connect` again (it was run once for Borumi; running it again adds KIE).
5. **Restart the agent** in this folder.
6. **Check:** the agent reads your credit balance with the KIE tools. A new account may show 0 credits: the key works, but add credits on kie.ai before generating.

`npm run check` tests the key for real against KIE's free balance endpoint (`GET https://api.kie.ai/api/v1/chat/credit`).

## How the connection works

`npm run connect` registers this launcher, using this computer's real paths:

```text
Name: kie
Command: <full path to node>
Argument: <this folder>/_system/scripts/start-kie.mjs
```

The launcher reads the key from this folder's `.env` each time it starts, and starts the bundled connector in `_system/tools/kie-mcp`. The key is never copied into agent settings. If you move this folder, run `npm run connect` again.

## Skip it

Say "skip KIE" during setup. The agent adds `KIE_SETUP=skipped` to `.env`. Remove that line and add a key whenever you want it.

## Before generating

Read the chosen model's current documentation, confirm settings and price with the user, and save each returned task ID in the video's `project/generations.json`.

[Connector](https://github.com/mrdainami/kie-mcp) · [API documentation](https://docs.kie.ai/)
