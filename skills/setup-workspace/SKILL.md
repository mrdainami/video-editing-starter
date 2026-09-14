---
name: setup-workspace
description: Set up this video editing workspace for a local AI agent, connecting Borumi and optional KIE and installing HyperFrames. Use for first setup or a missing connection.
---

# Set up the workspace

1. Read root `AGENTS.md` and `setup/STATUS.md`. Identify the current agent, OS and workspace path. Check available tools and Node.js before installing anything. Use existing working connections when they target this workspace.
2. Follow `setup/hyperframes.md` to install the pinned CLI and official skills. Use this client's supported project skill location. Read the installed HyperFrames entry skill before graphics.
3. Follow `setup/borumi.md` to connect the editor. Have the user open their recording. Read the MCP guides and list the projects to verify the intended project without editing it.
4. Follow `setup/kie.md` when the user wants generated assets. Create `.env` from `.env.example` only if absent. Ask the user to enter the key in the file; never ask them to paste it into chat. Register `scripts/start-kie.mjs` using absolute paths resolved on this machine.
5. Verify tool discovery, Borumi project access and HyperFrames doctor separately. Verify KIE authentication with the documented account-credit GET request, without generation. Do not treat tool discovery as authentication or installation as a completed render.
6. Update `setup/STATUS.md` with what passed and the next missing step, without credentials or private headers. If root `brand/BRAND.md` is not configured, offer `skills/setup-brand/SKILL.md`. Otherwise reuse the saved brand.

For a client without MCP or local execution, explain the missing capability and help the user open this workspace in a compatible local agent. Do not claim that any chat-only interface can execute the workflow.

Respect prior authorization for routine setup, preserve existing installations and unrelated client settings, and get any permission required by the user's environment before changing configuration.
