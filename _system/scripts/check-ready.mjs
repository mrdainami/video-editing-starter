// Setup checklist. Run: npm run check
// Prints every step as done / to do / optional, then the ONE next step and exactly what to do.
// It tests Borumi and KIE for real (Borumi lists your open projects, KIE shows your balance),
// so ✅ means it works, not just that something is installed.
// /setup runs this, does the next step with the user, and runs it again until nothing is left.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  at, home, os, read, ensureEnv, kieKey, kieSkipped, findBorumi, hasCommand,
  probeBorumi, probeKie, connectedAgents,
} from './lib/tools.mjs';

ensureEnv();
const skillNames = ['setup', 'brand', 'new-video', 'first-cut', 'styles', 'new-style', 'add-graphics', 'add-music', 'b-roll'];
const commandsCurrent = (dir) => skillNames.every((n) => read(join(dir, n, 'SKILL.md')) && read(join(dir, n, 'SKILL.md')) === read(at(`skills/${n}/SKILL.md`)));
const hfBin = at(os === 'win32' ? 'node_modules/.bin/hyperframes.cmd' : 'node_modules/.bin/hyperframes');
const hfInstalled = existsSync(at('node_modules/hyperframes/package.json'));

// FFmpeg: HyperFrames needs it to render. Look on PATH and in the usual Homebrew places.
const ffmpeg = hasCommand('ffmpeg') || ['/opt/homebrew/bin/ffmpeg', '/usr/local/bin/ffmpeg'].some((p) => existsSync(p));
const brew = hasCommand('brew', ['--version']) || existsSync('/opt/homebrew/bin/brew') || existsSync('/usr/local/bin/brew');
const ffmpegFix = os === 'darwin'
  ? (brew
    ? 'Agent runs: brew install ffmpeg'
    : 'Homebrew is needed first (it installs FFmpeg). You run this in the Terminal app, it asks for your Mac password:\n      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n      Say "done" when it finishes. Then the agent runs: brew install ffmpeg')
  : os === 'win32'
    ? 'Agent runs: winget install --id Gyan.FFmpeg -e   (then restart the agent so it can see FFmpeg)'
    : 'You run: sudo apt install ffmpeg   (or your system\'s package manager)';

// Chrome for rendering: HyperFrames downloads its own copy.
const chrome = hfInstalled && spawnSync(hfBin, ['browser', 'path'], { stdio: 'ignore', timeout: 30000, shell: os === 'win32' }).status === 0;

const hfSkills = [at('.claude/skills/hyperframes'), at('.agents/skills/hyperframes'), join(home, '.claude/skills/hyperframes'), join(home, '.agents/skills/hyperframes'), join(home, '.codex/skills/hyperframes')].some((p) => existsSync(p));
const sounds = ['pop', 'whoosh', 'whoosh-short', 'click-soft', 'impact-bass-1'].every((s) => existsSync(at(`styles/vibe/graphics/assets/vibe/sfx/${s}.wav`)));

const borumiPath = findBorumi();
const borumiLive = borumiPath ? await probeBorumi(borumiPath) : { ok: false };
const key = kieKey();
const skipped = kieSkipped();
const kieLive = key ? await probeKie(key) : { ok: false };

const agents = connectedAgents();
const borumiConnected = Object.values(agents).every((a) => a.borumi);
const kieConnected = Object.values(agents).every((a) => a.kie);
const brandDone = /status:\s*configured/.test(read(at('brand/BRAND.md')));

