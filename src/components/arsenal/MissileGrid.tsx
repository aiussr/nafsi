import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MissileCard } from './MissileCard';
import type { Missile } from '@/types';

interface MissileGridProps {
  missiles: Missile[];
}

export function MissileGrid({ missiles }: MissileGridProps) {
  const { t } = useTranslation();
  const [countryFilter, setCountryFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');

  const filtered = useMemo(() => {
    let result = missiles;
    if (countryFilter) result = result.filter((m) => m.country === countryFilter);
    if (typeFilter) result = result.filter((m) => m.type === typeFilter);
    return result;
  }, [missiles, countryFilter, typeFilter]);

  const types = [...new Set(missiles.map((m) => m.type))];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCountryFilter('')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium ${!countryFilter ? 'bg-accent text-white' : 'bg-dark-700 text-gray-400'}`}
        >
          {t('common.all')}
        </button>
        <button
          onClick={() => setCountryFilter('IR')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium ${countryFilter === 'IR' ? 'bg-green-600 text-white' : 'bg-dark-700 text-gray-400'}`}
        >
          {t('arsenal.iran')} 🇮🇷
        </button>
        <button
          onClick={() => setCountryFilter('IL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium ${countryFilter === 'IL' ? 'bg-blue-600 text-white' : 'bg-dark-700 text-gray-400'}`}
        >
          {t('arsenal.israel')} 🇮🇱
        </button>

        <div className="w-px bg-dark-600 mx-1" />

        {types.map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(typeFilter === type ? '' : type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${typeFilter === type ? 'bg-warning text-dark-900' : 'bg-dark-700 text-gray-400'}`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((missile) => (
          <MissileCard key={missile.id} missile={missile} />
        ))}
      </div>
    </div>
  );
}
