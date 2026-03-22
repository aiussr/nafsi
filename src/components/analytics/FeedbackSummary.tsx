import { Star, MessageSquare } from 'lucide-react';
import type { Feedback } from '@/types/social';

interface FeedbackSummaryProps {
  feedbackByPage: { page: string; avg_rating: number; count: number }[];
  recentFeedback: Feedback[];
}

export function FeedbackSummary({ feedbackByPage, recentFeedback }: FeedbackSummaryProps) {
  return (
    <div className="bg-dark-800 border border-dark-600 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-300 mb-4">User Feedback</h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-xs text-gray-500 mb-2 flex items-center gap-1">
            <Star className="w-3 h-3" /> Ratings by Page
          </h4>
          {feedbackByPage.length === 0 ? (
            <p className="text-xs text-gray-600">No feedback yet</p>
          ) : (
            <div className="space-y-2">
              {feedbackByPage.map((fb) => (
                <div key={fb.page} className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {fb.page === '/' ? 'Dashboard' : fb.page.replace('/', '')}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= Math.round(fb.avg_rating)
                              ? 'fill-warning text-warning'
                              : 'text-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      {fb.avg_rating} ({fb.count})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-xs text-gray-500 mb-2 flex items-center gap-1">
            <MessageSquare className="w-3 h-3" /> Recent Feedback
          </h4>
          {recentFeedback.length === 0 ? (
            <p className="text-xs text-gray-600">No feedback comments yet</p>
          ) : (
            <div className="space-y-2">
              {recentFeedback
                .filter((f) => f.comment)
                .slice(0, 5)
                .map((f) => (
                  <div key={f.id} className="bg-dark-700 rounded-lg p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-2.5 h-2.5 ${
                              star <= f.rating
                                ? 'fill-warning text-warning'
                                : 'text-gray-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-600">
                        {f.page === '/' ? 'Dashboard' : f.page.replace('/', '')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{f.comment}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
