import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PhotoUploader } from '@/components/PhotoUploader';
import { Stepper, Step } from '@/components/Advanced/Stepper';
import { GradeCard } from '@/components/Advanced/GradeCard';
import { AnalysisDetailDrawer } from '@/components/Advanced/AnalysisDetailDrawer';
import { ObjectChips } from '@/components/Advanced/ObjectChips';
import { ClipCard } from '@/components/Advanced/ClipCard';
import { TransitionCard } from '@/components/Advanced/TransitionCard';
import { MontageOrderList } from '@/components/Advanced/MontageOrderList';
import { ClipTweakDialog } from '@/components/Advanced/ClipTweakDialog';
import { ProgressStages } from '@/components/ProgressStages';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Photo, Analysis, Clip, TransitionPreset, FinalVideo, ProcessingStage, ObjectTag } from '@/types/estate';
import { mockApi } from '@/services/mockApi';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, Edit3 } from 'lucide-react';
import { loadProjectPhotos, saveProjectPhotos, clearProjectPhotos } from '@/lib/photoStore';
import { getProjectFromAll } from '@/services/projectStore';

// Step metadata is created after we have access to the translation function
let STEPS: Step[] = [];

const TRANSITION_PRESETS: Array<{ preset: TransitionPreset; descriptionKey: keyof typeof import('@/i18n/translations').translations }> = [
  { preset: 'Cinematic Dissolve', descriptionKey: 'cinematicDissolveDesc' },
  { preset: 'Cut + Motion Blur', descriptionKey: 'cutMotionBlurDesc' },
  { preset: 'Wipe (Minimal)', descriptionKey: 'wipeMinimalDesc' },
  { preset: 'Parallax Slide', descriptionKey: 'parallaxSlideDesc' },
  { preset: 'Soft Fade + Gold Overlay', descriptionKey: 'softFadeGoldDesc' },
];

