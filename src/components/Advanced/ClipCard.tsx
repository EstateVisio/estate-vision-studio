import { Clip } from '@/types/estate';
import { Button } from '@/components/ui/button';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Edit3 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ClipCardProps = {
  clip: Clip;
  onTweakClick: () => void;
  onVideoClick: () => void;
};

export const ClipCard = ({ clip, onTweakClick, onVideoClick }: ClipCardProps) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card">
      {/* Video - Clickable */}
      <div 
        onClick={onVideoClick}
        className="cursor-pointer hover:opacity-90 transition-opacity"
      >
        <VideoPlayer url={clip.url} className="aspect-video" />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-card-foreground mb-1">
              {clip.caption}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span>{clip.durationSec}s</span>
              {clip.version > 1 && (
                <span className="px-2 py-0.5 bg-primary/20 text-primary rounded">
                  v{clip.version}
                </span>
              )}
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onTweakClick}
            className="gap-2 flex-shrink-0"
          >
            <Edit3 className="h-3 w-3" />
            Tweak
          </Button>
        </div>
      </div>
    </div>
  );
};
