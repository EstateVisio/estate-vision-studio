import { ArrowLeft, HelpCircle, Languages } from 'lucide-react';
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
import { useLanguage } from '@/hooks/useLanguage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { language, setLanguage, t } = useLanguage();
  
  // Check if we're in a project context
  const isInProject = location.pathname.startsWith('/project/');
  const isSimple = isInProject && !location.pathname.includes('/advanced');
  const isAdvanced = isInProject && location.pathname.includes('/advanced');

  return (
    <>
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-md shadow-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="EstateVisio" className="h-14" />
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 h-14 px-6 text-base">
                  <Languages className="h-6 w-6" />
                  <span className="hidden sm:inline uppercase">{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('bg')}>
                  Български
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* How it Works */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="gap-2 h-14 px-6 text-base">
                  <HelpCircle className="h-6 w-6" />
                  <span className="hidden sm:inline">{t('howItWorks')}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{t('helpDialogTitle')}</DialogTitle>
                  <DialogDescription className="text-left space-y-4 pt-4">
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-2">{t('simpleFlowTitle')}</h3>
                      <p className="text-sm text-muted">
                        {t('simpleFlowDescription')}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-2">{t('advancedFlowTitle')}</h3>
                      <ol className="text-sm text-muted space-y-2 list-decimal list-inside">
                        <li>{t('advancedFlowStep1')}</li>
                        <li>{t('advancedFlowStep2')}</li>
                        <li>{t('advancedFlowStep3')}</li>
                        <li>{t('advancedFlowStep4')}</li>
                        <li>{t('advancedFlowStep5')}</li>
                      </ol>
                    </div>
                    <div className="bg-warmSand/20 p-3 rounded-xl">
                      <p className="text-sm text-card-foreground">
                        <strong>{t('demoModeTitle')}</strong> {t('demoModeDescription')}
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Breadcrumb / Back Navigation with Flow Selector */}
      {isInProject && (
        <div className="border-b border-border bg-background">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t('myProjects')}</span>
            </Button>
            
            {/* Flow Selector */}
            <div className="flex bg-muted/50 rounded-2xl p-1 gap-1">
              <Button
                variant={isSimple ? 'default' : 'ghost'}
                size="sm"
                onClick={() => navigate(`/project/${id}`)}
                className="rounded-xl"
              >
                {t('simple')}
              </Button>
              <Button
                variant={isAdvanced ? 'default' : 'ghost'}
                size="sm"
                onClick={() => navigate(`/project/${id}/advanced`)}
                className="rounded-xl"
              >
                {t('advanced')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
