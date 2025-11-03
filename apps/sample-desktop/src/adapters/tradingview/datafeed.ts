/*
 * datafeed api는 위젯 생성자에서 구현하고 datafeed 객체에 할당해야 하는 메서드 집합
 */

import type {
  TradingViewDatafeed,
  TradingViewBar,
  TradingViewSymbolInfo,
  TradingSymbol,
  TradingViewConfiguration,
  ChartPeriodParams,
  HistoryCallback,
  ErrorCallback,
  RealtimeCallback,
  ResetCacheCallback,
} from '@/types/tradingview';

import { subscribeOnStream, unsubscribeFromStream } from './streaming';
import { TRADINGVIEW_SYMBOL_INFO_LIST } from '@template/types';
import { ALL_SYMBOLS } from '@template/types';
import { quoteService } from '@/services/api';
const lastBarsCache = new Map<string, TradingViewBar>();

const datafeed: TradingViewDatafeed = {
  onReady: (callback: (config: TradingViewConfiguration) => void): void => {
    console.log('[onReady]: Method call');
    setTimeout(() => callback(configurationData));
  },

  // TODO: Chart Widget 내장 검색 기능 불필요 시 내부 로직 제거
  searchSymbols: async (
    userInput: string,
    exchange: string,
    symbolType: string,
    onResultReadyCallback: (symbols: TradingSymbol[]) => void
  ): Promise<void> => {
    onResultReadyCallback(ALL_SYMBOLS);
  },

  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: (symbolInfo: TradingViewSymbolInfo) => void,
    onResolveErrorCallback: ErrorCallback,
    extension?: any
  ): Promise<void> => {
    // TRADINGVIEW_SYMBOL_INFO_LIST에서 심볼 정보 가져오기
    let symbolInfo = TRADINGVIEW_SYMBOL_INFO_LIST[symbolName];

    onSymbolResolvedCallback(symbolInfo);
  },

  getBars: async (
    symbolInfo: TradingViewSymbolInfo,
    resolution: string,
    periodParams: ChartPeriodParams,
    onHistoryCallback: HistoryCallback,
    onErrorCallback: ErrorCallback
  ): Promise<void> => {
    const { from, to, firstDataRequest } = periodParams;
    try {
      let bars: TradingViewBar[] = [];

      const response = await quoteService.getCandleChart(symbolInfo.ticker, {
        interval: resolution,
        limit: 1000,
      });

      const apiBars = response.data?.contents || [];

      bars = apiBars
        .map((bar: any) => ({
          time: bar.time,
          open: bar.open,
          high: bar.high,
          low: bar.low,
          close: bar.close,
        }))
        .reverse();

      if (firstDataRequest && bars.length > 0) {
        lastBarsCache.set(symbolInfo.full_name || symbolInfo.name, {
          ...bars[bars.length - 1],
        });
      }

      // 데이터가 요청 범위(from~to)에 포함되는지 확인
      // from, to는 초 단위, bar.time은 밀리초 단위
      const fromMs = from * 1000;
      const toMs = to * 1000;

      // 첫 요청인 경우: 데이터가 있으면 무조건 반환
      if (firstDataRequest) {
        onHistoryCallback(bars, { noData: true });
        return;
      }

      // 이후 요청
      // 범위에 데이터가 없으면 noData: true
      const hasDataInRange = bars.some((bar) => bar.time >= fromMs && bar.time <= toMs);

      // 더 이상 데이터 없음
      if (bars.length === 0 || !hasDataInRange) {
        onHistoryCallback([], { noData: true });
        return;
      }

      onHistoryCallback(bars, { noData: true });
    } catch (error) {
      console.log('[getBars]: Get error', error);
      onErrorCallback(error as Error);
    }
  },

  subscribeBars: (
    symbolInfo: TradingViewSymbolInfo,
    resolution: string,
    onRealtimeCallback: RealtimeCallback,
    subscriberUID: string,
    onResetCacheNeededCallback?: ResetCacheCallback
  ): void => {
    console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
    console.log('[subscribeBars]: symbolInfo:', symbolInfo);
    console.log('[subscribeBars]: resolution:', resolution);

    // 마지막 Bar 데이터 가져오기
    const lastBar = lastBarsCache.get(symbolInfo.full_name || symbolInfo.name);
    const lastBarForStream = lastBar
      ? {
          ...lastBar,
          volume: lastBar.volume || 0,
        }
      : undefined;

    // TradingView 스트리밍 구독
    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback,
      lastBarForStream
    );
  },
  unsubscribeBars: (subscriberUID: string): void => {
    console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);

    // TradingView 스트리밍 구독 해제
    unsubscribeFromStream(subscriberUID);
  },
};

const configurationData: TradingViewConfiguration = {
  // Represents the resolutions for bars supported by your datafeed
  // 데이터피드에서 지원하는 봉(resolution) 목록을 나타냅니다
  // 이미지 메시지와 일치하도록 설정: "1M, 5M, 15M, 30M, 60, 240, 1D, 1W, 1M"
  supported_resolutions: ['1', '5', '30', '60', '240', '1D', '1W', '1M'],
  // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
  // 사용자가 거래소를 선택할 경우 searchSymbols 메서드에서 사용되는 거래소 목록입니다
  // exchanges: [
  //   { value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex' },
  //   { value: 'Binance', name: 'Binance', desc: 'Binance' },
  // ],
  // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
  // 사용자가 심볼 타입을 선택할 경우 searchSymbols 메서드에서 사용되는 심볼 타입 목록입니다
  symbols_types: [{ name: 'crypto', value: 'crypto' }],
  // Additional configuration for better price scale display
  supports_marks: false,
  supports_timescale_marks: false,
  supports_time: true,
  // chart widget 내장 검색 기능
  supports_search: false,
  supports_group_request: false,
};

// 시간 간격 매핑 함수
// TODO: 세부 정책 결정 시 수정
function getSupportedResolutions(symbol: string): string[] {
  // 암호화폐는 모든 시간 간격 지원
  if (symbol.includes('BTC') || symbol.includes('ETH') || symbol.includes('XRP')) {
    return ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M'];
  }

  // 외환은 분 단위 제한
  if (symbol.length === 6 && /^[A-Z]{6}$/.test(symbol)) {
    return ['5', '15', '30', '60', '240', '1D', '1W', '1M'];
  }

  // 주식은 일 단위 이상
  if (
    symbol.includes('AAPL') ||
    symbol.includes('US30') ||
    symbol.includes('NAS100') ||
    symbol.includes('JPN225')
  ) {
    return ['60', '240', '1D', '1W', '1M'];
  }

  // 상품은 일 단위 이상
  if (
    symbol.includes('Oil') ||
    symbol.includes('Gold') ||
    symbol.includes('XAU') ||
    symbol.includes('XAG')
  ) {
    return ['60', '240', '1D', '1W', '1M'];
  }

  // 기본 설정 사용
  return configurationData.supported_resolutions;
}

/**
 * 심볼 목록 가져오기
 * TRADINGVIEW_SYMBOL_INFO_LIST 기반으로 모든 종목 반환
 */
export async function getAllSymbols(): Promise<TradingSymbol[]> {
  // TRADINGVIEW_SYMBOL_INFO_LIST 사용
  return Object.values(TRADINGVIEW_SYMBOL_INFO_LIST).map((symbolInfo) => ({
    symbol: symbolInfo.ticker,
    ticker: symbolInfo.ticker,
    description: symbolInfo.description,
    type: symbolInfo.type,
    exchange: symbolInfo.exchange,
  }));
}

export default datafeed;
