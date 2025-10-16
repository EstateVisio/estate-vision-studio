import { ReactNode, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type PasswordGateProps = {
  children: ReactNode;
};

const STORAGE_KEY = 'estatevisio-pass-ok';
const STATIC_PASSWORD = 'estatevisio2025';

export function PasswordGate({ children }: PasswordGateProps) {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const isAuthorized = useMemo(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  }, []);

  if (isAuthorized) {
    return <>{children}</>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === STATIC_PASSWORD) {
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch {}
      // Force re-render by updating a local state; simplest approach is to set error to null and rely on memo check via a key on wrapper
      // but we can also use location reload to ensure full app load after unlocking
      window.location.reload();
      return;
    }
    setError('Incorrect password');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-sm rounded-2xl border shadow-card p-6 bg-card">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold tracking-wide text-card-foreground">EstateVisio Demo</h1>
          <p className="text-muted-foreground text-sm mt-1">Enter password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ev-pass" className="block text-sm font-medium text-card-foreground mb-2">
              Password
            </label>
            <Input
              id="ev-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
            />
          </div>
          {error && <div className="text-sm text-destructive">{error}</div>}
          <Button type="submit" className="w-full" variant="premium">
            Unlock
          </Button>
        </form>
      </div>
    </div>
  );
}


