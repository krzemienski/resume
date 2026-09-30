import VideoWithControls from '@/components/video/VideoWithControls';
import { CaptureStage } from '@/components/video/signal/CaptureStage';

// `?capture&w=1920&h=1080` renders the offline frame-capture stage used to
// encode the site background video; everything else is the normal film.
const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
const capture = params?.has('capture')
  ? { w: Number(params.get('w')) || 1920, h: Number(params.get('h')) || 1080 }
  : null;

export default function App() {
  if (capture) return <CaptureStage width={capture.w} height={capture.h} />;
  return <VideoWithControls />;
}
