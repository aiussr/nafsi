import { formatDistanceToNow } from 'date-fns';

interface TimeAgoProps {
  date: string;
  className?: string;
}

export function TimeAgo({ date, className }: TimeAgoProps) {
  const formatted = formatDistanceToNow(new Date(date), { addSuffix: true });

  return (
    <time dateTime={date} className={className || 'text-xs text-gray-500'}>
      {formatted}
    </time>
  );
}
