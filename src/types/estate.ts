export type Photo = {
  id: string;
  url: string;
  name: string;
  file?: File;
};

export type Grade = {
  overall: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  exposure: number;
  sharpness: number;
  framing: number;
  lighting: number;
  recommendation: string;
};

export type ObjectTag = {
  name: string;
  confidence: number;
};

export type Analysis = {
  photoId: string;
  grade: Grade;
  objects: ObjectTag[];
};

export type Clip = {
  id: string;
  photoId: string;
  url: string;
  durationSec: number;
  caption: string;
  version: number;
  createdAt: string;
};

export type FinalVideo = {
  id: string;
  url: string;
  durationSec: number;
  createdAt: string;
};

export type TransitionPreset =
  | 'Cinematic Dissolve'
  | 'Cut + Motion Blur'
  | 'Wipe (Minimal)'
  | 'Parallax Slide'
  | 'Soft Fade + Gold Overlay';

export type ProcessingStage = {
  label: string;
  progress: number;
  isComplete: boolean;
};
