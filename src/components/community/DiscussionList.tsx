import { useState } from 'react';
import { useDiscussions } from '@/hooks/useDiscussions';
import { DiscussionCard } from './DiscussionCard';
import { CreateDiscussion } from './CreateDiscussion';
import { Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const categories = ['all', 'general', 'events', 'analysis', 'off-topic'];

export function DiscussionList() {
  const [category, setCategory] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const { discussions, loading, createDiscussion } = useDiscussions(category);
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                category === cat
                  ? 'bg-accent/20 text-accent'
                  : 'text-gray-500 hover:text-gray-300 bg-dark-700'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        {user && (
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-1 px-3 py-1.5 bg-accent text-white text-xs rounded-lg hover:bg-accent-light transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            New Thread
          </button>
        )}
      </div>

      {showCreate && (
        <CreateDiscussion
          onCreate={(title, content, cat) => {
            createDiscussion(title, content, cat);
            setShowCreate(false);
          }}
          onCancel={() => setShowCreate(false)}
        />
      )}

      {loading ? (
        <div className="text-center py-8 text-gray-600 text-sm">Loading discussions...</div>
      ) : discussions.length === 0 ? (
        <div className="text-center py-8 text-gray-600 text-sm">No discussions yet. Start one!</div>
      ) : (
        <div className="space-y-2">
          {discussions.map((d) => (
            <DiscussionCard key={d.id} discussion={d} />
          ))}
        </div>
      )}
    </div>
  );
}
