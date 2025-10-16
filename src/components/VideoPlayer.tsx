import { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type VideoPlayerProps = {
  url: string;
  className?: string;
  autoPlay?: boolean;
};

export const VideoPlayer = ({ url, className, autoPlay = false }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className={cn("video-wrapper relative group", className)}>
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Controls Overlay with cinematic gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className="bg-background/60 backdrop-blur-md hover:bg-primary/90 hover:scale-110 transition-all shadow-glow h-12 w-12"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-foreground" />
            ) : (
              <Play className="h-6 w-6 text-foreground" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="bg-background/60 backdrop-blur-md hover:bg-primary/90 hover:scale-110 transition-all shadow-glow h-12 w-12"
          >
            {isMuted ? (
              <VolumeX className="h-6 w-6 text-foreground" />
            ) : (
              <Volume2 className="h-6 w-6 text-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Play Button Overlay (when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-sm">
          <Button
            size="icon"
            onClick={togglePlay}
            className="h-20 w-20 rounded-full shadow-intense animate-scale-in hover:scale-110 transition-transform"
          >
            <Play className="h-10 w-10 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};
