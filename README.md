# Project Hub

A Markdown-first starting point for humans and agents to discover projects and route work.

Start here, say what you want to work on, and follow the directory to the right project. Knowledge, skills, and task state live in the projects that own them—not in this hub.

## Start

```sh
cd ~/Source/project-hub
pi
```

To open a workspace in VS Code, find its `Workspace` link in [PROJECTS.md](PROJECTS.md) or, when present, `local/PROJECTS.md`, then open that file. The hub's own workspace is maintained in the local layer.

Humans can start with [PROJECTS.md](PROJECTS.md); agents start with [AGENTS.md](AGENTS.md).

## Files

- [PROJECTS.md](PROJECTS.md): the main artifact—a directory of projects, purposes, and entry points.
- [AGENTS.md](AGENTS.md): how to match a request to a project and hand off work.
- [workspaces/](workspaces/README.md): versioned VS Code workspaces that tie each project's directories together.
- `CLAUDE.md` and `.github/copilot-instructions.md`: thin entry points to the same routing instructions.
- [bin/hub](bin/hub): optional launcher that starts Claude Code in a project with its workspace folders.

Pi and Codex can use `AGENTS.md`; Claude Code and VS Code Copilot have dedicated pointers. Automatic discovery depends on the client's instruction-loading rules; the same files can also be read directly.

## Add a project

Create `workspaces/<project-id>.code-workspace` listing the project's directories, then add an entry in PROJECTS.md with its purpose, workspace, primary folder, and entry instructions. See the [workspace template and conventions](workspaces/README.md).

A project is a logical collection of directories, not necessarily a single repository. Knowledge and skill repositories can be workspace members or projects of their own. Keep directory membership in the workspace file rather than duplicating paths in the registry.

Use relative folder paths for portability. On another machine, clone the directories in the same relative layout or update the workspace.

## Scope

Routing is conversational. This is not a dashboard, central knowledge store, or task database. Choosing a destination does not change a running tool's working directory: an agent can work on the project from the hub using full paths, or you can start a fresh session in the destination so its local instructions load automatically.

## Launch Claude Code in a project

`bin/hub` starts Claude Code with exactly a project's directories, read from its workspace file. It needs Bash and Node.js.

```sh
bin/hub                  # start in the hub to choose a project
bin/hub arcade-shooter   # start in the primary folder, --add-dir the others and the hub
```

The project can be named by id or alias, from `PROJECTS.md` or `local/PROJECTS.md`. Extra arguments are passed to `claude`.

A session started in a project loads that project's instructions, not the hub's. So the launcher appends hub context to the system prompt: where the hub and its project lists are, plus `local/AGENTS.md` when it exists, because those personal rules apply to every project worked on from the hub. The hub's routing instructions are left out, because routing is already done. The hub is added as a directory only so its project lists can be read; it is not added to project workspaces. To call it from anywhere, add a shell function such as `hub() { ~/Source/project-hub/bin/hub "$@"; }`.

## Public and local layers

This repository holds the routing method and shareable project entries. Private projects and personal working rules go in an optional `local/` folder that is its own private repository, ignored by this one. Agents read `local/AGENTS.md` and `local/PROJECTS.md` when they exist. To make a private project public, move its entry and workspace file out of `local/`.

Never include credentials, confidential material, or session transcripts in either layer.

## License

[MIT](LICENSE) — Copyright (c) 2026 bzdrone.
