/**
 * 주문 관련 모든 데이터를 통합 관리하는 메인 컴포저블
 * 잔고, 주문내역, 미체결, 청산 데이터를 하나의 인터페이스로 제공
 * 주문 페이지 진입 시점에 모든 데이터를 한 번에 로드하고 관리
 */

import { usePendingOrderData } from './usePendingOrderData';
import { useOrderHistoryData } from './useOrderHistoryData';
import { useAccountStore } from '@/stores/useAccountStore';
import { usePositionData } from './usePositionData';
import { useCloseOutData } from './useCloseOutData';
import { computed } from 'vue';

export function useOrderData() {
  const accountStore = useAccountStore();

  // 각 데이터 타입별 컴포저블 인스턴스
  const positionData = usePositionData();
  const orderHistoryData = useOrderHistoryData();
  const pendingOrderData = usePendingOrderData();
  const closeOutData = useCloseOutData();

  // 통합 상태
  const selectedAccount = computed(() => accountStore.selectedAccountNo);
  const isLoading = computed(
    () =>
      positionData.loading.value ||
      orderHistoryData.loading.value ||
      pendingOrderData.loading.value ||
      closeOutData.loading.value
  );

  const hasError = computed(
    () =>
      positionData.error.value ||
      orderHistoryData.error.value ||
      pendingOrderData.error.value ||
      closeOutData.error.value
  );

  // 통합 액션들
  const loadAllData = async () => {
    // 모든 데이터를 병렬로 로드
    await Promise.all([
      positionData.loadPositionData(),
      // 주문내역과 청산내역은 날짜가 설정된 경우에만 로드
      orderHistoryData.startDate.value && orderHistoryData.endDate.value
        ? orderHistoryData.loadOrderHistoryData()
        : Promise.resolve(),
      pendingOrderData.loadPendingOrderData(),
      closeOutData.startDate.value && closeOutData.endDate.value
        ? closeOutData.loadCloseOutData()
        : Promise.resolve(),
    ]);
  };

  const refreshAllData = () => {
    positionData.refreshData();
    orderHistoryData.refreshData();
    pendingOrderData.refreshData();
    closeOutData.refreshData();
  };

  const clearAllErrors = () => {
    positionData.clearError();
    orderHistoryData.clearError();
    pendingOrderData.clearError();
    closeOutData.clearError();
  };

  // 웹소켓 관련 통합 액션
  const setupAllWebSocketSubscriptions = () => {
    positionData.setupWebSocketSubscription();
    orderHistoryData.setupWebSocketSubscription();
    pendingOrderData.setupWebSocketSubscription();
    closeOutData.setupWebSocketSubscription();
  };

  const cleanupAllWebSocketSubscriptions = () => {
    positionData.cleanupWebSocketSubscription();
    orderHistoryData.cleanupWebSocketSubscription();
    pendingOrderData.cleanupWebSocketSubscription();
    closeOutData.cleanupWebSocketSubscription();
  };

  // 날짜 범위 설정 (주문내역과 청산내역에 공통 적용)
  const setDateRange = (startDate: string, endDate: string) => {
    orderHistoryData.setDateRange(startDate, endDate);
    closeOutData.setDateRange(startDate, endDate);
  };

  return {
    // 통합 상태
    selectedAccount,
    isLoading,
    hasError,

    // 개별 데이터 컴포저블
    positionData,
    orderHistoryData,
    pendingOrderData,
    closeOutData,

    // 통합 액션
    loadAllData,
    refreshAllData,
    clearAllErrors,
    setDateRange,

    // 웹소켓 관련
    setupAllWebSocketSubscriptions,
    cleanupAllWebSocketSubscriptions,
  };
}
