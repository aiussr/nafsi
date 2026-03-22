import { TrendingUp, MessageSquare } from 'lucide-react';

interface PopularContentProps {
  pageViews: { page: string; count: number }[];
  popularEvents: { event_id: string; comment_count: number }[];
}

export function PopularContent({ pageViews, popularEvents }: PopularContentProps) {
  return (
    <div className="bg-dark-800 border border-dark-600 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-300 mb-4">Popular Content</h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-xs text-gray-500 mb-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Most Visited Pages
          </h4>
          {pageViews.length === 0 ? (
            <p className="text-xs text-gray-600">No data yet</p>
          ) : (
            <div className="space-y-1">
              {pageViews.slice(0, 5).map((pv, i) => (
                <div key={pv.page} className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    <span className="text-gray-600 mr-2">{i + 1}.</span>
                    {pv.page === '/' ? 'Dashboard' : pv.page.replace('/', '')}
                  </span>
                  <span className="text-xs text-gray-600">{pv.count} views</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-xs text-gray-500 mb-2 flex items-center gap-1">
            <MessageSquare className="w-3 h-3" /> Most Discussed Events
          </h4>
          {popularEvents.length === 0 ? (
            <p className="text-xs text-gray-600">No discussions yet</p>
          ) : (
            <div className="space-y-1">
              {popularEvents.slice(0, 5).map((ev, i) => (
                <div key={ev.event_id} className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 truncate">
                    <span className="text-gray-600 mr-2">{i + 1}.</span>
                    Event {ev.event_id.substring(0, 8)}...
                  </span>
                  <span className="text-xs text-gray-600">{ev.comment_count} comments</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
