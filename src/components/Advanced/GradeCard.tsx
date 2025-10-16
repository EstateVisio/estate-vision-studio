import { Photo, Analysis } from '@/types/estate';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

type GradeCardProps = {
  photo: Photo;
  analysis: Analysis;
  onClick?: () => void;
};

const GRADE_COLORS = {
  A: 'bg-gradeA text-card',
  B: 'bg-gradeB text-card',
  C: 'bg-gradeC text-card',
  D: 'bg-gradeD text-card-foreground',
  E: 'bg-gradeE text-card',
  F: 'bg-gradeF text-card',
};

export const GradeCard = ({ photo, analysis, onClick }: GradeCardProps) => {
  const { t } = useLanguage();
  const { grade } = analysis;
  const avgScore = Math.round(
    (grade.exposure + grade.sharpness + grade.framing + grade.lighting) / 4
  );

  return (
    <div
      className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-intense hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 cursor-pointer group"
      onClick={onClick}
    >
      {/* Photo */}
      <div className="aspect-video relative overflow-hidden">
        <img
          src={photo.url}
          alt={photo.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Grade Badge - Larger, more prominent */}
        <div className="absolute top-3 right-3">
          <Badge
            className={cn(
              "text-xl font-bold px-4 py-2 shadow-intense",
              GRADE_COLORS[grade.overall]
            )}
          >
            {grade.overall}
          </Badge>
        </div>

        {/* Gold glow border on hover */}
        <div className="absolute inset-0 ring-2 ring-primary/0 group-hover:ring-primary/40 transition-all duration-500 rounded-t-2xl" />
      </div>

      {/* Info */}
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold text-card-foreground truncate flex-1 tracking-wide">
            {photo.name}
          </p>
          <Button variant="ghost" size="sm" className="h-9 gap-2 text-xs hover:bg-primary/10">
            <Info className="h-4 w-4" />
            {t('details')}
          </Button>
        </div>

        {/* Score Bars with Gold Accent */}
        <div className="space-y-2">
          {[
            { label: t('exposure'), value: grade.exposure },
            { label: t('sharpness'), value: grade.sharpness },
            { label: t('framing'), value: grade.framing },
            { label: t('lighting'), value: grade.lighting },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-muted w-20 flex-shrink-0">{label}</span>
              <div className="flex-1 bg-background rounded-full h-2 overflow-hidden shadow-inner">
                <div
                  className="h-full bg-primary transition-all duration-700 shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="text-xs font-bold text-card-foreground w-10 text-right">{value}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-border">
          <p className="text-sm text-muted font-medium">
            {t('overallScore')} <span className="font-bold text-primary text-base">{avgScore}/100</span>
          </p>
        </div>
      </div>
    </div>
  );
};
