import { useCallback } from 'react';
import { Upload, X, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Photo } from '@/types/estate';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type PhotoUploaderProps = {
  photos: Photo[];
  onPhotosChange: (photos: Photo[]) => void;
  maxPhotos?: number;
  onReorder?: (photos: Photo[]) => void;
};

export const PhotoUploader = ({
  photos,
  onPhotosChange,
  maxPhotos = 10,
  onReorder,
}: PhotoUploaderProps) => {
  const { toast } = useToast();

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const validFiles = Array.from(files).filter(file => {
        const isValid = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isValid) {
          toast({
            variant: 'destructive',
            title: 'Invalid file type',
            description: `${file.name} is not a JPEG or PNG image.`,
          });
        }
        return isValid;
      });

      if (photos.length + validFiles.length > maxPhotos) {
        toast({
          variant: 'destructive',
          title: 'Too many photos',
          description: `Maximum ${maxPhotos} photos allowed. You tried to add ${validFiles.length} more.`,
        });
        return;
      }

      const newPhotos: Photo[] = validFiles.map((file, idx) => ({
        id: `${Date.now()}-${idx}`,
        url: URL.createObjectURL(file),
        name: file.name,
        file,
      }));

      onPhotosChange([...photos, ...newPhotos]);
      
      toast({
        title: 'Photos added',
        description: `${newPhotos.length} photo${newPhotos.length > 1 ? 's' : ''} added successfully.`,
      });
    },
    [photos, maxPhotos, onPhotosChange, toast]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const removePhoto = (id: string) => {
    const photo = photos.find(p => p.id === id);
    if (photo?.url.startsWith('blob:')) {
      URL.revokeObjectURL(photo.url);
    }
    onPhotosChange(photos.filter(p => p.id !== id));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handlePhotoDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex === dropIndex || isNaN(dragIndex)) return;

    const newPhotos = [...photos];
    const [draggedItem] = newPhotos.splice(dragIndex, 1);
    newPhotos.splice(dropIndex, 0, draggedItem);
    
    if (onReorder) {
      onReorder(newPhotos);
    } else {
      onPhotosChange(newPhotos);
    }
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={cn(
          "border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center",
          "hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer",
          "bg-card"
        )}
      >
        <input
          type="file"
          id="photo-upload"
          multiple
          accept="image/jpeg,image/png"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        <label htmlFor="photo-upload" className="cursor-pointer">
          <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Drop photos here or click to browse
          </h3>
          <p className="text-sm text-muted">
            JPEG or PNG • Max {maxPhotos} photos • {photos.length}/{maxPhotos} uploaded
          </p>
        </label>
      </div>

      {/* Thumbnail Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handlePhotoDrop(e, index)}
              className="group relative aspect-video rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all cursor-move bg-card"
            >
              <img
                src={photo.url}
                alt={photo.name}
                className="w-full h-full object-cover"
              />
              
              {/* Drag Handle */}
              <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="h-4 w-4 text-foreground" />
              </div>
              
              {/* Remove Button */}
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removePhoto(photo.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              {/* Photo Name */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-2">
                <p className="text-xs text-foreground truncate">{photo.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
