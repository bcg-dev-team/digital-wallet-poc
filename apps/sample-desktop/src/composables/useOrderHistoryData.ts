/**
 * 주문 내역 데이터를 관리하는 컴포저블
 * OrderHistoryTable.vue의 getTradeHistory API 호출 로직을 기반으로 함
 */

import { useOrderDataStore } from '@/stores/useOrderDataStore';
import { useAccountStore } from '@/stores/useAccountStore';
import type { DetailsOrderExecution } from '@template/api';
import { tradeService } from '@/services/api';
import { ref, computed, watch } from 'vue';

export function useOrderHistoryData() {
  const orderDataStore = useOrderDataStore();
  const accountStore = useAccountStore();

  // 로컬 상태
  const loading = ref(false);
  const error = ref<string | null>(null);
  const startDate = ref<string>('');
  const endDate = ref<string>('');

  // 스토어에서 데이터 가져오기
  const orderHistory = computed(() => orderDataStore.orderHistory);
  const selectedAccount = computed(() => accountStore.selectedAccountNo);

  /**
   * 주문 내역 데이터를 API에서 가져오는 함수
   * OrderHistoryTable.vue의 loadOrderHistoryData 로직을 기반으로 함
   * @param orderStartDate - 주문 시작일
   * @param orderEndDate - 주문 종료일
   */
  const loadOrderHistoryData = async (orderStartDate?: string, orderEndDate?: string) => {
    if (!selectedAccount.value) {
      error.value = '계좌가 선택되지 않았습니다.';
      return;
    }

    // 날짜가 설정되지 않았으면 로드하지 않음
    const startDateToUse = orderStartDate || startDate.value;
    const endDateToUse = orderEndDate || endDate.value;

    if (!startDateToUse || !endDateToUse) {
      console.log('주문 내역 조회를 위한 날짜가 설정되지 않았습니다.');
      return;
    }

    try {
      loading.value = true;
      error.value = null;
      orderDataStore.setOrderHistoryLoading(true);
      orderDataStore.setOrderHistoryError(null);

      const request = {
        accountNo: selectedAccount.value,
        orderStartDate: startDateToUse,
        orderEndDate: endDateToUse,
        nextKey: '',
      };

      const response = await tradeService.getTradeHistory(request);

      if (response.data?.details) {
        orderDataStore.setOrderHistory(response.data.details);
      } else {
        orderDataStore.setOrderHistory([]);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '주문 내역을 불러오는데 실패했습니다.';
      error.value = errorMessage;
      orderDataStore.setOrderHistoryError(errorMessage);
      console.error('주문 내역 로드 실패:', err);
    } finally {
      loading.value = false;
      orderDataStore.setOrderHistoryLoading(false);
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
   * 새로운 주문 내역을 추가하는 함수
   * @param data - 추가할 주문 내역 데이터
   */
  const addOrderHistory = (data: DetailsOrderExecution) => {
    orderDataStore.addOrderHistory(data);
  };

  /**
   * 주문 내역을 업데이트하는 함수
   * @param orderNo - 주문번호
   * @param updates - 업데이트할 데이터
   */
  const updateOrderHistory = (orderNo: string, updates: Partial<DetailsOrderExecution>) => {
    orderDataStore.updateOrderHistory(orderNo, updates);
  };

  /**
   * 특정 종목의 주문 내역을 필터링하는 함수
   * @param stockCd - 종목코드
   */
  const getOrderHistoryByStock = (stockCd: string) => {
    return orderHistory.value.filter((order) => order.stockCd === stockCd);
  };

  /**
   * 특정 기간의 주문 내역을 필터링하는 함수
   * @param start - 시작일
   * @param end - 종료일
   */
  const getOrderHistoryByDateRange = (start: string, end: string) => {
    return orderHistory.value.filter((order) => {
      const orderDate = order.orderDate;
      return orderDate >= start && orderDate <= end;
    });
  };

  /**
   * 에러 상태 초기화
   */
  const clearError = () => {
    error.value = null;
    orderDataStore.setOrderHistoryError(null);
  };

  /**
   * 데이터 새로고침
   */
  const refreshData = () => {
    if (startDate.value && endDate.value) {
      loadOrderHistoryData();
    }
  };

  // 계좌 변경 감지
  watch(
    () => selectedAccount.value,
    (newAccount) => {
      if (newAccount) {
        // 계좌가 변경되면 주문 내역 데이터 새로고침
        if (startDate.value && endDate.value) {
          loadOrderHistoryData();
        }
      } else {
        // 계좌가 선택되지 않으면 데이터 초기화
        orderDataStore.setOrderHistory([]);
      }
    }
  );

  // 날짜 범위 변경 감지
  watch([() => startDate.value, () => endDate.value], ([newStartDate, newEndDate]) => {
    if (newStartDate && newEndDate && selectedAccount.value) {
      loadOrderHistoryData(newStartDate, newEndDate);
    }
  });

  // 웹소켓 구독 설정
  // 새로운 주문이나 체결이 발생할 때 실시간으로 주문 내역 업데이트
  const setupWebSocketSubscription = () => {
    // 주문 승인 이벤트 구독
    const handleOrderAccepted = (event: CustomEvent) => {
      const { data, accountNo } = event.detail;
      if (accountNo === selectedAccount.value) {
        console.log('[useOrderHistoryData] 주문 승인 수신:', data);
        // 주문 내역에 추가 (체결되지 않은 주문)
        const orderHistoryData = {
          ...data,
          executionQuantity: 0,
          executionPrice: 0,
          executionDate: '',
          executionTime: '',
        };
        orderDataStore.addOrderHistory(orderHistoryData);
      }
    };

    // 주문 체결 이벤트 구독
    const handleOrderExecution = (event: CustomEvent) => {
      const { data, accountNo } = event.detail;
      if (accountNo === selectedAccount.value) {
        // console.log('[useOrderHistoryData] 주문 체결 수신:', data);
        // 기존 주문 내역을 체결 정보로 업데이트
        orderDataStore.updateOrderHistory(data.orderNo, {
          executionQuantity: data.executionQuantity,
          executionPrice: data.executionPrice,
          executionDate: data.orderDate,
        });
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('orderAccepted', handleOrderAccepted as EventListener);
    window.addEventListener('orderExecution', handleOrderExecution as EventListener);

    // 정리 함수 반환
    return () => {
      window.removeEventListener('orderAccepted', handleOrderAccepted as EventListener);
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
    orderHistory,
    loading,
    error,
    selectedAccount,
    startDate,
    endDate,

    // 액션
    loadOrderHistoryData,
    setDateRange,
    addOrderHistory,
    updateOrderHistory,
    getOrderHistoryByStock,
    getOrderHistoryByDateRange,
    clearError,
    refreshData,

    // 웹소켓 관련 (TODO)
    setupWebSocketSubscription,
    cleanupWebSocketSubscription,
  };
}
