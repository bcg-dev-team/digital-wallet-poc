/**
 * 심볼 관련 타입 정의
 */

import { ALL_SYMBOL_CODES } from './symbol-categories';

/**
 * 거래 심볼 인터페이스
 */
export interface TradingSymbol {
  symbol: string;
  ticker: string;
  description?: string;
  exchange?: string;
  type: string;
}

/**
 * 심볼 기본 정보
 */
// export interface SymbolInfo {
//   symbol: string;
//   name: string;
//   description: string;
//   exchange: string;
//   type: 'forex' | 'crypto' | 'stock' | 'commodity' | 'index';
// }

/**
 * 심볼 가격 데이터 (실시간)
 */
export interface SymbolData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  close: number;
  timestamp?: number;
}

/**
 * 화면 표시용 경량 심볼 데이터 (필수 필드만)
 */
export interface SymbolDisplayData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  bid?: number; // 매도 가격
  ask?: number; // 매수 가격
  high?: number; // 고가
  low?: number; // 저가
  timestamp?: number;
}

/**
 * 시세 업데이트용 부분 데이터
 */
export interface SymbolPriceUpdate {
  symbol: string;
  price: number;
  timestamp?: number;
}

/**
 * 심볼 가격 히스토리
 */
// export interface SymbolPriceHistory {
//   symbol: string;
//   prices: SymbolData[];
//   timeframe: string;
//   startTime: number;
//   endTime: number;
// }

/**
 * 심볼 가격 정보 타입 (실시간 가격 데이터)
 */
export interface SymbolPrice {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high24h: number;
  low24h: number;
}

/**
 * TradingView 차트 바 데이터 (OHLCV)
 */
export interface TradingViewBar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

/**
 * 심볼 통계 정보
 */
// export interface SymbolStats {
//   symbol: string;
//   totalVolume: number;
//   averagePrice: number;
//   priceRange: {
//     high: number;
//     low: number;
//   };
//   volatility: number;
//   lastUpdated: number;
// }

/**
 * 심볼 데이터
 */
