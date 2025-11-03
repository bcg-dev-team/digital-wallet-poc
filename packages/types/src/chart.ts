/**
 * 차트 관련 타입 정의
 * @fileoverview 차트 레이아웃, 설정, 데이터 타입 및 상수 정의
 */

import type { TradingSymbol } from './market/symbol';

/**
 * 차트 레이아웃 타입
 */
export type ChartLayout = '1x1' | '2x2' | '3x3' | '4x4';

/**
 * 차트 기본값 상수
 */
export const CHART_DEFAULTS = {
  TIMEFRAME: '1',
  LAYOUT: '1x1' as ChartLayout,
  SYNC_COLOR: '#2962FF',
  GRID_COLUMNS: 1,
  GRID_ROWS: 1,
} as const;

/**
 * 차트 데이터 타입
 */
export interface ChartData {
  id: string;
  symbol: TradingSymbol;
  timeframe: string;
  isSelected: boolean;
  syncColor?: string;
  position: { row: number; col: number };
}

/**
 * 차트 설정 타입 정의
 */
export interface ChartSettings {
  // === 기본 탭 ===
  basic: {
    // 테마 (redBlue: 빨강/파랑, greenRed: 녹색/빨강)
    theme: 'redBlue' | 'greenRed';
    // 가격 정밀도
    precision: string;
    // 타임존 (UTC +09:00) 서울(KST)
    timezone: string;
    // 시간 형식 (24시간)
    locale?: string;
  };
  // === 심볼 및 지표 탭 ===
  symbols: {
    // 지표 값 (지표 이름 표시)
    showIndicatorNames: boolean;
    // 지표 매개변수 (지표 설정값 표시)
    showIndicatorArguments: boolean;
    // 지표 값 (지표 계산값 표시)
    showIndicatorValues: boolean;
  };
  // === 축 및 눈금선 탭 ===
  scales: {
    // 종목 가격 (우측 가격 축 표시)
    showPriceLabels: boolean;
    // 격자선 (차트 격자선 표시/숨김)
    showGridLines: boolean;
    // 격자선 모드 (수직/수평)
    gridLineMode: 'both' | 'vertical' | 'horizontal';
    // 수직 격자선 색상
    verticalGridColor: string;
    // 수평 격자선 색상
    horizontalGridColor: string;
    // 십자선 (마우스 커서 십자선 표시)
    showCrosshair: boolean;
    // 십자선 색상
    crosshairColor: string;
  };
  // === 트레이딩 탭 ===
  trading: {
    // 매수/매도 버튼 (차트 위 거래 버튼 표시)
    showBuySellButtons: boolean;
    // 즉시 주문 실행 (원클릭 거래 활성화)
    instantOrderExecution: boolean;
    // 주문 (차트에 주문 정보 표시)
    showOrders: boolean;
  };
}

/**
 * 차트 초기화 설정
 */
export interface ChartConfig {
  // 심볼 (거래 종목명, 예: EURUSD, BTCUSD)
  symbol: string;
  // 시간 간격 (1분, 5분, 1시간 등)
  interval: string;
  // 컨테이너 ID (TradingView 위젯이 렌더링될 DOM 요소 ID)
  container: string;
  // 차트 너비 (픽셀 또는 퍼센트)
  width?: number | string;
  // 차트 높이 (픽셀 또는 퍼센트)
  height?: number | string;
  // 언어 설정 (ko, en 등)
  locale?: string;
  // 디버그 모드 (개발 시 TradingView 디버그 정보 표시)
  debug?: boolean;
  // 차트 설정 (테마, 정밀도, 타임존 등)
  settings?: ChartSettings;
}

/**
 * 차트 심볼 정보
 */
export interface ChartSymbolInfo {
  // 심볼 (거래 종목명)
  symbol: string;
  // 시간 간격 (차트 시간대)
  interval: string;
  // 마지막 업데이트 시간 (타임스탬프)
  lastUpdate: number;
}

/**
 * 차트 시간대 옵션
 */
export const CHART_TIMEFRAMES = [
  { value: '1', label: '1m' },
  { value: '5', label: '5m' },
  { value: '15', label: '15m' },
  { value: '30', label: '30m' },
  { value: '60', label: '1h' },
  { value: '240', label: '4h' },
  { value: '1D', label: '1D' },
  { value: '1W', label: '1W' },
  { value: '1M', label: '1M' },
] as const;

/**
 * 차트 레이아웃 옵션 타입 (UI 특화 타입은 제거하고 기본적으로 정의)
 */
export interface ChartLayoutOption {
  value: ChartLayout;
  label?: string;
}

/**
 * 동기화 색상 옵션
 */
export const SYNC_COLORS = [
  { value: '--base-colors-blue-blue800-deep', label: 'A' },
  { value: '--base-colors-green-green700', label: 'B' },
  { value: '--base-colors-purple-purple600', label: 'C' },
  { value: '--base-colors-primary-primary900', label: 'D' },
  { value: '--base-colors-neutral-neutral600', label: 'E' },
  { value: '--base-colors-red-red700', label: 'F' },
] as const;

