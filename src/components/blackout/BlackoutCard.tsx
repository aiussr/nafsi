import { useLanguage } from '@/hooks/useLanguage';
import { TimeAgo } from '@/components/shared/TimeAgo';
import type { Blackout, BlackoutStatus } from '@/types';
import { Wifi, WifiOff, Zap, Radio, MapPin } from 'lucide-react';

const statusStyles: Record<BlackoutStatus, string> = {
  ongoing: 'bg-danger/20 text-danger-light border-danger/30',
  resolved: 'bg-gray-600/20 text-gray-400 border-gray-600/30',
  unconfirmed: 'bg-warning/20 text-warning border-warning/30',
};

const typeIcons: Record<string, typeof Wifi> = {
  internet: WifiOff,
  power: Zap,
  communications: Radio,
  gps: MapPin,
};

interface BlackoutCardProps {
  blackout: Blackout;
}

export function BlackoutCard({ blackout }: BlackoutCardProps) {
  const { t } = useLanguage();
  const Icon = typeIcons[blackout.type] || WifiOff;

  return (
    <div className={`bg-dark-800 rounded-xl border border-dark-600 p-4 ${blackout.status === 'ongoing' ? 'border-danger/30' : ''}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${blackout.status === 'ongoing' ? 'bg-danger/20' : 'bg-dark-700'}`}>
          <Icon className={`w-5 h-5 ${blackout.status === 'ongoing' ? 'text-danger-light animate-pulse' : 'text-gray-500'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusStyles[blackout.status]}`}>
              {blackout.status.toUpperCase()}
            </span>
            <span className="text-xs text-gray-500 capitalize">{blackout.type}</span>
          </div>
          <h3 className="text-sm font-semibold text-gray-100">{blackout.location.name}</h3>
          <p className="text-sm text-gray-400 mt-1">{t(blackout.description)}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <TimeAgo date={blackout.startTime} />
            {blackout.affectedArea_km2 && <span>{blackout.affectedArea_km2} km²</span>}
            <span>{blackout.location.country}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
