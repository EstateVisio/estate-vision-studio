import { useState } from 'react';
import { PhotoUploader } from '@/components/PhotoUploader';
import { ProgressStages } from '@/components/ProgressStages';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { Photo, ProcessingStage, FinalVideo } from '@/types/estate';
import { mockApi } from '@/services/mockApi';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Sparkles, RotateCcw } from 'lucide-react';

type ProcessState = 'idle' | 'processing' | 'complete' | 'error';

export const Simple = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [state, setState] = useState<ProcessState>('idle');
  const [stages, setStages] = useState<ProcessingStage[]>([]);
  const [result, setResult] = useState<FinalVideo | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const startProcessing = async () => {
    if (photos.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No photos',
        description: 'Please upload at least one photo to continue.',
      });
      return;
    }

    setState('processing');
    
    const processingStages: ProcessingStage[] = [
      { label: 'Analyzing photos…', progress: 0, isComplete: false },
      { label: 'Generating scenes…', progress: 0, isComplete: false },
      { label: 'Stitching preview…', progress: 0, isComplete: false },
    ];
    setStages(processingStages);

    try {
      // Stage 1: Analyzing
      await simulateProgress(0, 6000);
      setStages(prev => prev.map((s, i) => i === 0 ? { ...s, isComplete: true } : s));

      // Stage 2: Generating
      await simulateProgress(1, 5000);
      setStages(prev => prev.map((s, i) => i === 1 ? { ...s, isComplete: true } : s));

      // Stage 3: Stitching
      await simulateProgress(2, 4000);
      setStages(prev => prev.map((s, i) => i === 2 ? { ...s, isComplete: true } : s));

      const video = await mockApi.simpleProcess(photos);
      setResult(video);
      setState('complete');
      
      toast({
        title: 'Video ready!',
        description: 'Your montage has been created successfully.',
      });
    } catch (error) {
      setState('error');
      toast({
        variant: 'destructive',
        title: 'Processing failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  };

  const simulateProgress = async (stageIndex: number, duration: number) => {
    const steps = 20;
    const stepDuration = duration / steps;
    
    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      setStages(prev => prev.map((s, idx) => 
        idx === stageIndex ? { ...s, progress: (i / steps) * 100 } : s
      ));
    }
  };

  const reset = () => {
    setPhotos([]);
    setState('idle');
    setStages([]);
    setResult(null);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        {state === 'idle' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-card-foreground mb-2">
                Simple Flow
              </h2>
              <p className="text-muted">
                Upload your photos and let us create a beautiful video montage automatically
              </p>
            </div>

            <PhotoUploader photos={photos} onPhotosChange={setPhotos} />

            <div className="flex justify-center pt-4">
              <Button
                onClick={startProcessing}
                disabled={photos.length === 0}
                size="lg"
                className="gap-2 shadow-glow"
              >
                <Sparkles className="h-5 w-5" />
                Create Video
              </Button>
            </div>
          </div>
        )}

        {state === 'processing' && (
          <div className="max-w-2xl mx-auto py-16 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-2">
                Creating your montage
              </h2>
              <p className="text-muted">
                We're taking a closer look at lighting and framing…
              </p>
            </div>
            <ProgressStages stages={stages} />
          </div>
        )}

        {state === 'complete' && result && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-card-foreground mb-2">
                Your montage is ready! 🎬
              </h2>
              <p className="text-muted">
                Preview your video below
              </p>
            </div>

            <VideoPlayer url={result.url} className="aspect-video max-w-3xl mx-auto" autoPlay />

            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Button onClick={reset} variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Start Over
              </Button>
              <Button onClick={() => navigate('/advanced')} className="gap-2">
                <Sparkles className="h-4 w-4" />
                Try Advanced
              </Button>
            </div>
          </div>
        )}

        {state === 'error' && (
          <div className="max-w-2xl mx-auto py-16 text-center animate-fade-in">
            <div className="bg-terracotta/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-destructive mb-2">
                Something went wrong
              </h2>
              <p className="text-muted mb-6">
                Don't worry, you can try again
              </p>
              <Button onClick={() => setState('idle')} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
