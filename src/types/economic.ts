import { LocalizedString } from './event';

export type EconomicCategory = 'oil' | 'currency' | 'stock' | 'trade' | 'inflation' | 'commodity';

export interface DataPoint {
  date: string;
  value: number;
  note?: string;
}

export interface EconomicIndicator {
  id: string;
  indicator: LocalizedString;
  category: EconomicCategory;
  dataPoints: DataPoint[];
  unit: string;
  sources: string[];
}
