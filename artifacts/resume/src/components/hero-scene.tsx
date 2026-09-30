import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cn } from '@workspace/dead-channel-ds/lib/utils';

const LANES = [
  { label: 'ALPHA', speed: 'lane-slow', tokens: 'read("auth.ts:920")  assert(delta===full)  fix(+=→=)  rerun(test_42)  ✓ delta_ok  commit 7a9c' },
  { label: 'ORCH', speed: 'lane-fast', tokens: 'spawn(reviewer)  spawn(verifier)  await(3)  consensus 3/3 ✓  gate.pass  fanout(5)' },
  { label: 'STREAM', speed: 'lane-mid', tokens: 'ingest(live.ts)  encode(HEVC)  ladder(1080p,720p,480p)  segment(6s)  HLS.push  DASH.pack  drm.wrap  cdn.edge(codec=auto)' },
  { label: 'ORBIT', speed: 'lane-slow', tokens: 'asked:"fix delta"  planned:3 steps  claimed:done  shipped:diff#7a9c  drift=0  ✓ aligned' },
  { label: 'CRUCIBLE', speed: 'lane-mid', tokens: 'phase(1/10)  reviewers(3)  oracles(3)  mock.detected → REFUSE  run(live system)  evidence✓  no override' },
  { label: 'MEMORY', speed: 'lane-fast', tokens: 'get("session_42")  cache.miss  embed(1024d)  index.append  persist✓  recall.hit' },
];

const STAGES = [
  { n: '01', label: 'PLAN', t: 't+0.0s' },
  { n: '02', label: 'SPAWN', t: 't+1.2s' },
  { n: '03', label: 'REVIEW', t: 't+2.4s' },
  { n: '04', label: 'GATE', t: 't+3.6s' },
  { n: '05', label: 'MERGE', t: 't+4.8s' },
];

const SCENES = ['STREAM', 'REVIEW', 'GATE', 'MERGE'];
const VOTERS = ['lead', 'alpha', 'bravo'];

function useTicker(active: boolean, ms: number, max: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setTick((t) => (t + 1) % max);
    }, ms);
    return () => window.clearInterval(id);
  }, [active, ms, max]);
  return tick;
}

function Lane({ l, className }: { l: (typeof LANES)[number]; className?: string }) {
  return (
    <div className={cn('flex items-center gap-4 font-mono text-xs', className)}>
      <span className="w-20 shrink-0 pl-4 uppercase tracking-widest text-accent opacity-40 md:pl-8">{l.label}</span>
      <div className="relative min-w-0 flex-1 overflow-hidden">
        <div className={cn('lane-track flex w-max whitespace-pre text-muted-foreground opacity-25', l.speed)}>
          <span>{l.tokens}{'      '}</span>
          <span>{l.tokens}{'      '}</span>
        </div>
      </div>
    </div>
  );
}

/** Decorative layered agent scene composited over the video, behind hero content. */
export function HeroScene() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();

  // Pointer parallax (desktop only, springy and tiny).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 20 });
  const sy = useSpring(py, { stiffness: 40, damping: 20 });

  const lanesY = useTransform(scrollY, [0, 900], [0, 60]);
  const graphY = useTransform(scrollY, [0, 900], [0, 260]);
  const graphX = useTransform(sx, (v) => v * 14);
  const graphYp = useTransform(sy, (v) => v * 10);
  const lanesX = useTransform(sx, (v) => v * -6);
  const fade = useTransform(scrollY, [0, 700], [1, 0.25]);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    if (!mq.matches) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, px, py]);

  const active = visible && !reduce;
  // 0..9 ticks over the cycle: stages light up, voters flip, scene label rotates.
  const tick = useTicker(active, 900, 10);
  const t = reduce ? 9 : tick;
  const stage = Math.min(4, Math.floor(t / 2));
  const votes = Math.max(0, Math.min(3, t - 5));
  const scene = Math.min(3, Math.floor(t / 2.5));

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn('hero-scene pointer-events-none absolute inset-0 overflow-hidden', !active && 'is-paused')}
    >
      {/* faint grid */}
      <div className="scene-grid absolute inset-0" />

      {/* log lanes: framing bands above and below the content, never behind text */}
      <motion.div
        className="lane-band absolute inset-x-0 top-3 hidden space-y-2 will-change-transform md:block"
        style={reduce ? undefined : { y: lanesY, x: lanesX, opacity: fade }}
      >
        {LANES.slice(0, 2).map((l) => <Lane key={l.label} l={l} />)}
      </motion.div>
      <motion.div
        className="lane-band absolute inset-x-0 bottom-3 space-y-2 will-change-transform"
        style={reduce ? undefined : { x: lanesX }}
      >
        {LANES.slice(2).map((l, i) => <Lane key={l.label} l={l} className={i > 0 ? 'hidden md:flex' : undefined} />)}
      </motion.div>

      {/* agent pipeline + gate (mid depth, desktop) */}
      <motion.div
        className="absolute right-8 top-28 z-10 hidden w-80 space-y-3 will-change-transform xl:block"
        style={reduce ? undefined : { y: graphY, x: graphX, translateY: graphYp, opacity: fade }}
      >
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span>
            SCENE <span className="text-primary">0{scene + 1}</span> / 04 · {SCENES[scene]}
          </span>
          <span className="flex gap-1">
            {SCENES.map((s, i) => (
              <span key={s} className={cn('h-px w-4 transition-colors duration-500', i <= scene ? 'bg-primary' : 'bg-border')} />
            ))}
          </span>
        </div>

        <div className="border border-border bg-background p-3">
          <div className="grid grid-cols-5 gap-1">
            {STAGES.map((s, i) => (
              <div key={s.n} className="space-y-1 font-mono text-xs">
                <div className={cn('h-1 transition-colors duration-500', i < stage ? 'bg-accent' : i === stage ? 'bg-chart-3' : 'bg-border')} />
                <div className={cn('transition-colors duration-500', i <= stage ? 'text-foreground' : 'text-muted-foreground')}>{s.label}</div>
                <div className="text-muted-foreground opacity-70">{s.t}</div>
              </div>
            ))}
          </div>
        </div>

        <pre className="border border-border bg-background p-3 font-mono text-xs leading-relaxed">
          <span className="text-muted-foreground">@@ stream.ts:920 @@</span>{'\n'}
          <span className="text-chart-4">-message.text += textBlock.text</span>{'\n'}
          <span className="text-accent">+message.text = textBlock.text</span>{'\n'}
          <span className="text-accent">+verify(consensus="3/3")</span>
        </pre>

        <div className="border border-border bg-background p-3 font-mono text-xs">
          <div className="mb-2 uppercase tracking-widest text-muted-foreground">Consensus gate</div>
          <div className="space-y-1">
            {VOTERS.map((v, i) => (
              <div key={v} className="flex justify-between">
                <span className="text-foreground">{v}</span>
                <span className={cn('transition-colors duration-300', i < votes ? 'text-primary' : 'text-muted-foreground')}>
                  {i < votes ? 'PASS' : 'reviewing…'}
                </span>
              </div>
            ))}
          </div>
          <div className={cn('mt-2 border-t border-border pt-2 transition-colors duration-500', votes === 3 ? 'text-chart-3' : 'text-muted-foreground')}>
            {votes === 3 ? '✓ UNANIMOUS · MERGE' : `awaiting ${votes}/3`}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