export const Advanced = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Initialize localized steps
  STEPS = [
    { id: 'upload', label: t('stepUpload'), description: t('stepUploadDesc') },
    { id: 'analyze', label: t('stepAnalyze'), description: t('stepAnalyzeDesc') },
    { id: 'clips', label: t('stepClips'), description: t('stepClipsDesc') },
    { id: 'transitions', label: t('stepTransitions'), description: t('stepTransitionsDesc') },
    { id: 'montage', label: t('stepMontage'), description: t('stepMontageDesc') },
  ];

  // Debug logging
  console.log('Advanced component - id:', id, 'location:', location.pathname);
  
  // Extract ID from pathname as fallback
  const pathId = location.pathname.match(/\/project\/([^\/]+)/)?.[1];
  const effectiveId = id || pathId;
  console.log('Effective ID:', effectiveId, 'from params:', id, 'from path:', pathId);
  
  // Get project to load its state
  const project = getProjectFromAll(effectiveId || '');
  const projectState = project?.advancedFlowState;
  const isProjectCompleted = project?.status === 'completed' && project?.videoUrl;

  const [currentStep, setCurrentStep] = useState(
    isProjectCompleted ? 4 : (projectState?.currentStep || 0)
  );
  const [completedSteps, setCompletedSteps] = useState<number[]>(
    isProjectCompleted ? [0, 1, 2, 3, 4] : (projectState?.completedSteps || [])
  );
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const [clips, setClips] = useState<Clip[]>([]);
  const [clipOrder, setClipOrder] = useState<string[]>([]);
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const [isTweakDialogOpen, setIsTweakDialogOpen] = useState(false);
  const [regeneratingClipId, setRegeneratingClipId] = useState<string | null>(null);
  const [selectedTransition, setSelectedTransition] = useState<TransitionPreset | null>(
    isProjectCompleted ? 'Cinematic Dissolve' : null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStages, setProcessingStages] = useState<ProcessingStage[]>([]);
  const [finalVideo, setFinalVideo] = useState<FinalVideo | null>(
    isProjectCompleted ? {
      id: `project-${effectiveId}-video`,
      url: project.videoUrl!,
      durationSec: 30,
      createdAt: new Date().toISOString(),
    } : null
  );

  // Load cached photos for this project (IndexedDB first, then localStorage)
  useEffect(() => {
    if (!effectiveId || isProjectCompleted) return;
    (async () => {
      try {
        const idb = await loadProjectPhotos(effectiveId);
        if (idb && Array.isArray(idb)) {
          setPhotos(idb as Photo[]);
          // Keep localStorage in sync as a fallback snapshot
          localStorage.setItem(`estatevisio-photos-${effectiveId}`, JSON.stringify(idb));
          return;
        }
        // Fallback to localStorage
        const raw = localStorage.getItem(`estatevisio-photos-${effectiveId}`);
        if (raw) {
          const parsed = JSON.parse(raw) as Photo[];
          if (Array.isArray(parsed)) {
            setPhotos(parsed);
          } else {
            setPhotos([]);
          }
        } else {
          setPhotos([]);
        }
      } catch (e) {
        console.error('Failed to load cached photos', e);
        setPhotos([]);
      }
    })();
  }, [effectiveId, isProjectCompleted, location.pathname]); // Also reload when pathname changes (e.g., coming back from Simple)

  // Persist photos when they change (IndexedDB primary, localStorage fallback)
  useEffect(() => {
    if (!effectiveId || isProjectCompleted) return;
    try {
      // Save to IndexedDB
      void saveProjectPhotos(effectiveId, photos);
      // And keep localStorage in sync as a fallback snapshot
      localStorage.setItem(`estatevisio-photos-${effectiveId}`, JSON.stringify(photos));
    } catch (e) {
      console.error('Failed to persist photos', e);
    }
  }, [effectiveId, isProjectCompleted, photos]);

  // Load from localStorage per project (but don't override completed projects)
  useEffect(() => {
    if (!effectiveId || isProjectCompleted) return; // Don't load from localStorage for completed projects
    
    const saved = localStorage.getItem(`estatevisio-advanced-state-${effectiveId}`);
    if (saved) {
      try {
        const state = JSON.parse(saved);
        setCurrentStep(state.currentStep || projectState?.currentStep || 0);
        setCompletedSteps(state.completedSteps || projectState?.completedSteps || []);
      } catch (e) {
        console.error('Failed to load state', e);
      }
    }
  }, [effectiveId, projectState, isProjectCompleted]);

  // Save to localStorage per project (but not for completed projects)
  useEffect(() => {
    if (!effectiveId || isProjectCompleted) return; // Don't save to localStorage for completed projects
    
    localStorage.setItem(`estatevisio-advanced-state-${effectiveId}`, JSON.stringify({
      currentStep,
      completedSteps,
    }));
  }, [currentStep, completedSteps, effectiveId, isProjectCompleted]);

  // Update finalVideo when project becomes completed
  useEffect(() => {
    if (isProjectCompleted && project?.videoUrl) {
      setFinalVideo({
        id: `project-${effectiveId}-video`,
        url: project.videoUrl,
        durationSec: 30,
        createdAt: new Date().toISOString(),
      });
      // Ensure we're on the montage step (step 4) when project is completed
      setCurrentStep(4);
      setCompletedSteps([0, 1, 2, 3, 4]);
      // Set default transition for completed projects
      setSelectedTransition('Cinematic Dissolve');
    }
  }, [isProjectCompleted, project?.videoUrl, effectiveId]);

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    setCurrentStep(Math.min(currentStep + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
  };

  const handleStepClick = (stepIndex: number) => {
    // Allow navigation to completed steps, current step, or next step if previous is complete
    const isPreviousComplete = stepIndex === 0 || completedSteps.includes(stepIndex - 1);
    if (completedSteps.includes(stepIndex) || stepIndex === currentStep || isPreviousComplete) {
      setCurrentStep(stepIndex);
    }
  };

  const handleAnalyze = async () => {
    if (photos.length === 0) {
      toast({
        variant: 'destructive',
        title: t('noPhotos'),
        description: t('uploadAtLeastOne'),
      });
      return;
    }

    setIsProcessing(true);
    try {
      const results = await mockApi.analyzePhotos(photos);
      setAnalyses(results);
      handleNext();
      toast({
        title: t('analysisComplete'),
        description: `${results.length} ${t('photosAnalyzed')}`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('analysisFailed'),
        description: error instanceof Error ? error.message : t('error'),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateClips = async () => {
    setIsProcessing(true);
    try {
      const generatedClips = await mockApi.generateClips(photos, selectedObjects);
      setClips(generatedClips);
      setClipOrder(generatedClips.map(c => c.id));
      handleNext();
      toast({
        title: t('clipsGenerated'),
        description: `${generatedClips.length} ${t('clipsCreated')}`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('generationFailed'),
        description: error instanceof Error ? error.message : t('error'),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRegenerateClip = async (clipId: string, instruction: string) => {
    const clip = clips.find(c => c.id === clipId);
    if (!clip) return;

    setRegeneratingClipId(clipId);
    try {
      const newClip = await mockApi.regenerateClip(clipId, clip.photoId, instruction);
      setClips(clips.map(c => c.id === clipId ? newClip : c));
      setClipOrder(clipOrder.map(id => id === clipId ? newClip.id : id));
      toast({
        title: t('clipRegenerated'),
        description: t('clipUpdated'),
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('regenerationFailed'),
        description: error instanceof Error ? error.message : t('error'),
      });
    } finally {
      setRegeneratingClipId(null);
    }
  };

  const handleCreateMontage = async () => {
    if (!selectedTransition) {
      toast({
        variant: 'destructive',
        title: t('noTransitionSelected'),
        description: t('selectTransition'),
      });
      return;
    }

    setIsProcessing(true);
    const stages: ProcessingStage[] = [
      { label: 'Sequencing clips…', progress: 0, isComplete: false },
      { label: 'Applying transitions…', progress: 0, isComplete: false },
      { label: 'Color unification…', progress: 0, isComplete: false },
      { label: 'Mastering audio…', progress: 0, isComplete: false },
    ];
    setProcessingStages(stages);

    try {
      // Simulate stages
      for (let i = 0; i < stages.length; i++) {
        await simulateProgress(i, 1500);
        setProcessingStages(prev => prev.map((s, idx) => idx === i ? { ...s, isComplete: true } : s));
      }

      const orderedClips = clipOrder.map(id => clips.find(c => c.id === id)).filter(Boolean) as Clip[];
      const video = await mockApi.createMontage(orderedClips, selectedTransition);
      setFinalVideo(video);
      handleNext();
      toast({
        title: t('montageComplete'),
        description: t('videoReadyView'),
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('montageFailed'),
        description: error instanceof Error ? error.message : t('error'),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const simulateProgress = async (stageIndex: number, duration: number) => {
    const steps = 20;
    const stepDuration = duration / steps;
    
    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      setProcessingStages(prev => prev.map((s, idx) => 
        idx === stageIndex ? { ...s, progress: (i / steps) * 100 } : s
      ));
    }
  };

  const resetFlow = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setPhotos([]);
    setAnalyses([]);
    setSelectedObjects([]);
    setClips([]);
    setClipOrder([]);
    setSelectedTransition(null);
    setFinalVideo(null);
    if (effectiveId) {
      localStorage.removeItem(`estatevisio-advanced-state-${effectiveId}`);
      // Clear persisted photos if user starts a new project
      void clearProjectPhotos(effectiveId);
      localStorage.removeItem(`estatevisio-photos-${effectiveId}`);
    }
  };

  const editVideo = () => {
    // Go back to clips step to allow editing
    setCurrentStep(2); // Clips step (0-indexed)
    setFinalVideo(null); // Clear final video so user can regenerate
  };

  const filteredAnalyses = selectedObjects.length > 0
    ? analyses.filter(a => a.objects.some(obj => selectedObjects.includes(obj.name)))
    : analyses;

  const filteredPhotos = filteredAnalyses.map(a => photos.find(p => p.id === a.photoId)).filter(Boolean) as Photo[];

  const allObjects: ObjectTag[] = analyses.flatMap(a => a.objects);

  const selectedAnalysis = selectedPhoto ? analyses.find(a => a.photoId === selectedPhoto.id) : null;

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col overflow-visible">
      <div className="container mx-auto px-4 py-12 flex-1 overflow-visible">
        <div className="max-w-6xl mx-auto space-y-12 overflow-visible">
          {/* Stepper - Centered */}
          <Stepper steps={STEPS} currentStep={currentStep} completedSteps={completedSteps} onStepClick={handleStepClick} />

          {/* Step A: Upload */}
          {currentStep === 0 && (
            <div className="animate-fade-in space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4 tracking-wide">{t('uploadPhotosTitle')}</h2>
                <p className="text-muted text-lg font-medium tracking-wide">{t('uploadPhotosDescription')}</p>
              </div>

              <PhotoUploader photos={photos} onPhotosChange={setPhotos} />

              <div className="flex justify-end">
                <Button 
                  onClick={handleAnalyze} 
                  disabled={photos.length === 0 || isProcessing} 
                  variant="premium"
                  size="lg"
                  className="gap-3 px-10 py-6 text-lg shadow-intense hover:scale-105 transition-transform"
                >
                  {t('analyzePhotos')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step B: Analyze */}
          {currentStep === 1 && (
            <div className="animate-fade-in space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4 tracking-wide">{t('qualityAnalysisTitle')}</h2>
                <p className="text-muted text-lg font-medium tracking-wide">{t('qualityAnalysisDescription')}</p>
              </div>

              {allObjects.length > 0 && (
                <ObjectChips
                  objects={allObjects}
                  selectedObjects={selectedObjects}
                  onToggle={(name) => {
                    setSelectedObjects(prev =>
                      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
                    );
                  }}
                />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnalyses.map(analysis => {
                  const photo = photos.find(p => p.id === analysis.photoId);
                  if (!photo) return null;
                  return (
                    <GradeCard
                      key={photo.id}
                      photo={photo}
                      analysis={analysis}
                      onClick={() => setSelectedPhoto(photo)}
                    />
                  );
                })}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="lg" onClick={handleBack} className="gap-3 px-8 py-6 text-lg hover:border-primary/50">
                  <ArrowLeft className="h-5 w-5" />
                  {t('back')}
                </Button>
                <Button 
                  onClick={handleGenerateClips} 
                  disabled={isProcessing} 
                  variant="premium"
                  size="lg"
                  className="gap-3 px-10 py-6 text-lg shadow-intense hover:scale-105 transition-transform"
                >
                  {t('generateClips')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>

              <AnalysisDetailDrawer
                photo={selectedPhoto}
                analysis={selectedAnalysis}
                open={!!selectedPhoto}
                onOpenChange={(open) => !open && setSelectedPhoto(null)}
              />
            </div>
          )}

          {/* Step C: Clips */}
          {currentStep === 2 && (
            <div className="animate-fade-in space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4 tracking-wide">{t('generatedClipsTitle')}</h2>
                <p className="text-muted text-lg font-medium tracking-wide">{t('generatedClipsDescription')}</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                  {clips.map(clip => (
                    <ClipCard
                      key={clip.id}
                      clip={clip}
                      onTweakClick={() => {
                        setSelectedClip(clip);
                        setIsTweakDialogOpen(true);
                      }}
                      onVideoClick={() => {
                        setSelectedClip(clip);
                        setIsTweakDialogOpen(true);
                      }}
                    />
                  ))}
                </div>

                <div>
                  <MontageOrderList
                    clips={clips}
                    order={clipOrder}
                    onReorder={setClipOrder}
                    onReset={() => setClipOrder(clips.map(c => c.id))}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="lg" onClick={handleBack} className="gap-3 px-8 py-6 text-lg hover:border-primary/50">
                  <ArrowLeft className="h-5 w-5" />
                  {t('back')}
                </Button>
                <Button 
                  onClick={handleNext} 
                  variant="premium"
                  size="lg"
                  className="gap-3 px-10 py-6 text-lg shadow-intense hover:scale-105 transition-transform"
                >
                  {t('chooseTransitions')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step D: Transitions */}
          {currentStep === 3 && (
            <div className="animate-fade-in space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4 tracking-wide">{t('transitionStyleTitle')}</h2>
                <p className="text-muted text-lg font-medium tracking-wide">{t('transitionStyleDescription')}</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {TRANSITION_PRESETS.map(({ preset, descriptionKey }) => (
                  <TransitionCard
                    key={preset}
                    preset={preset}
                    title={
                      preset === 'Cinematic Dissolve' ? t('cinematicDissolve') :
                      preset === 'Cut + Motion Blur' ? t('cutMotionBlur') :
                      preset === 'Wipe (Minimal)' ? t('wipeMinimal') :
                      preset === 'Parallax Slide' ? t('parallaxSlide') :
                      t('softFadeGold')
                    }
                    description={t(descriptionKey as any)}
                    isSelected={selectedTransition === preset}
                    onSelect={() => setSelectedTransition(preset)}
                  />
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="lg" onClick={handleBack} className="gap-3 px-8 py-6 text-lg hover:border-primary/50">
                  <ArrowLeft className="h-5 w-5" />
                  {t('back')}
                </Button>
                <Button
                  onClick={handleCreateMontage}
                  disabled={!selectedTransition || isProcessing}
                  variant="premium"
                  size="lg"
                  className="gap-3 px-10 py-6 text-lg shadow-intense hover:scale-105 transition-transform"
                >
                  <Sparkles className="h-5 w-5" />
                  {t('createFinalMontage')}
                </Button>
              </div>
            </div>
          )}

          {/* Step E: Montage */}
          {currentStep === 4 && (
            <div className="animate-fade-in space-y-10">
              {isProcessing ? (
                <div className="max-w-2xl mx-auto py-20">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4 tracking-wide">{t('creatingMontage')}</h2>
                    <p className="text-muted text-lg font-medium tracking-wide">
                      {t('applyingTransitions')} {selectedTransition}
                    </p>
                  </div>
                  <ProgressStages stages={processingStages} />
                </div>
              ) : finalVideo ? (
                <>
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-foreground mb-4 tracking-wide">{t('montageCompleteTitle')}</h2>
                    <p className="text-muted text-lg font-medium tracking-wide">
                      {t('montageCompleteDescription')} {selectedTransition}
                    </p>
                  </div>

                  {/* Large centered video with cinematic frame */}
                  <div className="relative max-w-5xl mx-auto">
                    <VideoPlayer url={finalVideo.url} className="aspect-video shadow-intense" autoPlay />
                  </div>

                  <div className="flex flex-wrap justify-center gap-6 pt-8">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={() => setCurrentStep(3)} 
                      className="gap-3 px-8 py-6 text-lg hover:border-primary/50"
                    >
                      <ArrowLeft className="h-5 w-5" />
                      {t('editTransitions')}
                    </Button>
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Clip Tweak Dialog */}
      <ClipTweakDialog
        clip={selectedClip}
        open={isTweakDialogOpen}
        onOpenChange={setIsTweakDialogOpen}
        onRegenerate={handleRegenerateClip}
        isRegenerating={regeneratingClipId === selectedClip?.id}
      />
    </div>
  );
};
