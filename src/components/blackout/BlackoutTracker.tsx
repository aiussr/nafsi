import { useTranslation } from 'react-i18next';
import { BlackoutCard } from './BlackoutCard';
import type { Blackout } from '@/types';

interface BlackoutTrackerProps {
  blackouts: Blackout[];
}

export function BlackoutTracker({ blackouts }: BlackoutTrackerProps) {
  const { t } = useTranslation();

  const ongoing = blackouts.filter((b) => b.status === 'ongoing');
  const resolved = blackouts.filter((b) => b.status !== 'ongoing');

  return (
    <div className="space-y-6">
      {ongoing.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-danger-light mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
            {t('common.ongoing')} ({ongoing.length})
          </h3>
          <div className="space-y-3">
            {ongoing.map((b) => <BlackoutCard key={b.id} blackout={b} />)}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-gray-400 mb-3">
          {t('common.resolved')} ({resolved.length})
        </h3>
        <div className="space-y-3">
          {resolved.map((b) => <BlackoutCard key={b.id} blackout={b} />)}
        </div>
      </div>
    </div>
  );
}
