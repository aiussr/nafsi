import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IndicatorChart } from './IndicatorChart';
import type { EconomicIndicator, EconomicCategory } from '@/types';

const categories: EconomicCategory[] = ['oil', 'currency', 'stock', 'trade', 'inflation', 'commodity'];

interface EconomyDashboardProps {
  indicators: EconomicIndicator[];
}

export function EconomyDashboard({ indicators }: EconomyDashboardProps) {
  const { t } = useTranslation();
  const [category, setCategory] = useState<string>('');

  const filtered = category ? indicators.filter((i) => i.category === category) : indicators;

  return (
    <div className="space-y-4">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategory('')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            !category ? 'bg-accent text-white' : 'bg-dark-700 text-gray-400 hover:text-gray-200'
          }`}
        >
          {t('common.all')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
              category === cat ? 'bg-accent text-white' : 'bg-dark-700 text-gray-400 hover:text-gray-200'
            }`}
          >
            {t(`economy.${cat}`, cat)}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((indicator) => (
          <IndicatorChart key={indicator.id} indicator={indicator} />
        ))}
      </div>
    </div>
  );
}
