import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '@/hooks/useData';
import { loadMissiles } from '@/data/loader';
import { MissileGrid } from '@/components/arsenal/MissileGrid';
import { Rocket } from 'lucide-react';

export function ArsenalPage() {
  const { t } = useTranslation();
  const { data: missiles, loading } = useData(useCallback(() => loadMissiles(), []));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-warning/20">
          <Rocket className="w-5 h-5 text-warning" />
        </div>
        <h1 className="text-2xl font-bold text-gray-100">{t('arsenal.title')}</h1>
      </div>

      {loading || !missiles ? (
        <div className="text-center py-20 text-gray-500">{t('common.loading')}</div>
      ) : (
        <MissileGrid missiles={missiles} />
      )}
    </div>
  );
}
