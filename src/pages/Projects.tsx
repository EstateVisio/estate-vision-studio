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
    <main className="flex-1 container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Projects</h1>
            <p className="text-muted-foreground">
              Create and manage your real estate video projects
            </p>
          </div>
          <Button onClick={() => navigate('/project/new')} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            New Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <Card
              key={project.id}
              className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              {/* Media Preview - Show photos for all projects */}
              {project.photoUrls && project.photoUrls.length > 0 && (
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="grid grid-cols-2 h-full">
                    {project.photoUrls.slice(0, 4).map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`${project.name} preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}

              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <div className="flex items-center">
                    {getStatusIcon(project.status)}
                  </div>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    <span>{project.photosCount} photos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Created {format(project.createdAt, 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Updated {format(project.updatedAt, 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {mockProjects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">
              Get started by creating your first real estate video project
            </p>
            <Button onClick={() => navigate('/project/new')} size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Create Your First Project
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};
