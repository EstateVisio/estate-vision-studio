import { ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import logo from '@/assets/logo.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  // Check if we're in a project context
  const isInProject = location.pathname.startsWith('/project/');
  const isSimple = isInProject && !location.pathname.includes('/advanced');
  const isAdvanced = isInProject && location.pathname.includes('/advanced');

  return (
    <header className="border-b border-border bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isInProject && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">My Projects</span>
            </Button>
          )}
          <img src={logo} alt="EstateVisio" className="h-8" />
        </div>

        <div className="flex items-center gap-3">
          {/* Flow Selector - only show in project context */}
          {isInProject && (
            <div className="hidden sm:flex bg-background rounded-2xl p-1 gap-1">
              <Button
                variant={isSimple ? 'default' : 'ghost'}
                size="sm"
                onClick={() => navigate(`/project/${id}`)}
                className="rounded-xl"
              >
                Simple
              </Button>
              <Button
                variant={isAdvanced ? 'default' : 'ghost'}
                size="sm"
                onClick={() => navigate(`/project/${id}/advanced`)}
                className="rounded-xl"
              >
                Advanced
              </Button>
            </div>
          )}

          {/* How it Works */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">How it works</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>How EstateVisio Studio Works</DialogTitle>
                <DialogDescription className="text-left space-y-4 pt-4">
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">📸 Simple Flow</h3>
                    <p className="text-sm text-muted">
                      Upload photos → Auto-process → Receive your montage video
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">🎬 Advanced Flow</h3>
                    <ol className="text-sm text-muted space-y-2 list-decimal list-inside">
                      <li>Upload your real-estate photos (max 10)</li>
                      <li>Analyze quality grades and object insights</li>
                      <li>Generate individual clips with custom regeneration</li>
                      <li>Choose cinematic transition presets</li>
                      <li>Create final montage with professional polish</li>
                    </ol>
                  </div>
                  <div className="bg-warmSand/20 p-3 rounded-xl">
                    <p className="text-sm text-card-foreground">
                      <strong>Demo mode:</strong> All processing is simulated with realistic delays.
                      No real backend required.
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Mobile Flow Selector - only show in project context */}
      {isInProject && (
        <div className="sm:hidden border-t border-border px-4 py-2 flex gap-2">
          <Button
            variant={isSimple ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigate(`/project/${id}`)}
            className="flex-1 rounded-xl"
          >
            Simple
          </Button>
          <Button
            variant={isAdvanced ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigate(`/project/${id}/advanced`)}
            className="flex-1 rounded-xl"
          >
            Advanced
          </Button>
        </div>
      )}
    </header>
  );
};
