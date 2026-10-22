# Connect KIE

1. Create your account at [KIE](https://kie.ai?ref=41abfa41934c4f15a97d88d2d4f8162a) and get your API key.
2. Open root `.env` and enter the key after `KIE_API_KEY=`. If the file is absent, create it from `.env.example`. Keep existing values when resuming.
3. Have your agent register this local MCP process using this machine's actual absolute paths:

```text
Name: kie
Transport: stdio
Command: /absolute/path/to/node
Arguments: /absolute/path/to/video-editing-starter/_system/scripts/start-kie.mjs
```

The launcher reads this folder's `.env`, uses its `KIE_API_KEY` rather than an inherited key, sets the workspace directory, and starts the bundled connector. The registration contains the launcher path, not your key.

4. Reconnect the agent. Discover the KIE tools, then use the documented account-credit GET endpoint to verify authentication without generating. Report success or the error, with credentials redacted.
5. Before generation, read the selected model's current documentation, confirm settings and price, and save each returned task ID in the selected video's `project/generations.json`.

The bundled connector is self-contained and does not require a separate install. Use Node.js 22+. Keep the workspace in the same location, or update the launcher path after moving it.

[Connector](https://github.com/mrdainami/kie-mcp) · [API documentation](https://docs.kie.ai/)