const steps = [
  { name: 'Node.js 22 or newer', done: Number(process.versions.node.split('.')[0]) >= 22,
    fix: 'You install Node.js (the LTS version) from https://nodejs.org/en/download , then close and reopen your agent in this folder.' },
  { name: '/ commands for your agent', done: commandsCurrent(at('.claude/skills')) || commandsCurrent(at('.agents/skills')),
    fix: 'Agent runs: npm run commands' },
  { name: 'HyperFrames program (makes the graphics)', done: hfInstalled,
    fix: 'Agent runs: npm ci' },
  { name: 'FFmpeg (HyperFrames needs it to render video)', done: ffmpeg, fix: ffmpegFix },
  { name: 'Chrome for rendering (HyperFrames downloads its own)', done: chrome,
    fix: 'Agent runs: npx hyperframes browser ensure' },
  { name: 'HyperFrames skills (teach your agent HyperFrames)', done: hfSkills,
    fix: "Agent runs: npx -y skills add heygen-com/hyperframes --skill '*' -a claude-code -a codex -a cursor -y --copy" },
  { name: 'Sounds for the vibe style', done: sounds,
    fix: 'Agent runs: sh styles/vibe/graphics/get-sounds.sh' },
  { name: 'Borumi app installed', done: !!borumiPath,
    fix: 'You install Borumi from https://borumi.com/?atp=dainami (the agent opens the website: click Download), install it, open it once and sign in. Say "done".' },
  { name: 'Borumi MCP turned on (Borumi open and answering)', done: borumiLive.ok,
    fix: 'In Borumi: Settings → AI → turn on "Enable MCP". Keep Borumi open. Say "done".' },
  { name: 'Borumi connected to your agent', done: borumiConnected,
    fix: 'Agent runs: npm run connect   (then you close and reopen the agent in this folder, and it checks Borumi from the chat)' },
  // KIE is last and optional to start with: B-roll, music and sound effects. Say "skip KIE" to leave it for later.
  { name: 'KIE key in .env (last step: B-roll, music, sound effects)', done: !!key, skipped,
    fix: 'Ask first: set up KIE now, or skip? To set up: make an account at https://kie.ai?ref=41abfa41934c4f15a97d88d2d4f8162a , copy a key from https://kie.ai/api-key . The agent opens .env for you: paste the key right after KIE_API_KEY= , save, say "done".' },
  { name: 'KIE key works', done: kieLive.ok, skipped,
    fix: `KIE did not accept the key${kieLive.error && !/unauthori|authenticat/i.test(kieLive.error) ? ` (${kieLive.error})` : ''}. Copy it again from https://kie.ai/api-key , paste it after KIE_API_KEY= in .env with no spaces, save, say "done".` },
  { name: 'KIE connected to your agent', done: kieConnected, skipped,
    fix: 'Agent runs: npm run connect   (then you close and reopen the agent in this folder, and it checks KIE from the chat)' },
  { name: 'Your brand (optional: logo, colours, fonts, tone)', optional: true, done: brandDone,
    fix: 'Type /brand' },
];

console.log('\nSetup checklist\n');
steps.forEach((s, i) => {
  const mark = s.skipped ? '⏭️ ' : s.done ? '✅' : s.optional ? '⭕' : '❌';
  const extra = s.skipped ? '  (skipped)' : '';
  console.log(`${mark} ${i + 1}. ${s.name}${extra}`);
});
if (borumiLive.ok && borumiLive.openProjects !== null) console.log(`\n   Borumi answered: ${borumiLive.openProjects} project(s) open.`);
if (kieLive.ok) console.log(`   KIE answered: balance ${kieLive.credits} credits.${Number(kieLive.credits) <= 0 ? ' Add credits on kie.ai before generating anything.' : ''}`);

const next = steps.find((s) => !s.done && !s.optional && !s.skipped);
console.log('');
if (next) {
  console.log(`NEXT: ${next.name}\n      ${next.fix}`);
} else {
  console.log('All required steps are done.');
  console.log(`Last check: the agent confirms it can see the Borumi${skipped ? '' : ' and KIE'} tools in this chat (after a restart).`);
  const opt = steps.filter((s) => s.optional && !s.done);
  if (opt.length) console.log(`Optional: ${opt.map((s) => `${s.name} → ${s.fix}`).join(' | ')}`);
}
console.log('');
process.exitCode = next ? 1 : 0;
