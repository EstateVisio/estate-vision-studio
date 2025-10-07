import { useState } from 'react';
import { Clip } from '@/types/estate';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { VideoPlayer } from '@/components/VideoPlayer';
import { RefreshCw, Edit3, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ClipCardProps = {
  clip: Clip;
  onRegenerate: (clipId: string, instruction: string) => void;
  isRegenerating?: boolean;
};

export const ClipCard = ({ clip, onRegenerate, isRegenerating }: ClipCardProps) => {
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [instruction, setInstruction] = useState('');

  const handleRegenerate = () => {
    if (instruction.trim()) {
      onRegenerate(clip.id, instruction);
      setIsEditingInstructions(false);
      setInstruction('');
    }
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card">
      {/* Video */}
      <VideoPlayer url={clip.url} className="aspect-video" />

      {/* Info */}
      <div className="p-4 space-y-3">
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
            onClick={() => setIsEditingInstructions(!isEditingInstructions)}
            className="gap-2 flex-shrink-0"
          >
            {isEditingInstructions ? (
              <>
                <X className="h-3 w-3" />
                Cancel
              </>
            ) : (
              <>
                <Edit3 className="h-3 w-3" />
                Tweak
              </>
            )}
          </Button>
        </div>

        {/* Regeneration Instructions */}
        {isEditingInstructions && (
          <div className="space-y-2 animate-slide-in-up">
            <Textarea
              placeholder="E.g., slow pan left, warmer tone, focus on foreground..."
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              className="min-h-[80px] text-sm"
            />
            <Button
              onClick={handleRegenerate}
              disabled={!instruction.trim() || isRegenerating}
              size="sm"
              className="w-full gap-2"
            >
              {isRegenerating ? (
                <>
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-3 w-3" />
                  Regenerate Clip
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
