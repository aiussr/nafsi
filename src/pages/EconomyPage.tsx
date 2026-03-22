import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '@/hooks/useData';
import { loadEconomic } from '@/data/loader';
import { EconomyDashboard } from '@/components/economy/EconomyDashboard';
import { TrendingUp } from 'lucide-react';

export function EconomyPage() {
  const { t } = useTranslation();
  const { data: economic, loading } = useData(useCallback(() => loadEconomic(), []));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/20">
          <TrendingUp className="w-5 h-5 text-accent" />
        </div>
        <h1 className="text-2xl font-bold text-gray-100">{t('economy.title')}</h1>
      </div>

      {loading || !economic ? (
        <div className="text-center py-20 text-gray-500">{t('common.loading')}</div>
      ) : (
        <EconomyDashboard indicators={economic} />
      )}
    </div>
  );
}
