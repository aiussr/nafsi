import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentCard } from './DocumentCard';
import type { ConflictDocument } from '@/types';

interface DocumentListProps {
  documents: ConflictDocument[];
}

export function DocumentList({ documents }: DocumentListProps) {
  const { t } = useTranslation();
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [tagFilter, setTagFilter] = useState<string>('');

  const allTags = useMemo(() => [...new Set(documents.flatMap((d) => d.tags))], [documents]);

  const filtered = useMemo(() => {
    let result = documents;
    if (typeFilter) result = result.filter((d) => d.type === typeFilter);
    if (tagFilter) result = result.filter((d) => d.tags.includes(tagFilter));
    return result;
  }, [documents, typeFilter, tagFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setTypeFilter(''); setTagFilter(''); }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium ${!typeFilter && !tagFilter ? 'bg-accent text-white' : 'bg-dark-700 text-gray-400'}`}
        >
          {t('common.all')}
        </button>
        {['report', 'video', 'analysis', 'compilation'].map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(typeFilter === type ? '' : type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${typeFilter === type ? 'bg-accent text-white' : 'bg-dark-700 text-gray-400'}`}
          >
            {t(`documents.${type}`, type)}
          </button>
        ))}
        <div className="w-px bg-dark-600 mx-1" />
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setTagFilter(tagFilter === tag ? '' : tag)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${tagFilter === tag ? 'bg-warning text-dark-900' : 'bg-dark-700 text-gray-400'}`}
          >
            #{tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </div>
    </div>
  );
}
