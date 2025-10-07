import { Photo, Analysis } from '@/types/estate';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const { grade } = analysis;
  const avgScore = Math.round(
    (grade.exposure + grade.sharpness + grade.framing + grade.lighting) / 4
  );

  return (
    <div
      className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all cursor-pointer group"
      onClick={onClick}
    >
      {/* Photo */}
      <div className="aspect-video relative overflow-hidden">
        <img
          src={photo.url}
          alt={photo.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        
        {/* Grade Badge */}
        <div className="absolute top-2 right-2">
          <Badge
            className={cn(
              "text-lg font-bold px-3 py-1 shadow-lg",
              GRADE_COLORS[grade.overall]
            )}
          >
            {grade.overall}
          </Badge>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-card-foreground truncate flex-1">
            {photo.name}
          </p>
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
            <Info className="h-3 w-3" />
            Details
          </Button>
        </div>

        {/* Mini Score Bars */}
        <div className="space-y-1">
          {[
            { label: 'Exposure', value: grade.exposure },
            { label: 'Sharpness', value: grade.sharpness },
            { label: 'Framing', value: grade.framing },
            { label: 'Lighting', value: grade.lighting },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-xs text-muted w-16 flex-shrink-0">{label}</span>
              <div className="flex-1 bg-background rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="text-xs text-muted w-8 text-right">{value}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted">
            Overall score: <span className="font-semibold text-card-foreground">{avgScore}/100</span>
          </p>
        </div>
      </div>
    </div>
  );
};
