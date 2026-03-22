import { User, BarChart3, Clock } from 'lucide-react';
import { TimeAgo } from '@/components/shared/TimeAgo';
import { useAuth } from '@/hooks/useAuth';
import type { Poll } from '@/types/social';

interface PollCardProps {
  poll: Poll;
  onVote: (pollId: string, optionIndex: number) => void;
}

export function PollCard({ poll, onVote }: PollCardProps) {
  const { user } = useAuth();
  const hasVoted = poll.user_vote !== null && poll.user_vote !== undefined;
  const isClosed = poll.closes_at && new Date(poll.closes_at) < new Date();
  const showResults = hasVoted || isClosed;
  const totalVotes = poll.total_votes || 0;

  const getVoteCount = (index: number) =>
    poll.votes?.find((v) => v.option_index === index)?.count || 0;

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-lg p-4">
      <div className="flex items-start gap-3 mb-3">
        {poll.profile?.avatar_url ? (
          <img src={poll.profile.avatar_url} alt="" className="w-7 h-7 rounded-full shrink-0" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-dark-600 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-gray-500" />
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-200 mb-1">{poll.question}</p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>{poll.profile?.display_name || poll.profile?.username || 'Anonymous'}</span>
            <TimeAgo date={poll.created_at} />
            {isClosed && (
              <span className="flex items-center gap-1 text-warning">
                <Clock className="w-3 h-3" /> Closed
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {poll.options.map((option, index) => {
          const count = getVoteCount(index);
          const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
          const isSelected = poll.user_vote === index;

          return (
            <button
              key={index}
              onClick={() => !showResults && user && onVote(poll.id, index)}
              disabled={showResults || !user}
              className={`w-full text-left relative overflow-hidden rounded-lg border transition-colors ${
                isSelected
                  ? 'border-accent/50 bg-accent/5'
                  : 'border-dark-600 bg-dark-700 hover:border-dark-500'
              } ${!showResults && user ? 'cursor-pointer' : 'cursor-default'}`}
            >
              {showResults && (
                <div
                  className="absolute inset-y-0 left-0 bg-accent/10 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              )}
              <div className="relative flex items-center justify-between px-3 py-2">
                <span className="text-sm text-gray-300">{option}</span>
                {showResults && (
                  <span className="text-xs text-gray-500 ml-2">{pct}%</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
        <BarChart3 className="w-3 h-3" />
        <span>{totalVotes} vote{totalVotes !== 1 ? 's' : ''}</span>
      </div>
    </div>
  );
}
