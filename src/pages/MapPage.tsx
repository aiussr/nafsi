import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '@/hooks/useData';
import { loadMapData, loadBlackouts } from '@/data/loader';
import { ConflictMap } from '@/components/map/ConflictMap';
import { MapLegend } from '@/components/map/MapLegend';
import { Map } from 'lucide-react';

export function MapPage() {
  const { t } = useTranslation();
  const { data: mapData, loading } = useData(useCallback(() => loadMapData(), []));
  const { data: blackouts } = useData(useCallback(() => loadBlackouts(), []));

  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="absolute top-20 left-4 z-[1000] bg-dark-800/95 backdrop-blur rounded-lg border border-dark-600 p-3">
        <div className="flex items-center gap-2">
          <Map className="w-4 h-4 text-accent" />
          <h1 className="text-sm font-bold text-gray-100">{t('map.title')}</h1>
        </div>
      </div>

      {loading || !mapData ? (
        <div className="h-full flex items-center justify-center text-gray-500">
          {t('common.loading')}
        </div>
      ) : (
        <div className="relative h-full">
          <ConflictMap
            markers={mapData.markers}
            missilePaths={mapData.missilePaths}
            blackouts={blackouts || []}
            className="h-full"
            center={[30, 45]}
            zoom={4}
          />
          <MapLegend />
        </div>
      )}
    </div>
  );
}
