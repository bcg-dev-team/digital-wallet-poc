/**
 * 잔고(포지션) 데이터를 관리하는 컴포저블
 * OrderBalanceTable.vue의 getPositionStocks API 호출 로직을 기반으로 함
 */

import { useOrderDataStore } from '@/stores/useOrderDataStore';
import { useAccountStore } from '@/stores/useAccountStore';
import type { PositionStockData } from '@template/api';
import { stockService } from '@/services/api';
import { ref, computed, watch } from 'vue';

export function usePositionData() {
  const orderDataStore = useOrderDataStore();
  const accountStore = useAccountStore();

  // 로컬 상태
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 스토어에서 데이터 가져오기
  const positionStocks = computed(() => orderDataStore.positionStocks);
  const selectedAccount = computed(() => accountStore.selectedAccountNo);

  // 계산된 속성들
  const totalPositionValue = computed(() => orderDataStore.totalPositionValue);
  const totalProfitLoss = computed(() => orderDataStore.totalProfitLoss);
  const activePositionsCount = computed(() => orderDataStore.activePositionsCount);

  /**
   * 잔고 데이터를 API에서 가져오는 함수
   * OrderBalanceTable.vue의 loadStockPositionData 로직을 기반으로 함
   */
  const loadPositionData = async () => {
    if (!selectedAccount.value) {
      error.value = '계좌가 선택되지 않았습니다.';
      return;
    }

    try {
      loading.value = true;
      error.value = null;
      orderDataStore.setPositionStocksLoading(true);
      orderDataStore.setPositionStocksError(null);

      const request = {
        accountNo: selectedAccount.value,
        stockCd: '', // 전체 조회
        nextKey: '',
      };

      const response = await stockService.getPositionStocks(request);

      if (response.data?.symbols) {
        orderDataStore.setPositionStocks(response.data.symbols);
      } else {
        orderDataStore.setPositionStocks([]);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '잔고 데이터를 불러오는데 실패했습니다.';
      error.value = errorMessage;
      orderDataStore.setPositionStocksError(errorMessage);
      console.error('잔고 데이터 로드 실패:', err);
    } finally {
      loading.value = false;
      orderDataStore.setPositionStocksLoading(false);
    }
  };

  /**
   * 특정 종목의 잔고 데이터를 업데이트하는 함수
   * @param stockCd - 종목코드
   * @param positionCd - 포지션 코드 (L/S)
   * @param updates - 업데이트할 데이터
   */
  const updatePositionStock = (
    stockCd: string,
    positionCd: string,
    updates: Partial<PositionStockData>
  ) => {
    orderDataStore.updatePositionStock(stockCd, positionCd, updates);
  };

  /**
   * 새로운 잔고 데이터를 추가하는 함수
   * @param data - 추가할 잔고 데이터
   */
  const addPositionStock = (data: PositionStockData) => {
    orderDataStore.addPositionStock(data);
  };

  /**
   * 잔고 데이터를 제거하는 함수
   * @param stockCd - 종목코드
   * @param positionCd - 포지션 코드 (L/S)
   */
  const removePositionStock = (stockCd: string, positionCd: string) => {
    orderDataStore.removePositionStock(stockCd, positionCd);
  };

  /**
   * 검색어에 따라 필터링된 잔고 데이터
   * @param searchKeyword - 검색 키워드
   */
  const getFilteredPositionStocks = (searchKeyword?: string) => {
    if (!searchKeyword) {
      return positionStocks.value;
    }

    return positionStocks.value.filter((item) =>
      item.stockCd.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  };

  /**
   * 에러 상태 초기화
   */
  const clearError = () => {
    error.value = null;
    orderDataStore.setPositionStocksError(null);
  };

  /**
   * 데이터 새로고침
   */
  const refreshData = () => {
    loadPositionData();
  };

  // 계좌 변경 감지
  watch(
    () => selectedAccount.value,
    (newAccount) => {
      if (newAccount) {
        // 계좌가 변경되면 잔고 데이터 새로고침
        loadPositionData();
      } else {
        // 계좌가 선택되지 않으면 데이터 초기화
        orderDataStore.setPositionStocks([]);
      }
    },
    { immediate: true }
  );

  // 웹소켓 구독 설정
  // 주문/체결 데이터가 변경될 때 잔고 데이터를 실시간으로 업데이트
  const setupWebSocketSubscription = () => {
    console.log('웹소켓 구독 설정:', selectedAccount.value);

    // 계좌 잔고 이벤트 구독
    const handleAccountBalance = (event: CustomEvent) => {
      const { data, accountNo } = event.detail;
      if (accountNo === selectedAccount.value) {
        // 잔고 데이터 업데이트
        orderDataStore.updatePositionStock(data.stockCd, data.positionCd, data);
      }
    };

    // 주문 체결 이벤트 구독 (잔고 변경 시)
    const handleOrderExecution = (event: CustomEvent) => {
      const { data, accountNo } = event.detail;
      if (accountNo === selectedAccount.value) {
        // console.log('[usePositionData] 주문 체결 수신 (잔고 업데이트):', data);
        // 체결 시 잔고 데이터가 변경될 수 있으므로 전체 데이터 다시 로드
        loadPositionData();
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('accountBalance', handleAccountBalance as EventListener);
    window.addEventListener('orderExecution', handleOrderExecution as EventListener);

    // 정리 함수 반환
    return () => {
      window.removeEventListener('accountBalance', handleAccountBalance as EventListener);
      window.removeEventListener('orderExecution', handleOrderExecution as EventListener);
    };
  };

  // TODO: 웹소켓 구독 해제
  const cleanupWebSocketSubscription = () => {
    // TODO: 웹소켓 구독 해제 로직 구현
    console.log('웹소켓 구독 해제 예정');
  };

  return {
    // 상태
    positionStocks,
    loading,
    error,
    selectedAccount,

    // 계산된 속성
    totalPositionValue,
    totalProfitLoss,
    activePositionsCount,

    // 액션
    loadPositionData,
    updatePositionStock,
    addPositionStock,
    removePositionStock,
    getFilteredPositionStocks,
    clearError,
    refreshData,

    // 웹소켓 관련 (TODO)
    setupWebSocketSubscription,
    cleanupWebSocketSubscription,
  };
}
