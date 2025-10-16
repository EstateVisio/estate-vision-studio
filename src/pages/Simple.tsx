import { useState } from 'react';
import { PhotoUploader } from '@/components/PhotoUploader';
import { ProgressStages } from '@/components/ProgressStages';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { Photo, ProcessingStage, FinalVideo } from '@/types/estate';
import { mockApi } from '@/services/mockApi';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Sparkles, RotateCcw, Download } from 'lucide-react';
import { mockProjects } from '@/fixtures/projectData';

type ProcessState = 'idle' | 'processing' | 'complete' | 'error';

export const Simple = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get project to check if it's completed
  const project = mockProjects.find(p => p.id === id);
  const isProjectCompleted = project?.status === 'completed' && project?.videoUrl;

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [state, setState] = useState<ProcessState>(isProjectCompleted ? 'complete' : 'idle');
  const [stages, setStages] = useState<ProcessingStage[]>([]);
  const [result, setResult] = useState<FinalVideo | null>(
    isProjectCompleted ? {
      id: `project-${id}-video`,
      url: project.videoUrl!,
      durationSec: 30,
      createdAt: new Date().toISOString(),
    } : null
  );

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

  const downloadVideo = () => {
    if (!result) return;
    
    const link = document.createElement('a');
    link.href = result.url;
    link.download = 'estate-video-montage.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Download started',
      description: 'Your video is being downloaded.',
    });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-1">
        {state === 'idle' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4 tracking-wide">
                Simple Flow
              </h2>
              <p className="text-muted text-lg font-medium tracking-wide max-w-2xl mx-auto">
                Upload your photos and let us create a beautiful video montage automatically
              </p>
            </div>

            <PhotoUploader photos={photos} onPhotosChange={setPhotos} />

            <div className="flex justify-center pt-8">
              <Button
                onClick={startProcessing}
                disabled={photos.length === 0}
                variant="premium"
                size="lg"
                className="gap-3 px-12 py-6 text-lg shadow-intense hover:scale-105 transition-transform"
              >
                <Sparkles className="h-6 w-6" />
                Create Video
              </Button>
            </div>
          </div>
        )}

        {state === 'processing' && (
          <div className="max-w-2xl mx-auto py-20 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4 tracking-wide">
                Creating your montage
              </h2>
              <p className="text-muted text-lg font-medium tracking-wide">
                We're taking a closer look at lighting and framing…
              </p>
            </div>
            <ProgressStages stages={stages} />
          </div>
        )}

        {state === 'complete' && result && (
          <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-foreground mb-4 tracking-wide">
                Your montage is ready! 🎬
              </h2>
              <p className="text-muted text-lg font-medium tracking-wide">
                Preview your cinematic video below
              </p>
            </div>

            {/* Large centered video with gold vignette */}
            <div className="relative max-w-4xl mx-auto">
              <VideoPlayer url={result.url} className="aspect-video shadow-intense" autoPlay />
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <Button 
                onClick={downloadVideo} 
                variant="premium" 
                size="lg" 
                className="gap-3 px-10 py-6 text-lg shadow-intense hover:scale-105 transition-transform"
              >
                <Download className="h-5 w-5" />
                Download Video
              </Button>
              <Button 
                onClick={reset} 
                variant="outline" 
                size="lg" 
                className="gap-3 px-10 py-6 text-lg hover:border-primary/50"
              >
                <RotateCcw className="h-5 w-5" />
                Start Over
              </Button>
              <Button 
                onClick={() => navigate('/advanced')} 
                variant="outline" 
                size="lg" 
                className="gap-3 px-10 py-6 text-lg hover:border-primary/50"
              >
                <Sparkles className="h-5 w-5" />
                Try Advanced
              </Button>
            </div>
          </div>
        )}

        {state === 'error' && (
          <div className="max-w-2xl mx-auto py-20 text-center animate-fade-in">
            <div className="bg-destructive/20 rounded-2xl p-12 shadow-card">
              <h2 className="text-3xl font-bold text-destructive mb-4 tracking-wide">
                Something went wrong
              </h2>
              <p className="text-muted text-lg font-medium mb-8">
                Don't worry, you can try again
              </p>
              <Button 
                onClick={() => setState('idle')} 
                variant="premium" 
                size="lg" 
                className="gap-3 px-10 py-6 text-lg"
              >
                <RotateCcw className="h-5 w-5" />
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
