/**
 * 심볼 데이터 관리 Composable
 * 심볼 목록, 필터링, 검색, 관심 종목 관리 등을 담당
 *
 * 설계 문서: docs/symbol-list-data-design.md
 */

import {
  SYMBOL_CATEGORIES,
  ALL_SYMBOL_CODES,
  type SymbolListTabType,
  SYMBOL_LIST_TAB,
} from '@template/types';
import type { StockMetaData, WatchListAddRequest, OrderStockRequest } from '@template/api';
import { selectedSymbolInstance as selectedSymbol } from './useSelectedSymbol';
import { useMarketDataStore } from '@/stores/useMarketDataStore';
import { stockService, watchlistService } from '@/services/api';
import { useAccountStore } from '@/stores/useAccountStore';
import type { TradingSymbol } from '@template/types';
import { filterSymbols } from '@template/utils';
import { ref, computed, watch } from 'vue';

/**
 * 심볼 표시 데이터
 * API에서 받아온 데이터를 화면 표시용으로 가공한 타입
 */
export interface SymbolDisplayData {
  stockCd: string; // 종목코드
  currentPrice: number; // 현재가
  closePrice: number; // 전일종가
  changeRate: number; // 등락률 (%)
  changeAmount: number; // 등락액
  isFavorite: boolean; // 관심종목 여부
  metadata?: StockMetaData; // 전체 메타데이터 (필요시 참조)
}

/**
 * 심볼 데이터 관리 Composable
 */
