/**
 * 미체결 주문 데이터를 관리하는 컴포저블
 * PendingExecutionTable.vue의 getPendingOrderHistory API 호출 로직을 기반으로 함
 */

import { useOrderDataStore } from '@/stores/useOrderDataStore';
import { useAccountStore } from '@/stores/useAccountStore';
import type { DetailsPendingOrder } from '@template/api';
import { executionService } from '@/services/api';
import { ref, computed, watch } from 'vue';

export function usePendingOrderData() {
  const orderDataStore = useOrderDataStore();
  const accountStore = useAccountStore();

  // 로컬 상태
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 스토어에서 데이터 가져오기
  const pendingOrders = computed(() => orderDataStore.pendingOrders);
  const selectedAccount = computed(() => accountStore.selectedAccountNo);

  // 계산된 속성들
  const pendingOrdersCount = computed(() => orderDataStore.pendingOrdersCount);

  /**
   * 미체결 주문 데이터를 API에서 가져오는 함수
   * PendingExecutionTable.vue의 loadPendingExecutionData 로직을 기반으로 함
   */
  const loadPendingOrderData = async () => {
    if (!selectedAccount.value) {
      error.value = '계좌가 선택되지 않았습니다.';
      return;
    }

    try {
      loading.value = true;
      error.value = null;
      orderDataStore.setPendingOrdersLoading(true);
      orderDataStore.setPendingOrdersError(null);

      const request = {
        accountNo: selectedAccount.value,
        nextKey: '',
      };

      const response = await executionService.getPendingOrderHistory(request);

      if (response.data?.details) {
        orderDataStore.setPendingOrders(response.data.details);
      } else {
        orderDataStore.setPendingOrders([]);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '미체결 주문을 불러오는데 실패했습니다.';
      error.value = errorMessage;
      orderDataStore.setPendingOrdersError(errorMessage);
      console.error('미체결 주문 로드 실패:', err);
    } finally {
      loading.value = false;
      orderDataStore.setPendingOrdersLoading(false);
    }
  };

  /**
   * 새로운 미체결 주문을 추가하는 함수
   * @param data - 추가할 미체결 주문 데이터
   */
  const addPendingOrder = (data: DetailsPendingOrder) => {
    orderDataStore.addPendingOrder(data);
  };

  /**
   * 미체결 주문을 제거하는 함수 (체결되거나 취소된 경우)
   * @param orderNo - 주문번호
   */
  const removePendingOrder = (orderNo: string) => {
    orderDataStore.removePendingOrder(orderNo);
  };

  /**
   * 미체결 주문을 업데이트하는 함수 (정정된 경우)
   * @param orderNo - 주문번호
   * @param updates - 업데이트할 데이터
   */
  const updatePendingOrder = (orderNo: string, updates: Partial<DetailsPendingOrder>) => {
    orderDataStore.updatePendingOrder(orderNo, updates);
  };

  /**
   * 특정 종목의 미체결 주문을 필터링하는 함수
   * @param stockCd - 종목코드
   */
  const getPendingOrdersByStock = (stockCd: string) => {
    return pendingOrders.value.filter((order) => order.stockCd === stockCd);
  };

  /**
   * 특정 포지션의 미체결 주문을 필터링하는 함수
   * @param positionCd - 포지션 코드 (L/S)
   */
  const getPendingOrdersByPosition = (positionCd: string) => {
    return pendingOrders.value.filter((order) => order.positionCd === positionCd);
  };

  /**
   * 특정 주문 유형의 미체결 주문을 필터링하는 함수
   * @param orderTypeCd - 주문 유형 코드
   */
  const getPendingOrdersByType = (orderTypeCd: string) => {
    return pendingOrders.value.filter((order) => order.orderTypeCd === orderTypeCd);
  };

  /**
   * 주문 정정 처리 함수
   * @param orderNo - 주문번호
   * @param correctedData - 정정된 주문 데이터
   */
  const correctOrder = (orderNo: string, correctedData: Partial<DetailsPendingOrder>) => {
    // TODO: API 호출로 주문 정정
    console.log('주문 정정:', orderNo, correctedData);

    // 정정 성공 시 로컬 데이터 업데이트
    updatePendingOrder(orderNo, correctedData);
  };

  /**
   * 주문 취소 처리 함수
   * @param orderNo - 주문번호
   */
  const cancelOrder = (orderNo: string) => {
    // TODO: API 호출로 주문 취소
    console.log('주문 취소:', orderNo);

    // 취소 성공 시 로컬 데이터에서 제거
    removePendingOrder(orderNo);
  };

  /**
   * 에러 상태 초기화
   */
  const clearError = () => {
    error.value = null;
    orderDataStore.setPendingOrdersError(null);
  };

  /**
   * 데이터 새로고침
   */
  const refreshData = () => {
    loadPendingOrderData();
  };

  // 계좌 변경 감지
  watch(
    () => selectedAccount.value,
    (newAccount) => {
      if (newAccount) {
        // 계좌가 변경되면 미체결 주문 데이터 새로고침
        loadPendingOrderData();
      } else {
        // 계좌가 선택되지 않으면 데이터 초기화
        orderDataStore.setPendingOrders([]);
      }
    },
    { immediate: true }
  );

  // 웹소켓 구독 설정
  // 새로운 주문이나 체결이 발생할 때 실시간으로 미체결 주문 업데이트
  const setupWebSocketSubscription = () => {
    // 주문 승인 이벤트 구독
    const handleOrderAccepted = (event: CustomEvent) => {
      const { data, accountNo } = event.detail;
      if (accountNo === selectedAccount.value) {
        // console.log('[usePendingOrderData] 주문 승인 수신:', data);
        // 미체결 주문 목록에 추가
        orderDataStore.addPendingOrder(data);
      }
    };

    // 주문 체결 이벤트 구독
    const handleOrderExecution = (event: CustomEvent) => {
      const { data, accountNo } = event.detail;
      if (accountNo === selectedAccount.value) {
        // console.log('[usePendingOrderData] 주문 체결 수신:', data);
        // 체결된 주문을 미체결 목록에서 제거
        orderDataStore.removePendingOrder(data.orderNo);
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
    pendingOrders,
    loading,
    error,
    selectedAccount,

    // 계산된 속성
    pendingOrdersCount,

    // 액션
    loadPendingOrderData,
    addPendingOrder,
    removePendingOrder,
    updatePendingOrder,
    getPendingOrdersByStock,
    getPendingOrdersByPosition,
    getPendingOrdersByType,
    correctOrder,
    cancelOrder,
    clearError,
    refreshData,

    // 웹소켓 관련 (TODO)
    setupWebSocketSubscription,
    cleanupWebSocketSubscription,
  };
}
