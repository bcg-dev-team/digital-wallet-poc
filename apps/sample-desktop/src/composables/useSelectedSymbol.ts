/**
 * 선택된 심볼을 전역적으로 관리하는 composable
 * 심볼 선택 상태 관리
 */

import { useSymbolSubscriptionManager } from './useSymbolSubscriptionManager';
import { calculateBuyPrice, calculateSellPrice } from '@template/utils';
import { useMarketDataStore } from '@/stores/useMarketDataStore';
import { getWebSocketService } from '@/services/websocket';
import { useEventBus, MARKET_EVENTS } from './useEventBus';
import type { TradingSymbol } from '@template/types';
import { ref, computed, readonly, watch } from 'vue';
import { ALL_SYMBOLS } from '@template/types';

// 전역 선택된 심볼 상태
// 항상 하나의 심볼이 선택되어 있어야 하므로 기본값 설정
const globalSelectedSymbol = ref<string>('EURUSD');

// 전역 심볼 캐시 (ALL_SYMBOLS 사용)
const globalSymbolsCache = ref<TradingSymbol[]>([]);

// 심볼 변경 이벤트 리스너
const symbolChangeListeners = new Set<(symbol: string) => void>();

// 심볼 데이터 로드 (초기화 시 1회)
const loadSymbolsCache = async () => {
  if (globalSymbolsCache.value.length === 0) {
    globalSymbolsCache.value = ALL_SYMBOLS;
  }
};