export function useSymbolData() {
  // 선택된 심볼의 시장 데이터 사용
  const {
    selectedSymbol: currentSelectedSymbol,
    addVisibleSymbols,
    unsubscribeAll,
  } = selectedSymbol;

  // Pinia Store 인스턴스 직접 사용 (단일 데이터 소스)
  const marketDataStore = useMarketDataStore();

  // marketDataStore에서 실시간 데이터 사용
  const marketData = computed(() => marketDataStore.marketData);

  // === 상태 관리 ===

  // 탭별 종목 코드 목록
  // ALL_SYMBOL_CODES로 초기화 후 API 응답으로 업데이트
  const allSymbols = ref<string[]>([...ALL_SYMBOL_CODES]);
  const watchlistSymbols = ref<string[]>([]);
  const possessionSymbols = ref<string[]>([]);

  // 종목별 메타데이터 (전일종가 포함)
  const symbolMetadata = ref<Map<string, StockMetaData>>(new Map());

  // 휘발성 현재가 데이터 (화면 표시용)
  const currentPrices = ref<Map<string, number>>(new Map());

  // UI 상태
  const activeTab = ref<SymbolListTabType>(SYMBOL_LIST_TAB.ALL);
  const searchQuery = ref('');
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 데이터 소스 설정
  // API 사용
  const symbols = ref<TradingSymbol[]>([]);
  const favorites = ref<Set<string>>(new Set());

  // === 계산 로직 ===

  /**
   * 등락률 계산
   * @param currentPrice - 현재가
   * @param closePrice - 전일종가
   * @returns 등락률 (%)
   */
  const calculateChangeRate = (currentPrice: number, closePrice: number): number => {
    if (closePrice === 0) return 0;
    return ((currentPrice - closePrice) / closePrice) * 100;
  };

  /**
   * 등락액 계산
   * @param currentPrice - 현재가
   * @param closePrice - 전일종가
   * @returns 등락액
   */
  const calculateChangeAmount = (currentPrice: number, closePrice: number): number => {
    return currentPrice - closePrice;
  };

  // === API 호출 함수들 ===

  /**
   * 전체 탭: API 응답 기반으로 종목 목록 및 데이터 로드
   * API에서 받은 종목만 포함하도록 초기화
   * MarketDataStore 초기화
   */
  const loadAllSymbols = async () => {
    loading.value = true;
    error.value = null;

    try {
      // API 사용 - 메타데이터와 현재가만 로드
      const request: OrderStockRequest = {
        stockGroupCd: 'ALL',
        stockCd: '',
      };

      const response = await stockService.getOrderStocks(request);
      const data = response.data;

      if (!data) {
        console.error('[useSymbolData] 전체 종목 데이터가 없습니다.');
        throw new Error('API 응답 데이터가 없습니다.');
      }

      // API 응답에서 종목 코드 목록 추출
      const apiSymbolCodes = data.details.map((meta: StockMetaData) => meta.stockCd);

      // 종목 목록을 API 응답 기반으로 업데이트
      allSymbols.value = apiSymbolCodes;

      // MarketDataStore를 API 응답 기반으로 초기화
      marketDataStore.initializeMarketDataFromApi(apiSymbolCodes);

      // 메타데이터 저장 (전일종가 포함, Vue 반응성 유지)
      const newSymbolMetadata = new Map(symbolMetadata.value);
      data.details.forEach((meta: StockMetaData) => {
        newSymbolMetadata.set(meta.stockCd, meta);
      });
      symbolMetadata.value = newSymbolMetadata;

      // 현재가 저장 (Vue 반응성 유지)
      const newCurrentPrices = new Map(currentPrices.value);
      Object.entries(data.currentPrices).forEach(([stockCd, price]: [string, unknown]) => {
        newCurrentPrices.set(stockCd, parseFloat(price as string));
      });
      currentPrices.value = newCurrentPrices;

      // MarketDataStore에 초기 데이터 설정
      data.details.forEach((meta: StockMetaData) => {
        const currentPrice =
          parseFloat(data.currentPrices[meta.stockCd] as string) || meta.closePrice;

        // MarketDataStore에 초기 데이터 설정
        marketDataStore.updateMarketDataFromStream(meta.stockCd, {
          close: currentPrice,
          price: currentPrice,
          // FIXME: bid, ask 값 수정
          bid: currentPrice * 0.9999,
          ask: currentPrice * 1.0001,
          timestamp: Date.now(),
        });
      });

      // 전역 함수 등록 (호환성 유지)
      (window as any).updateSymbolCurrentPrice = (stockCd: string, price: number) => {
        const newCurrentPrices = new Map(currentPrices.value);
        newCurrentPrices.set(stockCd, price);
        currentPrices.value = newCurrentPrices;

        // MarketDataStore도 함께 업데이트
        marketDataStore.updateMarketDataFromStream(stockCd, {
          close: price,
          price: price,
          timestamp: Date.now(),
        });
      };
    } catch (err: any) {
      error.value = err.message;
      console.error('[useSymbolData] 전체 종목 로드 실패:', err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * 관심 탭: API 응답 기반으로 관심종목 목록 로드
   * API에서 허용된 종목만 처리
   */
  const loadWatchlistSymbols = async () => {
    loading.value = true;
    error.value = null;

    try {
      // 1. 관심종목 코드 목록 조회
      const watchlistResponse = await watchlistService.getWatchList();
      const watchlistData = watchlistResponse.data;

      if (!watchlistData) {
        // console.log('[useSymbolData] 관심종목 데이터가 없습니다.');
        loading.value = false;
        return;
      }

      watchlistSymbols.value = watchlistData.map((item: any) => item.stockCode);

      if (watchlistSymbols.value.length === 0) {
        loading.value = false;
        return;
      }

      // 2. 각 종목의 메타데이터 + 현재가 조회
      // TODO: 백엔드에 일괄 조회 API 추가 요청 필요 (성능 개선)
      // 현재는 개별 호출 (비효율적이지만 동작함)
      const promises = watchlistSymbols.value.map(async (stockCd) => {
        try {
          const request: OrderStockRequest = {
            stockGroupCd: 'ALL',
            stockCd,
          };
          const response = await stockService.getOrderStocks(request);
          return response.data;
        } catch (err) {
          console.error(`[useSymbolData] 종목 ${stockCd} 조회 실패:`, err);
          return null;
        }
      });

      const results = await Promise.all(promises);

      // 결과 처리
      results.forEach((data: any) => {
        if (!data) return;

        const newSymbolMetadata = new Map(symbolMetadata.value);
        data.details.forEach((meta: StockMetaData) => {
          newSymbolMetadata.set(meta.stockCd, meta);
        });
        symbolMetadata.value = newSymbolMetadata;

        const newCurrentPrices = new Map(currentPrices.value);
        Object.entries(data.currentPrices).forEach(([stockCd, price]: [string, unknown]) => {
          newCurrentPrices.set(stockCd, parseFloat(price as string));
        });
        currentPrices.value = newCurrentPrices;

        // 관심종목 데이터도 MarketDataStore에 설정
        data.details.forEach((meta: StockMetaData) => {
          const currentPrice =
            parseFloat(data.currentPrices[meta.stockCd] as string) || meta.closePrice;
          marketDataStore.updateMarketDataFromStream(meta.stockCd, {
            close: currentPrice,
            price: currentPrice,
            bid: currentPrice * 0.9999,
            ask: currentPrice * 1.0001,
            timestamp: Date.now(),
          });
        });
      });
    } catch (err: any) {
      error.value = err.message;
      console.error('[useSymbolData] 관심종목 로드 실패:', err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * 보유 탭: API 응답 기반으로 보유종목 목록 로드
   * API에서 허용된 종목만 처리
   */
  const loadPossessionSymbols = async () => {
    loading.value = true;
    error.value = null;

    try {
      const accountStore = useAccountStore();
      const accountNo = accountStore.selectedAccountNoSafe;

      // 1. 보유종목 코드 목록 조회
      const possessionRequest = {
        accountNo,
        nextKey: '',
      };
      const possessionResponse = await stockService.getPossessionStocks(possessionRequest);
      const possessionData = possessionResponse.data;

      if (!possessionData) {
        console.error('[useSymbolData] 보유종목 데이터가 없습니다.');
        loading.value = false;
        return;
      }
      possessionSymbols.value = possessionData.stocks || [];

      if (possessionSymbols.value.length === 0) {
        loading.value = false;
        return;
      }

      // 2. 각 종목의 메타데이터 + 현재가 조회
      // TODO: 백엔드에 일괄 조회 API 추가 요청 필요 (성능 개선)
      // 현재는 개별 호출 (비효율적이지만 동작함)
      const promises = possessionSymbols.value.map(async (stockCd) => {
        try {
          const request: OrderStockRequest = {
            stockGroupCd: 'ALL',
            stockCd,
          };
          const response = await stockService.getOrderStocks(request);
          return response.data;
        } catch (err) {
          console.error(`[useSymbolData] 종목 ${stockCd} 조회 실패:`, err);
          return null;
        }
      });

      const results = await Promise.all(promises);

      // 결과 처리
      results.forEach((data: any) => {
        if (!data) return;

        const newSymbolMetadata = new Map(symbolMetadata.value);
        data.details.forEach((meta: StockMetaData) => {
          newSymbolMetadata.set(meta.stockCd, meta);
        });
        symbolMetadata.value = newSymbolMetadata;

        const newCurrentPrices = new Map(currentPrices.value);
        Object.entries(data.currentPrices).forEach(([stockCd, price]: [string, unknown]) => {
          newCurrentPrices.set(stockCd, parseFloat(price as string));
        });
        currentPrices.value = newCurrentPrices;

        // 보유종목 데이터도 MarketDataStore에 설정
        data.details.forEach((meta: StockMetaData) => {
          const currentPrice =
            parseFloat(data.currentPrices[meta.stockCd] as string) || meta.closePrice;
          marketDataStore.updateMarketDataFromStream(meta.stockCd, {
            close: currentPrice,
            price: currentPrice,
            bid: currentPrice * 0.9999,
            ask: currentPrice * 1.0001,
            timestamp: Date.now(),
          });
        });
      });

      // 임시: Mock 데이터 (빈 배열)
      symbols.value = [];
    } catch (err: any) {
      error.value = err.message;
      console.error('[useSymbolData] 보유종목 로드 실패:', err);

      // 실패 시 빈 배열
      symbols.value = [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * 탭별 데이터 로드
   */
  const loadSymbolsByTab = async (tab: SymbolListTabType) => {
    switch (tab) {
      case SYMBOL_LIST_TAB.ALL:
        await loadAllSymbols();
        break;
      case SYMBOL_LIST_TAB.WATCHLIST:
        await loadWatchlistSymbols();
        break;
      case SYMBOL_LIST_TAB.POSSESSION:
        await loadPossessionSymbols();
        break;
      default:
        console.warn(`[useSymbolData] Unknown tab: ${tab}`);
    }
  };

  /**
   * 관심종목 등록/해제 (낙관적 업데이트)
   */
  const toggleFavorite = async (stockCd: string) => {
    const wasFavorite = watchlistSymbols.value.includes(stockCd);

    // 1. 즉시 UI 업데이트 (낙관적 업데이트)
    if (wasFavorite) {
      watchlistSymbols.value = watchlistSymbols.value.filter((code) => code !== stockCd);
      favorites.value.delete(stockCd); // 임시: Mock용
    } else {
      watchlistSymbols.value.push(stockCd);
      favorites.value.add(stockCd); // 임시: Mock용
    }

    // 2. API 호출
    try {
      if (wasFavorite) {
        // 관심종목 해제
        await watchlistService.removeFromWatchList(stockCd);
        // console.log(`[useSymbolData] 관심종목 해제: ${stockCd}`);
      } else {
        // 관심종목 등록
        const request: WatchListAddRequest = {
          stockCode: stockCd,
        };
        await watchlistService.addToWatchList(request);
        // console.log(`[useSymbolData] 관심종목 등록: ${stockCd}`);
      }
    } catch (err: any) {
      // 3. 실패 시 롤백
      if (wasFavorite) {
        watchlistSymbols.value.push(stockCd);
        favorites.value.add(stockCd); // 임시: Mock용
      } else {
        watchlistSymbols.value = watchlistSymbols.value.filter((code) => code !== stockCd);
        favorites.value.delete(stockCd); // 임시: Mock용
      }

      error.value = '관심종목 등록/해제 실패';
      console.error('[useSymbolData] 관심종목 토글 실패:', err);

      // TODO: 에러 토스트 표시
      // 예시:
      // import { useToast } from '@/composables/useToast';
      // const { showError } = useToast();
      // showError('관심종목 등록/해제에 실패했습니다.');
    }
  };

  /**
   * 종목이 관심종목인지 확인
   */
  const isFavorite = (stockCd: string): boolean => {
    return watchlistSymbols.value.includes(stockCd) || favorites.value.has(stockCd);
  };

  /**
   * 특정 종목의 데이터 조회
   * @param stockCd - 종목 코드
   * @returns 종목의 표시용 데이터 또는 null (종목이 없는 경우)
   */
  const getSymbolByCode = (stockCd: string): SymbolDisplayData | null => {
    const metadata = symbolMetadata.value.get(stockCd);

    if (!metadata) {
      return null;
    }

    // marketData에서 실시간 데이터 가져오기
    const symbolData = marketData.value.find((data) => data.symbol === stockCd);
    const currentPrice = symbolData?.price ?? metadata.closePrice;
    const closePrice = metadata.closePrice;

    return {
      stockCd,
      currentPrice,
      closePrice,
      changeRate: calculateChangeRate(currentPrice, closePrice),
      changeAmount: calculateChangeAmount(currentPrice, closePrice),
      isFavorite: isFavorite(stockCd),
      metadata,
    };
  };

  /**
   * 종목 선택
   */
  const selectSymbol = (symbol: TradingSymbol) => {
    selectedSymbol.setSelectedSymbol(symbol.ticker);

    // TODO: 선택된 심볼에 대한 웹소켓 구독 (추후 구현)
    // ```typescript
    // import { useSymbolSubscriptionManager } from '@/composables/useSymbolSubscriptionManager';
    // const subscriptionManager = useSymbolSubscriptionManager();
    // subscriptionManager.unsubscribe('SymbolList');
    // subscriptionManager.subscribe('SymbolList', [symbol.ticker]);
    // ```

    return symbol;
  };

  /**
   * 종목 그룹 코드를 타입으로 변환
   */
  const getSymbolType = (stockGroupCd?: string): string => {
    switch (stockGroupCd) {
      case '01':
        return 'forex';
      case '02':
        return 'index';
      case '03':
        return 'commodity';
      case '04':
        return 'crypto';
      default:
        return 'forex';
    }
  };

  /**
   * SymbolDisplayData를 TradingSymbol로 변환
   */
  const convertToTradingSymbol = (symbol: SymbolDisplayData): TradingSymbol => {
    return {
      symbol: symbol.stockCd,
      ticker: symbol.stockCd,
      type: getSymbolType(symbol.metadata?.stockGroupCd),
      // TODO: description, exchange는 현재 API에는 없음. 필요여부 확인
    };
  };

  /**
   * 현재 활성 탭에 따라 적절한 데이터 로드
   */
  const loadSymbols = async () => {
    await loadSymbolsByTab(activeTab.value);
  };

  // === 계산된 속성 ===

  /**
   * 필터링된 심볼 목록
   */
  const filteredSymbols = computed(() => {
    // TODO: SymbolDisplayData 배열로 변환
    // 현재는 임시로 기존 로직 사용
    return filterSymbols(symbols.value, activeTab.value, searchQuery.value, favorites.value);
  });

  /**
   * 현재 탭의 표시용 데이터 목록
   * 종목 코드는 즉시 표시하고, 메타데이터/현재가는 로드되는 대로 업데이트
   * searchQuery에 따라 필터링됨
   */
  const displaySymbols = computed<SymbolDisplayData[]>(() => {
    // console.log('[useSymbolData] displaySymbols computed 재계산됨');
    // console.log(`[useSymbolData] currentPrices Map 크기: ${currentPrices.value.size}`);
    // console.log(`[useSymbolData] MarketDataStore 크기: ${marketDataStore.marketData.length}`);

    const currentSymbolCodes =
      activeTab.value === SYMBOL_LIST_TAB.ALL
        ? allSymbols.value
        : activeTab.value === SYMBOL_LIST_TAB.WATCHLIST
          ? watchlistSymbols.value
          : possessionSymbols.value;

    // 표시용 데이터 생성 - useMarketData의 데이터 직접 사용
    const allDisplayData = currentSymbolCodes.map((stockCd) => {
      const metadata = symbolMetadata.value.get(stockCd);

      // marketData computed에서 실시간 데이터 가져오기 (반응형)
      const symbolData = marketData.value.find((data) => data.symbol === stockCd);
      const currentPrice = symbolData?.price ?? 0;
      const closePrice = metadata?.closePrice ?? 0;

      return {
        stockCd,
        currentPrice: currentPrice,
        closePrice,
        changeRate: calculateChangeRate(currentPrice, closePrice),
        changeAmount: calculateChangeAmount(currentPrice, closePrice),
        isFavorite: isFavorite(stockCd),
        metadata,
      };
    });

    // 검색어가 있으면 필터링
    if (searchQuery.value.trim() === '') {
      return allDisplayData;
    }

    const query = searchQuery.value.toLowerCase().trim();
    return allDisplayData.filter((symbol) => {
      // 종목 코드로 검색
      return symbol.stockCd.toLowerCase().includes(query);
    });
  });

  /**
   * 카테고리별 종목 코드 존재 여부 (렌더링 최적화용)
   */
  const hasCategorySymbols = computed(() => ({
    forex: SYMBOL_CATEGORIES.forex.length > 0,
    index: SYMBOL_CATEGORIES.index.length > 0,
    commodity: SYMBOL_CATEGORIES.commodity.length > 0,
    crypto: SYMBOL_CATEGORIES.crypto.length > 0,
  }));

  /**
   * 카테고리별 필터링된 데이터
   * 정의된 종목 코드 기반으로 필터링하여 즉시 렌더링 가능
   */
  const displaySymbolsByCategory = computed(() => {
    const all = displaySymbols.value;

    return {
      all,
      forex: all.filter((s) => SYMBOL_CATEGORIES.forex.includes(s.stockCd as any)),
      index: all.filter((s) => SYMBOL_CATEGORIES.index.includes(s.stockCd as any)),
      commodity: all.filter((s) => SYMBOL_CATEGORIES.commodity.includes(s.stockCd as any)),
      crypto: all.filter((s) => SYMBOL_CATEGORIES.crypto.includes(s.stockCd as any)),
    };
  });

  // === 탭 변경 감지 ===

  /**
   * 탭이 변경될 때마다 해당 탭의 데이터 로드
   */
  watch(activeTab, async (newTab) => {
    await loadSymbolsByTab(newTab);
  });

  // 초기 데이터 로드는 Index.vue에서 호출
  // loadAllSymbols();

  // === 반환 ===

  return {
    // 상태
    symbols, // 임시: Mock용
    favorites, // 임시: Mock용
    allSymbols,
    watchlistSymbols,
    possessionSymbols,
    symbolMetadata,
    currentPrices,
    activeTab,
    searchQuery,
    currentSelectedSymbol,
    marketData,
    loading,
    error,

    // 계산된 속성
    filteredSymbols, // 임시: Mock용
    displaySymbols, // 새로운: API 연동용
    displaySymbolsByCategory, // 카테고리별 필터링된 데이터
    hasCategorySymbols, // 카테고리별 종목 존재 여부

    // 메서드
    selectSymbol,
    toggleFavorite,
    isFavorite,
    getSymbolByCode,
    convertToTradingSymbol,
    loadSymbols, // 임시: Mock용
    loadAllSymbols,
    loadWatchlistSymbols,
    loadPossessionSymbols,
    loadSymbolsByTab,
    // addVisibleSymbols, // 가시성 로직 제거
    // unsubscribeAll, // 가시성 로직 제거
  };
}
