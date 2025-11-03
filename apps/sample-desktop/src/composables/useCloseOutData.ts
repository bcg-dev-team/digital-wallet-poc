/**
 * 청산 내역 데이터를 관리하는 컴포저블
 * CloseOutTable.vue의 getTradeLiquidationOrderHistory API 호출 로직을 기반으로 함
 */

import { useOrderDataStore } from '@/stores/useOrderDataStore';
import { useAccountStore } from '@/stores/useAccountStore';
import type { DetailsCloseOutOrder } from '@template/api';
import { tradeService } from '@/services/api';
import { ref, computed, watch } from 'vue';

export function useCloseOutData() {
  const orderDataStore = useOrderDataStore();
  const accountStore = useAccountStore();

  // 로컬 상태
  const loading = ref(false);
  const error = ref<string | null>(null);
  const startDate = ref<string>('');
  const endDate = ref<string>('');

  // 스토어에서 데이터 가져오기
  const closeOutHistory = computed(() => orderDataStore.closeOutHistory);
  const selectedAccount = computed(() => accountStore.selectedAccountNo);

  /**
   * 청산 내역 데이터를 API에서 가져오는 함수
   * CloseOutTable.vue의 loadCloseOutData 로직을 기반으로 함
   * @param orderStartDate - 청산 시작일
   * @param orderEndDate - 청산 종료일
   */
  const loadCloseOutData = async (orderStartDate?: string, orderEndDate?: string) => {
    if (!selectedAccount.value) {
      error.value = '계좌가 선택되지 않았습니다.';
      return;
    }

    // 날짜가 설정되지 않았으면 로드하지 않음
    const startDateToUse = orderStartDate || startDate.value;
    const endDateToUse = orderEndDate || endDate.value;

    if (!startDateToUse || !endDateToUse) {
      console.log('청산 내역 조회를 위한 날짜가 설정되지 않았습니다.');
      return;
    }

    try {
      loading.value = true;
      error.value = null;
      orderDataStore.setCloseOutHistoryLoading(true);
      orderDataStore.setCloseOutHistoryError(null);

      const request = {
        accountNo: selectedAccount.value,
        orderStartDate: startDateToUse,
        orderEndDate: endDateToUse,
        nextKey: '',
      };

      const response = await tradeService.getTradeLiquidationOrderHistory(request);

      if (response.data?.details) {
        orderDataStore.setCloseOutHistory(response.data.details);
      } else {
        orderDataStore.setCloseOutHistory([]);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '청산 내역을 불러오는데 실패했습니다.';
      error.value = errorMessage;
      orderDataStore.setCloseOutHistoryError(errorMessage);
      console.error('청산 내역 로드 실패:', err);
    } finally {
      loading.value = false;
      orderDataStore.setCloseOutHistoryLoading(false);
    }
  };

  /**
   * 날짜 범위를 설정하는 함수
   * @param start - 시작일
   * @param end - 종료일
   */
  const setDateRange = (start: string, end: string) => {
    startDate.value = start;
    endDate.value = end;
  };

  /**
   * 새로운 청산 내역을 추가하는 함수
   * @param data - 추가할 청산 내역 데이터
   */
  const addCloseOutHistory = (data: DetailsCloseOutOrder) => {
    orderDataStore.addCloseOutHistory(data);
  };

  /**
   * 특정 종목의 청산 내역을 필터링하는 함수
   * @param stockCd - 종목코드
   */
  const getCloseOutHistoryByStock = (stockCd: string) => {
    return closeOutHistory.value.filter((closeOut) => closeOut.stockCd === stockCd);
  };

  /**
   * 특정 기간의 청산 내역을 필터링하는 함수
   * @param start - 시작일
   * @param end - 종료일
   */
  const getCloseOutHistoryByDateRange = (start: string, end: string) => {
    return closeOutHistory.value.filter((closeOut) => {
      const closeOutDate = closeOut.executionDate;
      return closeOutDate >= start && closeOutDate <= end;
    });
  };

  /**
   * 특정 포지션의 청산 내역을 필터링하는 함수
   * @param positionCd - 포지션 코드 (L/S)
   */
  const getCloseOutHistoryByPosition = (positionCd: string) => {
    return closeOutHistory.value.filter((closeOut) => closeOut.positionCd === positionCd);
  };

  /**
   * 청산 손익 합계를 계산하는 함수
   * @param stockCd - 종목코드 (선택사항)
   */
  const getTotalCloseOutProfitLoss = (stockCd?: string) => {
    const filteredData = stockCd ? getCloseOutHistoryByStock(stockCd) : closeOutHistory.value;

    return filteredData.reduce((total, closeOut) => {
      return total + closeOut.closeOutProfitLoss;
    }, 0);
  };

  /**
   * 청산 수수료 합계를 계산하는 함수
   * @param stockCd - 종목코드 (선택사항)
   */
  const getTotalCloseOutFees = (stockCd?: string) => {
    const filteredData = stockCd ? getCloseOutHistoryByStock(stockCd) : closeOutHistory.value;

    return filteredData.reduce((total, closeOut) => {
      return total + closeOut.executionFee + closeOut.swapFee;
    }, 0);
  };

  /**
   * 에러 상태 초기화
   */
  const clearError = () => {
    error.value = null;
    orderDataStore.setCloseOutHistoryError(null);
  };

  /**
   * 데이터 새로고침
   */
  const refreshData = () => {
    if (startDate.value && endDate.value) {
      loadCloseOutData();
    }
  };

  // 계좌 변경 감지
  watch(
    () => selectedAccount.value,
    (newAccount) => {
      if (newAccount) {
        // 계좌가 변경되면 청산 내역 데이터 새로고침
        if (startDate.value && endDate.value) {
          loadCloseOutData();
        }
      } else {
        // 계좌가 선택되지 않으면 데이터 초기화
        orderDataStore.setCloseOutHistory([]);
      }
    }
  );

  // 날짜 범위 변경 감지
  watch([() => startDate.value, () => endDate.value], ([newStartDate, newEndDate]) => {
    if (newStartDate && newEndDate && selectedAccount.value) {
      loadCloseOutData(newStartDate, newEndDate);
    }
  });

  // 웹소켓 구독 설정
  // 새로운 청산이 발생할 때 실시간으로 청산 내역 업데이트
  const setupWebSocketSubscription = () => {
    console.log('웹소켓 구독 설정:', selectedAccount.value);

    // 주문 체결 이벤트 구독 (청산 체결 확인)
    const handleOrderExecution = (event: CustomEvent) => {
      const { data, accountNo } = event.detail;
      if (accountNo === selectedAccount.value) {
        // console.log('[useCloseOutData] 주문 체결 수신 (청산 확인):', data);
        // 청산 체결인지 확인하고 청산 내역에 추가
        // TODO: 청산 체결 여부 판단 로직 구현
        // 현재는 모든 체결을 청산으로 간주하지 않고, 별도 청산 메시지가 올 것으로 예상
      }
    };

    // 계좌 잔고 이벤트 구독 (청산 후 잔고 변경)
    const handleAccountBalance = (event: CustomEvent) => {
      const { data, accountNo } = event.detail;
      if (accountNo === selectedAccount.value) {
        // console.log('[useCloseOutData] 계좌 잔고 수신 (청산 후):', data);
        // 청산 후 잔고가 0이 되면 청산 내역에 추가할 수 있음
        // TODO: 청산 완료 판단 로직 구현
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('orderExecution', handleOrderExecution as EventListener);
    window.addEventListener('accountBalance', handleAccountBalance as EventListener);

    // 정리 함수 반환
    return () => {
      window.removeEventListener('orderExecution', handleOrderExecution as EventListener);
      window.removeEventListener('accountBalance', handleAccountBalance as EventListener);
    };
  };

  // TODO: 웹소켓 구독 해제
  const cleanupWebSocketSubscription = () => {
    // TODO: 웹소켓 구독 해제 로직 구현
    console.log('웹소켓 구독 해제 예정');
  };

  return {
    // 상태
    closeOutHistory,
    loading,
    error,
    selectedAccount,
    startDate,
    endDate,

    // 액션
    loadCloseOutData,
    setDateRange,
    addCloseOutHistory,
    getCloseOutHistoryByStock,
    getCloseOutHistoryByDateRange,
    getCloseOutHistoryByPosition,
    getTotalCloseOutProfitLoss,
    getTotalCloseOutFees,
    clearError,
    refreshData,

    // 웹소켓 관련 (TODO)
    setupWebSocketSubscription,
    cleanupWebSocketSubscription,
  };
}
