import { Project } from '@/types/project';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Downtown Loft Apartment',
    description: 'Modern 2-bedroom loft in the heart of downtown',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    photosCount: 24,
    status: 'completed',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: '2',
    name: 'Suburban Family Home',
    description: 'Spacious 4-bedroom house with large backyard',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05'),
    photosCount: 18,
    status: 'completed',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: '3',
    name: 'Beachfront Villa',
    description: 'Luxury oceanfront property with private beach access',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-12'),
    photosCount: 32,
    status: 'processing',
    photoUrls: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
    ],
  },
  {
    id: '4',
    name: 'Mountain Cabin Retreat',
    description: 'Cozy cabin nestled in the mountains',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
    photosCount: 8,
    status: 'draft',
    photoUrls: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400',
      'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=400',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400',
    ],
  },
];
