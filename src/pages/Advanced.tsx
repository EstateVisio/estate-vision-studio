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
import { useNavigate, useParams } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { mockProjects } from '@/fixtures/projectData';

const STEPS: Step[] = [
  { id: 'upload', label: 'Upload', description: 'Add photos' },
  { id: 'analyze', label: 'Analyze', description: 'Quality check' },
  { id: 'clips', label: 'Clips', description: 'Generate scenes' },
  { id: 'transitions', label: 'Transitions', description: 'Choose style' },
  { id: 'montage', label: 'Montage', description: 'Final video' },
];

const TRANSITION_PRESETS: Array<{ preset: TransitionPreset; description: string }> = [
  {
    preset: 'Cinematic Dissolve',
    description: 'Smooth crossfade with subtle motion blur, perfect for luxury estates.',
  },
  {
    preset: 'Cut + Motion Blur',
    description: 'Dynamic cuts with directional blur for modern, energetic pacing.',
  },
  {
    preset: 'Wipe (Minimal)',
    description: 'Clean geometric wipes with minimal distraction from the imagery.',
  },
  {
    preset: 'Parallax Slide',
    description: 'Layered sliding effect creating depth and dimension between scenes.',
  },
  {
    preset: 'Soft Fade + Gold Overlay',
    description: 'Elegant fade with subtle gold tint for premium, warm transitions.',
  },
];

