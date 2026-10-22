// Put every skill in skills/ into the / menu of the agents that read this folder.
// Run: npm run commands   (again after you edit or add a skill, then restart your agent)
//   .claude/skills/  → Claude Code
//   .agents/skills/  → Codex, Cursor and other agents that use the shared skills folder
// skills/ stays the one copy you edit. No internet needed.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const src = join(root, 'skills');
const names = readdirSync(src, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(src, d.name, 'SKILL.md')))
  .map((d) => d.name);

for (const target of ['.claude/skills', '.agents/skills']) {
  const dir = join(root, target);
  mkdirSync(dir, { recursive: true });
  for (const n of names) {
    rmSync(join(dir, n), { recursive: true, force: true });
    cpSync(join(src, n), join(dir, n), { recursive: true });
  }
  console.log(`${target}: ${names.map((n) => '/' + n).join(' ')}`);
}
console.log('\nDone. Restart your agent (or open a new chat) to see the / commands.');
