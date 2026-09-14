import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let missing = 0;
function check(label, ready) {
  console.log(`${ready ? 'READY' : 'MISSING'}: ${label}`);
  if (!ready) missing++;
}
check('Node.js 22+', Number(process.versions.node.split('.')[0]) >= 22);
for (const file of ['AGENTS.md', 'skills/setup-workspace/SKILL.md', 'skills/setup-brand/SKILL.md', 'skills/video-project-init/SKILL.md', 'skills/yt-first-cut/SKILL.md', 'skills/storyboard-method/SKILL.md', 'templates/video/BRIEF.md', 'tools/kie-mcp/dist/index.js']) check(file, existsSync(resolve(root, file)));
check('HyperFrames installed (run npm ci)', existsSync(resolve(root, 'node_modules/hyperframes/package.json')));
console.log('Borumi project access, HyperFrames rendering and optional KIE authentication are verified separately during setup.');
process.exitCode = missing ? 1 : 0;
