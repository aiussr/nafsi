import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '@/hooks/useData';
import { loadBlackouts } from '@/data/loader';
import { BlackoutTracker } from '@/components/blackout/BlackoutTracker';
import { WifiOff } from 'lucide-react';

export function BlackoutPage() {
  const { t } = useTranslation();
  const { data: blackouts, loading } = useData(useCallback(() => loadBlackouts(), []), 300_000);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-purple-500/20">
          <WifiOff className="w-5 h-5 text-purple-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-100">{t('blackout.title')}</h1>
      </div>

      {loading || !blackouts ? (
        <div className="text-center py-20 text-gray-500">{t('common.loading')}</div>
      ) : (
        <BlackoutTracker blackouts={blackouts} />
      )}
    </div>
  );
}
