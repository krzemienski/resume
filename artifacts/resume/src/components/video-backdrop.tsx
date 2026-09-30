import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const BASE = import.meta.env.BASE_URL;
// 60 s seamless loop rendered from artifacts/signal-backdrop (desktop 16:9, phone 9:16).
const MEDIA = {
  landscape: {
    poster: BASE + 'media/signal-backdrop-poster.jpg',
    webm: BASE + 'media/signal-backdrop.webm',
    mp4: BASE + 'media/signal-backdrop.mp4',
  },
  portrait: {
    poster: BASE + 'media/signal-backdrop-portrait-poster.jpg',
    webm: BASE + 'media/signal-backdrop-portrait.webm',
    mp4: BASE + 'media/signal-backdrop-portrait.mp4',
  },
};

const PORTRAIT_QUERY = '(orientation: portrait)';

export function VideoBackdrop() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [portrait, setPortrait] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(PORTRAIT_QUERY).matches,
  );
  // Save-Data connections get the static poster; everyone else (phones included) gets the loop.
  const saveData =
    typeof navigator !== 'undefined' &&
    !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  const { scrollY, scrollYProgress } = useScroll();

  // Media drifts slower than scroll; vignette/scanline layer drifts at a different rate.
  const mediaY = useTransform(scrollY, [0, 3000], [0, -220], { clamp: true });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14]);
  const depthY = useTransform(scrollY, [0, 3000], [0, -90], { clamp: true });
  const glowY = useTransform(scrollY, [0, 3000], [0, -480], { clamp: true });
  const glowOpacity = useTransform(scrollY, [0, 900, 2400], [0.7, 0.4, 0.2]);
  // Present in the hero, receding behind dense content. Phones have no side scrim, so dim more.
  const dim = useTransform(
    scrollY,
    [0, 700, 1400],
    portrait ? [0.45, 0.68, 0.8] : [0.3, 0.58, 0.76],
  );

  useEffect(() => {
    const mq = window.matchMedia(PORTRAIT_QUERY);
    const set = () => setPortrait(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onVis = () => {
      if (document.hidden) v.pause();
      else v.play().catch(() => undefined);
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [reduce, portrait, saveData]);

  const staticOnly = !!reduce || saveData;
  const media = portrait ? MEDIA.portrait : MEDIA.landscape;

  return (
    <div aria-hidden className="video-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <motion.div
        className="absolute inset-x-0 -top-16 -bottom-[300px] will-change-transform"
        style={staticOnly ? undefined : { y: mediaY, scale: mediaScale }}
      >
        {staticOnly ? (
          <img src={media.poster} alt="" className="h-full w-full object-cover" />
        ) : (
          <video
            // Remount on rotation so the browser picks the matching source.
            key={portrait ? 'portrait' : 'landscape'}
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={media.poster}
            aria-hidden
            tabIndex={-1}
          >
            <source src={media.webm} type="video/webm" />
            <source src={media.mp4} type="video/mp4" />
          </video>
        )}
      </motion.div>

      <motion.div className="absolute inset-0 bg-background" style={{ opacity: staticOnly ? 0.78 : dim }} />
      {/* Text-side scrim: keeps the left content column legible while the right side stays visible. */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-background/75 via-background/40 to-transparent md:block" />

      <motion.div
        className="backdrop-glows absolute -inset-y-32 inset-x-0 will-change-transform"
        style={staticOnly ? { opacity: 0.5 } : { y: glowY, opacity: glowOpacity }}
      />

      <motion.div
        className="backdrop-vignette crt-scanlines absolute -inset-y-16 inset-x-0 will-change-transform"
        style={staticOnly ? undefined : { y: depthY }}
      />
    </div>
  );
}
