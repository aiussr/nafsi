import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '@/hooks/useData';
import { loadSources } from '@/data/loader';
import { useLanguage } from '@/hooks/useLanguage';
import type { Source, Credibility, SourceType } from '@/types';
import { ExternalLink, Shield, BookOpen } from 'lucide-react';

const credColors: Record<Credibility, string> = {
  high: 'bg-safe/20 text-safe border-safe/30',
  medium: 'bg-warning/20 text-warning border-warning/30',
  low: 'bg-danger/20 text-danger-light border-danger/30',
  unverified: 'bg-gray-600/20 text-gray-400 border-gray-600/30',
};

export function SourcesPage() {
  const { t: tr } = useTranslation();
  const { t } = useLanguage();
  const { data: sources, loading } = useData(useCallback(() => loadSources(), []));
  const [typeFilter, setTypeFilter] = useState<string>('');

  const types = useMemo(() => {
    if (!sources) return [];
    return [...new Set(sources.map((s) => s.type))];
  }, [sources]);

  const filtered = useMemo(() => {
    if (!sources) return [];
    if (!typeFilter) return sources;
    return sources.filter((s) => s.type === typeFilter);
  }, [sources, typeFilter]);

  const grouped = useMemo(() => {
    const groups: Record<string, Source[]> = {};
    for (const src of filtered) {
      if (!groups[src.type]) groups[src.type] = [];
      groups[src.type].push(src);
    }
    return groups;
  }, [filtered]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-safe/20">
          <BookOpen className="w-5 h-5 text-safe" />
        </div>
        <h1 className="text-2xl font-bold text-gray-100">{tr('sources_page.title')}</h1>
      </div>

      {/* Type filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setTypeFilter('')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium ${!typeFilter ? 'bg-accent text-white' : 'bg-dark-700 text-gray-400'}`}
        >
          {tr('common.all')}
        </button>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(typeFilter === type ? '' : type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${typeFilter === type ? 'bg-accent text-white' : 'bg-dark-700 text-gray-400'}`}
          >
            {type.replace('_', ' ')}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">{tr('common.loading')}</div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([type, srcs]) => (
            <div key={type}>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {type.replace('_', ' ')}
              </h2>
              <div className="space-y-3">
                {srcs.map((src) => (
                  <div key={src.id} className="bg-dark-800 rounded-xl border border-dark-600 p-4 flex items-center gap-4">
                    <Shield className="w-5 h-5 text-gray-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-gray-100">{src.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${credColors[src.credibility]}`}>
                          {tr(`sources_page.${src.credibility}`)}
                        </span>
                        <span className="text-xs text-gray-500">{src.country}</span>
                      </div>
                      <p className="text-xs text-gray-400">{t(src.description)}</p>
                    </div>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-dark-700 text-gray-400 hover:text-accent transition-colors shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
