import { Photo, Analysis } from '@/types/estate';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

type AnalysisDetailDrawerProps = {
  photo: Photo | null;
  analysis: Analysis | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const GRADE_COLORS = {
  A: 'bg-gradeA text-card',
  B: 'bg-gradeB text-card',
  C: 'bg-gradeC text-card',
  D: 'bg-gradeD text-card-foreground',
  E: 'bg-gradeE text-card',
  F: 'bg-gradeF text-card',
};

export const AnalysisDetailDrawer = ({
  photo,
  analysis,
  open,
  onOpenChange,
}: AnalysisDetailDrawerProps) => {
  const { t } = useLanguage();
  
  if (!photo || !analysis) return null;

  const { grade, objects } = analysis;
  const scores = [
    { label: t('exposure'), value: grade.exposure, max: 100 },
    { label: t('sharpness'), value: grade.sharpness, max: 100 },
    { label: t('framing'), value: grade.framing, max: 100 },
    { label: t('lighting'), value: grade.lighting, max: 100 },
  ];

  // Calculate radial chart data
  const centerX = 100;
  const centerY = 100;
  const radius = 70;
  const angleStep = (2 * Math.PI) / scores.length;

  const points = scores.map((score, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (score.value / score.max) * radius;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return { x, y, ...score };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            {t('qualityAnalysis')}
            <Badge className={cn("text-base", GRADE_COLORS[grade.overall])}>
              {t('grade')} {grade.overall}
            </Badge>
          </SheetTitle>
          <SheetDescription>{photo.name}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Photo Preview */}
          <div className="aspect-video rounded-xl overflow-hidden">
            <img
              src={photo.url}
              alt={photo.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Radial Chart */}
          <div className="bg-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-card-foreground mb-4">{t('scoreBreakdown')}</h3>
            <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto">
              {/* Grid circles */}
              {[0.25, 0.5, 0.75, 1].map(r => (
                <circle
                  key={r}
                  cx={centerX}
                  cy={centerY}
                  r={radius * r}
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              ))}

              {/* Axis lines */}
              {points.map((p, i) => (
                <line
                  key={i}
                  x1={centerX}
                  y1={centerY}
                  x2={centerX + radius * Math.cos(i * angleStep - Math.PI / 2)}
                  y2={centerY + radius * Math.sin(i * angleStep - Math.PI / 2)}
                  stroke="hsl(var(--muted))"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              ))}

              {/* Data polygon */}
              <path
                d={pathData}
                fill="hsl(var(--primary))"
                fillOpacity="0.3"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />

              {/* Data points */}
              {points.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="4" fill="hsl(var(--primary))" />
                  <text
                    x={centerX + (radius + 20) * Math.cos(i * angleStep - Math.PI / 2)}
                    y={centerY + (radius + 20) * Math.sin(i * angleStep - Math.PI / 2)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs fill-current text-card-foreground font-medium"
                  >
                    {p.label}
                  </text>
                  <text
                    x={centerX + (radius + 20) * Math.cos(i * angleStep - Math.PI / 2)}
                    y={centerY + (radius + 20) * Math.sin(i * angleStep - Math.PI / 2) + 12}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs fill-current text-muted"
                  >
                    {p.value}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Recommendation */}
          <div className="bg-warmSand/20 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-card-foreground mb-2">{t('recommendation')}</h3>
            <p className="text-sm text-muted">{grade.recommendation}</p>
          </div>

          {/* Detected Objects */}
          {objects.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-card-foreground mb-3">{t('detectedObjects')}</h3>
              <div className="flex flex-wrap gap-2">
                {objects.map(obj => (
                  <Badge key={obj.name} variant="secondary" className="gap-2">
                    {obj.name}
                    <span className="text-xs opacity-70">
                      {Math.round(obj.confidence * 100)}%
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
