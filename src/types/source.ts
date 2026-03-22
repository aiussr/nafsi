import { LocalizedString } from './event';

export type SourceType = 'news_agency' | 'government' | 'osint' | 'social_media' | 'think_tank' | 'international_org';
export type Credibility = 'high' | 'medium' | 'low' | 'unverified';

export interface Source {
  id: string;
  name: string;
  type: SourceType;
  url: string;
  credibility: Credibility;
  country: string;
  description: LocalizedString;
}
