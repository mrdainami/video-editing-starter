// Make styles/<name>/preview.jpg: one labelled grid with a still of every graphic in a style.
// Run: npm run style-preview -- <style-name>
// Uses the style's own talking clip (graphics/assets/talk.mp4) as the background when it has one.
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync, rmSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const name = process.argv[2];
if (!name) { console.error('Usage: npm run style-preview -- <style-name>'); process.exit(1); }
const g = join(root, 'styles', name, 'graphics');
if (!existsSync(join(g, 'compositions'))) { console.error(`No graphics found in styles/${name}/graphics/compositions`); process.exit(1); }

// every graphic once (skip numbered copies like vibe-iris-2), with its length from the comment in its file
const items = readdirSync(join(g, 'compositions')).filter((f) => f.endsWith('.html') && !/-\d+\.html$/.test(f)).sort().map((f) => {
  const html = readFileSync(join(g, 'compositions', f), 'utf8');
  const id = (html.match(/data-composition-id="([^"]+)"/) || [])[1] || f.replace('.html', '');
  const len = Number((html.match(/Length ~?([\d.]+)\s*s/i) || [])[1]) || 4;
  const behind = /BEHIND ME/i.test(html), takeover = /TAKEOVER|TRANSITION/i.test(html);
  return { id, label: id.replace(new RegExp(`^${name}-`), ''), len, z: behind ? 2 : takeover ? 5 : 4 };
});

const work = mkdtempSync(join(tmpdir(), `style-preview-${name}-`));
for (const p of ['compositions', 'assets', 'hyperframes.json']) if (existsSync(join(g, p))) cpSync(join(g, p), join(work, p), { recursive: true });
writeFileSync(join(work, 'meta.json'), JSON.stringify({ id: `${name}-preview`, name: `${name}-preview` }));
let t = 0; const shots = []; const hosts = [];
for (const it of items) {
  hosts.push(`<div id="${it.id}-h" class="clip" style="z-index:${it.z}" data-composition-id="${it.id}" data-composition-src="compositions/${it.id}.html" data-start="${t}" data-duration="${it.len}" data-track-index="2" data-width="1920" data-height="1080"></div>`);
  shots.push(+(t + it.len * 0.62).toFixed(2)); t = +(t + it.len + 0.2).toFixed(2);
}
const talk = existsSync(join(g, 'assets/talk.mp4')), cut = existsSync(join(g, 'assets/talk-cutout.webm'));
writeFileSync(join(work, 'index.html'), `<!doctype html><html><head><meta charset="UTF-8"><script src="assets/gsap.min.js"></script>
<style>*{margin:0;padding:0}html,body{width:1920px;height:1080px;overflow:hidden;background:#f2f2f0}.clip{position:absolute;inset:0;width:1920px;height:1080px}.vid{object-fit:cover}</style></head>
<body><div id="main" data-composition-id="main" data-start="0" data-duration="${t}" data-width="1920" data-height="1080">
${talk ? `<video id="bgv" class="clip vid" style="z-index:1" src="assets/talk.mp4" data-start="0" data-duration="${t}" data-media-start="0" muted playsinline></video>` : ''}
${cut ? `<video id="bgc" class="clip vid" style="z-index:3" src="assets/talk-cutout.webm" data-start="0" data-duration="${t}" data-media-start="0" muted playsinline></video>` : ''}
${hosts.join('\n')}</div><script>window.__timelines=window.__timelines||{};window.__timelines["main"]=gsap.timeline({paused:true});</script></body></html>`);

console.log(`Taking ${items.length} stills…`);
execFileSync('npx', ['hyperframes', 'snapshot', '--at', shots.join(','), '--no-end', '--describe', 'false'], { cwd: work, stdio: 'ignore', shell: process.platform === 'win32' });
const dirs = [join(work, 'snapshots'), ...(existsSync(join(work, '.hyperframes/artifacts/snapshots')) ? readdirSync(join(work, '.hyperframes/artifacts/snapshots')).map((d) => join(work, '.hyperframes/artifacts/snapshots', d)) : [])]
  .filter((d) => existsSync(d)).sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs);
const frames = dirs.length ? readdirSync(dirs[0]).filter((f) => /^frame-.*\.png$/.test(f)).sort().map((f) => join(dirs[0], f)) : [];
if (frames.length !== items.length) { console.error(`Expected ${items.length} stills, got ${frames.length}. Project left at ${work}`); process.exit(1); }

// lay the stills out as a labelled grid on a page, and let HyperFrames photograph it (no ffmpeg filters needed)
const sheet = join(work, 'sheet'); mkdirSync(join(sheet, 'assets'), { recursive: true });
frames.forEach((f, i) => cpSync(f, join(sheet, 'assets', `s${i}.png`)));
const cols = 4, tw = 480, th = 270, lab = 34, pad = 14, head = 96;
const rows = Math.ceil(frames.length / cols);
const W = cols * tw + (cols + 1) * pad, H = head + rows * (th + lab) + (rows + 1) * pad;
const tiles = items.map((it, i) => {
  const x = pad + (i % cols) * (tw + pad), y = head + pad + Math.floor(i / cols) * (th + lab + pad);
  return `<div style="position:absolute;left:${x}px;top:${y}px;width:${tw}px"><img src="assets/s${i}.png" style="display:block;width:${tw}px;height:${th}px"><div style="height:${lab}px;background:#fff;font:700 20px/34px Arial,Helvetica,sans-serif;color:#111;padding-left:10px">${String(i + 1).padStart(2, '0')}&nbsp;&nbsp;${it.label}</div></div>`;
}).join('');
writeFileSync(join(sheet, 'meta.json'), JSON.stringify({ id: 'sheet', name: 'sheet' }));
writeFileSync(join(sheet, 'index.html'), `<!doctype html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0}html,body{width:${W}px;height:${H}px;overflow:hidden;background:#f2f2f0}</style></head><body>
<div id="main" data-composition-id="main" data-start="0" data-duration="1" data-width="${W}" data-height="${H}" style="position:relative;width:${W}px;height:${H}px">
<div style="position:absolute;left:${pad + 6}px;top:22px;font:900 52px/1 Arial,Helvetica,sans-serif;color:#111">${name}</div>
<div style="position:absolute;left:${pad + 40 + name.length * 32}px;top:40px;font:400 22px Arial,Helvetica,sans-serif;color:#666">${items.length} graphics</div>
${tiles}</div><script>window.__timelines={main:{pause(){},seek(){},time(){return 0},duration(){return 1}}}</script></body></html>`);
execFileSync('npx', ['hyperframes', 'snapshot', '--at', '0.1', '--no-end', '--describe', 'false'], { cwd: sheet, stdio: 'ignore', shell: process.platform === 'win32' });
const sdirs = [join(sheet, 'snapshots'), ...(existsSync(join(sheet, '.hyperframes/artifacts/snapshots')) ? readdirSync(join(sheet, '.hyperframes/artifacts/snapshots')).map((d) => join(sheet, '.hyperframes/artifacts/snapshots', d)) : [])].filter((d) => existsSync(d));
const shot = sdirs.flatMap((d) => readdirSync(d).filter((f) => /^frame-.*\.png$/.test(f)).map((f) => join(d, f)))[0];
if (!shot) { console.error(`Could not photograph the grid. Project left at ${work}`); process.exit(1); }
const out = join(root, 'styles', name, 'preview.jpg');
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', shot, '-q:v', '3', out]);
rmSync(work, { recursive: true, force: true });
console.log(`Saved styles/${name}/preview.jpg (${items.length} graphics)`);
