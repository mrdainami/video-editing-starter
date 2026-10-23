// Connect Borumi and KIE to your agent. Run: npm run connect
// Setup runs it twice: once for Borumi, and again at the end once the KIE key is in .env.
// Running it again is safe: it updates the same entries.
// Writes the connection into THIS folder for Claude Code, Codex and Cursor, so it works in
// whichever one you open here, and nothing outside this folder changes.
//   .mcp.json + .claude/settings.local.json → Claude Code (pre-approved, no popup)
//   .codex/config.toml                      → Codex (say yes when it asks to trust the folder)
//   .cursor/mcp.json                        → Cursor
// Your KIE key stays in .env. The launcher reads it from there; it is never copied anywhere.
// If Borumi isn't found: npm run connect -- --borumi-path "<Command from Borumi → Settings → AI → Setup instructions → Other AI apps>"
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { at, read, ensureEnv, kieKey, kieSkipped, findBorumi } from './lib/tools.mjs';

const argv = process.argv.slice(2);
const flag = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined; };

ensureEnv();
const servers = {};
const notes = [];

const given = flag('--borumi-path');
const borumi = findBorumi(given);
if (given && borumi === given && !/^BORUMI_PATH=/m.test(read(at('.env')))) {
  // Remember a custom Borumi location so npm run check finds it too.
  writeFileSync(at('.env'), read(at('.env')).replace(/\n*$/, '\n') + `BORUMI_PATH=${given}\n`);
}
if (borumi) {
  servers.borumi = { command: borumi, args: ['mcp'] };
} else {
  notes.push('Borumi: not added. Borumi app not found. Install it from https://borumi.com/?atp=dainami , or copy the Command from Borumi → Settings → AI → Setup instructions → Other AI apps and run:\n  npm run connect -- --borumi-path "<that command>"');
}

if (kieKey()) {
  servers.kie = { command: process.execPath, args: [at('_system/scripts/start-kie.mjs')] };
} else if (kieSkipped()) {
  notes.push('KIE: skipped (KIE_SETUP=skipped in .env). Remove that line and add your key to connect it later.');
} else {
  notes.push('KIE: not added yet (it is the last setup step). After the key is in .env, run npm run connect again.');
}

const names = Object.keys(servers);
if (!names.length) {
  console.log('\nNothing to connect yet.\n');
  notes.forEach((n) => console.log(n + '\n'));
  process.exit(1);
}

const writeJson = (p, data) => { mkdirSync(dirname(at(p)), { recursive: true }); writeFileSync(at(p), JSON.stringify(data, null, 2) + '\n'); };
const loadJson = (p) => { try { return JSON.parse(read(at(p))); } catch { return {}; } };

// Claude Code: project servers + pre-approval so there is no "approve these servers?" popup.
const mcp = loadJson('.mcp.json');
mcp.mcpServers = { ...(mcp.mcpServers || {}), ...servers };
writeJson('.mcp.json', mcp);
const local = loadJson('.claude/settings.local.json');
local.enabledMcpjsonServers = [...new Set([...(local.enabledMcpjsonServers || []), ...names])];
writeJson('.claude/settings.local.json', local);

// Cursor: project servers.
const cursor = loadJson('.cursor/mcp.json');
cursor.mcpServers = { ...(cursor.mcpServers || {}), ...servers };
writeJson('.cursor/mcp.json', cursor);

// Codex: a managed block in the project config. Anything else in the file is kept.
const START = '# >>> video-editing-starter (npm run connect) >>>';
const END = '# <<< video-editing-starter <<<';
const toml = (s) => JSON.stringify(s); // TOML basic strings use the same escapes as JSON
const block = [START, ...names.flatMap((n) => [
  `[mcp_servers.${n}]`,
  `command = ${toml(servers[n].command)}`,
  `args = [${servers[n].args.map(toml).join(', ')}]`,
  'startup_timeout_sec = 20',
  '',
]), END].join('\n');
let codex = read(at('.codex/config.toml'));
const re = new RegExp(`${START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
codex = re.test(codex) ? codex.replace(re, block) : (codex.trim() ? codex.trimEnd() + '\n\n' : '') + block;
mkdirSync(at('.codex'), { recursive: true });
writeFileSync(at('.codex/config.toml'), codex + '\n');

console.log(`\nConnected in this folder: ${names.join(' + ')}`);
console.log('  Claude Code → .mcp.json (pre-approved)');
console.log('  Codex       → .codex/config.toml (say yes if Codex asks to trust this folder)');
console.log('  Cursor      → .cursor/mcp.json (turn them on in Cursor Settings → MCP if they show as off)');
notes.forEach((n) => console.log('\n' + n));
console.log('\nNEXT: Close your agent and open it again in this folder (or start a new chat here), then type /setup.');
console.log('      New connections only load when the agent starts.\n');
