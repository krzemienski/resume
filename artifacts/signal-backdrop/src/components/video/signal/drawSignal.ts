// Pure renderer for the Signal Backdrop. Same (w, h, t) always gives the same
// frame, so the live preview and the offline video render match exactly.
// Every motion uses whole harmonics of 1 / LOOP_SECONDS, so t and t + 60 s are
// identical frames and the loop is seamless.

import {
  LOOP_SECONDS,
  RGB_TOKENS,
  RIPPLES,
  RIPPLE_SECONDS,
  envelopes,
  type Envelopes,
  type RGB,
} from './movements';

const TAU = Math.PI * 2;
const W = TAU / LOOP_SECONDS; // base angular frequency

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rgba = ([r, g, b]: RGB, a: number) => `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a)).toFixed(4)})`;
const mix = (a: RGB, b: RGB, k: number): RGB => [
  a[0] + (b[0] - a[0]) * k,
  a[1] + (b[1] - a[1]) * k,
  a[2] + (b[2] - a[2]) * k,
];
const smooth = (e0: number, e1: number, x: number) => {
  const k = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return k * k * (3 - 2 * k);
};
const easeInOut = (x: number) => 0.5 - 0.5 * Math.cos(Math.PI * x);

// ---------------------------------------------------------------- light fields

type EnvKey = keyof Pick<Envelopes, 'crimson' | 'violet' | 'red' | 'ember'>;
interface Field {
  color: RGB;
  env: EnvKey;
  bx: number;
  by: number;
  ax: number;
  ay: number;
  kx: number;
  ky: number;
  px: number;
  py: number;
  r: number;
  a: number;
}

const FIELDS: Field[] = [
  { color: RGB_TOKENS.primary, env: 'crimson', bx: 0.28, by: 0.3, ax: 0.12, ay: 0.1, kx: 1, ky: 1, px: 0.3, py: 1.9, r: 0.6, a: 0.4 },
  { color: RGB_TOKENS.primary, env: 'crimson', bx: 0.72, by: 0.72, ax: 0.1, ay: 0.12, kx: 1, ky: 2, px: 2.4, py: 0.7, r: 0.52, a: 0.3 },
  { color: RGB_TOKENS.accent, env: 'violet', bx: 0.8, by: 0.72, ax: 0.14, ay: 0.1, kx: 2, ky: 1, px: 4.1, py: 2.2, r: 0.55, a: 0.4 },
  { color: RGB_TOKENS.accent, env: 'violet', bx: 0.22, by: 0.82, ax: 0.1, ay: 0.08, kx: 1, ky: 1, px: 1.2, py: 5.0, r: 0.42, a: 0.26 },
  { color: RGB_TOKENS.chart4, env: 'red', bx: 0.12, by: 0.55, ax: 0.08, ay: 0.12, kx: 1, ky: 2, px: 3.3, py: 0.2, r: 0.42, a: 0.24 },
  { color: RGB_TOKENS.chart3, env: 'ember', bx: 0.64, by: 0.45, ax: 0.06, ay: 0.05, kx: 2, ky: 3, px: 0.9, py: 3.6, r: 0.36, a: 0.36 },
];

// Near-Gaussian falloff so fields have no visible edge.
const FALLOFF: [number, number][] = [
  [0, 1],
  [0.2, 0.82],
  [0.4, 0.5],
  [0.6, 0.22],
  [0.8, 0.06],
  [1, 0],
];

