import { useTranslation } from 'react-i18next';
import { Activity } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark-800 border-t border-dark-600 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-danger-light" />
            <span className="text-lg font-bold">
              <span className="text-danger-light">War</span>
              <span className="text-gray-100">Scope</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm text-center max-w-md">
            {t('footer.disclaimer')}
          </p>
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} WarScope
          </p>
        </div>
      </div>
    </footer>
  );
}
