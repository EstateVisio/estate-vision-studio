import { Lightbulb } from 'lucide-react';

type FooterProps = {
  tip?: string;
};

export const Footer = ({ tip }: FooterProps) => {
  const defaultTip = 'For best results, upload high-resolution photos with good lighting.';

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-start gap-3 text-sm text-muted">
          <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
          <p>{tip || defaultTip}</p>
        </div>
      </div>
    </footer>
  );
};
