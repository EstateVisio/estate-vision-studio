import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

type CreateProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateProjectDialog = ({ open, onOpenChange }: CreateProjectDialogProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);

  const validateName = (value: string): boolean => {
    if (!value.trim()) {
      setNameError(t('projectNameRequired'));
      return false;
    }
    if (value.trim().length < 2 || value.trim().length > 80) {
      setNameError(t('projectNameLength'));
      return false;
    }
    if (!/^[a-zA-Z0-9\s\-_]+$/.test(value)) {
      setNameError(t('projectNameInvalid'));
      return false;
    }
    setNameError('');
    return true;
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (nameTouched) {
      validateName(value);
    }
  };

  const handleNameBlur = () => {
    setNameTouched(true);
    validateName(name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setNameTouched(true);
    if (!validateName(name)) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate project creation
    setTimeout(() => {
      const newProjectId = Date.now().toString();
      
      toast({
        title: t('projectCreated'),
        description: `${t('projectCreatedDesc')}: ${name}`,
      });
      
      onOpenChange(false);
      setIsSubmitting(false);
      setName('');
      setDescription('');
      setNameError('');
      setNameTouched(false);
      
      navigate(`/project/${newProjectId}`);
    }, 800);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
      // Reset form after animation completes
      setTimeout(() => {
        setName('');
        setDescription('');
        setNameError('');
        setNameTouched(false);
      }, 200);
    }
  };

  const isValid = name.trim().length >= 2 && name.trim().length <= 80 && /^[a-zA-Z0-9\s\-_]+$/.test(name);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        className="max-w-[640px] bg-[#F8F9FA] border border-black/[0.04] shadow-intense rounded-2xl p-0 gap-0 animate-scale-in"
        aria-describedby="create-project-description"
      >
        {/* Header */}
        <DialogHeader className="p-8 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-3xl font-bold text-[#323434] tracking-wide mb-2">
                {t('newProjectTitle')}
              </DialogTitle>
              <DialogDescription id="create-project-description" className="text-[#6C6D6D] text-base tracking-wide">
                {t('newProjectSubtitle')}
              </DialogDescription>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-[#6C6D6D] hover:text-[#323434] transition-colors disabled:opacity-50"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="project-name" className="text-[#323434] font-semibold text-sm tracking-wide">
              {t('projectNameLabel')}
            </Label>
            <Input
              id="project-name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              onBlur={handleNameBlur}
              placeholder={t('projectNamePlaceholder')}
              className="h-12 bg-white border-[#6C6D6D]/20 focus:ring-2 focus:ring-[#A98A45] focus:ring-offset-0 focus:border-[#A98A45] rounded-xl text-base transition-all shadow-sm"
              disabled={isSubmitting}
              autoFocus
              aria-invalid={!!nameError}
              aria-describedby={nameError ? "name-error" : undefined}
            />
            {nameError && nameTouched && (
              <p id="name-error" className="text-[#6C6D6D]/85 text-sm mt-1 animate-fade-in">
                {nameError}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="project-description" className="text-[#323434] font-semibold text-sm tracking-wide">
              {t('projectDescriptionLabel')}
            </Label>
            <Textarea
              id="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('projectDescriptionPlaceholder')}
              className="min-h-[100px] max-h-[200px] bg-white border-[#6C6D6D]/20 focus:ring-2 focus:ring-[#A98A45] focus:ring-offset-0 focus:border-[#A98A45] rounded-xl text-base transition-all resize-y shadow-sm"
              disabled={isSubmitting}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-[#323434] hover:bg-[#323434]/5 h-12 px-6 rounded-xl font-semibold transition-all"
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-[#A98A45] hover:bg-[#8F7439] text-white h-12 px-8 rounded-xl font-bold shadow-lg hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              title={!isValid ? t('enterProjectName') : undefined}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t('creating')}
                </>
              ) : (
                t('createProject')
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};