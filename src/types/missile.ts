import { LocalizedString } from './event';

export type MissileType = 'ballistic' | 'cruise' | 'hypersonic' | 'drone' | 'interceptor' | 'air-defense';
export type SpeedCategory = 'subsonic' | 'supersonic' | 'hypersonic';

export interface MissileSpecs {
  length_m?: number;
  diameter_m?: number;
  weight_kg?: number;
  guidance: string;
  propulsion?: string;
  cep_m?: number;
}

export interface Missile {
  id: string;
  name: LocalizedString;
  country: 'IR' | 'IL';
  type: MissileType;
  range_km: number;
  warhead_kg?: number;
  speed: SpeedCategory;
  description: LocalizedString;
  image: string;
  specs: MissileSpecs;
  sources: string[];
}
