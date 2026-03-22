import { useTranslation } from 'react-i18next';

const legendItems = [
  { key: 'targets', color: '#dc2626' },
  { key: 'launchSites', color: '#f97316' },
  { key: 'interceptions', color: '#22c55e' },
  { key: 'blackoutZones', color: '#8b5cf6' },
  { key: 'militaryBases', color: '#3b82f6' },
  { key: 'missilePaths', color: '#ef4444', dashed: true },
];

export function MapLegend() {
  const { t } = useTranslation();

  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-dark-800/95 backdrop-blur rounded-lg border border-dark-600 p-3">
      <h4 className="text-xs font-semibold text-gray-300 mb-2">{t('map.legend')}</h4>
      <div className="space-y-1.5">
        {legendItems.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            {item.dashed ? (
              <div className="w-4 h-0 border-t-2 border-dashed" style={{ borderColor: item.color }} />
            ) : (
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            )}
            <span className="text-xs text-gray-400">{t(`map.${item.key}`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
