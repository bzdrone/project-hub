# Project routing

This hub is a starting point for humans and agents, not a central knowledge store.

## At startup

Read `PROJECTS.md` in this directory. If `local/` exists, also read `local/AGENTS.md` and `local/PROJECTS.md`, and follow the local rules. If the user has not specified a project or goal, ask what they want to work on. Do not load every destination project's context.

## Public and local layers

This repository is public: it holds the routing method and shareable project entries. Private entries, their workspaces, and personal working rules live in `local/`, a separate private repository inside this hub's ignored `local/` folder. Its `PROJECTS.md` uses the same format, with `Workspace` paths relative to `local/`.

- Never copy local content (private project names, paths, purposes, or personal rules) into public files.
- Make a private entry public only when the user explicitly asks; then move its entry and workspace file together, after confirming the workspace lists only public directories and contains no private settings or references.
- The ignore rule is a backup, not the boundary. Do not force-add files under `local/` to this repository.

## Route a request

1. Match the user's project name or goal to the directory's purpose and "Use when" descriptions. Ask if ambiguous; do not invent an entry.
2. Open the listed workspace file relative to the hub root. Read its `folders` array as the directory map; `.code-workspace` files may use JSON with comments. Resolve folder paths relative to the workspace file, not the hub root. Verify the listed directories exist; report missing folders rather than creating or ignoring them silently.
3. Resolve `Primary folder` by its workspace folder `name`. Read the listed entry point relative to that folder and applicable local instructions for any directories involved in the task. Ask if the primary folder is missing or ambiguous. Follow references to knowledge and skill projects only as needed.
4. Report the selected project, workspace file, and relevant working directories. Use the primary folder for CLI startup unless the task calls for a different workspace folder. Keep the requested task attached to the handoff; do not make the user repeat it.
5. If this session can genuinely switch project context, use the supported mechanism. Otherwise provide a command or ask the user to open a new session there. For Claude Code, `bin/hub <project-id>` starts a session in the primary folder with the other workspace folders added. A shell `cd` in one tool call does not change the parent agent's session directory.
6. Do not claim a switch or dispatch occurred without verifying it. Do not spawn another agent without approval. Pi is the default CLI, not a required participant.

## Boundaries

- Keep knowledge, skills, plans, and task state in the owning projects; link to them from the directory.
- Add projects only when explicitly requested. Creating or discovering a directory does not register it as a project. If a project is missing or its path is unavailable, explain and ask how to proceed.
- Each workspace folder can be a separate repository with its own instructions and Git state. Do not assume the workspace creates a shared Git root or makes one folder's instructions apply to all others.
- Preserve project-local instructions and tool permissions. Routing guidance does not override them.
- Do not store credentials, confidential material, or raw session transcripts here.- Keep the directory useful to people reading Markdown directly; do not require a particular agent or runtime to understand it.
