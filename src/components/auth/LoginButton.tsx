import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, LogOut, ChevronDown, User } from 'lucide-react';

export function LoginButton() {
  const { user, profile, loading, configured, signInWithTwitter, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!configured) return null;
  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-dark-600 animate-pulse" />
    );
  }

  if (!user) {
    return (
      <button
        onClick={signInWithTwitter}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-700 hover:bg-dark-600 text-gray-300 hover:text-gray-100 transition-colors text-sm"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Sign in with X</span>
      </button>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-dark-600 transition-colors"
      >
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt=""
            className="w-7 h-7 rounded-full border border-dark-600"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
            <User className="w-4 h-4 text-accent" />
          </div>
        )}
        <span className="hidden sm:inline text-sm text-gray-300">
          {profile?.display_name || profile?.username || 'User'}
        </span>
        <ChevronDown className="w-3 h-3 text-gray-500" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-dark-700 border border-dark-600 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="px-3 py-2 border-b border-dark-600">
            <p className="text-sm font-medium text-gray-200">
              {profile?.display_name || 'User'}
            </p>
            {profile?.username && (
              <p className="text-xs text-gray-500">@{profile.username}</p>
            )}
          </div>
          <button
            onClick={() => { signOut(); setOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-100 hover:bg-dark-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
