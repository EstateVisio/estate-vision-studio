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
    <main className="flex-1 py-12">
      <div className="container">
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
            className="group relative overflow-hidden px-0 w-14 h-14 rounded-full shadow-intense transition-all duration-300 ease-in-out hover:w-52 hover:px-6 hover:rounded-full min-h-[44px]"
          >
            <div className="flex items-center justify-center w-full">
              <Plus className="h-6 w-6 transition-all duration-300 group-hover:mr-2 flex-shrink-0" />
              <span className="absolute opacity-0 whitespace-nowrap transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:relative text-lg ml-0">
                Create New
              </span>
            </div>
          </Button>
        </div>

        {/* Projects Gallery */}
        <div className="grid-auto animate-fade-in">
          {mockProjects.map((project, idx) => (
            <Card
              key={project.id}
              className="card-shell group cursor-pointer transition-all duration-500 hover:shadow-intense hover:-translate-y-2"
              onClick={() => navigate(`/project/${project.id}`)}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Cinematic Large Preview */}
              {project.photoUrls && project.photoUrls.length > 0 && (
                <div className="card-media bg-background relative">
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
                    <h3 className="text-2xl font-bold text-card-foreground tracking-wide mb-1">{project.name}</h3>
                    <p className="text-sm text-muted">{project.description}</p>
                  </div>
                  
                  {/* Gold glow border on hover */}
                  <div className="absolute inset-0 ring-2 ring-primary/0 group-hover:ring-primary/50 transition-all duration-500 rounded-2xl shadow-[0_0_0_rgba(0,0,0,0)] group-hover:shadow-glow" />
                </div>
              )}

              <div className="card-body">
                {/* Status and metadata */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(project.status)}
                  </div>
                </div>

                <div className="space-y-2.5 text-sm text-card-foreground/70 font-medium">
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
              </div>
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
              className="group relative overflow-hidden px-0 w-14 h-14 rounded-full shadow-intense transition-all duration-300 ease-in-out hover:w-52 hover:px-6 hover:rounded-full min-h-[44px]"
            >
              <div className="flex items-center justify-center w-full">
                <Plus className="h-6 w-6 transition-all duration-300 group-hover:mr-2 flex-shrink-0" />
                <span className="absolute opacity-0 whitespace-nowrap transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:relative text-lg ml-0">
                  Create New
                </span>
              </div>
            </Button>
          </div>
        )}
      </div>

      <CreateProjectDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </main>
  );
};
