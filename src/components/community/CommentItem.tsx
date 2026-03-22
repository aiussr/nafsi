import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Reply, Trash2, User } from 'lucide-react';
import { TimeAgo } from '@/components/shared/TimeAgo';
import { useAuth } from '@/hooks/useAuth';
import type { Comment } from '@/types/social';

interface CommentItemProps {
  comment: Comment;
  onVote: (commentId: string, vote: 1 | -1) => void;
  onReply: (parentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
  depth?: number;
}

export function CommentItem({ comment, onVote, onReply, onDelete, depth = 0 }: CommentItemProps) {
  const { user } = useAuth();
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText('');
    setReplying(false);
  };

  return (
    <div className={`${depth > 0 ? 'ml-6 pl-4 border-l border-dark-600' : ''}`}>
      <div className="py-3">
        <div className="flex items-start gap-3">
          {comment.profile?.avatar_url ? (
            <img
              src={comment.profile.avatar_url}
              alt=""
              className="w-7 h-7 rounded-full shrink-0"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-dark-600 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-gray-500" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-300">
                {comment.profile?.display_name || comment.profile?.username || 'Anonymous'}
              </span>
              {comment.profile?.username && (
                <span className="text-xs text-gray-600">@{comment.profile.username}</span>
              )}
              <TimeAgo date={comment.created_at} />
              {comment.sentiment_score !== null && (
                <span
                  className={`text-[10px] px-1.5 rounded ${
                    comment.sentiment_score > 0.05
                      ? 'bg-safe/10 text-safe'
                      : comment.sentiment_score < -0.05
                        ? 'bg-danger/10 text-danger-light'
                        : 'bg-dark-600 text-gray-500'
                  }`}
                >
                  {comment.sentiment_score > 0.05
                    ? 'positive'
                    : comment.sentiment_score < -0.05
                      ? 'negative'
                      : 'neutral'}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-300 whitespace-pre-wrap">{comment.content}</p>

            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => onVote(comment.id, 1)}
                className={`flex items-center gap-1 text-xs transition-colors ${
                  comment.user_vote === 1 ? 'text-safe' : 'text-gray-600 hover:text-gray-400'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <span className={`text-xs ${
                (comment.vote_count || 0) > 0 ? 'text-safe' : (comment.vote_count || 0) < 0 ? 'text-danger-light' : 'text-gray-600'
              }`}>
                {comment.vote_count || 0}
              </span>
              <button
                onClick={() => onVote(comment.id, -1)}
                className={`flex items-center gap-1 text-xs transition-colors ${
                  comment.user_vote === -1 ? 'text-danger-light' : 'text-gray-600 hover:text-gray-400'
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>

              {user && (
                <button
                  onClick={() => setReplying(!replying)}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-400 transition-colors"
                >
                  <Reply className="w-3.5 h-3.5" />
                  Reply
                </button>
              )}

              {user?.id === comment.user_id && (
                <button
                  onClick={() => onDelete(comment.id)}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-danger-light transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {replying && (
              <div className="mt-2 flex gap-2">
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-3 py-1.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent/50"
                  onKeyDown={(e) => e.key === 'Enter' && handleReply()}
                />
                <button
                  onClick={handleReply}
                  className="px-3 py-1.5 bg-accent/20 text-accent text-sm rounded-lg hover:bg-accent/30 transition-colors"
                >
                  Reply
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          onVote={onVote}
          onReply={onReply}
          onDelete={onDelete}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}
