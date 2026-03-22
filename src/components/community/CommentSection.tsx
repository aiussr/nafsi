import { useState } from 'react';
import { useComments } from '@/hooks/useComments';
import { useAuth } from '@/hooks/useAuth';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { CommentItem } from './CommentItem';
import { MessageSquare, Send } from 'lucide-react';

interface CommentSectionProps {
  eventId?: string;
  discussionId?: string;
  title?: string;
}

export function CommentSection({ eventId, discussionId, title }: CommentSectionProps) {
  const { comments, loading, addComment, voteComment, deleteComment } = useComments({
    eventId,
    discussionId,
  });
  const { user } = useAuth();
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    if (!text.trim()) return;
    await addComment(text);
    setText('');
  };

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-lg overflow-hidden">
      {title && (
        <div className="flex items-center gap-2 px-4 py-3 border-b border-dark-600">
          <MessageSquare className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-300">{title}</h3>
          <span className="text-xs text-gray-600">({comments.length})</span>
        </div>
      )}

      <div className="divide-y divide-dark-700">
        {loading ? (
          <div className="px-4 py-8 text-center text-gray-600 text-sm">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-600 text-sm">
            No comments yet. Be the first to share your thoughts.
          </div>
        ) : (
          <div className="px-4">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onVote={voteComment}
                onReply={addComment}
                onDelete={deleteComment}
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-dark-600 p-4">
        <AuthGuard>
          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your thoughts..."
              className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent/50"
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              disabled={!text.trim()}
              className="px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </AuthGuard>
      </div>
    </div>
  );
}
