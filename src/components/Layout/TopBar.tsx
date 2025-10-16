import { ArrowLeft, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { useLanguage } from '@/hooks/useLanguage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenu } from './UserMenu';

export const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { language, setLanguage, t } = useLanguage();
  
  // Extract ID from pathname as fallback (same pattern as Simple/Advanced components)
  const pathId = location.pathname.match(/\/project\/([^\/]+)/)?.[1] || 
                 location.pathname.match(/^\/([^\/]+)$/)?.[1];
  const effectiveId = id || pathId;
  
  // Debug logging
  console.log('TopBar - id:', id, 'pathId:', pathId, 'effectiveId:', effectiveId, 'location:', location.pathname);
  
  // Check if we're in a project context
  const isInProject = location.pathname.startsWith('/project/') || (effectiveId && !location.pathname.includes('/'));
  const isSimple = isInProject && !location.pathname.includes('/advanced');
  const isAdvanced = isInProject && location.pathname.includes('/advanced');

  return (
    <div className="top-bar-container bg-background">
      <header className="border-b border-border/50 shadow-card">
        <div className="container flex items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-3 min-w-0">
            <img src={logo} alt="EstateVisio" className="logo" />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 h-10 px-4 text-sm">
                  <Languages className="h-5 w-5" />
                  <span className="hidden sm:inline uppercase">{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('bg')}>
                  Български
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Breadcrumb / Back Navigation with Flow Selector */}
      {isInProject && (
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4">
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
                onClick={() => navigate(`/project/${effectiveId}`)}
                className="rounded-xl"
              >
                {t('simple')}
              </Button>
              <Button
                variant={isAdvanced ? 'default' : 'ghost'}
                size="sm"
                onClick={() => navigate(`/project/${effectiveId}/advanced`)}
                className="rounded-xl"
              >
                {t('advanced')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
