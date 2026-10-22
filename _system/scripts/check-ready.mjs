// Setup checklist. Run: npm run check
// Prints every setup step as done / to do / optional, then the ONE next step with its link or command.
// /setup runs this, fixes the next step with the user, and runs it again until everything required is done.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { homedir, platform } from 'node:os';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const at = (p) => resolve(root, p);
const home = homedir();
const read = (p) => { try { return readFileSync(p, 'utf8'); } catch { return ''; } };

const anyExists = (paths) => paths.some((p) => existsSync(p));
const skillNames = ['setup', 'brand', 'new-video', 'first-cut', 'styles', 'new-style', 'add-graphics', 'add-music', 'b-roll'];
const commandsCurrent = (dir) => skillNames.every((n) => read(join(dir, n, 'SKILL.md')) && read(join(dir, n, 'SKILL.md')) === read(at(`skills/${n}/SKILL.md`)));
const env = read(at('.env'));
const kieKey = /^KIE_API_KEY=\s*\S+/m.test(env);
const brandDone = /status:\s*configured/.test(read(at('brand/BRAND.md')));
const borumiApp = platform() === 'darwin' ? existsSync('/Applications/Borumi.app') || existsSync(join(home, 'Applications/Borumi.app')) : null;

const steps = [
  { name: 'Node.js 22 or newer', done: Number(process.versions.node.split('.')[0]) >= 22,
    fix: 'Install Node.js 22+ from https://nodejs.org/en/download , then reopen your agent in this folder.' },
  { name: '/ commands for your agent', done: commandsCurrent(at('.claude/skills')) || commandsCurrent(at('.agents/skills')),
    fix: 'Agent runs: npm run commands   (puts the skills in Claude Code, Codex and Cursor; then restart the agent)' },
  { name: 'Editing tools installed', done: existsSync(at('node_modules/hyperframes/package.json')),
    fix: 'Agent runs: npm ci' },
  { name: 'HyperFrames skills', done: anyExists([at('.claude/skills/hyperframes'), at('.agents/skills/hyperframes'), join(home, '.claude/skills/hyperframes'), join(home, '.agents/skills/hyperframes'), join(home, '.codex/skills/hyperframes')]),
    fix: 'Agent runs: npx skills add heygen-com/hyperframes   (https://github.com/heygen-com/hyperframes)' },
  { name: 'Sounds for the vibe style', done: ['pop', 'whoosh', 'whoosh-short', 'click-soft', 'impact-bass-1'].every((s) => existsSync(at(`styles/vibe/graphics/assets/vibe/sfx/${s}.wav`))),
    fix: 'Agent runs: sh styles/vibe/graphics/get-sounds.sh   (needs the HyperFrames skills first)' },
  { name: 'Borumi app', done: borumiApp, unknown: borumiApp === null,
    fix: 'Install Borumi from https://borumi.com/install/ , open it and your recording, and turn on MCP in its AI settings. Then the agent connects it (_system/setup/borumi.md) and lists your projects.' },
  { name: 'KIE (optional: generated B-roll, music, sound effects)', optional: true, done: kieKey,
    fix: 'Create an account at https://kie.ai?ref=41abfa41934c4f15a97d88d2d4f8162a , paste your key after KIE_API_KEY= in .env, then the agent connects it (_system/setup/kie.md).' },
  { name: 'Your brand (optional: logo, colours, fonts, tone)', optional: true, done: brandDone,
    fix: 'Type /brand' },
];

console.log('\nSetup checklist\n');
steps.forEach((s, i) => {
  const mark = s.done ? '✅' : s.unknown ? '❔' : s.optional ? '⭕' : '❌';
  console.log(`${mark} ${i + 1}. ${s.name}${s.unknown ? '  (agent checks this one)' : ''}`);
});
const next = steps.find((s) => !s.done && !s.optional && !s.unknown);
console.log('');
if (next) {
  console.log(`NEXT: ${next.name}\n      ${next.fix}`);
} else {
  const unknown = steps.filter((s) => s.unknown);
  if (unknown.length) console.log(`Required steps look done. The agent still checks: ${unknown.map((s) => s.name).join(', ')}.`);
  const opt = steps.filter((s) => s.optional && !s.done);
  console.log(opt.length ? `All required steps are done. Optional: ${opt.map((s) => `${s.name} → ${s.fix}`).join(' | ')}` : 'All set.');
  console.log('Borumi is confirmed only when the agent can list your Borumi projects.');
}
console.log('');
process.exitCode = next ? 1 : 0;
