import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DiscussionList } from '@/components/community/DiscussionList';
import { CommentSection } from '@/components/community/CommentSection';
import { PollCard } from '@/components/community/PollCard';
import { CreatePoll } from '@/components/community/CreatePoll';
import { usePolls } from '@/hooks/usePolls';
import { useAuth } from '@/hooks/useAuth';
import { isSupabaseConfigured } from '@/lib/supabase';
import { MessageSquare, BarChart3, MessagesSquare, Plus, AlertCircle } from 'lucide-react';

type Tab = 'discussions' | 'polls' | 'recent';

export function CommunityPage() {
  const { t } = useTranslation();
  const { discussionId } = useParams();
  const [tab, setTab] = useState<Tab>('discussions');
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const { polls, createPoll, vote } = usePolls();
  const { user } = useAuth();
  const configured = isSupabaseConfigured();

  if (discussionId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CommentSection discussionId={discussionId} title="Discussion" />
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: typeof MessageSquare }[] = [
    { key: 'discussions', label: t('community.discussions'), icon: MessagesSquare },
    { key: 'polls', label: t('community.polls'), icon: BarChart3 },
    { key: 'recent', label: t('community.recentComments'), icon: MessageSquare },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">{t('community.title')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('community.subtitle')}</p>
      </div>

      {!configured && (
        <div className="flex items-start gap-3 bg-warning/5 border border-warning/20 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-warning font-medium">Backend Not Configured</p>
            <p className="text-xs text-gray-500 mt-1">
              Community features require Supabase. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
              environment variables to enable login, discussions, and polls.
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-1 border-b border-dark-600">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === key
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === 'discussions' && <DiscussionList />}

      {tab === 'polls' && (
        <div className="space-y-4">
          {user && (
            <div className="flex justify-end">
              <button
                onClick={() => setShowCreatePoll(!showCreatePoll)}
                className="flex items-center gap-1 px-3 py-1.5 bg-accent text-white text-xs rounded-lg hover:bg-accent-light transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                New Poll
              </button>
            </div>
          )}
          {showCreatePoll && (
            <CreatePoll
              onCreate={(q, opts, cat) => {
                createPoll(q, opts, cat);
                setShowCreatePoll(false);
              }}
              onCancel={() => setShowCreatePoll(false)}
            />
          )}
          {polls.length === 0 ? (
            <div className="text-center py-8 text-gray-600 text-sm">
              No polls yet. Create one to gather opinions!
            </div>
          ) : (
            <div className="space-y-3">
              {polls.map((poll) => (
                <PollCard key={poll.id} poll={poll} onVote={vote} />
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'recent' && (
        <CommentSection title="Recent Community Comments" />
      )}
    </div>
  );
}
