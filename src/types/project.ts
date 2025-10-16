export interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  photosCount: number;
  status: 'draft' | 'processing' | 'completed';
  videoUrl?: string;
  photoUrls?: string[];
}
