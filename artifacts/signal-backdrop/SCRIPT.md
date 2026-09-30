# Signal Backdrop — script

A 60 s seamless loop used as the full-screen background of the resume site on every device.
It sits behind body copy and is dimmed by the site, so it must stay calm and low contrast.

## Treatment

- **Promise:** the page feels alive — a quiet agent network thinking in the background — without ever pulling the eye off the text.
- **Identity:** Dead Channel DS tokens only, on true black: crimson `primary` (349 100% 58.8%), violet `accent` (274 100% 64.7%), orange `chart-3` (25 100% 55.1%), red `chart-4` (8 100% 56.1%), bone `foreground` (60 9.1% 89.2%) for hairlines. No blue, no teal.
- **Hero:** a slow field of coloured light plus a faint node graph whose edges carry small signal pulses.
- **Motion:** (1) large radial light fields drifting on Lissajous paths; (2) a node graph that breathes, clusters and relaxes; (3) pulses travelling along edges, plus rare ripple rings.
- **Arc:** sparse → populated → busy → converged → relaxed, then back to sparse. The change is slow enough that no single moment reads as a "cut".
- **Payoff / loop:** the last movement relaxes into the exact state of the opening frame; every motion uses whole harmonics of 1/60 Hz, so the loop is continuous (not a ping-pong reversal).

## Deliberate deviations from the film rules

- **No on-screen text, no logo, no hero object.** This is a background plate behind site copy; type would compete with the page. The composition floors (type scale, hero scale, beat density ≤ 1 s) do not apply — the brief is the opposite of attention-grabbing.
- **No audio.** The site plays it muted.
- **No hard transitions.** "Scenes" are named movements of one continuous procedural field; scene boundaries are not visible.

## Timeline (L = 60 s, 24 fps render)

| Time | Movement | Viewer's focus | Motion | Handoff |
| --- | --- | --- | --- | --- |
| 0–12 s | PLAN | Crimson field, sparse graph | Two crimson fields drift; ~35% of nodes visible; almost no pulses | Violet field starts to rise from lower right |
| 12–24 s | SPAWN | Violet rises, nodes appear | Violet envelope peaks ~20 s; nodes fade in one by one; first pulses | Pulse rate keeps climbing |
| 24–36 s | REVIEW | Busiest graph | Edge alpha and pulse density peak ~31 s; pulses mix crimson/violet | Orange ember begins in the centre-right |
| 36–48 s | GATE | Orange ember, clustering | Nodes pull toward three cluster centres (peak ~42 s); three slow ripple rings at 37, 40.5 and 44 s; pulses turn orange | Clusters release |
| 48–60 s | MERGE | Relaxing back to crimson | Nodes return to base; violet and orange fade; density falls to the opening level | Identical to 0 s — seamless |

## Shots

**Shot 1 / PLAN / 0.00–12.00 s.** Purpose: a quiet, warm starting state. Composition: black frame; crimson field A upper-left third (radius ≈ 55% of the long edge), crimson field B lower-right, violet field low and small at the right edge; radial vignette keeps corners near black. Graph nodes spread across the whole frame (no focal point, so text can sit anywhere). Choreography: fields drift continuously (k = 1–2 harmonics, ≤ 4% of width per second); visible nodes twinkle ±30% alpha on individual phases; at most one pulse on screen. Handoff: violet field grows and brightens from 8 s on.

**Shot 2 / SPAWN / 12.00–24.00 s.** Purpose: agents spawning. Composition: violet field rises to share the frame with crimson (violet peak ≈ 20 s, still lower alpha than the original hero video). Choreography: node visibility threshold sweeps upward, so nodes fade in individually over ~1.5 s each; edges appear only when both endpoints are visible; pulses begin (one every ~1–2 s across the frame), mostly violet. Handoff: pulse rate keeps climbing into REVIEW.

**Shot 3 / REVIEW / 24.00–36.00 s.** Purpose: work happening — the busiest but still calm state. Composition: crimson + violet balanced; red field brightens slightly bottom-left. Choreography: edge alpha peaks at ≈ 31 s; 4–8 pulses visible at once, each taking 3–5 s to cross an edge with a short fading tail; no flashes, no sudden brightening. Handoff: an orange ember appears centre-right from 33 s.

**Shot 4 / GATE / 36.00–48.00 s.** Purpose: a consensus gate — things converge. Composition: orange ember centre-right at its peak ≈ 42 s; nodes drift up to 35% of the way toward three cluster centres. Choreography: ripple rings (1 px hairline, alpha ≤ 0.18) expand from cluster centres at 37.0, 40.5 and 44.0 s over 6 s each; pulses shift to orange; convergence is a smooth ease, never a snap. Handoff: clusters release from 44 s.

**Shot 5 / MERGE / 48.00–60.00 s.** Purpose: resolution and loop. Composition: violet and orange fall away; crimson regains the frame; node visibility and pulse density fall to the opening level. Choreography: nodes ease back to base positions; last pulses finish by ~58 s. Handoff: frame at 60 s equals frame at 0 s.

Assets/technique: one pure `drawSignal(ctx, w, h, t)` on a 2D canvas (radial gradients, hairline strokes). Seeded PRNG for node layout and pulse schedule, so preview and offline render are identical. Resolution-independent: positions are normalised, so the same function renders the 16:9 desktop file and the 9:16 phone file.

Sound intent: silence.

## Outputs (rendered offline from `?capture`)

- 1920×1080 → `artifacts/resume/public/media/signal-backdrop.{webm,mp4}` + poster
- 720×1280 → `artifacts/resume/public/media/signal-backdrop-portrait.{webm,mp4}` + poster
