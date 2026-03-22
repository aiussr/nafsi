import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '@/hooks/useData';
import { loadDocuments } from '@/data/loader';
import { DocumentList } from '@/components/documents/DocumentList';
import { FileText } from 'lucide-react';

export function DocumentsPage() {
  const { t } = useTranslation();
  const { data: documents, loading } = useData(useCallback(() => loadDocuments(), []));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/20">
          <FileText className="w-5 h-5 text-accent" />
        </div>
        <h1 className="text-2xl font-bold text-gray-100">{t('documents.title')}</h1>
      </div>

      {loading || !documents ? (
        <div className="text-center py-20 text-gray-500">{t('common.loading')}</div>
      ) : (
        <DocumentList documents={documents} />
      )}
    </div>
  );
}
