// Re-export types from @diakem/libre-link-up-api-client for consistency
export type { LibreCgmData, TrendType } from '@diakem/libre-link-up-api-client';

export interface LibreLinkUpClient {
  read(): Promise<LibreCgmData[]>;
  readRaw(): Promise<ReadRawResponse>;
  readAveraged(): Promise<LibreCgmData>;
}

// Types from the library for reference
export interface ReadRawResponse {
  connection: any;
  activeSensors: any[];
  graphData: GlucoseItem[];
}

export interface GlucoseItem {
  FactoryTimestamp: string;
  Timestamp: string;
  type: number;
  ValueInMgPerDl: number;
  TrendArrow?: number;
  TrendMessage?: null;
  MeasurementColor: number;
  GlucoseUnits: number;
  Value: number;
  isHigh: boolean;
  isLow: boolean;
}

export interface LibreCgmData {
  value: number;
  isHigh: boolean;
  isLow: boolean;
  trend: TrendType;
  date: Date;
}

export type TrendType =
  | 'SingleDown'
  | 'FortyFiveDown'
  | 'Flat'
  | 'FortyFiveUp'
  | 'SingleUp'
  | 'NotComputable';
