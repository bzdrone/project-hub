# Projects

Start here to choose where to work. A project can span several directories or repositories, tied together by a VS Code workspace stored in this hub.

`Workspace` paths are relative to this repository. The workspace's `folders` array is the source of truth for directory membership; folder paths resolve relative to the `.code-workspace` file. `Primary folder` names a workspace folder for default CLI sessions. `Start here` is relative to that primary folder.

Private projects are listed in `local/PROJECTS.md` when that private layer exists; see [AGENTS.md](AGENTS.md).

## project-hub

- Purpose: The shared starting point for discovering projects and routing work.
- Workspace: [workspaces/project-hub.code-workspace](workspaces/project-hub.code-workspace)
- Primary folder: project-hub
- Start here: AGENTS.md
- Use when: Adding or updating project routes, improving discovery, or changing how participants enter projects.

## arcade-shooter

- Purpose: A TypeScript-first MakeCode Arcade shooter and learning path for gameplay concepts that transfer to FPS modding.
- Aliases: arcade
- Workspace: [workspaces/arcade-shooter.code-workspace](workspaces/arcade-shooter.code-workspace)
- Primary folder: arcade-shooter
- Start here: AGENTS.md
- Use when: Developing the shooter example, its Blocks-friendly customization API, or modding lessons.

---

## Adding a project

Copy this format above the separator:

```markdown
## project-id

- Purpose: What this project owns.
- Workspace: workspaces/project-id.code-workspace
- Primary folder: folder-name
- Start here: AGENTS.md
- Use when: Requests or goals that should route here.
```

Create the corresponding workspace following [workspaces/README.md](workspaces/README.md). Give each workspace folder a unique explicit `name`, and select one as the primary folder. Do not duplicate its directory paths here.

Optional fields: `Aliases` for alternate names and `Related projects` for shared knowledge or skill projects.

Decide whether an entry is public before adding it. Public entries go here; private entries and their workspaces go in `local/`. A directory does not become a registered project merely because it exists. Add projects only when explicitly requested, and register only existing projects with real destinations. Knowledge and skill repositories can be added using the same format.
