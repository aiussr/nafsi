import { useTranslation } from 'react-i18next';
import { useAnalytics } from '@/hooks/useAnalytics';
import { isSupabaseConfigured } from '@/lib/supabase';
import { PageViewChart } from '@/components/analytics/PageViewChart';
import { SentimentChart } from '@/components/analytics/SentimentChart';
import { PopularContent } from '@/components/analytics/PopularContent';
import { FeedbackSummary } from '@/components/analytics/FeedbackSummary';
import { EngagementTimeline } from '@/components/analytics/EngagementTimeline';
import { BarChart3, AlertCircle, RefreshCw } from 'lucide-react';

export function AnalyticsPage() {
  const { t } = useTranslation();
  const { data, loading, refresh } = useAnalytics();
  const configured = isSupabaseConfigured();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-accent" />
            {t('analytics.title')}
          </h1>
          <p className="text-sm text-gray-500 mt-1">{t('analytics.subtitle')}</p>
        </div>
        {configured && (
          <button
            onClick={refresh}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-300 bg-dark-700 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        )}
      </div>

      {!configured && (
        <div className="flex items-start gap-3 bg-warning/5 border border-warning/20 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-warning font-medium">Backend Not Configured</p>
            <p className="text-xs text-gray-500 mt-1">
              Analytics require Supabase. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
              to start collecting engagement data.
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-gray-600 text-sm">Loading analytics...</div>
      ) : !data ? (
        <div className="text-center py-16 text-gray-600 text-sm">
          No data available yet. Analytics will populate as users interact with the site.
        </div>
      ) : (
        <>
          {/* Top row: Engagement Timeline (full width) */}
          <EngagementTimeline data={data.dailyActivity} />

          {/* Second row: Page Views + Sentiment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PageViewChart data={data.pageViews} />
            <SentimentChart data={data.sentimentBreakdown} />
          </div>

          {/* Third row: Popular Content + Feedback */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PopularContent
              pageViews={data.pageViews}
              popularEvents={data.popularEvents}
            />
            <FeedbackSummary
              feedbackByPage={data.feedbackByPage}
              recentFeedback={data.recentFeedback}
            />
          </div>
        </>
      )}
    </div>
  );
}
