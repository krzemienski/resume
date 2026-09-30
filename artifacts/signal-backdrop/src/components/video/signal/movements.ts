// The five movements of the 60 s loop, expressed as smooth periodic envelopes.
// Each envelope is a wrapped Gaussian bump around a centre time, so every value
// is continuous across the loop point. See SCRIPT.md for the intent of each.

export const LOOP_SECONDS = 60;

/** Scene keys double as movement names; each lasts 12 s. */
export const MOVEMENTS = ['plan', 'spawn', 'review', 'gate', 'merge'] as const;
export type MovementKey = (typeof MOVEMENTS)[number];
export const MOVEMENT_SECONDS = LOOP_SECONDS / MOVEMENTS.length;

/** Dead Channel DS dark tokens (HSL) — the only colours used. */
export const TOKENS = {
  background: [0, 0, 0],
  foreground: [60, 9.1, 89.2],
  primary: [349, 100, 58.8], // crimson
  accent: [274, 100, 64.7], // violet
  chart3: [25, 100, 55.1], // orange
  chart4: [8, 100, 56.1], // red
} as const satisfies Record<string, readonly [number, number, number]>;

export type RGB = readonly [number, number, number];

export function hslToRgb([h, s, l]: readonly [number, number, number]): RGB {
  const sat = s / 100;
  const lig = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(lig, 1 - lig);
  const f = (n: number) => lig - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

export const RGB_TOKENS = {
  foreground: hslToRgb(TOKENS.foreground),
  primary: hslToRgb(TOKENS.primary),
  accent: hslToRgb(TOKENS.accent),
  chart3: hslToRgb(TOKENS.chart3),
  chart4: hslToRgb(TOKENS.chart4),
};

/** Shortest distance between two times on the loop circle. */
function circDist(t: number, c: number): number {
  const d = Math.abs((((t - c) % LOOP_SECONDS) + LOOP_SECONDS) % LOOP_SECONDS);
  return Math.min(d, LOOP_SECONDS - d);
}

function bump(t: number, centre: number, width: number): number {
  const x = circDist(t, centre) / width;
  return Math.exp(-x * x);
}

export interface Envelopes {
  crimson: number;
  violet: number;
  red: number;
  ember: number;
  /** Fraction of nodes that are visible (0..1). */
  population: number;
  /** Edge alpha and pulse density (0..1). */
  density: number;
  /** How far nodes pull toward cluster centres (0..1). */
  converge: number;
  /** Pulse colour mix: 0 = crimson/violet, 1 = orange. */
  warmth: number;
}

// PLAN ~6 s, SPAWN ~20 s, REVIEW ~31 s, GATE ~42 s, MERGE relaxes to PLAN.
export function envelopes(t: number): Envelopes {
  return {
    crimson: 0.7 + 0.3 * bump(t, 4, 14) - 0.15 * bump(t, 42, 8),
    violet: 0.3 + 0.7 * bump(t, 20, 10),
    red: 0.35 + 0.45 * bump(t, 30, 10),
    ember: 0.1 + 0.9 * bump(t, 42, 7),
    population: 0.35 + 0.6 * Math.max(bump(t, 26, 12), 0.85 * bump(t, 42, 9)),
    density: 0.15 + 0.85 * Math.max(bump(t, 31, 8), 0.7 * bump(t, 42, 7)),
    converge: bump(t, 42, 6),
    warmth: bump(t, 42, 8),
  };
}

/** Ripple rings emitted during GATE (seconds). */
export const RIPPLES = [37, 40.5, 44] as const;
export const RIPPLE_SECONDS = 6;
