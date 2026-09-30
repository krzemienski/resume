import { useEffect, useRef } from 'react';

import { drawSignal } from './drawSignal';

/**
 * Persistent full-frame canvas. Time = scene start offset + time spent in the
 * current scene, so jumps and scene-lock replay the right part of the loop.
 */
export function SignalLayer({
  sceneKey,
  offsetSeconds,
  paused,
}: {
  sceneKey: string;
  offsetSeconds: number;
  paused: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    elapsedRef.current = 0;
  }, [sceneKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      if (!paused) elapsedRef.current += (now - last) / 1000;
      last = now;
      fit();
      drawSignal(ctx, canvas.width, canvas.height, offsetSeconds + elapsedRef.current);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [offsetSeconds, paused]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