/**
 * 기본 외환 심볼 데이터
 */
export const DEFAULT_FOREX_SYMBOLS = [
  {
    symbol: 'EURUSD',
    ticker: 'EURUSD',
    description: 'EUR/USD',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
  {
    symbol: 'GBPUSD',
    ticker: 'GBPUSD',
    description: 'GBP/USD',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
  {
    symbol: 'USDJPY',
    ticker: 'USDJPY',
    description: 'USD/JPY',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
  {
    symbol: 'AUDUSD',
    ticker: 'AUDUSD',
    description: 'AUD/USD',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
  {
    symbol: 'USDCAD',
    ticker: 'USDCAD',
    description: 'USD/CAD',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
  {
    symbol: 'NZDUSD',
    ticker: 'NZDUSD',
    description: 'NZD/USD',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
  {
    symbol: 'EURGBP',
    ticker: 'EURGBP',
    description: 'EUR/GBP',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
  {
    symbol: 'EURJPY',
    ticker: 'EURJPY',
    description: 'EUR/JPY',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
  {
    symbol: 'GBPJPY',
    ticker: 'GBPJPY',
    description: 'GBP/JPY',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
  {
    symbol: 'AUDJPY',
    ticker: 'AUDJPY',
    description: 'AUD/JPY',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
  {
    symbol: 'CADJPY',
    ticker: 'CADJPY',
    description: 'CAD/JPY',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
  {
    symbol: 'NZDJPY',
    ticker: 'NZDJPY',
    description: 'NZD/JPY',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
  {
    symbol: 'EURCHF',
    ticker: 'EURCHF',
    description: 'EUR/CHF',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
  {
    symbol: 'GBPCHF',
    ticker: 'GBPCHF',
    description: 'GBP/CHF',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
  {
    symbol: 'AUDCHF',
    ticker: 'AUDCHF',
    description: 'AUD/CHF',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
  {
    symbol: 'NZDCHF',
    ticker: 'NZDCHF',
    description: 'NZD/CHF',
    exchange: 'FOREX',
    type: 'forex' as const,
  },
] as const;

/**
 * 차트 컴포넌트 공통 이벤트 타입
 */
export interface ChartComponentEmits {
  (e: 'chart-select', chartId: string): void;
  (e: 'chart-close', chartId: string): void;
  (e: 'chart-sync', chartId: string, syncColor: string): void;
  (e: 'chart-symbol-change', chartId: string, symbol: any): void;
  (e: 'chart-timeframe-change', chartId: string, timeframe: string): void;
}

/**
 * 차트 윈도우 Props 타입
 */
export interface ChartWindowProps {
  chart: ChartData;
  isSelected: boolean;
  timeframe: string;
}

/**
 * 차트 그리드 Props 타입
 */
export interface ChartGridProps {
  charts: ChartData[];
  selectedChart: string | null;
  layout: ChartLayout;
}

/**
 * 차트 툴바 Props 타입
 * 데스크톱, 모바일 등에서 공통 사용
 */
export interface ChartToolbarProps {
  selectedChart?: string | null;
  selectedChartData?: ChartData | null;
  currentLayout?: ChartLayout;
}

/**
 * 차트 툴바 이벤트 타입
 * 데스크톱, 모바일 등에서 공통 사용
 */
export interface ChartToolbarEmits {
  (e: 'timeframe-change', timeframe: string): void;
  (e: 'indicator-change', indicator: string): void;
  (e: 'layout-change', layout: ChartLayout): void;
  (e: 'chart-manage'): void;
  (e: 'chart-eye'): void;
  (e: 'chart-setup'): void;
  (e: 'chart-settings'): void;
  (e: 'workspace-save'): void;
}

/**
 * 차트 윈도우 이벤트 타입
 * 개별 차트 윈도우의 상호작용 이벤트
 */
export interface ChartWindowEmits {
  (e: 'select'): void;
  (e: 'close'): void;
  (e: 'sync', syncColor: string): void;
  (e: 'external-link'): void;
  (e: 'previous'): void;
  (e: 'next'): void;
  (e: 'symbol-change', symbol: TradingSymbol): void;
  (e: 'timeframe-change', timeframe: string): void;
}

/**
 * 멀티 차트 레이아웃 이벤트 타입
 * 여러 차트를 관리하는 레이아웃의 이벤트
 */
export interface MultiChartLayoutEmits {
  (e: 'chart-select', chart: ChartData): void;
  (e: 'symbol-change', symbol: TradingSymbol): void;
}

/**
 * 차트 드로잉 툴바 이벤트 타입
 * 차트 그리기 도구들의 이벤트
 */
export interface ChartDrawingToolbarEmits {
  (e: 'add-chart'): void;
  (e: 'chart-eye'): void;
  (e: 'chart-setup'): void;
}

/**
 * TradingView 차트 이벤트 타입
 * TradingView 차트 컴포넌트의 이벤트
 */
export interface TradingViewChartEmits {
  (e: 'chart-ready'): void;
}
