import { useAuth } from '@/hooks/useAuth';
import { LogIn } from 'lucide-react';
import type { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, configured, signInWithTwitter } = useAuth();

  if (!configured) return null;

  if (!user) {
    return (
      fallback || (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <p className="text-sm text-gray-500">Sign in to participate</p>
          <button
            onClick={signInWithTwitter}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors text-sm"
          >
            <LogIn className="w-4 h-4" />
            Sign in with X
          </button>
        </div>
      )
    );
  }

  return <>{children}</>;
}
