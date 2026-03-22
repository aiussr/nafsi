import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { AnalyticsData } from '@/types/social';

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    try {
      // Page views by page
      const { data: views } = await supabase.from('page_views').select('page, timestamp');
      const pageViewCounts: Record<string, number> = {};
      views?.forEach((v) => {
        pageViewCounts[v.page] = (pageViewCounts[v.page] || 0) + 1;
      });
      const pageViews = Object.entries(pageViewCounts)
        .map(([page, count]) => ({ page, count }))
        .sort((a, b) => b.count - a.count);

      // Sentiment breakdown from comments
      const { data: comments } = await supabase
        .from('comments')
        .select('sentiment_score, created_at');
      const sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
      comments?.forEach((c) => {
        if (c.sentiment_score === null) sentimentCounts.neutral++;
        else if (c.sentiment_score > 0.05) sentimentCounts.positive++;
        else if (c.sentiment_score < -0.05) sentimentCounts.negative++;
        else sentimentCounts.neutral++;
      });
      const sentimentBreakdown = Object.entries(sentimentCounts).map(
        ([label, count]) => ({ label, count })
      );

      // Popular events by comment count
      const eventCommentCounts: Record<string, number> = {};
      comments
        ?.filter((c) => c.created_at)
        .forEach((c: any) => {
          // We'd need event_id here — fetch separately
        });
      const { data: eventComments } = await supabase
        .from('comments')
        .select('event_id')
        .not('event_id', 'is', null);
      const eventCounts: Record<string, number> = {};
      eventComments?.forEach((c) => {
        if (c.event_id) eventCounts[c.event_id] = (eventCounts[c.event_id] || 0) + 1;
      });
      const popularEvents = Object.entries(eventCounts)
        .map(([event_id, comment_count]) => ({ event_id, comment_count }))
        .sort((a, b) => b.comment_count - a.comment_count)
        .slice(0, 10);

      // Feedback by page
      const { data: feedback } = await supabase.from('feedback').select('*');
      const feedbackByPageMap: Record<string, { total: number; count: number }> = {};
      feedback?.forEach((f) => {
        if (!feedbackByPageMap[f.page]) feedbackByPageMap[f.page] = { total: 0, count: 0 };
        feedbackByPageMap[f.page].total += f.rating;
        feedbackByPageMap[f.page].count++;
      });
      const feedbackByPage = Object.entries(feedbackByPageMap)
        .map(([page, { total, count }]) => ({
          page,
          avg_rating: Math.round((total / count) * 10) / 10,
          count,
        }))
        .sort((a, b) => b.avg_rating - a.avg_rating);

      // Daily activity (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const dateStr = thirtyDaysAgo.toISOString();

      const dailyMap: Record<string, { comments: number; views: number }> = {};
      comments?.forEach((c) => {
        const day = c.created_at.substring(0, 10);
        if (!dailyMap[day]) dailyMap[day] = { comments: 0, views: 0 };
        dailyMap[day].comments++;
      });
      views?.forEach((v) => {
        const day = v.timestamp.substring(0, 10);
        if (!dailyMap[day]) dailyMap[day] = { comments: 0, views: 0 };
        dailyMap[day].views++;
      });
      const dailyActivity = Object.entries(dailyMap)
        .map(([date, counts]) => ({ date, ...counts }))
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-30);

      const recentFeedback = (feedback || [])
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .slice(0, 10);

      setData({
        pageViews,
        sentimentBreakdown,
        popularEvents,
        feedbackByPage,
        dailyActivity,
        recentFeedback,
      });
    } catch (e) {
      console.error('Analytics fetch error:', e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { data, loading, refresh: fetchAnalytics };
}
