import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const BASE = import.meta.env.BASE_URL;
const POSTER = BASE + 'media/agents-signal-poster.jpg';

export function VideoBackdrop() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  // Phones and Save-Data connections get the static poster: the video is ~4-6 MB and mostly dimmed there.
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  );
  const saveData =
    typeof navigator !== 'undefined' &&
    !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  const { scrollY, scrollYProgress } = useScroll();

  // Media drifts slower than scroll; vignette/scanline layer drifts at a different rate.
  const mediaY = useTransform(scrollY, [0, 3000], [0, -220], { clamp: true });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const depthY = useTransform(scrollY, [0, 3000], [0, -90], { clamp: true });
  // Vivid in the hero, receding behind dense content.
  const dim = useTransform(scrollY, [0, 700, 1400], [mobile ? 0.72 : 0.6, 0.82, 0.9]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const set = () => setMobile(mq.matches);
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
  }, [reduce, mobile]);

  const staticOnly = !!reduce || mobile || saveData;

  return (
    <div aria-hidden className="video-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <motion.div
        className="absolute inset-x-0 -top-16 -bottom-[300px] will-change-transform"
        style={staticOnly ? undefined : { y: mediaY, scale: mediaScale }}
      >
        {staticOnly ? (
          <img src={POSTER} alt="" className="h-full w-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={POSTER}
            aria-hidden
            tabIndex={-1}
          >
            <source src={BASE + 'media/agents-signal.webm'} type="video/webm" />
            <source src={BASE + 'media/agents-signal.mp4'} type="video/mp4" />
          </video>
        )}
      </motion.div>

      <motion.div className="absolute inset-0 bg-background" style={{ opacity: staticOnly ? 0.8 : dim }} />
      {/* Text-side scrim: keeps the left content column legible while the right side stays vivid. */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-background/75 via-background/45 to-transparent md:block" />

      <motion.div
        className="backdrop-vignette crt-scanlines absolute -inset-y-16 inset-x-0 will-change-transform"
        style={staticOnly ? undefined : { y: depthY }}
      />
    </div>
  );
}
