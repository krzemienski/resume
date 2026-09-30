import { useEffect, useRef } from 'react';

import { drawSignal } from './drawSignal';

declare global {
  interface Window {
    renderAt?: (tSeconds: number) => string;
    __captureReady?: boolean;
  }
}

/**
 * Offline render mode (`?capture&w=1920&h=1080`): exposes window.renderAt(t),
 * which draws frame t at an exact pixel size and returns a PNG data URL.
 * Used by scripts/render-backdrop.mjs; never used by preview or export.
 */
export function CaptureStage({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    window.renderAt = (t: number) => {
      drawSignal(ctx, width, height, t);
      return canvas.toDataURL('image/png');
    };
    window.__captureReady = true;
    return () => {
      delete window.renderAt;
      window.__captureReady = false;
    };
  }, [width, height]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ display: 'block' }} />;
}
