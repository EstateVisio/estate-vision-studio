import { useState } from 'react';
import { User, Settings, CreditCard, LogOut } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserSettingsDialog } from './UserSettingsDialog';

// Mock user data - replace with actual user context/auth
const mockUser = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  initials: 'AJ',
};

export const UserMenu = () => {
  const { t } = useLanguage();
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    setShowSignOutDialog(false);
    setOpen(false);
    // TODO: Implement actual sign-out logic
    console.log('User signed out');
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all hover:scale-105">
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarFallback className="bg-charcoal text-gold font-semibold text-sm">
                    {mockUser.initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('account')}</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent 
          align="end" 
          className="w-[280px] p-5 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-black/[0.04] animate-in fade-in-0 zoom-in-95 duration-200"
          sideOffset={8}
        >
          {/* User Info Header */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-black/[0.06]">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-charcoal text-gold font-semibold">
                {mockUser.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-card-foreground text-sm truncate">
                {mockUser.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {mockUser.email}
              </p>
            </div>
          </div>

          {/* Menu Actions */}
          <div className="space-y-1">
            <DropdownMenuItem 
              className="h-11 cursor-pointer hover:bg-primary/8 rounded-lg transition-colors"
              onClick={() => {
                setOpen(false);
                // TODO: Navigate to profile
                console.log('Navigate to profile');
              }}
            >
              <User className="h-[18px] w-[18px] mr-3 text-card-foreground/70" />
              <span className="tracking-wide">{t('viewProfile')}</span>
            </DropdownMenuItem>

            <DropdownMenuItem 
              className="h-11 cursor-pointer hover:bg-primary/8 rounded-lg transition-colors"
              onClick={() => {
                setOpen(false);
                setShowSettingsDialog(true);
              }}
            >
              <Settings className="h-[18px] w-[18px] mr-3 text-card-foreground/70" />
              <span className="tracking-wide">{t('settings')}</span>
            </DropdownMenuItem>

            <DropdownMenuItem 
              className="h-11 cursor-pointer hover:bg-primary/8 rounded-lg transition-colors"
              onClick={() => {
                setOpen(false);
                // TODO: Navigate to billing
                console.log('Navigate to billing');
              }}
            >
              <CreditCard className="h-[18px] w-[18px] mr-3 text-card-foreground/70" />
              <span className="tracking-wide">{t('billing')}</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2 bg-black/[0.06]" />

            <DropdownMenuItem 
              className="h-11 cursor-pointer hover:bg-destructive/8 rounded-lg transition-colors text-destructive focus:text-destructive"
              onClick={() => setShowSignOutDialog(true)}
            >
              <LogOut className="h-[18px] w-[18px] mr-3" />
              <span className="tracking-wide">{t('signOut')}</span>
            </DropdownMenuItem>
          </div>

          {/* Optional Footer */}
          <div className="mt-4 pt-3 border-t border-black/[0.06]">
            <p className="text-xs text-muted-foreground text-center">{t('version')}</p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Settings Dialog */}
      <UserSettingsDialog 
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
        user={mockUser}
      />

      {/* Sign Out Confirmation Dialog */}
      <AlertDialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('signOut')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('confirmSignOut')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleSignOut}
              className="bg-destructive hover:bg-destructive/90"
            >
              {t('signOut')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
