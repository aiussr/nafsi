import { Link } from 'react-router-dom';
import { MessageSquare, Pin, User } from 'lucide-react';
import { TimeAgo } from '@/components/shared/TimeAgo';
import type { Discussion } from '@/types/social';

const categoryColors: Record<string, string> = {
  general: 'bg-accent/10 text-accent',
  events: 'bg-danger/10 text-danger-light',
  analysis: 'bg-warning/10 text-warning',
  'off-topic': 'bg-dark-600 text-gray-400',
};

interface DiscussionCardProps {
  discussion: Discussion;
}

export function DiscussionCard({ discussion }: DiscussionCardProps) {
  return (
    <Link
      to={`/community/discussion/${discussion.id}`}
      className="block bg-dark-800 border border-dark-600 rounded-lg p-4 hover:border-dark-500 transition-colors"
    >
      <div className="flex items-start gap-3">
        {discussion.profile?.avatar_url ? (
          <img src={discussion.profile.avatar_url} alt="" className="w-8 h-8 rounded-full shrink-0" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-gray-500" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {discussion.pinned && (
              <Pin className="w-3.5 h-3.5 text-warning shrink-0" />
            )}
            <h3 className="text-sm font-semibold text-gray-200 truncate">
              {discussion.title}
            </h3>
          </div>
          {discussion.content && (
            <p className="text-xs text-gray-500 line-clamp-2 mb-2">{discussion.content}</p>
          )}
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span className={`px-1.5 py-0.5 rounded text-[10px] ${categoryColors[discussion.category] || categoryColors.general}`}>
              {discussion.category}
            </span>
            <span>
              {discussion.profile?.display_name || discussion.profile?.username || 'Anonymous'}
            </span>
            <TimeAgo date={discussion.created_at} />
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {discussion.comment_count || 0}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
