/**
 * 주문 관련 데이터를 중앙에서 관리하는 Pinia 스토어
 * 잔고, 주문내역, 미체결, 청산 데이터를 통합 관리
 */

import type {
  PositionStockData,
  DetailsOrderExecution,
  DetailsPendingOrder,
  DetailsCloseOutOrder,
} from '@template/api';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useOrderDataStore = defineStore('orderData', () => {
  // 잔고 데이터
  const positionStocks = ref<PositionStockData[]>([]);
  const positionStocksLoading = ref(false);
  const positionStocksError = ref<string | null>(null);

  // 주문 내역 데이터
  const orderHistory = ref<DetailsOrderExecution[]>([]);
  const orderHistoryLoading = ref(false);
  const orderHistoryError = ref<string | null>(null);

  // 미체결 주문 데이터
  const pendingOrders = ref<DetailsPendingOrder[]>([]);
  const pendingOrdersLoading = ref(false);
  const pendingOrdersError = ref<string | null>(null);

  // 청산 내역 데이터
  const closeOutHistory = ref<DetailsCloseOutOrder[]>([]);
  const closeOutHistoryLoading = ref(false);
  const closeOutHistoryError = ref<string | null>(null);

  // 선택된 계좌
  const selectedAccount = ref<string>('');

  // 잔고 데이터 관리
  const setPositionStocks = (data: PositionStockData[]) => {
    positionStocks.value = data;
  };

  const addPositionStock = (data: PositionStockData) => {
    const existingIndex = positionStocks.value.findIndex(
      (item) => item.stockCd === data.stockCd && item.positionCd === data.positionCd
    );

    if (existingIndex >= 0) {
      positionStocks.value[existingIndex] = data;
    } else {
      positionStocks.value.push(data);
    }
  };

  const removePositionStock = (stockCd: string, positionCd: string) => {
    const index = positionStocks.value.findIndex(
      (item) => item.stockCd === stockCd && item.positionCd === positionCd
    );

    if (index >= 0) {
      positionStocks.value.splice(index, 1);
    }
  };

  const updatePositionStock = (
    stockCd: string,
    positionCd: string,
    updates: Partial<PositionStockData>
  ) => {
    const index = positionStocks.value.findIndex(
      (item) => item.stockCd === stockCd && item.positionCd === positionCd
    );

    if (index >= 0) {
      positionStocks.value[index] = { ...positionStocks.value[index], ...updates };
    }
  };

  // 주문 내역 데이터 관리
  const setOrderHistory = (data: DetailsOrderExecution[]) => {
    orderHistory.value = data;
  };

  const addOrderHistory = (data: DetailsOrderExecution) => {
    const existingIndex = orderHistory.value.findIndex((item) => item.orderNo === data.orderNo);

    if (existingIndex >= 0) {
      orderHistory.value[existingIndex] = data;
    } else {
      orderHistory.value.unshift(data); // 최신 주문을 맨 앞에 추가
    }
  };

  const updateOrderHistory = (orderNo: string, updates: Partial<DetailsOrderExecution>) => {
    const index = orderHistory.value.findIndex((item) => item.orderNo === orderNo);

    if (index >= 0) {
      orderHistory.value[index] = { ...orderHistory.value[index], ...updates };
    }
  };

  // 미체결 주문 데이터 관리
  const setPendingOrders = (data: DetailsPendingOrder[]) => {
    pendingOrders.value = data;
  };

  const addPendingOrder = (data: DetailsPendingOrder) => {
    const existingIndex = pendingOrders.value.findIndex((item) => item.orderNo === data.orderNo);

    if (existingIndex >= 0) {
      pendingOrders.value[existingIndex] = data;
    } else {
      pendingOrders.value.unshift(data); // 최신 주문을 맨 앞에 추가
    }
  };

  const removePendingOrder = (orderNo: string) => {
    const index = pendingOrders.value.findIndex((item) => item.orderNo === orderNo);

    if (index >= 0) {
      pendingOrders.value.splice(index, 1);
    }
  };

  const updatePendingOrder = (orderNo: string, updates: Partial<DetailsPendingOrder>) => {
    const index = pendingOrders.value.findIndex((item) => item.orderNo === orderNo);

    if (index >= 0) {
      pendingOrders.value[index] = { ...pendingOrders.value[index], ...updates };
    }
  };

  // 청산 내역 데이터 관리
  const setCloseOutHistory = (data: DetailsCloseOutOrder[]) => {
    closeOutHistory.value = data;
  };

  const addCloseOutHistory = (data: DetailsCloseOutOrder) => {
    const existingIndex = closeOutHistory.value.findIndex((item) => item.orderNo === data.orderNo);

    if (existingIndex >= 0) {
      closeOutHistory.value[existingIndex] = data;
    } else {
      closeOutHistory.value.unshift(data); // 최신 청산을 맨 앞에 추가
    }
  };

  // 로딩 상태 관리
  const setPositionStocksLoading = (loading: boolean) => {
    positionStocksLoading.value = loading;
  };

  const setOrderHistoryLoading = (loading: boolean) => {
    orderHistoryLoading.value = loading;
  };

  const setPendingOrdersLoading = (loading: boolean) => {
    pendingOrdersLoading.value = loading;
  };

  const setCloseOutHistoryLoading = (loading: boolean) => {
    closeOutHistoryLoading.value = loading;
  };

  // 에러 상태 관리
  const setPositionStocksError = (error: string | null) => {
    positionStocksError.value = error;
  };

  const setOrderHistoryError = (error: string | null) => {
    orderHistoryError.value = error;
  };

  const setPendingOrdersError = (error: string | null) => {
    pendingOrdersError.value = error;
  };

  const setCloseOutHistoryError = (error: string | null) => {
    closeOutHistoryError.value = error;
  };

  // 선택된 계좌 관리
  const setSelectedAccount = (account: string) => {
    selectedAccount.value = account;
  };

  // 계산된 속성들
  const totalPositionValue = computed(() => {
    return positionStocks.value.reduce((total, position) => {
      return total + position.currentPrice * position.accountBookQuantity;
    }, 0);
  });

  const totalProfitLoss = computed(() => {
    return positionStocks.value.reduce((total, position) => {
      return total + position.assessmentProfitLoss;
    }, 0);
  });

  const pendingOrdersCount = computed(() => {
    return pendingOrders.value.length;
  });

  const activePositionsCount = computed(() => {
    return positionStocks.value.length;
  });

  // 데이터 초기화
  const clearAllData = () => {
    positionStocks.value = [];
    orderHistory.value = [];
    pendingOrders.value = [];
    closeOutHistory.value = [];

    positionStocksError.value = null;
    orderHistoryError.value = null;
    pendingOrdersError.value = null;
    closeOutHistoryError.value = null;
  };

  // 특정 계좌의 데이터만 초기화
  const clearAccountData = (account: string) => {
    if (selectedAccount.value === account) {
      clearAllData();
    }
  };

  return {
    // 상태
    positionStocks,
    positionStocksLoading,
    positionStocksError,
    orderHistory,
    orderHistoryLoading,
    orderHistoryError,
    pendingOrders,
    pendingOrdersLoading,
    pendingOrdersError,
    closeOutHistory,
    closeOutHistoryLoading,
    closeOutHistoryError,
    selectedAccount,

    // 계산된 속성
    totalPositionValue,
    totalProfitLoss,
    pendingOrdersCount,
    activePositionsCount,

    // 잔고 데이터 액션
    setPositionStocks,
    addPositionStock,
    removePositionStock,
    updatePositionStock,

    // 주문 내역 액션
    setOrderHistory,
    addOrderHistory,
    updateOrderHistory,

    // 미체결 주문 액션
    setPendingOrders,
    addPendingOrder,
    removePendingOrder,
    updatePendingOrder,

    // 청산 내역 액션
    setCloseOutHistory,
    addCloseOutHistory,

    // 로딩 상태 액션
    setPositionStocksLoading,
    setOrderHistoryLoading,
    setPendingOrdersLoading,
    setCloseOutHistoryLoading,

    // 에러 상태 액션
    setPositionStocksError,
    setOrderHistoryError,
    setPendingOrdersError,
    setCloseOutHistoryError,

    // 계좌 관리 액션
    setSelectedAccount,

    // 유틸리티 액션
    clearAllData,
    clearAccountData,
  };
});