const SYMBOL_DATA = {
  // 암호화폐
  BTCUSD: { price: 50000, type: 'crypto', exchange: 'Crypto', description: 'Bitcoin / US Dollar' },
  ETHUSD: { price: 3000, type: 'crypto', exchange: 'Crypto', description: 'Ethereum / US Dollar' },
  XRPUSD: { price: 0.5, type: 'crypto', exchange: 'Crypto', description: 'Ripple / US Dollar' },

  // 외환 - 주요 통화쌍
  EURUSD: { price: 1.05, type: 'forex', exchange: 'Forex', description: 'EUR / USD' },
  GBPUSD: { price: 1.25, type: 'forex', exchange: 'Forex', description: 'GBP / USD' },
  USDJPY: { price: 150.0, type: 'forex', exchange: 'Forex', description: 'USD / JPY' },
  USDCHF: { price: 0.9, type: 'forex', exchange: 'Forex', description: 'USD / CHF' },
  USDCAD: { price: 1.35, type: 'forex', exchange: 'Forex', description: 'USD / CAD' },
  AUDUSD: { price: 0.65, type: 'forex', exchange: 'Forex', description: 'AUD / USD' },
  NZDUSD: { price: 0.6, type: 'forex', exchange: 'Forex', description: 'NZD / USD' },
  EURGBP: { price: 0.84, type: 'forex', exchange: 'Forex', description: 'EUR / GBP' },
  EURJPY: { price: 157.5, type: 'forex', exchange: 'Forex', description: 'EUR / JPY' },
  EURCHF: { price: 0.945, type: 'forex', exchange: 'Forex', description: 'EUR / CHF' },
  EURCAD: { price: 1.42, type: 'forex', exchange: 'Forex', description: 'EUR / CAD' },
  EURAUD: { price: 1.62, type: 'forex', exchange: 'Forex', description: 'EUR / AUD' },
  EURNZD: { price: 1.75, type: 'forex', exchange: 'Forex', description: 'EUR / NZD' },
  GBPJPY: { price: 187.5, type: 'forex', exchange: 'Forex', description: 'GBP / JPY' },
  GBPCHF: { price: 1.125, type: 'forex', exchange: 'Forex', description: 'GBP / CHF' },
  GBPCAD: { price: 1.69, type: 'forex', exchange: 'Forex', description: 'GBP / CAD' },
  GBPAUD: { price: 1.92, type: 'forex', exchange: 'Forex', description: 'GBP / AUD' },
  GBPNZD: { price: 2.08, type: 'forex', exchange: 'Forex', description: 'GBP / NZD' },
  AUDJPY: { price: 97.5, type: 'forex', exchange: 'Forex', description: 'AUD / JPY' },
  AUDCHF: { price: 0.585, type: 'forex', exchange: 'Forex', description: 'AUD / CHF' },
  AUDCAD: { price: 0.88, type: 'forex', exchange: 'Forex', description: 'AUD / CAD' },
  AUDNZD: { price: 1.08, type: 'forex', exchange: 'Forex', description: 'AUD / NZD' },
  NZDJPY: { price: 90.0, type: 'forex', exchange: 'Forex', description: 'NZD / JPY' },
  NZDCHF: { price: 0.54, type: 'forex', exchange: 'Forex', description: 'NZD / CHF' },
  NZDCAD: { price: 0.81, type: 'forex', exchange: 'Forex', description: 'NZD / CAD' },
  CADJPY: { price: 111.0, type: 'forex', exchange: 'Forex', description: 'CAD / JPY' },
  CADCHF: { price: 0.67, type: 'forex', exchange: 'Forex', description: 'CAD / CHF' },
  CHFJPY: { price: 166.7, type: 'forex', exchange: 'Forex', description: 'CHF / JPY' },

  // 기타 외환
  EURTRY: { price: 32.0, type: 'forex', exchange: 'Forex', description: 'EUR / TRY' },
  USDSEK: { price: 10.8, type: 'forex', exchange: 'Forex', description: 'USD / SEK' },
  NOKSEK: { price: 0.95, type: 'forex', exchange: 'Forex', description: 'NOK / SEK' },
  GBPNOK: { price: 13.2, type: 'forex', exchange: 'Forex', description: 'GBP / NOK' },
  EURHUF: { price: 390.0, type: 'forex', exchange: 'Forex', description: 'EUR / HUF' },
  GBPEUR: { price: 1.19, type: 'forex', exchange: 'Forex', description: 'GBP / EUR' },
  EURHKD: { price: 8.2, type: 'forex', exchange: 'Forex', description: 'EUR / HKD' },
  DKKJPY: { price: 22.0, type: 'forex', exchange: 'Forex', description: 'DKK / JPY' },
  CHFNOK: { price: 11.5, type: 'forex', exchange: 'Forex', description: 'CHF / NOK' },
  EURSEK: { price: 11.4, type: 'forex', exchange: 'Forex', description: 'EUR / SEK' },
  GBPDKK: { price: 8.7, type: 'forex', exchange: 'Forex', description: 'GBP / DKK' },
  MXNJPY: { price: 8.5, type: 'forex', exchange: 'Forex', description: 'MXN / JPY' },
  GBPSEK: { price: 13.5, type: 'forex', exchange: 'Forex', description: 'GBP / SEK' },
  HKG33: { price: 18000, type: 'index', exchange: 'HKEX', description: 'Hang Seng Index' },
  USDCZK: { price: 23.0, type: 'forex', exchange: 'Forex', description: 'USD / CZK' },
  PLNJPY: { price: 37.5, type: 'forex', exchange: 'Forex', description: 'PLN / JPY' },
  AUS200: { price: 7500, type: 'index', exchange: 'ASX', description: 'Australia 200' },
  USDDKK: { price: 6.9, type: 'forex', exchange: 'Forex', description: 'USD / DKK' },
  TRYJPY: { price: 4.8, type: 'forex', exchange: 'Forex', description: 'TRY / JPY' },
  EURSGD: { price: 1.44, type: 'forex', exchange: 'Forex', description: 'EUR / SGD' },
  CHFSEK: { price: 12.6, type: 'forex', exchange: 'Forex', description: 'CHF / SEK' },
  NZDAUD: { price: 1.08, type: 'forex', exchange: 'Forex', description: 'NZD / AUD' },
  USOil: { price: 75.0, type: 'commodity', exchange: 'Commodity', description: 'US Oil' },
  EURNOK: { price: 11.2, type: 'forex', exchange: 'Forex', description: 'EUR / NOK' },
  GBPPLN: { price: 4.95, type: 'forex', exchange: 'Forex', description: 'GBP / PLN' },
  FRA40: { price: 7500, type: 'index', exchange: 'Euronext', description: 'France 40' },
  EURPLN: { price: 4.16, type: 'forex', exchange: 'Forex', description: 'EUR / PLN' },
  EURZAR: { price: 19.5, type: 'forex', exchange: 'Forex', description: 'EUR / ZAR' },
  EUSTX50: { price: 4500, type: 'index', exchange: 'Euronext', description: 'Euro Stoxx 50' },
  XAUUSD: { price: 2000.0, type: 'commodity', exchange: 'Commodity', description: 'Gold' },
  UK100: { price: 7500, type: 'index', exchange: 'LSE', description: 'UK 100' },
  USDNOK: { price: 10.7, type: 'forex', exchange: 'Forex', description: 'USD / NOK' },
  USDSGD: { price: 1.37, type: 'forex', exchange: 'Forex', description: 'USD / SGD' },
  EURCZK: { price: 24.5, type: 'forex', exchange: 'Forex', description: 'EUR / CZK' },
  NOKDKK: { price: 0.65, type: 'forex', exchange: 'Forex', description: 'NOK / DKK' },
  USDTRY: { price: 30.0, type: 'forex', exchange: 'Forex', description: 'USD / TRY' },
  SGDJPY: { price: 109.5, type: 'forex', exchange: 'Forex', description: 'SGD / JPY' },
  USDHKD: { price: 7.8, type: 'forex', exchange: 'Forex', description: 'USD / HKD' },

  // 주식
  AAPL: { price: 180.0, type: 'stock', exchange: 'NASDAQ', description: 'Apple Inc.' },

  // 상품
  UKOil: { price: 75.0, type: 'commodity', exchange: 'Commodity', description: 'UK Oil' },
  XAGUSD: { price: 25.0, type: 'commodity', exchange: 'Commodity', description: 'Silver' },

  // 지수
  US30: { price: 35000, type: 'index', exchange: 'NYSE', description: 'Dow Jones 30' },
  ESP35: { price: 9500, type: 'index', exchange: 'BME', description: 'Spain 35' },
  SUI30: { price: 12000, type: 'index', exchange: 'SIX', description: 'Switzerland 30' },
  JPN225: { price: 33000, type: 'index', exchange: 'TSE', description: 'Nikkei 225' },
  GER30: { price: 16000, type: 'index', exchange: 'XETRA', description: 'Germany 30' },
  NAS100: { price: 15000, type: 'index', exchange: 'NASDAQ', description: 'NASDAQ 100' },
} as const;

/**
 * 전체 심볼 목록
 * SYMBOL_DATA 기반
 */
export const ALL_SYMBOLS: TradingSymbol[] = Object.entries(SYMBOL_DATA).map(([ticker, data]) => ({
  symbol: ticker,
  ticker,
  description: data.description,
  exchange: data.exchange,
  type: data.type,
}));

/**
 * 심볼별 기본 가격 설정
 * SYMBOL_DATA 기반
 */
export const SYMBOL_BASE_PRICES: Record<string, number> = Object.fromEntries(
  Object.entries(SYMBOL_DATA).map(([ticker, data]) => [ticker, data.price])
);

// TradingViewSymbolInfo와 TRADINGVIEW_SYMBOL_INFO_LIST는 symbol-categories.ts로 이동됨
// 필요한 경우 symbol-categories.ts에서 import 해서 사용
