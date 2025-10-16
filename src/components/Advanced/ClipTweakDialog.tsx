import { useState } from 'react';
import { Clip } from '@/types/estate';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VideoPlayer } from '@/components/VideoPlayer';
import { RefreshCw, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/useLanguage';

type TweakOption = {
  id: string;
  label: string;
  instruction: string;
  icon: string;
};

const getTweakOptions = (t: (key: string) => string): TweakOption[] => [
  {
    id: 'hallucinations',
    label: t('fixHallucinations'),
    instruction: t('fixHallucinationsDesc'),
    icon: '🔍',
  },
  {
    id: 'static',
    label: t('addMovement'),
    instruction: t('addMovementDesc'),
    icon: '📹',
  },
  {
    id: 'lighting',
    label: t('improveLighting'),
    instruction: t('improveLightingDesc'),
    icon: '💡',
  },
  {
    id: 'warmer',
    label: t('warmerTone'),
    instruction: t('warmerToneDesc'),
    icon: '🌅',
  },
  {
    id: 'sharper',
    label: t('increaseSharpness'),
    instruction: t('increaseSharpnessDesc'),
    icon: '✨',
  },
  {
    id: 'slower',
    label: t('slowMotion'),
    instruction: t('slowMotionDesc'),
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
  const { t } = useLanguage();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [customInstruction, setCustomInstruction] = useState('');
  
  const TWEAK_OPTIONS = getTweakOptions(t);

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
          <DialogTitle className="text-xl font-bold">{t('tweakClip')}</DialogTitle>
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
              {t('quickTweaks')}
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
              {t('customInstructions')}
            </label>
            <Textarea
              placeholder={t('customInstructionsPlaceholder')}
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
              {t('cancel')}
            </Button>
            <Button
              onClick={handleRegenerate}
              disabled={!hasAnySelection || isRegenerating}
              className="gap-2"
            >
              {isRegenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  {t('regenerating')}
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  {t('regenerateClip')}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
