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
    <div className={cn("relative rounded-2xl overflow-hidden shadow-card group", className)}>
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Controls Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className="bg-background/50 backdrop-blur-sm hover:bg-background/70"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-foreground" />
            ) : (
              <Play className="h-5 w-5 text-foreground" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="bg-background/50 backdrop-blur-sm hover:bg-background/70"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-foreground" />
            ) : (
              <Volume2 className="h-5 w-5 text-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Play Button Overlay (when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px]">
          <Button
            size="icon"
            onClick={togglePlay}
            className="h-16 w-16 rounded-full shadow-glow animate-scale-in"
          >
            <Play className="h-8 w-8 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};
