import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from './useAuth';
import type { Poll } from '@/types/social';

export function usePolls(category?: string) {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPolls = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    let query = supabase
      .from('polls')
      .select('*, profile:profiles(*)')
      .order('created_at', { ascending: false });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data } = await query;

    if (data) {
      const ids = data.map((p) => p.id);
      const { data: allVotes } = await supabase
        .from('poll_votes')
        .select('poll_id, option_index, user_id')
        .in('poll_id', ids);

      setPolls(
        data.map((p) => {
          const pollVotes = allVotes?.filter((v) => v.poll_id === p.id) || [];
          const voteCounts: Record<number, number> = {};
          let userVote: number | null = null;

          pollVotes.forEach((v) => {
            voteCounts[v.option_index] = (voteCounts[v.option_index] || 0) + 1;
            if (user && v.user_id === user.id) {
              userVote = v.option_index;
            }
          });

          return {
            ...p,
            votes: Object.entries(voteCounts).map(([idx, count]) => ({
              option_index: Number(idx),
              count,
            })),
            user_vote: userVote,
            total_votes: pollVotes.length,
          };
        })
      );
    }
    setLoading(false);
  }, [category, user]);

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  const createPoll = useCallback(
    async (question: string, options: string[], cat: string, closesAt?: string) => {
      if (!user || !isSupabaseConfigured()) return;
      await supabase.from('polls').insert({
        user_id: user.id,
        question,
        options,
        category: cat,
        closes_at: closesAt || null,
      });
      fetchPolls();
    },
    [user, fetchPolls]
  );

  const vote = useCallback(
    async (pollId: string, optionIndex: number) => {
      if (!user || !isSupabaseConfigured()) return;
      // Upsert: delete then insert
      await supabase
        .from('poll_votes')
        .delete()
        .eq('poll_id', pollId)
        .eq('user_id', user.id);
      await supabase.from('poll_votes').insert({
        poll_id: pollId,
        user_id: user.id,
        option_index: optionIndex,
      });
      fetchPolls();
    },
    [user, fetchPolls]
  );

  return { polls, loading, createPoll, vote, refresh: fetchPolls };
}
