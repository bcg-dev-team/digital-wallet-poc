/**
 * TradingView 관련 타입 정의
 */

// 공통 타입 import
import type { TradingSymbol, TradingViewBar } from '@template/types';

// 공통 타입 re-export
export type { TradingSymbol, TradingViewBar };

// 심볼 정보
export interface TradingViewSymbolInfo {
  ticker: string;
  name: string;
  description: string;
  type: string;
  session: string;
  timezone: string;
  exchange: string;
  minmov: number;
  pricescale: number;
  has_intraday: boolean;
  visible_plots_set: string;
  has_weekly_and_monthly: boolean;
  supported_resolutions: string[];
  volume_precision: number;
  data_status: string;
  format: string;
  full_name?: string;
}

// 차트 기간 파라미터
export interface ChartPeriodParams {
  from: number;
  to: number;
  firstDataRequest: boolean;
}

// TradingView 설정 데이터
export interface TradingViewConfiguration {
  supported_resolutions: string[];
  symbols_types: Array<{ name: string; value: string }>;
  supports_marks: boolean;
  supports_timescale_marks: boolean;
  supports_time: boolean;
  supports_search: boolean;
  supports_group_request: boolean;
}

// 콜백 타입들
export interface HistoryCallback {
  (bars: TradingViewBar[], meta: { noData: boolean }): void;
}

export interface ErrorCallback {
  (error: string | Error): void;
}

export interface RealtimeCallback {
  (bar: TradingViewBar): void;
}

export interface ResetCacheCallback {
  (): void;
}

// TradingView 위젯 설정
export interface TradingViewWidgetConfig {
  symbol: string;
  interval: string;
  fullscreen: boolean;
  container: string;
  datafeed: any;
  library_path: string;
  width: number | string;
  height: number | string;
  locale: string;
  debug: boolean;
  enabled_features?: string[];
  disabled_features?: string[];
  charts_storage_url?: string;
  charts_storage_api_version?: string;
  client_id?: string;
  user_id?: string;
  overrides?: Record<string, any>;
  studies_overrides?: Record<string, any>;
  // theme - settings.basic.theme으로 캔들 색상 제어
  custom_css_url?: string;
  loading_screen?: { backgroundColor: string };
  timezone?: string; // 타임존 설정
  time_frames?: any[]; // 시간대 설정
}

// TradingView 위젯 인스턴스
export interface TradingViewWidget {
  onChartReady(callback: () => void): void;
  setSymbol(symbol: string, interval: string): void;
  chart(): any;
}

// 차트 컴포넌트 Props
export interface ChartProps {
  symbol?: string;
  interval?: string;
}

// API 응답 데이터
export interface CryptoCompareApiData {
  Response?: string;
  Message?: string;
  HasWarning?: boolean;
  Type?: number;
  RateLimit?: Record<string, any>;
  TimeTo?: number;
  TimeFrom?: number;
  FirstValueInArray?: boolean;
  ConversionType?: {
    type: string;
    conversionSymbol: string;
  };
  Data: Array<{
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volumefrom?: number;
    volumeto?: number;
  }>;
}

// 데이터피드 인터페이스
export interface TradingViewDatafeed {
  onReady(callback: (config: TradingViewConfiguration) => void): void;
  searchSymbols(
    userInput: string,
    exchange: string,
    symbolType: string,
    onResultReadyCallback: (symbols: TradingSymbol[]) => void
  ): Promise<void>;
  resolveSymbol(
    symbolName: string,
    onSymbolResolvedCallback: (symbolInfo: TradingViewSymbolInfo) => void,
    onResolveErrorCallback: ErrorCallback,
    extension?: any
  ): Promise<void>;
  getBars(
    symbolInfo: TradingViewSymbolInfo,
    resolution: string,
    periodParams: ChartPeriodParams,
    onHistoryCallback: HistoryCallback,
    onErrorCallback: ErrorCallback
  ): Promise<void>;
  subscribeBars(
    symbolInfo: TradingViewSymbolInfo,
    resolution: string,
    onRealtimeCallback: RealtimeCallback,
    subscriberUID: string,
    onResetCacheNeededCallback?: ResetCacheCallback
  ): void;
  unsubscribeBars(subscriberUID: string): void;
}