export function useSelectedSymbol() {
  const marketDataStore = useMarketDataStore();
  const subscriptionManager = useSymbolSubscriptionManager();
  const wsService = getWebSocketService();
  const { on: onEvent } = useEventBus();

  // marketData를 직접 참조하여 반응성 보장
  const { marketData } = marketDataStore;

  // marketData 변경 감지 (디버깅용)
  watch(
    marketData,
    (newData, oldData) => {
      // console.log(`[useSelectedSymbol] marketData 변경 감지:`, {
      //   이전개수: oldData?.length || 0,
      //   현재개수: newData?.length || 0,
      //   변경된데이터: newData,
      // });
    },
    { deep: true }
  );

  // Event Bus를 통한 시장 데이터 업데이트 감지
  onEvent(MARKET_EVENTS.DATA_UPDATED, (data) => {
    // console.log(`[useSelectedSymbol] Event Bus를 통한 시장 데이터 업데이트:`, data);
  });

  // 연결 상태 관리
  const connectionStatus = ref<'disconnected' | 'connecting' | 'connected'>('disconnected');

  // 선택된 심볼 가져오기
  const getSelectedSymbol = () => globalSelectedSymbol.value;

  // 심볼 변경 리스너 등록
  const onSymbolChange = (listener: (symbol: string) => void) => {
    symbolChangeListeners.add(listener);
    return () => symbolChangeListeners.delete(listener);
  };

  // 현재 선택된 심볼을 Chart 소스로 구독 관리 (단순화)
  const updateChartSymbolSubscription = (symbol: string) => {
    // console.log(`[useSelectedSymbol] 선택된 심볼: ${symbol}`);
    // 가시성 로직 제거 - 모든 데이터는 WebSocket에서 자동으로 처리됨
  };

  // WebSocket 초기화
  const safeInitialize = async () => {
    try {
      connectionStatus.value = 'connecting';

      // 심볼 캐시 로드
      await loadSymbolsCache();

      // WebSocket 연결 (Mock은 즉시 연결됨)
      // if (!wsService.isConnected()) {
      //   await wsService.connect();
      // }

      connectionStatus.value = 'connected';
      updateChartSymbolSubscription(globalSelectedSymbol.value);

      // console.log('[useSelectedSymbol] 초기화 완료');
    } catch (error) {
      console.warn('[useSelectedSymbol] 초기화 지연 - 재시도', error);
      connectionStatus.value = 'disconnected';

      // 100ms 후 재시도
      setTimeout(() => {
        safeInitialize();
      }, 100);
    }
  };

  // 비동기 초기화
  setTimeout(() => {
    safeInitialize();
  }, 0);

  // 선택된 심볼의 시장 데이터
  const selectedSymbolData = computed(() => {
    // console.log(
    //   `[useSelectedSymbol] selectedSymbolData computed 호출됨 - 심볼: ${globalSelectedSymbol.value}`
    // );
    // Pinia Store를 통한 데이터 조회
    const data = marketDataStore.getSymbolDataBySymbol(globalSelectedSymbol.value);
    if (data) {
      // console.log(`[useSelectedSymbol] ${globalSelectedSymbol.value} 데이터:`, {
      //   price: data.price,
      //   change: data.change,
      //   changePercent: data.changePercent,
      //   bid: data.bid,
      //   ask: data.ask,
      //   timestamp: data.timestamp,
      // });
    } else {
      console.warn(`[useSelectedSymbol] ${globalSelectedSymbol.value} 데이터를 찾을 수 없습니다.`);
    }
    return data;
  });

  // 선택된 심볼의 실시간 가격
  const currentPrice = computed(() => {
    return selectedSymbolData.value?.price || 0;
  });

  // 선택된 심볼의 변동률
  const changePercent = computed(() => {
    return selectedSymbolData.value?.changePercent || 0;
  });

  // 선택된 심볼의 변동값
  const changeValue = computed(() => {
    return selectedSymbolData.value?.change || 0;
  });

  // // 선택된 심볼의 거래량
  // const volume = computed(() => {
  //   return selectedSymbolData.value?.volume || 0;
  // });

  // 선택된 심볼의 고가/저가
  const highPrice = computed(() => {
    return selectedSymbolData.value?.high || 0;
  });

  const lowPrice = computed(() => {
    return selectedSymbolData.value?.low || 0;
  });

  // 매수/매도 가격 계산 (실제 bid/ask 사용, 없으면 계산)
  const buyPrice = computed(() => {
    const symbolData = selectedSymbolData.value;
    if (symbolData?.ask) {
      return symbolData.ask;
    }
    return calculateBuyPrice(globalSelectedSymbol.value, currentPrice.value);
  });

  const sellPrice = computed(() => {
    const symbolData = selectedSymbolData.value;
    if (symbolData?.bid) {
      return symbolData.bid;
    }
    return calculateSellPrice(globalSelectedSymbol.value, currentPrice.value);
  });

  // 심볼 정보 (타입, 설명 등)
  const symbolInfo = computed(() => {
    return globalSymbolsCache.value.find((symbol) => symbol.ticker === globalSelectedSymbol.value);
  });

  // 심볼 타입
  const symbolType = computed(() => {
    return symbolInfo.value?.type || 'forex';
  });

  // 심볼 설명
  const symbolDescription = computed(() => {
    return symbolInfo.value?.description || globalSelectedSymbol.value;
  });

  // 심볼 변경 (구독과 함께 처리)
  const setSelectedSymbol = (symbol: string) => {
    const oldSymbol = globalSelectedSymbol.value;
    globalSelectedSymbol.value = symbol;

    // 차트 구독 업데이트
    updateChartSymbolSubscription(symbol);

    // 변경 이벤트 알림
    if (oldSymbol !== symbol) {
      symbolChangeListeners.forEach((listener) => listener(symbol));
      console.log(`🔄 선택된 심볼 변경: ${oldSymbol} → ${symbol}`);
    }
  };

  // 가시성 로직 제거 - 모든 데이터는 WebSocket에서 자동으로 처리됨
  const addVisibleSymbols = (source: string, symbols: string[]) => {
    // console.log(`[useSelectedSymbol] 가시성 로직 제거됨 - ${source}: ${symbols.join(', ')}`);
    // 모든 데이터는 WebSocket에서 자동으로 처리됨
  };

  // 모든 구독 해제
  const unsubscribeAll = (): void => {
    subscriptionManager.unsubscribeAllSymbols();
  };

  // 연결 상태 computed
  const isConnected = computed(() => wsService.isConnected());

  return {
    // 상태
    selectedSymbol: readonly(globalSelectedSymbol),
    selectedSymbolData,
    symbolInfo,
    marketData,
    isConnected,
    connectionStatus: readonly(connectionStatus),

    // 가격 정보
    currentPrice,
    changePercent,
    changeValue,
    // volume,
    // highPrice,
    // lowPrice,
    buyPrice,
    sellPrice,

    // 고가/저가
    highPrice,
    lowPrice,

    // 심볼 정보
    symbolType,
    symbolDescription,

    // 함수들
    getSelectedSymbol,
    setSelectedSymbol,
    onSymbolChange,
    addVisibleSymbols,
    unsubscribeAll,
  };
}

// 전역 인스턴스
export const selectedSymbolInstance = useSelectedSymbol();
