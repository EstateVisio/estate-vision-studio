import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';

interface UserSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    email: string;
  };
}

export const UserSettingsDialog = ({ open, onOpenChange, user }: UserSettingsDialogProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Profile form schema
  const profileSchema = z.object({
    name: z.string()
      .trim()
      .min(2, { message: t('errorNameRequired') })
      .max(60, { message: t('errorNameRequired') }),
    email: z.string()
      .trim()
      .email({ message: t('errorEmailFormat') })
      .max(255, { message: t('errorEmailFormat') }),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  }).refine((data) => {
    // If any password field is filled, validate all password fields
    const hasPasswordFields = data.currentPassword || data.newPassword || data.confirmPassword;
    
    if (!hasPasswordFields) return true;
    
    // All password fields must be filled
    if (!data.currentPassword) return false;
    if (!data.newPassword) return false;
    if (!data.confirmPassword) return false;
    
    // New password must meet requirements
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(data.newPassword)) return false;
    
    // Passwords must match
    if (data.newPassword !== data.confirmPassword) return false;
    
    return true;
  }, {
    message: t('errorPasswordWeak'),
    path: ['newPassword'],
  });

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Implement actual API calls
      // if (values.name !== user.name || values.email !== user.email) {
      //   await updateUserProfile({ name: values.name, email: values.email });
      // }
      // 
      // if (values.currentPassword && values.newPassword) {
      //   await updateUserPassword({ current: values.currentPassword, next: values.newPassword });
      // }
      
      console.log('Profile updated:', {
        name: values.name,
        email: values.email,
        passwordChanged: !!values.newPassword,
      });
      
      toast({
        title: t('success'),
        description: t('settingsUpdated'),
      });
      
      // Reset password fields
      form.setValue('currentPassword', '');
      form.setValue('newPassword', '');
      form.setValue('confirmPassword', '');
      setIsPasswordOpen(false);
      
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('error'),
        description: error instanceof Error ? error.message : t('failedToUpdateSettings'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      form.reset();
      setIsPasswordOpen(false);
      onOpenChange(false);
    }
  };

  // Check if form has changes
  const hasChanges = 
    form.watch('name') !== user.name || 
    form.watch('email') !== user.email ||
    !!form.watch('currentPassword') ||
    !!form.watch('newPassword') ||
    !!form.watch('confirmPassword');

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        className="max-w-[640px] w-[min(92vw,640px)] bg-white shadow-[0_12px_36px_rgba(0,0,0,0.18)] border border-black/[0.06] p-0 gap-0 animate-in fade-in-0 zoom-in-98 duration-200"
        onPointerDownOutside={(e) => isLoading && e.preventDefault()}
        onEscapeKeyDown={(e) => isLoading && e.preventDefault()}
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-black/[0.06]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-card-foreground">
              {t('userSettingsTitle')}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {t('userSettingsSubtitle')}
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="absolute top-6 right-6 p-2 rounded-lg hover:bg-black/5 transition-colors disabled:opacity-50"
            aria-label={t('close')}
          >
            <X className="h-5 w-5 text-accent" />
          </button>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="px-6 py-6 space-y-6">
            {/* Profile Section */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-card-foreground">
                      {t('name')} <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        className="h-12 bg-white border-border focus:border-primary focus:ring-primary placeholder:text-black text-black"
                        placeholder={t('namePlaceholder')}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-muted-foreground" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-card-foreground">
                      {t('email')} <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        disabled={isLoading}
                        className="h-12 bg-white border-border focus:border-primary focus:ring-primary placeholder:text-black text-black"
                        placeholder={t('emailPlaceholder')}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-muted-foreground" />
                  </FormItem>
                )}
              />
            </div>

            {/* Change Password Section */}
            <Collapsible open={isPasswordOpen} onOpenChange={setIsPasswordOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-between h-auto p-4 hover:bg-black/5 transition-colors"
                  disabled={isLoading}
                >
                  <span className="text-sm font-semibold text-card-foreground">
                    {t('changePassword')}
                  </span>
                  <ChevronDown 
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                      isPasswordOpen ? 'rotate-180' : ''
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-4 pt-4 animate-accordion-down data-[state=closed]:animate-accordion-up">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-card-foreground">
                        {t('currentPassword')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          disabled={isLoading}
                          className="h-12 bg-white border-border focus:border-primary focus:ring-primary placeholder:text-black text-black"
                          placeholder="••••••••"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-muted-foreground" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-card-foreground">
                        {t('newPassword')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          disabled={isLoading}
                          className="h-12 bg-white border-border focus:border-primary focus:ring-primary placeholder:text-black text-black"
                          placeholder="••••••••"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-muted-foreground/80">
                        {t('passwordHelper')}
                      </FormDescription>
                      <FormMessage className="text-xs text-muted-foreground" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-card-foreground">
                        {t('confirmPassword')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          disabled={isLoading}
                          className="h-12 bg-white border-border focus:border-primary focus:ring-primary placeholder:text-black text-black"
                          placeholder="••••••••"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-muted-foreground" />
                    </FormItem>
                  )}
                />
              </CollapsibleContent>
            </Collapsible>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading || !hasChanges || !form.formState.isValid}
                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-card-foreground font-semibold rounded-full"
              >
                {isLoading ? t('saving') : t('saveChanges')}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 h-12 hover:bg-black/5"
              >
                {t('cancel')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
