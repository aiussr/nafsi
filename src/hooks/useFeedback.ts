import { useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from './useAuth';

export function useFeedback(page: string) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  const submitFeedback = useCallback(
    async (rating: number, comment?: string) => {
      if (!isSupabaseConfigured()) return;
      setSubmitting(true);
      await supabase.from('feedback').insert({
        user_id: user?.id || null,
        page,
        rating,
        comment: comment || null,
      });
      setSubmitting(false);
      setSubmitted(true);
    },
    [user, page]
  );

  return { submitted, submitting, submitFeedback };
}
