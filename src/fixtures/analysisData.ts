import { Analysis, ObjectTag } from '@/types/estate';

const COMMON_OBJECTS: ObjectTag[] = [
  { name: 'sofa', confidence: 0.92 },
  { name: 'bay window', confidence: 0.88 },
  { name: 'kitchen island', confidence: 0.95 },
  { name: 'balcony', confidence: 0.85 },
  { name: 'fireplace', confidence: 0.91 },
  { name: 'garden view', confidence: 0.87 },
  { name: 'hardwood floor', confidence: 0.93 },
  { name: 'chandelier', confidence: 0.89 },
  { name: 'marble countertop', confidence: 0.94 },
  { name: 'walk-in closet', confidence: 0.86 },
];

const GRADE_RECOMMENDATIONS = {
  A: 'Excellent photo quality. Professional lighting and composition. Ready for premium marketing.',
  B: 'Very good quality. Minor adjustments to exposure could enhance appeal.',
  C: 'Good foundation. Consider re-shooting with better natural light for optimal results.',
  D: 'Acceptable but could benefit from professional staging and lighting.',
  E: 'Below average. Recommend professional photography for marketing materials.',
  F: 'Poor quality. Professional re-shoot strongly recommended.',
};

export const generateMockAnalysis = (photoId: string): Analysis => {
  const grades: Array<'A' | 'B' | 'C' | 'D' | 'E' | 'F'> = ['A', 'A', 'B', 'B', 'B', 'C', 'C', 'D'];
  const randomGrade = grades[Math.floor(Math.random() * grades.length)];
  
  const baseScore = randomGrade === 'A' ? 85 : randomGrade === 'B' ? 75 : randomGrade === 'C' ? 65 : 55;
  const variance = () => Math.floor(Math.random() * 15) - 5;
  
  const numObjects = Math.floor(Math.random() * 4) + 2;
  const selectedObjects = COMMON_OBJECTS
    .sort(() => Math.random() - 0.5)
    .slice(0, numObjects)
    .map(obj => ({
      ...obj,
      confidence: Math.floor(obj.confidence * 100) / 100,
    }));
  
  return {
    photoId,
    grade: {
      overall: randomGrade,
      exposure: Math.min(100, Math.max(0, baseScore + variance())),
      sharpness: Math.min(100, Math.max(0, baseScore + variance())),
      framing: Math.min(100, Math.max(0, baseScore + variance())),
      lighting: Math.min(100, Math.max(0, baseScore + variance())),
      recommendation: GRADE_RECOMMENDATIONS[randomGrade],
    },
    objects: selectedObjects,
  };
};

export const MOCK_ANALYSES: Analysis[] = [
  {
    photoId: '1',
    grade: {
      overall: 'A',
      exposure: 92,
      sharpness: 88,
      framing: 95,
      lighting: 90,
      recommendation: GRADE_RECOMMENDATIONS.A,
    },
    objects: [
      { name: 'kitchen island', confidence: 0.95 },
      { name: 'marble countertop', confidence: 0.94 },
      { name: 'bay window', confidence: 0.88 },
    ],
  },
  {
    photoId: '2',
    grade: {
      overall: 'B',
      exposure: 78,
      sharpness: 82,
      framing: 80,
      lighting: 76,
      recommendation: GRADE_RECOMMENDATIONS.B,
    },
    objects: [
      { name: 'sofa', confidence: 0.92 },
      { name: 'fireplace', confidence: 0.91 },
      { name: 'hardwood floor', confidence: 0.93 },
    ],
  },
];
