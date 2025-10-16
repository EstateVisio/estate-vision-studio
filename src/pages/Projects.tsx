import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Image, Clock, CheckCircle2, Loader2, FileEdit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProjects } from '@/fixtures/projectData';
import { format } from 'date-fns';

export const Projects = () => {
  const navigate = useNavigate();

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
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-3 tracking-wide">My Projects</h1>
            <p className="text-muted-foreground text-lg tracking-wide">
              Create and manage your real estate video projects
            </p>
          </div>
          <Button onClick={() => navigate('/project/new')} variant="premium" size="lg" className="px-8">
            <Plus className="mr-2 h-5 w-5" />
            New Project
          </Button>
        </div>

        {/* Projects Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProjects.map((project) => (
            <Card
              key={project.id}
              className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-intense hover:-translate-y-1 bg-background/40 backdrop-blur-sm"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              {/* Cinematic Media Preview */}
              {project.photoUrls && project.photoUrls.length > 0 && (
                <div className="aspect-video bg-muted/20 relative overflow-hidden">
                  <div className="grid grid-cols-2 h-full transition-transform duration-500 group-hover:scale-105">
                    {project.photoUrls.slice(0, 4).map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`${project.name} preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 ring-1 ring-primary/0 group-hover:ring-primary/40 transition-all duration-300 rounded-2xl" />
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-1">
                  <CardTitle className="text-xl tracking-wide">{project.name}</CardTitle>
                  <div className="flex items-center">
                    {getStatusIcon(project.status)}
                  </div>
                </div>
                <CardDescription className="text-muted tracking-wide">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="space-y-2 text-sm text-muted">
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4 text-primary/60" />
                    <span>{project.photosCount} photos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary/60" />
                    <span>Created {format(project.createdAt, 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary/60" />
                    <span>Updated {format(project.updatedAt, 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {mockProjects.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold mb-3 tracking-wide">No projects yet</h3>
            <p className="text-muted-foreground mb-8 text-lg tracking-wide">
              Get started by creating your first real estate video project
            </p>
            <Button onClick={() => navigate('/project/new')} variant="premium" size="lg" className="px-8">
              <Plus className="mr-2 h-5 w-5" />
              Create Your First Project
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};
