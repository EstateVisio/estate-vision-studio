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
    <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-intense hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 group">
      {/* Video - Clickable with elegant hover */}
      <div 
        onClick={onVideoClick}
        className="cursor-pointer relative overflow-hidden"
      >
        <VideoPlayer url={clip.url} className="aspect-video" />
        <div className="absolute inset-0 ring-2 ring-primary/0 group-hover:ring-primary/40 transition-all duration-500 rounded-t-2xl pointer-events-none" />
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-card-foreground mb-2 tracking-wide">
              {clip.caption}
            </p>
            <div className="flex items-center gap-3 text-sm text-muted font-medium">
              <span>{clip.durationSec}s</span>
              {clip.version > 1 && (
                <span className="px-2.5 py-1 bg-primary/20 text-primary rounded-full font-semibold text-xs">
                  v{clip.version}
                </span>
              )}
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onTweakClick}
            className="gap-2 flex-shrink-0 hover:bg-primary/10 hover:border-primary/50 transition-all"
          >
            <Edit3 className="h-4 w-4" />
            Tweak
          </Button>
        </div>
      </div>
    </div>
  );
};
