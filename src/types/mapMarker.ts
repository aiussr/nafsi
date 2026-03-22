import { LocalizedString } from './event';

export type MarkerType = 'target' | 'launch_site' | 'interception' | 'blackout_zone' | 'military_base';
export type MarkerIcon = 'target' | 'missile' | 'shield' | 'blackout' | 'base';

export interface MissilePath {
  id: string;
  from: { lat: number; lng: number; label: LocalizedString };
  to: { lat: number; lng: number; label: LocalizedString };
  missileType?: string;
  timestamp?: string;
  intercepted?: boolean;
}

export interface MapMarker {
  id: string;
  type: MarkerType;
  position: { lat: number; lng: number };
  label: LocalizedString;
  details: LocalizedString;
  relatedEvent?: string;
  icon: MarkerIcon;
}