export const Advanced = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get project to load its state
  const project = mockProjects.find(p => p.id === id);
  const projectState = project?.advancedFlowState;

  const [currentStep, setCurrentStep] = useState(projectState?.currentStep || 0);
  const [completedSteps, setCompletedSteps] = useState<number[]>(projectState?.completedSteps || []);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const [clips, setClips] = useState<Clip[]>([]);
  const [clipOrder, setClipOrder] = useState<string[]>([]);
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const [isTweakDialogOpen, setIsTweakDialogOpen] = useState(false);
  const [regeneratingClipId, setRegeneratingClipId] = useState<string | null>(null);
  const [selectedTransition, setSelectedTransition] = useState<TransitionPreset | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStages, setProcessingStages] = useState<ProcessingStage[]>([]);
  const [finalVideo, setFinalVideo] = useState<FinalVideo | null>(null);

  // Load from localStorage per project
  useEffect(() => {
    if (!id) return;
    
    const saved = localStorage.getItem(`estatevisio-advanced-state-${id}`);
    if (saved) {
      try {
        const state = JSON.parse(saved);
        setCurrentStep(state.currentStep || projectState?.currentStep || 0);
        setCompletedSteps(state.completedSteps || projectState?.completedSteps || []);
      } catch (e) {
        console.error('Failed to load state', e);
      }
    }
  }, [id, projectState]);

  // Save to localStorage per project
  useEffect(() => {
    if (!id) return;
    
    localStorage.setItem(`estatevisio-advanced-state-${id}`, JSON.stringify({
      currentStep,
      completedSteps,
    }));
  }, [currentStep, completedSteps, id]);

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
        title: 'No photos',
        description: 'Please upload at least one photo.',
      });
      return;
    }

    setIsProcessing(true);
    try {
      const results = await mockApi.analyzePhotos(photos);
      setAnalyses(results);
      handleNext();
      toast({
        title: 'Analysis complete',
        description: `${results.length} photos analyzed successfully.`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Analysis failed',
        description: error instanceof Error ? error.message : 'Unknown error',
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
        title: 'Clips generated',
        description: `${generatedClips.length} clips created successfully.`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Generation failed',
        description: error instanceof Error ? error.message : 'Unknown error',
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
        title: 'Clip regenerated',
        description: 'Your clip has been updated.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Regeneration failed',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setRegeneratingClipId(null);
    }
  };

  const handleCreateMontage = async () => {
    if (!selectedTransition) {
      toast({
        variant: 'destructive',
        title: 'No transition selected',
        description: 'Please select a transition preset.',
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
        title: 'Montage complete!',
        description: 'Your video is ready to view.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Montage failed',
        description: error instanceof Error ? error.message : 'Unknown error',
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
    if (id) {
      localStorage.removeItem(`estatevisio-advanced-state-${id}`);
    }
  };

  const filteredAnalyses = selectedObjects.length > 0
    ? analyses.filter(a => a.objects.some(obj => selectedObjects.includes(obj.name)))
    : analyses;

  const filteredPhotos = filteredAnalyses.map(a => photos.find(p => p.id === a.photoId)).filter(Boolean) as Photo[];

  const allObjects: ObjectTag[] = analyses.flatMap(a => a.objects);

  const selectedAnalysis = selectedPhoto ? analyses.find(a => a.photoId === selectedPhoto.id) : null;

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Stepper - Centered */}
          <Stepper steps={STEPS} currentStep={currentStep} completedSteps={completedSteps} onStepClick={handleStepClick} />

          {/* Step A: Upload */}
          {currentStep === 0 && (
            <div className="animate-fade-in space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4 tracking-wide">Upload Photos</h2>
                <p className="text-muted text-lg font-medium tracking-wide">Add up to 10 real-estate photos to begin</p>
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
                  Analyze Photos
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step B: Analyze */}
          {currentStep === 1 && (
            <div className="animate-fade-in space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4 tracking-wide">Quality Analysis</h2>
                <p className="text-muted text-lg font-medium tracking-wide">Review grades and filter by detected objects</p>
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
                  Back
                </Button>
                <Button 
                  onClick={handleGenerateClips} 
                  disabled={isProcessing} 
                  variant="premium"
                  size="lg"
                  className="gap-3 px-10 py-6 text-lg shadow-intense hover:scale-105 transition-transform"
                >
                  Generate Clips
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
                <h2 className="text-3xl font-bold text-foreground mb-4 tracking-wide">Generated Clips</h2>
                <p className="text-muted text-lg font-medium tracking-wide">Review, regenerate, and arrange your clips</p>
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
                  Back
                </Button>
                <Button 
                  onClick={handleNext} 
                  variant="premium"
                  size="lg"
                  className="gap-3 px-10 py-6 text-lg shadow-intense hover:scale-105 transition-transform"
                >
                  Choose Transitions
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step D: Transitions */}
          {currentStep === 3 && (
            <div className="animate-fade-in space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4 tracking-wide">Transition Style</h2>
                <p className="text-muted text-lg font-medium tracking-wide">Select how clips flow into each other</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {TRANSITION_PRESETS.map(({ preset, description }) => (
                  <TransitionCard
                    key={preset}
                    preset={preset}
                    description={description}
                    isSelected={selectedTransition === preset}
                    onSelect={() => setSelectedTransition(preset)}
                  />
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="lg" onClick={handleBack} className="gap-3 px-8 py-6 text-lg hover:border-primary/50">
                  <ArrowLeft className="h-5 w-5" />
                  Back
                </Button>
                <Button
                  onClick={handleCreateMontage}
                  disabled={!selectedTransition || isProcessing}
                  variant="premium"
                  size="lg"
                  className="gap-3 px-10 py-6 text-lg shadow-intense hover:scale-105 transition-transform"
                >
                  <Sparkles className="h-5 w-5" />
                  Create Final Montage
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
                    <h2 className="text-3xl font-bold text-foreground mb-4 tracking-wide">
                      Creating your montage
                    </h2>
                    <p className="text-muted text-lg font-medium tracking-wide">
                      Applying {selectedTransition} transitions…
                    </p>
                  </div>
                  <ProgressStages stages={processingStages} />
                </div>
              ) : finalVideo ? (
                <>
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-foreground mb-4 tracking-wide">
                      Your montage is ready! 🎬
                    </h2>
                    <p className="text-muted text-lg font-medium tracking-wide">
                      Professional video created with {selectedTransition}
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
                      Edit Transitions
                    </Button>
                    <Button 
                      onClick={resetFlow} 
                      variant="premium"
                      size="lg"
                      className="gap-3 px-10 py-6 text-lg shadow-intense hover:scale-105 transition-transform"
                    >
                      <RotateCcw className="h-5 w-5" />
                      Start New Project
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
