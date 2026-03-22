import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useData } from '@/hooks/useData';
import { loadEvents, loadMapData, loadBlackouts, loadEconomic, loadMissiles } from '@/data/loader';
import { EventTimeline } from '@/components/feed/EventTimeline';
import { ConflictMap } from '@/components/map/ConflictMap';
import { MapLegend } from '@/components/map/MapLegend';
import { Activity, AlertTriangle, Wifi, Rocket, TrendingUp, ArrowRight } from 'lucide-react';

const REFRESH = 300_000;

export function HomePage() {
  const { t } = useTranslation();
  const { data: events } = useData(useCallback(() => loadEvents(), []), REFRESH);
  const { data: mapData } = useData(useCallback(() => loadMapData(), []));
  const { data: blackouts } = useData(useCallback(() => loadBlackouts(), []));
  const { data: economic } = useData(useCallback(() => loadEconomic(), []));
  const { data: missiles } = useData(useCallback(() => loadMissiles(), []));

  const activeBlackouts = blackouts?.filter((b) => b.status === 'ongoing').length || 0;

  const stats = [
    { key: 'totalEvents', icon: AlertTriangle, value: events?.length || 0, color: 'text-danger-light' },
    { key: 'activeBlackouts', icon: Wifi, value: activeBlackouts, color: 'text-purple-400' },
    { key: 'missilesTracked', icon: Rocket, value: missiles?.length || 0, color: 'text-warning' },
    { key: 'countriesInvolved', icon: TrendingUp, value: 2, color: 'text-accent' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Hero */}
      <div className="text-center py-12 bg-gradient-to-b from-danger/10 to-transparent rounded-2xl border border-dark-600">
        <Activity className="w-12 h-12 text-danger-light mx-auto mb-4" />
        <h1 className="text-4xl font-black tracking-tight mb-2">
          <span className="text-danger-light">War</span>
          <span className="text-gray-100">Scope</span>
        </h1>
        <p className="text-gray-400 text-lg">{t('site.tagline')}</p>
        <p className="text-gray-500 text-sm mt-2">{t('site.description')}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.key} className="bg-dark-800 rounded-xl border border-dark-600 p-4 text-center">
            <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
            <p className="text-2xl font-bold text-gray-100">{stat.value}</p>
            <p className="text-xs text-gray-500">{t(`home.${stat.key}`)}</p>
          </div>
        ))}
      </div>

      {/* Map Preview */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-100">{t('home.quickMap')}</h2>
          <Link to="/map" className="flex items-center gap-1 text-sm text-accent hover:text-accent-light">
            {t('common.viewAll')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {mapData && (
          <div className="relative">
            <ConflictMap
              markers={mapData.markers}
              missilePaths={mapData.missilePaths}
              blackouts={blackouts || []}
              className="h-[400px]"
            />
            <MapLegend />
          </div>
        )}
      </div>

      {/* Latest Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-100">{t('home.latestEvents')}</h2>
          <Link to="/feed" className="flex items-center gap-1 text-sm text-accent hover:text-accent-light">
            {t('common.viewAll')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {events && <EventTimeline events={events} compact maxItems={5} />}
      </div>

      {/* Economic Snapshot */}
      {economic && economic.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-100">{t('home.economicSnapshot')}</h2>
            <Link to="/economy" className="flex items-center gap-1 text-sm text-accent hover:text-accent-light">
              {t('common.viewAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {economic.slice(0, 3).map((indicator) => {
              const latest = indicator.dataPoints[indicator.dataPoints.length - 1];
              const prev = indicator.dataPoints[indicator.dataPoints.length - 2];
              const change = prev ? ((latest.value - prev.value) / prev.value * 100).toFixed(1) : '0';
              const isUp = Number(change) > 0;
              return (
                <div key={indicator.id} className="bg-dark-800 rounded-xl border border-dark-600 p-4">
                  <p className="text-xs text-gray-500 mb-1">{indicator.indicator.en}</p>
                  <p className="text-xl font-bold text-gray-100">{latest.value.toLocaleString()}</p>
                  <p className={`text-xs ${isUp ? 'text-danger-light' : 'text-safe'}`}>
                    {isUp ? '▲' : '▼'} {change}% <span className="text-gray-500">{indicator.unit}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
