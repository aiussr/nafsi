import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EventCard } from './EventCard';
import { FilterBar } from '@/components/shared/FilterBar';
import type { ConflictEvent } from '@/types';

interface EventTimelineProps {
  events: ConflictEvent[];
  compact?: boolean;
  maxItems?: number;
}

export function EventTimeline({ events, compact, maxItems }: EventTimelineProps) {
  const { t } = useTranslation();
  const [typeFilter, setTypeFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = events;
    if (typeFilter) result = result.filter((e) => e.type === typeFilter);
    if (severityFilter) result = result.filter((e) => e.severity === severityFilter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.en.toLowerCase().includes(q) ||
          e.description.en.toLowerCase().includes(q) ||
          e.location.name.toLowerCase().includes(q)
      );
    }
    if (maxItems) result = result.slice(0, maxItems);
    return result;
  }, [events, typeFilter, severityFilter, search, maxItems]);

  return (
    <div className="space-y-4">
      {!compact && (
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          filters={[
            {
              label: t('feed.filterByType'),
              value: typeFilter,
              onChange: setTypeFilter,
              options: [
                { value: 'strike', label: 'Strike' },
                { value: 'missile', label: 'Missile' },
                { value: 'interception', label: 'Interception' },
                { value: 'cyber', label: 'Cyber' },
                { value: 'diplomatic', label: 'Diplomatic' },
                { value: 'drone', label: 'Drone' },
              ],
            },
            {
              label: t('feed.filterBySeverity'),
              value: severityFilter,
              onChange: setSeverityFilter,
              options: [
                { value: 'critical', label: 'Critical' },
                { value: 'high', label: 'High' },
                { value: 'medium', label: 'Medium' },
                { value: 'low', label: 'Low' },
              ],
            },
          ]}
        />
      )}

      <div className="space-y-3">
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} compact={compact} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">{t('common.noData')}</div>
        )}
      </div>
    </div>
  );
}
