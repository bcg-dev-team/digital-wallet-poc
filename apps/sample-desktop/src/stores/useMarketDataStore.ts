/**
 * 시장 데이터 관리 Pinia Store
 * WebSocket 데이터를 중앙에서 관리하고 반응적으로 UI에 전달
 * API 응답 기반으로 종목 목록을 관리
 */

import type { SymbolDisplayData } from '@template/types';
import { ALL_SYMBOL_CODES } from '@template/types';
import { ref, computed, markRaw } from 'vue';
import { defineStore } from 'pinia';

export const useMarketDataStore = defineStore('marketData', () => {
  // === 상태 ===
  const marketData = ref<SymbolDisplayData[]>([]);
  const isInitialized = ref(false);
  // API에서 허용된 종목 목록
  const allowedSymbols = ref<Set<string>>(new Set());

  // === 배치 업데이트를 위한 버퍼 ===
  const updateBuffer = markRaw(new Map<string, any>());
  let isScheduled = false;

  // === 계산된 속성 ===
  const getSymbolData = computed(() => (symbol: string) => {
    // 초기화되지 않았다면 초기화 실행
    if (!isInitialized.value) {
      initializeMarketData();
    }
    return marketData.value.find((item) => item.symbol === symbol);
  });

  const getSymbolCount = computed(() => marketData.value.length);

  // === 액션 ===

  /**
   * API 응답 기반으로 시장 데이터 업데이트
   * 기존 ALL_SYMBOL_CODES 기반 목록을 API 응답으로 업데이트
   */
  const initializeMarketDataFromApi = (symbolCodes: string[]) => {
    // 허용된 종목 목록을 API 응답으로 업데이트
    allowedSymbols.value = new Set(symbolCodes);

    // 기존 데이터에서 API에 없는 종목 제거하고, API에 있는 종목은 유지
    const existingSymbols = new Set(marketData.value.map((item) => item.symbol));
    const newSymbolCodes = new Set(symbolCodes);

    // 제거할 종목들 (기존에 있지만 API에 없는 종목)
    const symbolsToRemove = [...existingSymbols].filter((symbol) => !newSymbolCodes.has(symbol));

    // 추가할 종목들 (API에 있지만 기존에 없는 종목)
    const symbolsToAdd = [...newSymbolCodes].filter((symbol) => !existingSymbols.has(symbol));

    // 기존 데이터에서 제거할 종목들 삭제
    marketData.value = marketData.value.filter((item) => !symbolsToRemove.includes(item.symbol));

    // 새로운 종목들 추가
    const newSymbolData = symbolsToAdd.map((symbolCode) => ({
      symbol: symbolCode,
      price: 0,
      change: 0,
      changePercent: 0,
      bid: 0,
      ask: 0,
      high: 0,
      low: 0,
      timestamp: 0,
    }));

    marketData.value.push(...newSymbolData);
  };

  /**
   * 시장 데이터 초기화
   * ALL_SYMBOL_CODES로 초기화 후 API 응답으로 업데이트
   */
  const initializeMarketData = async () => {
    if (isInitialized.value) return;

    // ALL_SYMBOL_CODES로 초기화
    // API 호출 전까지는 기본 종목 목록 사용
    const initialSymbolCodes = [...ALL_SYMBOL_CODES];
    marketData.value = initialSymbolCodes.map((symbolCode) => ({
      symbol: symbolCode,
      price: 0,
      change: 0,
      changePercent: 0,
      bid: 0,
      ask: 0,
      high: 0,
      low: 0,
      timestamp: 0,
    }));

    // 초기 허용 목록도 ALL_SYMBOL_CODES로 설정
    allowedSymbols.value = new Set(initialSymbolCodes);
    isInitialized.value = true;
  };

  /**
   * 배치 업데이트 스케줄링
   */
  const scheduleBatchUpdate = () => {
    if (isScheduled) return;

    isScheduled = true;
    requestAnimationFrame(() => {
      commitBatchUpdates();
      isScheduled = false;
    });
  };

  /**
   * 배치 업데이트 커밋
   */
  const commitBatchUpdates = () => {
    if (updateBuffer.size === 0) return;

    // 모든 업데이트를 한 번에 처리
    for (const [symbol, streamData] of updateBuffer) {
      updateSingleSymbolData(marketData.value, symbol, streamData);
    }

    updateBuffer.clear();
  };

  /**
   * 단일 심볼 데이터 업데이트 (내부 함수)
   */
  const updateSingleSymbolData = (
    marketDataArray: SymbolDisplayData[],
    symbol: string,
    streamData: any
  ) => {
    let dataIndex = marketDataArray.findIndex((data: SymbolDisplayData) => data.symbol === symbol);

    // 심볼이 없으면 동적으로 생성
    if (dataIndex === -1) {
      // 심볼을 찾을 수 없으면 동적으로 생성

      // 새로운 심볼 데이터 추가
      const newSymbolData: SymbolDisplayData = {
        symbol: symbol,
        price: 0,
        change: 0,
        changePercent: 0,
        bid: 0,
        ask: 0,
        high: 0,
        low: 0,
        timestamp: 0,
      };

      marketDataArray.push(newSymbolData);
      dataIndex = marketDataArray.length - 1;
    }

    // 가격 데이터 추출
    let newPrice: number;
    if (streamData.close !== undefined) {
      newPrice = streamData.close;
    } else if (streamData.price !== undefined) {
      newPrice = streamData.price;
    } else if (typeof streamData === 'number') {
      newPrice = streamData;
    } else {
      console.warn(`[MarketDataStore] ${symbol} 유효하지 않은 가격 데이터:`, streamData);
      return;
    }

    // 기존 데이터 가져오기
    const currentData = marketDataArray[dataIndex];
    if (!currentData) {
      console.error(
        `[MarketDataStore] ${symbol} 데이터를 찾을 수 없습니다. dataIndex: ${dataIndex}`
      );
      return;
    }

    // 새로운 데이터 계산
    const change = newPrice - currentData.price;
    const changePercent = (change / currentData.price) * 100;

    // 고가/저가 업데이트
    const newHigh =
      streamData.high !== undefined
        ? Math.round(streamData.high * 100000) / 100000
        : Math.round(Math.max(currentData.high || newPrice, newPrice) * 100000) / 100000;

    const newLow =
      streamData.low !== undefined
        ? Math.round(streamData.low * 100000) / 100000
        : Math.round(Math.min(currentData.low || newPrice, newPrice) * 100000) / 100000;

    // 업데이트된 데이터로 교체
    marketDataArray[dataIndex] = {
      ...currentData,
      price: Math.round(newPrice * 100000) / 100000,
      change: Math.round(change * 100000) / 100000,
      changePercent: Math.round(changePercent * 100) / 100,
      bid:
        streamData.bid !== undefined
          ? Math.round(streamData.bid * 100000) / 100000
          : currentData.bid,
      ask:
        streamData.ask !== undefined
          ? Math.round(streamData.ask * 100000) / 100000
          : currentData.ask,
      high: newHigh,
      low: newLow,
      timestamp: streamData.timestamp || Date.now(),
    };
  };

  /**
   * WebSocket에서 받은 실시간 데이터로 시장 데이터 업데이트 (배치 처리)
   * API 허용 목록에 있는 종목만 처리
   */
  const updateMarketDataFromStream = (symbol: string, streamData: any) => {
    // 초기화되지 않았다면 초기화 실행
    if (!isInitialized.value) {
      initializeMarketData();
    }

    // 허용된 종목인지 확인
    if (!allowedSymbols.value.has(symbol)) {
      // console.warn(`[MarketDataStore] 허용되지 않은 종목 데이터 무시: ${symbol}`);
      return;
    }

    // 버퍼에 데이터 추가
    updateBuffer.set(symbol, streamData);

    // 배치 업데이트 스케줄링
    scheduleBatchUpdate();
  };

  /**
   * WebSocket에서 받은 실시간 데이터로 시장 데이터 업데이트 (기존 방식 - 즉시 처리)
   * API 허용 목록에 있는 종목만 처리
   */
  const updateMarketDataFromStreamImmediate = (symbol: string, streamData: any) => {
    // 초기화되지 않았다면 초기화 실행
    if (!isInitialized.value) {
      initializeMarketData();
    }

    // 허용된 종목인지 확인
    if (!allowedSymbols.value.has(symbol)) {
      // console.warn(`[MarketDataStore] 허용되지 않은 종목 데이터 무시: ${symbol}`);
      return;
    }

    // console.log(`[MarketDataStore] ${symbol} 데이터 수신:`, streamData);

    let dataIndex = marketData.value.findIndex((data) => data.symbol === symbol);

    // 심볼이 없으면 동적으로 생성 (API 허용 목록에 있는 경우에만)
    if (dataIndex === -1) {
      // 심볼을 찾을 수 없으면 동적으로 생성

      // 새로운 심볼 데이터 추가
      const newSymbolData: SymbolDisplayData = {
        symbol: symbol,
        price: 0,
        change: 0,
        changePercent: 0,
        bid: 0,
        ask: 0,
        high: 0,
        low: 0,
        timestamp: 0,
      };

      marketData.value.push(newSymbolData);
      dataIndex = marketData.value.length - 1;
    }

    // 가격 데이터 추출
    let newPrice: number;
    if (streamData.close !== undefined) {
      newPrice = streamData.close;
    } else if (streamData.price !== undefined) {
      newPrice = streamData.price;
    } else if (typeof streamData === 'number') {
      newPrice = streamData;
    } else {
      console.warn(`[MarketDataStore] ${symbol} 유효하지 않은 가격 데이터:`, streamData);
      return;
    }

    // 기존 데이터 가져오기
    const currentData = marketData.value[dataIndex];
    if (!currentData) {
      console.error(
        `[MarketDataStore] ${symbol} 데이터를 찾을 수 없습니다. dataIndex: ${dataIndex}`
      );
      return;
    }

    // 새로운 데이터 계산
    const change = newPrice - currentData.price;
    const changePercent = (change / currentData.price) * 100;

    // 고가/저가 업데이트 (실시간 데이터가 있으면 사용, 없으면 기존 값과 비교하여 업데이트)
    const newHigh =
      streamData.high !== undefined
        ? Math.round(streamData.high * 100000) / 100000
        : Math.round(Math.max(currentData.high || newPrice, newPrice) * 100000) / 100000;

    const newLow =
      streamData.low !== undefined
        ? Math.round(streamData.low * 100000) / 100000
        : Math.round(Math.min(currentData.low || newPrice, newPrice) * 100000) / 100000;

    // 반응성을 보장하기 위해 새로운 객체로 교체
    const updatedData: SymbolDisplayData = {
      ...currentData,
      price: Math.round(newPrice * 100000) / 100000,
      change: Math.round(change * 100000) / 100000,
      changePercent: Math.round(changePercent * 100) / 100,
      bid:
        streamData.bid !== undefined
          ? Math.round(streamData.bid * 100000) / 100000
          : currentData.bid,
      ask:
        streamData.ask !== undefined
          ? Math.round(streamData.ask * 100000) / 100000
          : currentData.ask,
      high: newHigh,
      low: newLow,
      timestamp: streamData.timestamp || Date.now(),
    };

    // 배열의 해당 인덱스를 새로운 객체로 교체
    marketData.value[dataIndex] = updatedData;

    // console.log(`[MarketDataStore] ${symbol} 실시간 업데이트 완료:`, {
    //   price: updatedData.price,
    //   change: updatedData.change,
    //   changePercent: updatedData.changePercent,
    //   bid: updatedData.bid,
    //   ask: updatedData.ask,
    // });
  };

  /**
   * 특정 심볼의 데이터 가져오기
   */
  const getSymbolDataBySymbol = (symbol: string): SymbolDisplayData | undefined => {
    return marketData.value.find((data) => data.symbol === symbol);
  };

  /**
   * 시장 데이터 리셋
   */
  const resetMarketData = () => {
    marketData.value = [];
    isInitialized.value = false;
  };

  return {
    // 상태
    marketData,
    isInitialized,
    allowedSymbols,

    // 계산된 속성
    getSymbolData,
    getSymbolCount,

    // 액션
    initializeMarketData,
    initializeMarketDataFromApi,
    updateMarketDataFromStream, // 배치 처리 (기본)
    updateMarketDataFromStreamImmediate, // 즉시 처리 (필요시)
    getSymbolDataBySymbol,
    resetMarketData,
  };
});
