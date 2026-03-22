import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { Menu, X, Globe, Activity } from 'lucide-react';

const navItems = [
  { key: 'home', path: '/' },
  { key: 'feed', path: '/feed' },
  { key: 'map', path: '/map' },
  { key: 'economy', path: '/economy' },
  { key: 'arsenal', path: '/arsenal' },
  { key: 'blackouts', path: '/blackouts' },
  { key: 'documents', path: '/documents' },
  { key: 'sources', path: '/sources' },
];

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'he', label: 'עב' },
  { code: 'ar', label: 'عر' },
];

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const { currentLang, switchLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-dark-800/95 backdrop-blur-md border-b border-dark-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Activity className="w-6 h-6 text-danger-light group-hover:text-danger transition-colors" />
            <span className="text-xl font-bold tracking-tight">
              <span className="text-danger-light">War</span>
              <span className="text-gray-100">Scope</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-danger/20 text-danger-light'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-dark-600'
                }`}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-dark-700 rounded-lg p-1">
              <Globe className="w-4 h-4 text-gray-500 mx-1" />
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    currentLang === lang.code
                      ? 'bg-accent text-white'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-dark-600 text-gray-400"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="lg:hidden pb-4 border-t border-dark-600 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-danger/20 text-danger-light'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-dark-600'
                }`}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
