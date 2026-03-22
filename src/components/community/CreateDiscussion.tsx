import { useState } from 'react';

interface CreateDiscussionProps {
  onCreate: (title: string, content: string, category: string) => void;
  onCancel: () => void;
}

const categories = ['general', 'events', 'analysis', 'off-topic'];

export function CreateDiscussion({ onCreate, onCancel }: CreateDiscussionProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');

  const handleSubmit = () => {
    if (!title.trim()) return;
    onCreate(title, content, category);
  };

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-lg p-4 space-y-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Discussion title..."
        className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent/50"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind? (optional)"
        rows={3}
        className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent/50 resize-none"
      />
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                category === cat
                  ? 'bg-accent/20 text-accent'
                  : 'text-gray-600 hover:text-gray-400 bg-dark-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="px-4 py-1.5 bg-accent text-white text-xs rounded-lg hover:bg-accent-light transition-colors disabled:opacity-40"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
