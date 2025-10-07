import { Clip } from '@/types/estate';

// Generic placeholder video URLs (loopable ~5s clips)
const PLACEHOLDER_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
];

const CAPTIONS = [
  'Spacious living area with natural light',
  'Modern kitchen with premium finishes',
  'Elegant bedroom with garden views',
  'Luxurious bathroom with marble details',
  'Stunning outdoor space perfect for entertaining',
  'Contemporary dining area',
  'Walk-in closet with custom shelving',
  'Cozy reading nook by the window',
];

export const generateMockClip = (photoId: string, version: number = 1): Clip => {
  const videoIndex = parseInt(photoId) % PLACEHOLDER_VIDEOS.length;
  const captionIndex = parseInt(photoId) % CAPTIONS.length;
  
  return {
    id: `clip-${photoId}-v${version}`,
    photoId,
    url: PLACEHOLDER_VIDEOS[videoIndex],
    durationSec: 5,
    caption: CAPTIONS[captionIndex],
    version,
    createdAt: new Date().toISOString(),
  };
};

export const MOCK_FINAL_VIDEO = {
  id: 'final-montage-1',
  url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  durationSec: 30,
  createdAt: new Date().toISOString(),
};
