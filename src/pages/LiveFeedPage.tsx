import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '@/hooks/useData';
import { loadEvents } from '@/data/loader';
import { EventTimeline } from '@/components/feed/EventTimeline';
import { Radio } from 'lucide-react';

export function LiveFeedPage() {
  const { t } = useTranslation();
  const { data: events, loading } = useData(useCallback(() => loadEvents(), []), 300_000);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-danger/20">
          <Radio className="w-5 h-5 text-danger-light animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-100">{t('feed.title')}</h1>
          <p className="text-sm text-gray-500">Auto-refreshes every 5 minutes</p>
        </div>
      </div>

      {loading && !events ? (
        <div className="text-center py-20 text-gray-500">{t('common.loading')}</div>
      ) : events ? (
        <EventTimeline events={events} />
      ) : (
        <div className="text-center py-20 text-gray-500">{t('common.noData')}</div>
      )}
    </div>
  );
}
