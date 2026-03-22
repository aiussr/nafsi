import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';
import type { Missile } from '@/types';
import { Rocket, Gauge, Target, Ruler } from 'lucide-react';

const typeColors: Record<string, string> = {
  ballistic: 'bg-danger/20 text-danger-light',
  cruise: 'bg-warning/20 text-warning',
  hypersonic: 'bg-purple-500/20 text-purple-400',
  drone: 'bg-blue-500/20 text-blue-400',
  interceptor: 'bg-safe/20 text-safe',
  'air-defense': 'bg-safe/20 text-safe',
};

const countryColors: Record<string, string> = {
  IR: 'bg-green-600/20 text-green-400',
  IL: 'bg-blue-600/20 text-blue-400',
};

interface MissileCardProps {
  missile: Missile;
}

export function MissileCard({ missile }: MissileCardProps) {
  const { t } = useLanguage();
  const { t: tr } = useTranslation();

  return (
    <div className="bg-dark-800 rounded-xl border border-dark-600 overflow-hidden hover:border-dark-500 transition-colors">
      {/* Image placeholder */}
      <div className="h-40 bg-dark-700 flex items-center justify-center">
        <Rocket className="w-12 h-12 text-gray-600" />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${countryColors[missile.country]}`}>
            {missile.country === 'IR' ? tr('arsenal.iran') : tr('arsenal.israel')}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${typeColors[missile.type] || 'bg-gray-600/20 text-gray-400'}`}>
            {missile.type}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-100 mb-2">{t(missile.name)}</h3>
        <p className="text-sm text-gray-400 line-clamp-2 mb-3">{t(missile.description)}</p>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Target className="w-3.5 h-3.5 text-accent" />
            <span>{missile.range_km.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Gauge className="w-3.5 h-3.5 text-warning" />
            <span className="capitalize">{missile.speed}</span>
          </div>
          {missile.warhead_kg && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Rocket className="w-3.5 h-3.5 text-danger-light" />
              <span>{missile.warhead_kg} kg</span>
            </div>
          )}
          {missile.specs.length_m && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Ruler className="w-3.5 h-3.5 text-safe" />
              <span>{missile.specs.length_m} m</span>
            </div>
          )}
        </div>

        {/* Guidance */}
        <div className="mt-3 pt-3 border-t border-dark-600">
          <p className="text-xs text-gray-500">
            <span className="text-gray-400 font-medium">Guidance:</span> {missile.specs.guidance}
          </p>
        </div>
      </div>
    </div>
  );
}
