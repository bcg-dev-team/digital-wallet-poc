/**
 * 종목 카테고리별 종목 코드 정의
 * API 응답을 기다리지 않고 카테고리 표시를 위해 사용
 */

/**
 * 종목 그룹 코드
 */
export enum StockGroupCode {
  FOREX = '01',
  INDEX = '02',
  COMMODITY = '03',
  CRYPTO = '04',
}

/**
 * 카테고리별 종목 코드 맵
 * 실제 API 응답 기준
 * 2025-10-22 업데이트
 */
export const SYMBOL_CATEGORIES = {
  // 외환 (Forex) - stockGroupCd: "01"
  forex: [
    'GBPUSD',
    'EURCAD',
    'NZDCHF',
    'AUDUSD',
    'GBPNZD',
    'GBPCHF',
    'USDCHF',
    'USDZAR',
    'NZDUSD',
    'USDSGD',
    'EURJPY',
    'EURCHF',
    'GBPCAD',
    'GBPJPY',
    'EURGBP',
    'USDHKD',
    'CHFJPY',
    'AUDCHF',
    'AUDNZD',
    'NZDJPY',
    'EURNZD',
    'CADCHF',
    'EURAUD',
    'AUDJPY',
    'USDJPY',
    'USDCAD',
    'GBPAUD',
    'EURSGD',
    'NZDCAD',
    'AUDCAD',
    'EURUSD',
    'CADJPY',
  ] as const,

  // 지수 (Index) - stockGroupCd: "02"
  index: ['US30', 'AUS200', 'CN50', 'UK100'] as const,

  // 상품 (Commodity) - stockGroupCd: "03"
  commodity: ['XLMUSD', 'XRPUSD', 'XAGUSD', 'XAUUSD'] as const,

  // 가상화폐 (Crypto) - stockGroupCd: "04"
  crypto: ['LTCUSD', 'ETHUSD', 'BTCUSD'] as const,
} as const;

/**
 * 모든 종목 코드 배열
 * API 응답 기반으로 업데이트
 * 실제 서비스에서 제공되는 종목만 포함
 * 총 43개 종목 (Forex: 32개, Index: 4개, Commodity: 4개, Crypto: 3개)
 */
export const ALL_SYMBOL_CODES = [
  ...SYMBOL_CATEGORIES.forex,
  ...SYMBOL_CATEGORIES.index,
  ...SYMBOL_CATEGORIES.commodity,
  ...SYMBOL_CATEGORIES.crypto,
] as const;

/**
 * 종목 코드 타입
 */
export type SymbolCode = (typeof ALL_SYMBOL_CODES)[number];

/**
 * 종목 코드가 어느 카테고리에 속하는지 확인
 */
export function getSymbolCategory(
  stockCd: string
): 'forex' | 'index' | 'commodity' | 'crypto' | undefined {
  if (SYMBOL_CATEGORIES.forex.includes(stockCd as any)) return 'forex';
  if (SYMBOL_CATEGORIES.index.includes(stockCd as any)) return 'index';
  if (SYMBOL_CATEGORIES.commodity.includes(stockCd as any)) return 'commodity';
  if (SYMBOL_CATEGORIES.crypto.includes(stockCd as any)) return 'crypto';
  return undefined;
}

/**
 * 종목 그룹 코드를 카테고리로 변환
 */
export function groupCodeToCategory(
  stockGroupCd?: string
): 'forex' | 'index' | 'commodity' | 'crypto' | undefined {
  switch (stockGroupCd) {
    case StockGroupCode.FOREX:
      return 'forex';
    case StockGroupCode.INDEX:
      return 'index';
    case StockGroupCode.COMMODITY:
      return 'commodity';
    case StockGroupCode.CRYPTO:
      return 'crypto';
    default:
      return undefined;
  }
}

/**
 * TradingView 심볼 정보 타입
 */
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
}

/**
 * 카테고리별 기본 설정
 */
const CATEGORY_DEFAULTS = {
  forex: {
    type: 'forex',
    exchange: 'Forex',
    pricescale: 10000, // 소수점 4자리
  },
  index: {
    type: 'index',
    exchange: 'Index',
    pricescale: 1, // 정수
  },
  commodity: {
    type: 'commodity',
    exchange: 'Commodity',
    pricescale: 100, // 소수점 2자리
  },
  crypto: {
    type: 'crypto',
    exchange: 'Crypto',
    pricescale: 100, // 소수점 2자리
  },
} as const;

/**
 * 심볼 설명 생성 헬퍼
 */
const generateDescription = (ticker: string, category: string): string => {
  if (category === 'forex') {
    // EURUSD -> EUR / USD
    const base = ticker.slice(0, 3);
    const quote = ticker.slice(3, 6);
    return `${base} / ${quote}`;
  }
  return ticker;
};

/**
 * TradingView 심볼 정보 배열
 * SYMBOL_CATEGORIES 기반으로 실제 API 지원 심볼만 생성
 */
export const TRADINGVIEW_SYMBOL_INFO_LIST: Record<string, TradingViewSymbolInfo> =
  Object.fromEntries(
    ALL_SYMBOL_CODES.map((ticker) => {
      // 카테고리 찾기
      let category: keyof typeof CATEGORY_DEFAULTS = 'forex';
      if (SYMBOL_CATEGORIES.forex.includes(ticker as any)) category = 'forex';
      else if (SYMBOL_CATEGORIES.index.includes(ticker as any)) category = 'index';
      else if (SYMBOL_CATEGORIES.commodity.includes(ticker as any)) category = 'commodity';
      else if (SYMBOL_CATEGORIES.crypto.includes(ticker as any)) category = 'crypto';

      const defaults = CATEGORY_DEFAULTS[category];

      return [
        ticker,
        {
          ticker,
          name: ticker,
          description: generateDescription(ticker, category),
          type: defaults.type,
          session: '24x7',
          timezone: 'Etc/UTC',
          exchange: defaults.exchange,
          minmov: 1,
          pricescale: defaults.pricescale,
          has_intraday: true,
          visible_plots_set: 'ohlc',
          has_weekly_and_monthly: false,
          supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W'],
          volume_precision: 2,
          data_status: 'streaming',
          format: 'price',
        } satisfies TradingViewSymbolInfo,
      ];
    })
  );
