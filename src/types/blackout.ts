import { GeoLocation, LocalizedString, DataSource } from './event';

export type BlackoutType = 'internet' | 'power' | 'communications' | 'gps';
export type BlackoutStatus = 'ongoing' | 'resolved' | 'unconfirmed';

export interface Blackout {
  id: string;
  location: GeoLocation;
  type: BlackoutType;
  startTime: string;
  endTime?: string;
  status: BlackoutStatus;
  affectedArea_km2?: number;
  description: LocalizedString;
  sources: string[];
  _source?: DataSource;
}
