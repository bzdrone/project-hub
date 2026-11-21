# Project workspaces

Store one `<project-id>.code-workspace` file here per public project. Workspaces for private projects go in `local/workspaces/`, where sibling directories are one level further up (`../../../directory-name`).

## Template

```json
{
  "folders": [
    { "name": "folder-name", "path": "../../directory-name" }
  ]
}
```

Add a folder entry for each directory in the project. In PROJECTS.md, set `Primary folder` to one of those folder names for default CLI startup.

## Conventions

- Resolve folder paths relative to the workspace file: `..` refers to this hub; `../../directory-name` refers to a sibling under Source.
- Use forward slashes and relative paths, not `~` or user-specific absolute paths.
- Give each folder a unique explicit `name`.
- Include only directories the project needs. Each can have its own instructions and Git repository.
- Keep workspaces declarative: folders and reviewed, portable editor settings. Do not add automatic tasks, executable hooks, credentials, or machine-specific settings by default.
- A public workspace may list only directories that are themselves public and may contain no settings or references that reveal private projects, paths, or preferences. Check this when moving a workspace out of `local/`.
- Workspace membership does not grant permissions or make one folder's instructions apply to the others.
- Open with VS Code's **File > Open Workspace from File**. Opening a workspace does not launch agents or change an existing CLI session's working directory.
