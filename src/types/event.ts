export interface LocalizedString {
  en: string;
  he: string;
  ar: string;
}

export type EventType = 'strike' | 'missile' | 'cyber' | 'diplomatic' | 'military' | 'drone' | 'interception';
export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type DataSource = 'manual' | 'rss' | 'gdelt';

export interface GeoLocation {
  name: string;
  lat: number;
  lng: number;
  country: string;
}

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface ConflictEvent {
  id: string;
  timestamp: string;
  title: LocalizedString;
  description: LocalizedString;
  type: EventType;
  location: GeoLocation;
  severity: Severity;
  sources: string[];
  media: MediaItem[];
  relatedEvents: string[];
  verified: boolean;
  _source?: DataSource;
}
