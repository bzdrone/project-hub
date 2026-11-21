# Project workspaces

Store one `<project-id>.code-workspace` file here per registered project.

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
- Workspace membership does not grant permissions or make one folder's instructions apply to the others.
- Open with VS Code's **File > Open Workspace from File**. Opening a workspace does not launch agents or change an existing CLI session's working directory.
