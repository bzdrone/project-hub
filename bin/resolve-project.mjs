// Resolve a hub project to the directories in its workspace.
//
// Usage: node resolve-project.mjs <hub-root> <project-id-or-alias>
//
// Looks the project up in PROJECTS.md and, when present, local/PROJECTS.md.
// Prints absolute folder paths, one per line: the primary folder first, then
// the other workspace folders. Exits non-zero with a message on stderr if the
// project is unknown or ambiguous, or if any folder is missing.

import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const [hubRoot, query] = process.argv.slice(2);
if (!hubRoot || !query) fail('usage: resolve-project.mjs <hub-root> <project>');

const registries = [
  { file: join(hubRoot, 'PROJECTS.md'), base: hubRoot },
  { file: join(hubRoot, 'local', 'PROJECTS.md'), base: join(hubRoot, 'local') },
];

const projects = registries
  .filter((r) => existsSync(r.file))
  .flatMap((r) => parseRegistry(readFileSync(r.file, 'utf8'), r.base));

const wanted = query.toLowerCase();
const matches = projects.filter(
  (p) => p.id.toLowerCase() === wanted || p.aliases.includes(wanted),
);

if (matches.length === 0) {
  fail(`unknown project "${query}". Known: ${projects.map((p) => p.id).join(', ')}`);
}
if (matches.length > 1) {
  fail(`"${query}" matches several projects: ${matches.map((p) => p.id).join(', ')}`);
}

const project = matches[0];
if (!project.primary) fail(`${project.id} has no Primary folder`);
if (!existsSync(project.workspace)) fail(`workspace not found: ${project.workspace}`);

const workspace = parseJsonc(readFileSync(project.workspace, 'utf8'));
const workspaceDir = dirname(project.workspace);
const folders = (workspace.folders ?? []).map((f) => ({
  name: f.name,
  path: resolve(workspaceDir, f.path),
}));

const missing = folders.filter((f) => !isDirectory(f.path));
if (missing.length) {
  fail(`missing workspace folders for ${project.id}:\n${missing.map((f) => `  ${f.name}: ${f.path}`).join('\n')}`);
}

const primary = folders.filter((f) => f.name === project.primary);
if (primary.length !== 1) {
  fail(`primary folder "${project.primary}" is ${primary.length ? 'ambiguous' : 'not'} in ${project.workspace}`);
}

const ordered = [primary[0], ...folders.filter((f) => f !== primary[0])];
for (const f of ordered) console.log(f.path.replace(/\\/g, '/'));

// --- helpers ---------------------------------------------------------------

// Split a PROJECTS.md into "## id" sections and read their "- Key: value"
// fields. Sections without a Workspace field are not routable and are skipped.
function parseRegistry(text, base) {
  const body = text.split(/^---\s*$/m)[0];
  return body
    .split(/^## /m)
    .slice(1)
    .map((section) => {
      const [heading, ...lines] = section.split(/\r?\n/);
      const fields = {};
      for (const line of lines) {
        const m = line.match(/^[-*]\s+([^:]+):\s*(.*)$/);
        if (m) fields[m[1].trim().toLowerCase()] = m[2].trim();
      }
      if (!fields.workspace) return null;
      const link = fields.workspace.match(/\]\(([^)]+)\)/);
      return {
        id: heading.trim(),
        aliases: (fields.aliases ?? '')
          .split(',')
          .map((a) => a.trim().toLowerCase())
          .filter(Boolean),
        workspace: resolve(base, link ? link[1] : fields.workspace),
        primary: fields['primary folder'],
      };
    })
    .filter(Boolean);
}

// JSON with comments and trailing commas, as VS Code workspace files allow.
function parseJsonc(text) {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      let j = i + 1;
      while (j < text.length && text[j] !== '"') j += text[j] === '\\' ? 2 : 1;
      out += text.slice(i, j + 1);
      i = j;
    } else if (c === '/' && text[i + 1] === '/') {
      while (i < text.length && text[i] !== '\n') i++;
      out += '\n';
    } else if (c === '/' && text[i + 1] === '*') {
      i = text.indexOf('*/', i + 2);
      if (i === -1) break;
      i++;
    } else {
      out += c;
    }
  }
  return JSON.parse(out.replace(/,(\s*[}\]])/g, '$1'));
}

function isDirectory(path) {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function fail(message) {
  console.error(`hub: ${message}`);
  process.exit(1);
}
