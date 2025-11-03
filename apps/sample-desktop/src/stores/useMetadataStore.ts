/**
 * 종목 메타데이터 관리 Pinia Store
 * 종목별 메타데이터(전일종가, 거래시간 등)를 중앙에서 관리
 */

import type { StockMetaData, OrderStockRequest } from '@template/api';
import { stockService } from '@/services/api';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useMetadataStore = defineStore('metadata', () => {
  // === 상태 ===
  const symbolMetadata = ref<Map<string, StockMetaData>>(new Map());
  const isInitialized = ref(false);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // === 계산된 속성 ===

  /**
   * 메타데이터 개수
   */
  const metadataCount = computed(() => symbolMetadata.value.size);

  /**
   * 메타데이터가 비어있는지 확인
   */
  const isEmpty = computed(() => symbolMetadata.value.size === 0);

  /**
   * stockCd로 메타데이터 조회
   * @param stockCd - 종목 코드
   * @returns 종목 메타데이터 또는 undefined
   */
  const getMetadata = (stockCd: string): StockMetaData | undefined => {
    return symbolMetadata.value.get(stockCd);
  };

  /**
   * 여러 종목의 메타데이터 조회
   * @param stockCds - 종목 코드 배열
   * @returns 종목 메타데이터 배열
   */
  const getMetadataList = (stockCds: string[]): StockMetaData[] => {
    return stockCds
      .map((stockCd) => symbolMetadata.value.get(stockCd))
      .filter(Boolean) as StockMetaData[];
  };

  /**
   * 모든 메타데이터 조회
   * @returns 모든 종목 메타데이터 배열
   */
  const getAllMetadata = (): StockMetaData[] => {
    return Array.from(symbolMetadata.value.values());
  };

  /**
   * 메타데이터 설정
   * @param stockCd - 종목 코드
   * @param metadata - 메타데이터
   */
  const setMetadata = (stockCd: string, metadata: StockMetaData) => {
    const newMetadata = new Map(symbolMetadata.value);
    newMetadata.set(stockCd, metadata);
    symbolMetadata.value = newMetadata;
  };

  /**
   * 메타데이터 일괄 설정
   * @param metadataList - 메타데이터 배열
   */
  const setMetadataList = (metadataList: StockMetaData[]) => {
    const newMetadata = new Map(symbolMetadata.value);
    metadataList.forEach((metadata) => {
      newMetadata.set(metadata.stockCd, metadata);
    });
    symbolMetadata.value = newMetadata;
  };

  /**
   * 전체 종목 메타데이터 로드
   * useSymbolData의 loadAllSymbols 로직 사용
   */
  const loadMetadata = async () => {
    // 이미 로딩 중이면 중복 호출 방지
    if (loading.value) {
      console.log('[MetadataStore] 이미 메타데이터 로딩 중입니다.');
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      // API 사용
      console.log('[MetadataStore] 전체 종목 메타데이터 로드 시작');
        const request: OrderStockRequest = {
          stockGroupCd: 'ALL',
          stockCd: '',
        };

        const response = await stockService.getOrderStocks(request);
        const data = response.data;

        if (!data) {
          console.error('[MetadataStore] 전체 종목 데이터가 없습니다.');
          throw new Error('API 응답 데이터가 없습니다.');
        }

        // 메타데이터 저장 (Vue 반응성 유지)
        const newSymbolMetadata = new Map<string, StockMetaData>();
        data.details.forEach((meta: StockMetaData) => {
          newSymbolMetadata.set(meta.stockCd, meta);
        });
        symbolMetadata.value = newSymbolMetadata;

        console.log(`[MetadataStore] 전체 종목 ${newSymbolMetadata.size}개 메타데이터 로드 완료`);

      isInitialized.value = true;
    } catch (err: any) {
      error.value = err.message;
      console.error('[MetadataStore] 전체 종목 메타데이터 로드 실패:', err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * 특정 종목의 메타데이터만 로드
   * @param stockCd - 종목 코드
   */
  const loadSingleMetadata = async (stockCd: string) => {
    try {
      const request: OrderStockRequest = {
        stockGroupCd: 'ALL',
        stockCd,
      };

      const response = await stockService.getOrderStocks(request);
      const data = response.data;

      if (!data || !data.details || data.details.length === 0) {
        console.error(`[MetadataStore] 종목 ${stockCd} 데이터가 없습니다.`);
        return;
      }

      // 첫 번째 항목 저장
      const metadata = data.details[0];
      setMetadata(stockCd, metadata);

      // console.log(`[MetadataStore] 종목 ${stockCd} 메타데이터 로드 완료`);
    } catch (err: any) {
      console.error(`[MetadataStore] 종목 ${stockCd} 메타데이터 로드 실패:`, err);
    }
  };

  /**
   * 메타데이터 리셋
   */
  const resetMetadata = () => {
    symbolMetadata.value = new Map();
    isInitialized.value = false;
    loading.value = false;
    error.value = null;
  };

  /**
   * 메타데이터 존재 여부 확인
   * @param stockCd - 종목 코드
   * @returns 메타데이터 존재 여부
   */
  const hasMetadata = (stockCd: string): boolean => {
    return symbolMetadata.value.has(stockCd);
  };

  // 앱 시작 시 자동으로 메타데이터 로드
  if (!isInitialized.value && !loading.value) {
    loadMetadata();
  }

  return {
    // 상태
    symbolMetadata,
    isInitialized,
    loading,
    error,

    // 계산된 속성
    metadataCount,
    isEmpty,

    // 액션
    getMetadata,
    getMetadataList,
    getAllMetadata,
    setMetadata,
    setMetadataList,
    loadMetadata,
    loadSingleMetadata,
    resetMetadata,
    hasMetadata,
  };
});
