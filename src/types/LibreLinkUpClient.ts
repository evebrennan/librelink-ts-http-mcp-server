// Type definitions for LibreLinkUp client
export type TrendType =
  | 'SingleDown'
  | 'FortyFiveDown'
  | 'Flat'
  | 'FortyFiveUp'
  | 'SingleUp'
  | 'NotComputable';

export interface LibreCgmData {
  value: number;
  isHigh: boolean;
  isLow: boolean;
  trend: TrendType;
  date: Date;
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

export interface ReadRawResponse {
  connection: any;
  activeSensors: any[];
  graphData: GlucoseItem[];
}

export interface ReadResponse {
  current: LibreCgmData;
  history: LibreCgmData[];
}

export interface LibreLinkUpClient {
  read(): Promise<ReadResponse>;
  readRaw(): Promise<ReadRawResponse>;
  readAveraged: (
    amount: number,
    callback: (average: LibreCgmData, memory: LibreCgmData[], history: LibreCgmData[]) => void,
    interval?: number
  ) => Promise<() => void>;
  login(): Promise<any>;
}
