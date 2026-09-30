// Scene metadata for the preview control bar. All five movements are defined
// as envelopes in one file, so each entry points there.

export interface SceneDetails {
  title: string;
  filePath: string;
}

const MOVEMENTS_FILE = 'src/components/video/signal/movements.ts';

export const SCENE_DETAILS: Record<string, SceneDetails> = {
  plan: { title: 'Plan', filePath: MOVEMENTS_FILE },
  spawn: { title: 'Spawn', filePath: MOVEMENTS_FILE },
  review: { title: 'Review', filePath: MOVEMENTS_FILE },
  gate: { title: 'Gate', filePath: MOVEMENTS_FILE },
  merge: { title: 'Merge', filePath: MOVEMENTS_FILE },
};
