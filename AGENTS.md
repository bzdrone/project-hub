# Project routing

This hub is a starting point for humans and agents, not a central knowledge store.

## At startup

Read `PROJECTS.md` in this directory. If the user has not specified a project or goal, ask what they want to work on. Do not load every destination project's context.

## Route a request

1. Match the user's project name or goal to the directory's purpose and "Use when" descriptions. Ask if ambiguous; do not invent an entry.
2. Open the listed workspace file relative to the hub root. Read its `folders` array as the directory map; `.code-workspace` files may use JSON with comments. Resolve folder paths relative to the workspace file, not the hub root. Verify the listed directories exist; report missing folders rather than creating or ignoring them silently.
3. Resolve `Primary folder` by its workspace folder `name`. Read the listed entry point relative to that folder and applicable local instructions for any directories involved in the task. Ask if the primary folder is missing or ambiguous. Follow references to knowledge and skill projects only as needed.
4. Report the selected project, workspace file, and relevant working directories. Use the primary folder for CLI startup unless the task calls for a different workspace folder. Keep the requested task attached to the handoff; do not make the user repeat it.
5. If this session can genuinely switch project context, use the supported mechanism. Otherwise provide a command or ask the user to open a new session there. A shell `cd` in one tool call does not change the parent agent's session directory.
6. Do not claim a switch or dispatch occurred without verifying it. Do not spawn another agent without approval. Pi is the default CLI, not a required participant.

## Boundaries

- Keep knowledge, skills, plans, and task state in the owning projects; link to them from the directory.
- Add projects only when explicitly requested. Creating or discovering a directory does not register it as a project. If a project is missing or its path is unavailable, explain and ask how to proceed.
- Each workspace folder can be a separate repository with its own instructions and Git state. Do not assume the workspace creates a shared Git root or makes one folder's instructions apply to all others.
- Preserve project-local instructions and tool permissions. Routing guidance does not override them.
- Do not store credentials, confidential material, or raw session transcripts here.
- Keep the directory useful to people reading Markdown directly; do not require a particular agent or runtime to understand it.
