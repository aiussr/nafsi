import type { Source, Credibility } from '@/types';

const credibilityColors: Record<Credibility, string> = {
  high: 'bg-safe/20 text-safe border-safe/30',
  medium: 'bg-warning/20 text-warning border-warning/30',
  low: 'bg-danger/20 text-danger-light border-danger/30',
  unverified: 'bg-gray-600/20 text-gray-400 border-gray-600/30',
};

interface SourceBadgeProps {
  source: Source;
}

export function SourceBadge({ source }: SourceBadgeProps) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border transition-opacity hover:opacity-80 ${credibilityColors[source.credibility]}`}
    >
      {source.name}
    </a>
  );
}