function drawFields(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, env: Envelopes) {
  const long = Math.max(w, h);
  ctx.globalCompositeOperation = 'lighter';
  for (const f of FIELDS) {
    const x = (f.bx + f.ax * Math.sin(f.kx * W * t + f.px)) * w;
    const y = (f.by + f.ay * Math.cos(f.ky * W * t + f.py)) * h;
    const r = f.r * long * (0.92 + 0.08 * Math.sin(W * t * 2 + f.px));
    const a = f.a * env[f.env];
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    for (const [stop, k] of FALLOFF) g.addColorStop(stop, rgba(f.color, a * k));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
  ctx.globalCompositeOperation = 'source-over';
}

// ---------------------------------------------------------------- node graph

interface Node {
  bx: number;
  by: number;
  ax: number;
  ay: number;
  kx: number;
  ky: number;
  px: number;
  py: number;
  thr: number;
  tk: number;
  tp: number;
  cluster: number;
  tinted: boolean;
}
interface Pulse {
  start: number;
  dur: number;
  gate: number;
  forward: boolean;
  violet: boolean;
}
interface Edge {
  a: number;
  b: number;
  pulses: Pulse[];
}
interface Layout {
  nodes: Node[];
  edges: Edge[];
  clusters: [number, number][];
}

const layouts = new Map<string, Layout>();

function getLayout(portrait: boolean): Layout {
  const key = portrait ? 'p' : 'l';
  const cached = layouts.get(key);
  if (cached) return cached;

  const rand = mulberry32(portrait ? 7331 : 1337);
  const cols = portrait ? 5 : 8;
  const rows = portrait ? 8 : 5;
  const clusters: [number, number][] = portrait
    ? [
        [0.34, 0.28],
        [0.66, 0.52],
        [0.4, 0.78],
      ]
    : [
        [0.3, 0.34],
        [0.6, 0.66],
        [0.8, 0.3],
      ];

  const nodes: Node[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const bx = 0.04 + ((c + 0.2 + rand() * 0.6) / cols) * 0.92;
      const by = 0.04 + ((r + 0.2 + rand() * 0.6) / rows) * 0.92;
      let cluster = 0;
      let best = Infinity;
      clusters.forEach(([cx, cy], i) => {
        const d = (cx - bx) ** 2 + (cy - by) ** 2;
        if (d < best) {
          best = d;
          cluster = i;
        }
      });
      nodes.push({
        bx,
        by,
        ax: 0.008 + rand() * 0.016,
        ay: 0.008 + rand() * 0.016,
        kx: 1 + Math.floor(rand() * 3),
        ky: 1 + Math.floor(rand() * 3),
        px: rand() * TAU,
        py: rand() * TAU,
        thr: rand() * 0.95,
        tk: 3 + Math.floor(rand() * 5),
        tp: rand() * TAU,
        cluster,
        tinted: rand() < 0.2,
      });
    }
  }

  // Connect each node to its two nearest neighbours (in pixel-proportional space).
  const aspect = portrait ? 9 / 16 : 16 / 9;
  const seen = new Set<string>();
  const edges: Edge[] = [];
  nodes.forEach((n, i) => {
    const near = nodes
      .map((m, j) => ({ j, d: ((m.bx - n.bx) * aspect) ** 2 + (m.by - n.by) ** 2 }))
      .filter((e) => e.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2);
    for (const { j } of near) {
      const id = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(id)) continue;
      seen.add(id);
      const pulses: Pulse[] = [];
      for (let k = 0; k < 3; k++) {
        pulses.push({
          start: rand() * LOOP_SECONDS,
          dur: 3 + rand() * 2,
          gate: 0.12 + rand() * 0.88,
          forward: rand() < 0.5,
          violet: rand() < 0.5,
        });
      }
      edges.push({ a: i, b: j, pulses });
    }
  });

  const layout = { nodes, edges, clusters };
  layouts.set(key, layout);
  return layout;
}

