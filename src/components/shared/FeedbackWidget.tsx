import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFeedback } from '@/hooks/useFeedback';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Star, Send, CheckCircle } from 'lucide-react';

export function FeedbackWidget() {
  const location = useLocation();
  const { submitted, submitting, submitFeedback } = useFeedback(location.pathname);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [expanded, setExpanded] = useState(false);

  if (!isSupabaseConfigured()) return null;

  if (submitted) {
    return (
      <div className="border-t border-dark-600 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-2 text-safe text-sm">
          <CheckCircle className="w-4 h-4" />
          Thanks for your feedback!
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-dark-600 bg-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs text-gray-500">Was this page helpful?</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => {
                  setRating(star);
                  setExpanded(true);
                }}
                className="p-0.5 transition-colors"
              >
                <Star
                  className={`w-4 h-4 ${
                    star <= (hoverRating || rating)
                      ? 'fill-warning text-warning'
                      : 'text-gray-600'
                  }`}
                />
              </button>
            ))}
          </div>

          {expanded && (
            <>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How can we improve?"
                className="bg-dark-700 border border-dark-600 rounded-lg px-3 py-1 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-accent/50 w-48 sm:w-64"
              />
              <button
                onClick={() => submitFeedback(rating, comment)}
                disabled={submitting || rating === 0}
                className="p-1.5 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
