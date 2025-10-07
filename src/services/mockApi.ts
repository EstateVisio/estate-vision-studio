import { Photo, Analysis, Clip, FinalVideo, TransitionPreset } from '@/types/estate';
import { generateMockAnalysis } from '@/fixtures/analysisData';
import { generateMockClip, MOCK_FINAL_VIDEO } from '@/fixtures/clipData';

const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms + (Math.random() * ms * 0.2 - ms * 0.1)));

const shouldSimulateError = () => Math.random() < 0.08; // 8% error rate

export const mockApi = {
  async analyzePhotos(photos: Photo[]): Promise<Analysis[]> {
    await sleep(1800);
    
    if (shouldSimulateError()) {
      throw new Error('Analysis service temporarily unavailable. Please try again.');
    }
    
    return photos.map(photo => generateMockAnalysis(photo.id));
  },

  async generateClips(photos: Photo[], _filters?: string[]): Promise<Clip[]> {
    await sleep(4000);
    
    if (shouldSimulateError()) {
      throw new Error('Clip generation failed. Please retry.');
    }
    
    return photos.map(photo => generateMockClip(photo.id));
  },

  async regenerateClip(clipId: string, photoId: string, _instruction: string): Promise<Clip> {
    await sleep(1500);
    
    if (shouldSimulateError()) {
      throw new Error('Regeneration failed. Please try again.');
    }
    
    // Extract version from clipId or default to 1
    const currentVersion = parseInt(clipId.split('-v')[1] || '1');
    return generateMockClip(photoId, currentVersion + 1);
  },

  async createMontage(_clips: Clip[], _transition: TransitionPreset): Promise<FinalVideo> {
    await sleep(5500);
    
    if (shouldSimulateError()) {
      throw new Error('Montage creation failed. Please retry.');
    }
    
    return {
      ...MOCK_FINAL_VIDEO,
      id: `montage-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
  },

  async simpleProcess(_photos: Photo[]): Promise<FinalVideo> {
    // Simulate multi-stage processing
    await sleep(6000); // Analyzing
    await sleep(5000); // Generating
    await sleep(4000); // Stitching
    
    if (shouldSimulateError()) {
      throw new Error('Processing failed. Please try again.');
    }
    
    return {
      ...MOCK_FINAL_VIDEO,
      id: `simple-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
  },
};