function drawGraph(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, env: Envelopes, portrait: boolean) {
  const { nodes, edges, clusters } = getLayout(portrait);
  const s = Math.min(w, h) / 1080;
  const pull = 0.35 * easeInOut(env.converge);

  const pos = nodes.map((n) => {
    const x = n.bx + n.ax * Math.sin(n.kx * W * t + n.px);
    const y = n.by + n.ay * Math.cos(n.ky * W * t + n.py);
    const [cx, cy] = clusters[n.cluster];
    return [(x + (cx - x) * pull) * w, (y + (cy - y) * pull) * h] as const;
  });
  const vis = nodes.map((n) => smooth(0, 0.12, env.population - n.thr));

  // Edges: bone hairlines.
  ctx.lineWidth = Math.max(1, 1.1 * s);
  for (const e of edges) {
    const v = Math.min(vis[e.a], vis[e.b]);
    if (v <= 0.01) continue;
    ctx.strokeStyle = rgba(RGB_TOKENS.foreground, (0.035 + 0.075 * env.density) * v);
    ctx.beginPath();
    ctx.moveTo(pos[e.a][0], pos[e.a][1]);
    ctx.lineTo(pos[e.b][0], pos[e.b][1]);
    ctx.stroke();
  }

  // Pulses travelling along edges.
  const head = Math.max(2, 3 * s);
  ctx.lineWidth = Math.max(1, 1.4 * s);
  for (const e of edges) {
    const v = Math.min(vis[e.a], vis[e.b]);
    if (v <= 0.05) continue;
    for (const p of e.pulses) {
      const dt = (((t - p.start) % LOOP_SECONDS) + LOOP_SECONDS) % LOOP_SECONDS;
      if (dt >= p.dur) continue;
      const mid = envelopes(p.start + p.dur / 2);
      if (mid.density < p.gate) continue;
      const u = dt / p.dur;
      const fade = Math.sin(Math.PI * u);
      const a = 0.55 * fade * v;
      const k = easeInOut(u);
      const [from, to] = p.forward ? [pos[e.a], pos[e.b]] : [pos[e.b], pos[e.a]];
      const hx = from[0] + (to[0] - from[0]) * k;
      const hy = from[1] + (to[1] - from[1]) * k;
      const tk = Math.max(0, k - 0.22);
      const tx = from[0] + (to[0] - from[0]) * tk;
      const ty = from[1] + (to[1] - from[1]) * tk;
      const base = p.violet ? RGB_TOKENS.accent : RGB_TOKENS.primary;
      const col = mix(base, RGB_TOKENS.chart3, mid.warmth * 0.9);
      const g = ctx.createLinearGradient(tx, ty, hx, hy);
      g.addColorStop(0, rgba(col, 0));
      g.addColorStop(1, rgba(col, a * 0.8));
      ctx.strokeStyle = g;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(hx, hy);
      ctx.stroke();
      ctx.fillStyle = rgba(col, a);
      ctx.fillRect(hx - head / 2, hy - head / 2, head, head);
    }
  }

  // Nodes: small squares (zero radius, like the DS).
  const size = Math.max(2, 3.2 * s);
  nodes.forEach((n, i) => {
    if (vis[i] <= 0.01) return;
    const twinkle = 0.7 + 0.3 * Math.sin(n.tk * W * t + n.tp);
    const col = n.tinted ? mix(RGB_TOKENS.primary, RGB_TOKENS.chart3, env.warmth) : RGB_TOKENS.foreground;
    ctx.fillStyle = rgba(col, (n.tinted ? 0.5 : 0.32) * vis[i] * twinkle);
    ctx.fillRect(pos[i][0] - size / 2, pos[i][1] - size / 2, size, size);
  });

  // GATE ripple rings from the cluster centres.
  const long = Math.max(w, h);
  ctx.lineWidth = Math.max(1, 1 * s);
  for (const r0 of RIPPLES) {
    const dt = (((t - r0) % LOOP_SECONDS) + LOOP_SECONDS) % LOOP_SECONDS;
    if (dt >= RIPPLE_SECONDS) continue;
    const u = dt / RIPPLE_SECONDS;
    const a = 0.16 * smooth(0, 0.08, u) * (1 - u) ** 1.5;
    const radius = (0.02 + 0.3 * (1 - (1 - u) ** 2)) * long;
    ctx.strokeStyle = rgba(RGB_TOKENS.chart3, a);
    for (const [cx, cy] of clusters) {
      ctx.beginPath();
      ctx.arc(cx * w, cy * h, radius, 0, TAU);
      ctx.stroke();
    }
  }
}

// ---------------------------------------------------------------- frame

export function drawSignal(ctx: CanvasRenderingContext2D, w: number, h: number, tSeconds: number) {
  const t = ((tSeconds % LOOP_SECONDS) + LOOP_SECONDS) % LOOP_SECONDS;
  const env = envelopes(t);
  const portrait = h > w;

  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);

  drawFields(ctx, w, h, t, env);
  drawGraph(ctx, w, h, t, env, portrait);

  // Radial vignette keeps the corners near black.
  const long = Math.max(w, h);
  const v = ctx.createRadialGradient(w / 2, h / 2, long * 0.3, w / 2, h / 2, long * 0.78);
  v.addColorStop(0, 'rgba(0,0,0,0)');
  v.addColorStop(1, 'rgba(0,0,0,0.7)');
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, w, h);
}
