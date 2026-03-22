import { useLanguage } from '@/hooks/useLanguage';
import { useData } from '@/hooks/useData';
import { loadSources } from '@/data/loader';
import { TimeAgo } from '@/components/shared/TimeAgo';
import { SourceBadge } from '@/components/shared/SourceBadge';
import { ShareButtons } from '@/components/shared/ShareButtons';
import type { ConflictEvent, Severity } from '@/types';
import { MapPin, AlertTriangle, Shield, Crosshair, Radio, Zap } from 'lucide-react';

const severityColors: Record<Severity, string> = {
  critical: 'border-l-critical bg-critical/5',
  high: 'border-l-high bg-high/5',
  medium: 'border-l-medium bg-medium/5',
  low: 'border-l-low bg-low/5',
};

const severityBadge: Record<Severity, string> = {
  critical: 'bg-critical/20 text-critical',
  high: 'bg-high/20 text-high',
  medium: 'bg-medium/20 text-medium',
  low: 'bg-low/20 text-low',
};

const typeIcons: Record<string, typeof AlertTriangle> = {
  strike: Crosshair,
  missile: AlertTriangle,
  interception: Shield,
  cyber: Zap,
  diplomatic: Radio,
  military: AlertTriangle,
  drone: AlertTriangle,
};

interface EventCardProps {
  event: ConflictEvent;
  compact?: boolean;
}

export function EventCard({ event, compact }: EventCardProps) {
  const { t } = useLanguage();
  const { data: sources } = useData(loadSources);
  const Icon = typeIcons[event.type] || AlertTriangle;

  const eventSources = sources?.filter((s) => event.sources.includes(s.id)) || [];

  return (
    <div className={`border-l-4 rounded-lg p-4 ${severityColors[event.severity]} bg-dark-800 border border-dark-600`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="p-2 rounded-lg bg-dark-700 shrink-0">
            <Icon className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${severityBadge[event.severity]}`}>
                {event.severity.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500 uppercase">{event.type}</span>
              {event.verified && (
                <span className="text-xs text-safe">&#10003; Verified</span>
              )}
              {event._source && event._source !== 'manual' && (
                <span className="text-xs text-accent/60 bg-accent/10 px-1.5 rounded">{event._source}</span>
              )}
            </div>
            <h3 className="text-sm font-semibold text-gray-100 mb-1">{t(event.title)}</h3>
            {!compact && (
              <p className="text-sm text-gray-400 mb-2 line-clamp-3">{t(event.description)}</p>
            )}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {event.location.name}
              </span>
              <TimeAgo date={event.timestamp} />
            </div>
          </div>
        </div>
      </div>

      {!compact && (
        <div className="mt-3 pt-3 border-t border-dark-600 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {eventSources.map((src) => (
              <SourceBadge key={src.id} source={src} />
            ))}
          </div>
          <ShareButtons title={t(event.title)} />
        </div>
      )}
    </div>
  );
}
