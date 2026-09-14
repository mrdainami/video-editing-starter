import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let key;
try {
  key = parseEnv(readFileSync(resolve(root, '.env'), 'utf8')).KIE_API_KEY?.trim();
} catch {
  console.error('Create .env from .env.example in the starter folder and enter your KIE_API_KEY.');
  process.exit(1);
}
if (!key) {
  console.error('Enter your own KIE_API_KEY in the starter folder’s .env file.');
  process.exit(1);
}
const child = spawn(process.execPath, [resolve(root, 'tools/kie-mcp/dist/index.js')], {
  cwd: root,
  env: { ...process.env, KIE_API_KEY: key, KIE_WORKSPACE_DIR: root },
  stdio: 'inherit',
});
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('error', () => { console.error('KIE connector could not start. Check Node.js and the connector files.'); process.exitCode = 1; });
child.on('exit', (code) => { process.exitCode = code ?? 1; });
