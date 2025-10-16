import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Image, Clock, CheckCircle2, Loader2, FileEdit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProjects } from '@/fixtures/projectData';
import { format } from 'date-fns';
import { CreateProjectDialog } from '@/components/CreateProjectDialog';
import { useLanguage } from '@/hooks/useLanguage';

export const Projects = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'draft':
        return <FileEdit className="h-5 w-5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 container mx-auto px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header - Cinematic */}
        <div className="flex items-center justify-between mb-16 animate-fade-in">
          <div>
            <h1 className="text-5xl font-bold mb-3 tracking-wide text-foreground">My Projects</h1>
            <p className="text-muted-foreground text-lg tracking-wide font-medium">
              Create and manage your real estate video projects
            </p>
          </div>
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            variant="premium" 
            size="lg" 
            className="px-10 py-6 text-lg shadow-intense hover:scale-105 transition-transform"
          >
            <Plus className="mr-2 h-6 w-6" />
            {t('newProject')}
          </Button>
        </div>

        {/* Projects Gallery - Modern Variable Width */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {mockProjects.map((project, idx) => (
            <Card
              key={project.id}
              className="group cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-intense hover:-translate-y-2 bg-card border-0"
              onClick={() => navigate(`/project/${project.id}`)}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Cinematic Large Preview */}
              {project.photoUrls && project.photoUrls.length > 0 && (
                <div className="aspect-video bg-background relative overflow-hidden">
                  <div className="grid grid-cols-2 h-full transition-transform duration-700 group-hover:scale-110">
                    {project.photoUrls.slice(0, 4).map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`${project.name} preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ))}
                  </div>
                  {/* Dark overlay at bottom for title */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />
                  
                  {/* Title overlay - appears on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-2xl font-bold text-foreground tracking-wide mb-1">{project.name}</h3>
                    <p className="text-sm text-foreground/80">{project.description}</p>
                  </div>
                  
                  {/* Gold glow border on hover */}
                  <div className="absolute inset-0 ring-2 ring-primary/0 group-hover:ring-primary/50 transition-all duration-500 rounded-2xl shadow-[0_0_0_rgba(0,0,0,0)] group-hover:shadow-glow" />
                </div>
              )}

              <CardContent className="pt-6 pb-6">
                {/* Status and metadata */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(project.status)}
                  </div>
                </div>

                <div className="space-y-2.5 text-sm text-foreground/70 font-medium">
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4 text-primary" />
                    <span>{project.photosCount} photos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Created {format(project.createdAt, 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Updated {format(project.updatedAt, 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State - Premium */}
        {mockProjects.length === 0 && (
          <div className="text-center py-32 animate-fade-in">
            <h3 className="text-3xl font-bold mb-4 tracking-wide text-foreground">No projects yet</h3>
            <p className="text-muted-foreground mb-12 text-lg tracking-wide max-w-md mx-auto">
              Get started by creating your first cinematic real estate video project
            </p>
            <Button 
              onClick={() => setIsDialogOpen(true)} 
              variant="premium" 
              size="lg" 
              className="px-12 py-6 text-lg shadow-intense hover:scale-105 transition-transform"
            >
              <Plus className="mr-2 h-6 w-6" />
              {t('createFirstProject')}
            </Button>
          </div>
        )}
      </div>

      <CreateProjectDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </main>
  );
};
