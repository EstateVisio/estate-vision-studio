import { useState } from 'react';
import { Clip } from '@/types/estate';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VideoPlayer } from '@/components/VideoPlayer';
import { RefreshCw, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

type TweakOption = {
  id: string;
  label: string;
  instruction: string;
  icon: string;
};

const TWEAK_OPTIONS: TweakOption[] = [
  {
    id: 'hallucinations',
    label: 'Fix Hallucinations',
    instruction: 'Remove any AI hallucinations or unrealistic elements, keep only authentic real estate features',
    icon: '🔍',
  },
  {
    id: 'static',
    label: 'Add Movement',
    instruction: 'Add subtle camera movement and motion to make the video more dynamic and engaging',
    icon: '📹',
  },
  {
    id: 'lighting',
    label: 'Improve Lighting',
    instruction: 'Enhance lighting and color grading for a more premium, professional look',
    icon: '💡',
  },
  {
    id: 'warmer',
    label: 'Warmer Tone',
    instruction: 'Apply warmer color tones for a more inviting, cozy atmosphere',
    icon: '🌅',
  },
  {
    id: 'sharper',
    label: 'Increase Sharpness',
    instruction: 'Enhance sharpness and clarity of details throughout the clip',
    icon: '✨',
  },
  {
    id: 'slower',
    label: 'Slow Motion',
    instruction: 'Slow down the pace for a more cinematic, elegant feel',
    icon: '🎬',
  },
];

type ClipTweakDialogProps = {
  clip: Clip | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegenerate: (clipId: string, instruction: string) => void;
  isRegenerating?: boolean;
};

export const ClipTweakDialog = ({
  clip,
  open,
  onOpenChange,
  onRegenerate,
  isRegenerating,
}: ClipTweakDialogProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [customInstruction, setCustomInstruction] = useState('');

  const handleToggleOption = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleRegenerate = () => {
    if (!clip) return;

    const selectedInstructions = TWEAK_OPTIONS
      .filter(opt => selectedOptions.includes(opt.id))
      .map(opt => opt.instruction);

    const allInstructions = [
      ...selectedInstructions,
      customInstruction.trim(),
    ].filter(Boolean).join('. ');

    if (allInstructions) {
      onRegenerate(clip.id, allInstructions);
      setSelectedOptions([]);
      setCustomInstruction('');
      onOpenChange(false);
    }
  };

  const hasAnySelection = selectedOptions.length > 0 || customInstruction.trim().length > 0;

  if (!clip) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Tweak Clip</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video Player */}
          <VideoPlayer url={clip.url} className="aspect-video rounded-xl overflow-hidden" />

          {/* Clip Info */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-card-foreground">
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

          {/* Tweak Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Quick Tweaks
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TWEAK_OPTIONS.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleToggleOption(option.id)}
                  className={cn(
                    "p-3 rounded-xl border-2 transition-all duration-200",
                    "hover:scale-[1.02] active:scale-95",
                    "flex flex-col items-center gap-2 text-center",
                    selectedOptions.includes(option.id)
                      ? "border-primary bg-primary/10 shadow-glow"
                      : "border-border bg-background hover:border-primary/50"
                  )}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-xs font-medium text-foreground">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Instructions */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-card-foreground">
              Custom Instructions (Optional)
            </label>
            <Textarea
              placeholder="E.g., focus on the fireplace, add golden hour lighting..."
              value={customInstruction}
              onChange={(e) => setCustomInstruction(e.target.value)}
              className="min-h-[80px] text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedOptions([]);
                setCustomInstruction('');
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRegenerate}
              disabled={!hasAnySelection || isRegenerating}
              className="gap-2"
            >
              {isRegenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Regenerate Clip
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
