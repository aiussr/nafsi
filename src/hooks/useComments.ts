import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { analyzeSentiment } from '@/lib/sentiment';
import { useAuth } from './useAuth';
import type { Comment } from '@/types/social';

interface UseCommentsOptions {
  eventId?: string;
  discussionId?: string;
}

export function useComments({ eventId, discussionId }: UseCommentsOptions) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchComments = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    let query = supabase
      .from('comments')
      .select('*, profile:profiles(*)')
      .order('created_at', { ascending: true });

    if (eventId) query = query.eq('event_id', eventId);
    if (discussionId) query = query.eq('discussion_id', discussionId);
    if (!eventId && !discussionId) query = query.is('event_id', null).is('discussion_id', null);

    const { data } = await query;

    if (data) {
      // Fetch vote counts for all comments
      const commentIds = data.map((c) => c.id);
      const { data: votes } = await supabase
        .from('comment_votes')
        .select('comment_id, vote')
        .in('comment_id', commentIds);

      const voteCounts: Record<string, number> = {};
      const userVotes: Record<string, number> = {};

      votes?.forEach((v) => {
        voteCounts[v.comment_id] = (voteCounts[v.comment_id] || 0) + v.vote;
      });

      if (user) {
        const { data: myVotes } = await supabase
          .from('comment_votes')
          .select('comment_id, vote')
          .eq('user_id', user.id)
          .in('comment_id', commentIds);
        myVotes?.forEach((v) => {
          userVotes[v.comment_id] = v.vote;
        });
      }

      // Build threaded structure
      const commentMap = new Map<string, Comment>();
      const roots: Comment[] = [];

      data.forEach((c) => {
        const comment: Comment = {
          ...c,
          vote_count: voteCounts[c.id] || 0,
          user_vote: userVotes[c.id] || 0,
          replies: [],
        };
        commentMap.set(c.id, comment);
      });

      commentMap.forEach((comment) => {
        if (comment.parent_id && commentMap.has(comment.parent_id)) {
          commentMap.get(comment.parent_id)!.replies!.push(comment);
        } else {
          roots.push(comment);
        }
      });

      setComments(roots);
    }
    setLoading(false);
  }, [eventId, discussionId, user]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Realtime subscription
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const channel = supabase
      .channel('comments-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'comments' },
        () => fetchComments()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchComments]);

  const addComment = useCallback(
    async (content: string, parentId?: string) => {
      if (!user || !isSupabaseConfigured()) return;

      const sentiment = analyzeSentiment(content);

      await supabase.from('comments').insert({
        user_id: user.id,
        event_id: eventId || null,
        discussion_id: discussionId || null,
        parent_id: parentId || null,
        content,
        sentiment_score: sentiment.comparative,
      });
    },
    [user, eventId, discussionId]
  );

  const voteComment = useCallback(
    async (commentId: string, vote: 1 | -1) => {
      if (!user || !isSupabaseConfigured()) return;

      // Remove existing vote first
      await supabase
        .from('comment_votes')
        .delete()
        .eq('comment_id', commentId)
        .eq('user_id', user.id);

      // Insert new vote
      await supabase.from('comment_votes').insert({
        comment_id: commentId,
        user_id: user.id,
        vote,
      });

      fetchComments();
    },
    [user, fetchComments]
  );

  const deleteComment = useCallback(
    async (commentId: string) => {
      if (!user || !isSupabaseConfigured()) return;
      await supabase.from('comments').delete().eq('id', commentId).eq('user_id', user.id);
    },
    [user]
  );

  return { comments, loading, addComment, voteComment, deleteComment, refresh: fetchComments };
}
