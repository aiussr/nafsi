import { LocalizedString } from './event';

export type DocumentType = 'report' | 'video' | 'analysis' | 'compilation';

export interface ConflictDocument {
  id: string;
  title: LocalizedString;
  type: DocumentType;
  date: string;
  description: LocalizedString;
  url: string;
  embedUrl?: string;
  thumbnail?: string;
  tags: string[];
  sources: string[];
}
