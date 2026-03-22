import { supabase, isSupabaseConfigured } from './supabase';

function getSessionId(): string {
  let id = sessionStorage.getItem('ws_session');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('ws_session', id);
  }
  return id;
}

export async function trackPageView(page: string): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const sessionId = getSessionId();
  const { data: { user } } = await supabase.auth.getUser();

  await supabase.from('page_views').insert({
    page,
    session_id: sessionId,
    user_id: user?.id || null,
  });
}
