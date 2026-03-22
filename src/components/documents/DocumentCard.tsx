import { useLanguage } from '@/hooks/useLanguage';
import { ShareButtons } from '@/components/shared/ShareButtons';
import type { ConflictDocument } from '@/types';
import { FileText, Video, BarChart3, Library, ExternalLink } from 'lucide-react';

const typeIcons: Record<string, typeof FileText> = {
  report: FileText,
  video: Video,
  analysis: BarChart3,
  compilation: Library,
};

const typeColors: Record<string, string> = {
  report: 'bg-blue-500/20 text-blue-400',
  video: 'bg-danger/20 text-danger-light',
  analysis: 'bg-warning/20 text-warning',
  compilation: 'bg-purple-500/20 text-purple-400',
};

interface DocumentCardProps {
  document: ConflictDocument;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const { t } = useLanguage();
  const Icon = typeIcons[document.type] || FileText;

  return (
    <div className="bg-dark-800 rounded-xl border border-dark-600 overflow-hidden hover:border-dark-500 transition-colors">
      {/* Video embed */}
      {document.embedUrl ? (
        <div className="aspect-video bg-dark-700">
          <iframe
            src={document.embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="h-32 bg-dark-700 flex items-center justify-center">
          <Icon className="w-10 h-10 text-gray-600" />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${typeColors[document.type]}`}>
            {document.type}
          </span>
          <span className="text-xs text-gray-500">{document.date}</span>
        </div>
        <h3 className="text-sm font-semibold text-gray-100 mb-1">{t(document.title)}</h3>
        <p className="text-xs text-gray-400 line-clamp-2 mb-3">{t(document.description)}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {document.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-dark-700 rounded text-xs text-gray-500">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-dark-600">
          <a
            href={document.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-accent hover:text-accent-light transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            View
          </a>
          <ShareButtons title={t(document.title)} url={document.url} />
        </div>
      </div>
    </div>
  );
}
