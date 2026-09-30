import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cn } from '@workspace/dead-channel-ds/lib/utils';

/** Fade/slide-in on first view. Shown immediately under reduced motion. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  // Without IntersectionObserver, whileInView never fires; render visible instead.
  if (reduce || typeof IntersectionObserver === 'undefined') return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={cn('reveal', className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Decorative element that drifts at its own rate while its section scrolls past. */
export function Drift({ children, rate = 60, className }: { children: ReactNode; rate?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [rate, -rate]);
  return (
    <motion.div ref={ref} aria-hidden className={cn('pointer-events-none will-change-transform', className)} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}

/** Thin scroll progress bar pinned to the bottom edge of the sticky header. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      aria-hidden
      className="deco-layer pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-primary"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  );
}

/** Mono percentage readout of scroll position. */
export function ScrollProgressReadout() {
  const { scrollYProgress } = useScroll();
  const pct = useTransform(scrollYProgress, (v) => `SIG ${String(Math.round(v * 100)).padStart(3, '0')}%`);
  return (
    <motion.span aria-hidden className="hidden font-mono text-xs tracking-widest text-muted-foreground lg:inline">
      {pct}
    </motion.span>
  );
}
