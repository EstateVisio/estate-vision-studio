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
  },
  {
    id: '2',
    name: 'Suburban Family Home',
    description: 'Spacious 4-bedroom house with large backyard',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05'),
    photosCount: 18,
    status: 'completed',
  },
  {
    id: '3',
    name: 'Beachfront Villa',
    description: 'Luxury oceanfront property with private beach access',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-12'),
    photosCount: 32,
    status: 'processing',
  },
  {
    id: '4',
    name: 'Mountain Cabin Retreat',
    description: 'Cozy cabin nestled in the mountains',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
    photosCount: 0,
    status: 'draft',
  },
];
