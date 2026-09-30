#!/usr/bin/env node
// Offline render of the Signal Backdrop loop to the resume site's media folder.
//
// Drives the dev server's `?capture` stage (window.renderAt) frame by frame in
// headless Chromium and pipes PNG frames into ffmpeg. Deterministic: every
// frame is drawn at an exact time, independent of real-time playback.
//
// Needs playwright-core somewhere on disk (not a project dependency):
//   mkdir -p /tmp/render && (cd /tmp/render && npm i playwright-core)
//
// Usage (dev server running):
//   node scripts/render-backdrop.mjs video 1920 1080 ../resume/public/media/signal-backdrop
//   node scripts/render-backdrop.mjs video 720 1280 ../resume/public/media/signal-backdrop-portrait
//   node scripts/render-backdrop.mjs stills 1280 720 /tmp/stills 0,12,24,36,48
//
// Env: PW_DIR (playwright-core install dir, default /tmp/render), CHROMIUM,
//      BASE_URL (default http://localhost:80/signal-backdrop/), FPS (24),
//      CRF_MP4 (26), CRF_WEBM (40).

import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';

const require = createRequire(resolve(process.env.PW_DIR ?? '/tmp/render', 'noop.js'));
const { chromium } = require('playwright-core');

const [mode, wArg, hArg, outArg, timesArg] = process.argv.slice(2);
const W = Number(wArg);
const H = Number(hArg);
if (!['video', 'stills'].includes(mode) || !W || !H || !outArg) {
  console.error('usage: render-backdrop.mjs <video|stills> <w> <h> <out> [times]');
  process.exit(1);
}
const OUT = resolve(outArg);
const LOOP = 60;
const FPS = Number(process.env.FPS ?? 24);
const BASE = process.env.BASE_URL ?? 'http://localhost:80/signal-backdrop/';

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/repl/tools/bin/chromium',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.goto(`${BASE}?capture&w=${W}&h=${H}`);
await page.waitForFunction(() => window.__captureReady === true, null, { timeout: 30000 });

const frame = async (t) => {
  const url = await page.evaluate((tt) => window.renderAt(tt), t);
  return Buffer.from(url.slice(url.indexOf(',') + 1), 'base64');
};

function run(cmd, args, stdin) {
  return new Promise((ok, fail) => {
    const p = spawn(cmd, args, { stdio: [stdin ? 'pipe' : 'ignore', 'ignore', 'pipe'] });
    let err = '';
    p.stderr.on('data', (d) => (err += d));
    p.on('close', (code) => (code === 0 ? ok() : fail(new Error(`${cmd} exited ${code}\n${err.slice(-2000)}`))));
    if (stdin) stdin(p.stdin);
  });
}

try {
  if (mode === 'stills') {
    mkdirSync(OUT, { recursive: true });
    for (const t of (timesArg ?? '0,12,24,36,48').split(',').map(Number)) {
      writeFileSync(`${OUT}/t${String(t).padStart(2, '0')}.png`, await frame(t));
    }
    console.log(`stills -> ${OUT}`);
  } else {
    mkdirSync(dirname(OUT), { recursive: true });
    const total = LOOP * FPS;
    const tmpPoster = `${OUT}-poster.png`;
    writeFileSync(tmpPoster, await frame(0));

    // One decode, two encodes: H.264 (faststart) and VP9.
    const ffArgs = [
      '-y', '-f', 'image2pipe', '-c:v', 'png', '-framerate', String(FPS), '-i', '-',
      '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', process.env.CRF_MP4 ?? '26',
      '-pix_fmt', 'yuv420p', '-tune', 'grain', '-movflags', '+faststart', `${OUT}.mp4`,
      '-an', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', process.env.CRF_WEBM ?? '40',
      '-row-mt', '1', '-cpu-used', '2', '-pix_fmt', 'yuv420p', `${OUT}.webm`,
    ];
    await run('ffmpeg', ffArgs, async (stdin) => {
      for (let i = 0; i < total; i++) {
        const buf = await frame(i / FPS);
        if (!stdin.write(buf)) await new Promise((r) => stdin.once('drain', r));
        if (i % (FPS * 5) === 0) console.log(`frame ${i}/${total}`);
      }
      stdin.end();
    });
    await run('ffmpeg', ['-y', '-i', tmpPoster, '-q:v', '4', `${OUT}-poster.jpg`]);
    await run('rm', ['-f', tmpPoster]);
    console.log(`video -> ${OUT}.{mp4,webm} + poster`);
  }
} finally {
  await browser.close();
}
