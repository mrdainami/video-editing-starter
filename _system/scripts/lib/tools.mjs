// Shared helpers for setup: find Borumi, read the KIE key, and test both connections for real.
// Used by check-ready.mjs (npm run check) and connect.mjs (npm run connect). Never prints keys.
import { existsSync, readFileSync, copyFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { homedir, platform } from 'node:os';
import { fileURLToPath } from 'node:url';
import { parseEnv } from 'node:util';
import { spawn, spawnSync } from 'node:child_process';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
export const at = (p) => resolve(root, p);
export const home = homedir();
export const os = platform(); // 'darwin' | 'win32' | 'linux'
export const read = (p) => { try { return readFileSync(p, 'utf8'); } catch { return ''; } };

// .env: create it from .env.example if it is missing (GitHub source downloads have no .env).
export function ensureEnv() {
  if (!existsSync(at('.env')) && existsSync(at('.env.example'))) copyFileSync(at('.env.example'), at('.env'));
}
export function readEnv() {
  try { return parseEnv(read(at('.env'))); } catch { return {}; }
}
export const kieKey = () => (readEnv().KIE_API_KEY || '').trim();
export const kieSkipped = () => /^skip/i.test((readEnv().KIE_SETUP || '').trim());

// Borumi's own MCP program. Borumi shows the same path in Settings → AI → Setup instructions → Other AI apps.
export function findBorumi(override) {
  const candidates = [];
  if (override) candidates.push(override);
  if (process.env.BORUMI_PATH) candidates.push(process.env.BORUMI_PATH);
  if (readEnv().BORUMI_PATH) candidates.push(readEnv().BORUMI_PATH.trim());
  if (os === 'darwin') {
    candidates.push('/Applications/Borumi.app/Contents/MacOS/borumi', join(home, 'Applications/Borumi.app/Contents/MacOS/borumi'));
  } else if (os === 'win32') {
    const local = process.env.LOCALAPPDATA || join(home, 'AppData', 'Local');
    const pf = process.env.ProgramFiles || 'C:\\Program Files';
    for (const base of [join(local, 'Programs', 'Borumi'), join(local, 'Borumi'), join(pf, 'Borumi')]) {
      candidates.push(join(base, 'Borumi.exe'), join(base, 'borumi.exe'));
    }
  }
  return candidates.find((p) => existsSync(p)) || null;
}

export function hasCommand(cmd, args = ['-version']) {
  try { return spawnSync(cmd, args, { stdio: 'ignore', timeout: 15000 }).status === 0; } catch { return false; }
}

// Talk to an MCP program the same way an agent does: start it, say hello, call tools in order.
// Returns { ok, result?, error? }. The last call's text is the result.
export function probeMcp(command, args, calls, timeoutMs = 25000) {
  return new Promise((done) => {
    let p;
    try { p = spawn(command, args, { stdio: ['pipe', 'pipe', 'ignore'] }); } catch (e) { return done({ ok: false, error: e.message }); }
    let buf = '';
    let step = -1; // -1 = waiting for initialize
    const finish = (r) => { clearTimeout(timer); try { p.kill(); } catch {} done(r); };
    const timer = setTimeout(() => finish({ ok: false, error: 'no answer in time' }), timeoutMs);
    const send = (m) => p.stdin.write(JSON.stringify({ jsonrpc: '2.0', ...m }) + '\n');
    const next = () => {
      step += 1;
      if (step >= calls.length) return;
      send({ id: step + 2, method: 'tools/call', params: { name: calls[step].name, arguments: calls[step].args || {} } });
    };
    p.on('error', (e) => finish({ ok: false, error: e.message }));
    p.on('exit', () => finish({ ok: false, error: 'the program stopped' }));
    p.stdout.on('data', (d) => {
      buf += d;
      let i;
      while ((i = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, i); buf = buf.slice(i + 1);
        let m; try { m = JSON.parse(line); } catch { continue; }
        if (m.id === 1) {
          if (m.error) return finish({ ok: false, error: m.error.message });
          send({ method: 'notifications/initialized' });
          next();
        } else if (typeof m.id === 'number' && m.id === step + 2) {
          const text = (m.result?.content || []).map((c) => c.text).join('\n');
          if (m.error || m.result?.isError) return finish({ ok: false, error: m.error?.message || text });
          if (step === calls.length - 1) return finish({ ok: true, result: text });
          next();
        }
      }
    });
    send({ id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'starter-setup', version: '1' } } });
  });
}

// Borumi is "answering" when its MCP program can list the projects open in the app.
export async function probeBorumi(borumiPath) {
  if (!borumiPath) return { ok: false, error: 'Borumi app not found' };
  const r = await probeMcp(borumiPath, ['mcp'], [{ name: 'get_guides' }, { name: 'list_open_projects' }]);
  if (r.ok) {
    let count = null;
    try { count = JSON.parse(r.result).projects.length; } catch {}
    return { ok: true, openProjects: count };
  }
  return r;
}

// KIE key works when the free credit-balance endpoint accepts it. No generation, no cost.
export async function probeKie(key) {
  if (!key) return { ok: false, error: 'no key in .env' };
  try {
    const res = await fetch('https://api.kie.ai/api/v1/chat/credit', { headers: { Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(15000) });
    const body = await res.json().catch(() => ({}));
    if (body.code === 200) return { ok: true, credits: body.data };
    return { ok: false, error: body.msg || `KIE answered ${body.code ?? res.status}` };
  } catch (e) {
    return { ok: false, error: `could not reach KIE (${e.name === 'TimeoutError' ? 'timed out' : e.message})` };
  }
}

// Which agent settings in this folder already list Borumi and KIE.
export function connectedAgents() {
  const json = (p) => { try { return JSON.parse(read(at(p))); } catch { return {}; } };
  const claude = json('.mcp.json').mcpServers || {};
  const cursor = json('.cursor/mcp.json').mcpServers || {};
  const codex = read(at('.codex/config.toml'));
  return {
    claude: { borumi: !!claude.borumi, kie: !!claude.kie },
    codex: { borumi: /\[mcp_servers\.borumi\]/.test(codex), kie: /\[mcp_servers\.kie\]/.test(codex) },
    cursor: { borumi: !!cursor.borumi, kie: !!cursor.kie },
  };
}
