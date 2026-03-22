import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from './useAuth';
import type { Discussion } from '@/types/social';

export function useDiscussions(category?: string) {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchDiscussions = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    let query = supabase
      .from('discussions')
      .select('*, profile:profiles(*)')
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data } = await query;

    if (data) {
      // Get comment counts
      const ids = data.map((d) => d.id);
      const { data: counts } = await supabase
        .from('comments')
        .select('discussion_id')
        .in('discussion_id', ids);

      const countMap: Record<string, number> = {};
      counts?.forEach((c) => {
        countMap[c.discussion_id] = (countMap[c.discussion_id] || 0) + 1;
      });

      setDiscussions(
        data.map((d) => ({ ...d, comment_count: countMap[d.id] || 0 }))
      );
    }
    setLoading(false);
  }, [category]);

  useEffect(() => {
    fetchDiscussions();
  }, [fetchDiscussions]);

  const createDiscussion = useCallback(
    async (title: string, content: string, cat: string) => {
      if (!user || !isSupabaseConfigured()) return;
      await supabase.from('discussions').insert({
        user_id: user.id,
        title,
        content,
        category: cat,
      });
      fetchDiscussions();
    },
    [user, fetchDiscussions]
  );

  return { discussions, loading, createDiscussion, refresh: fetchDiscussions };
}
