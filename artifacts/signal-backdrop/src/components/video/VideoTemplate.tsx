// Signal Backdrop: one persistent procedural canvas. The five "scenes" are
// named movements of the same continuous field (see SCRIPT.md); they have no
// visible cuts and no on-screen text because the film sits behind site copy.

import { useEffect } from 'react';

import { VideoCanvas, VideoPausedContext, type VideoAspectRatio, useVideoPlayer } from '@/lib/video';

import { MOVEMENT_SECONDS } from './signal/movements';
import { SignalLayer } from './signal/SignalLayer';

export const SCENE_DURATIONS = {
  plan: MOVEMENT_SECONDS * 1000,
  spawn: MOVEMENT_SECONDS * 1000,
  review: MOVEMENT_SECONDS * 1000,
  gate: MOVEMENT_SECONDS * 1000,
  merge: MOVEMENT_SECONDS * 1000,
};

const SCENE_KEYS = Object.keys(SCENE_DURATIONS);
const VIDEO_ASPECT_RATIO: VideoAspectRatio = '16:9';

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  paused = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  paused?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop, paused });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const sceneIndex = Math.max(0, SCENE_KEYS.indexOf(baseSceneKey));

  return (
    <VideoPausedContext.Provider value={paused}>
      <VideoCanvas aspectRatio={VIDEO_ASPECT_RATIO} style={{ backgroundColor: '#000' }}>
        <SignalLayer
          sceneKey={currentSceneKey}
          offsetSeconds={sceneIndex * MOVEMENT_SECONDS}
          paused={paused}
        />
      </VideoCanvas>
    </VideoPausedContext.Provider>
  );
}
