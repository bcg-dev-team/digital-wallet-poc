import type {
  PaymentDetailPositionCdType,
  OrderExecutionHistoryRequestOrderCdType,
} from '@template/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * 주문/체결 검색 조건 스토어
 * 화면의 검색 박스에서 선택/입력한 값을 보관하고 공유합니다.
 */
export const useTradeSearchStore = defineStore('tradeSearch', () => {
  // L/S 구분
  const positionCd = ref<PaymentDetailPositionCdType>('TOTAL');
  // 매입/청산 구분
  const orderCd = ref<OrderExecutionHistoryRequestOrderCdType>('TOTAL');
  // 기간: 시작일, 종료일 (yyyy-MM-dd 형식 가정)
  const orderStartDate = ref<string>('');
  const orderEndDate = ref<string>('');
  // 선택된 기간 타입
  const selectedPeriod = ref<'today' | 'weeks' | 'months'>('today');

  /**
   * L/S 구분값을 설정합니다.
   * @param value - L/S 코드 값
   */
  const setPositionCd = (value: PaymentDetailPositionCdType) => {
    positionCd.value = value;
  };

  /**
   * 매입/청산 구분값을 설정합니다.
   * @param value - 주문 구분 코드 값
   */
  const setOrderCd = (value: OrderExecutionHistoryRequestOrderCdType) => {
    orderCd.value = value;
  };

  /**
   * 기간(시작/종료일)을 설정합니다.
   * @param start - 시작일(yyyy-MM-dd)
   * @param end - 종료일(yyyy-MM-dd)
   * @param periodType - 선택된 기간 타입
   */
  const setOrderPeriod = (
    start: string,
    end: string,
    periodType?: 'today' | 'weeks' | 'months'
  ) => {
    orderStartDate.value = start;
    orderEndDate.value = end;
    if (periodType) {
      selectedPeriod.value = periodType;
    }
  };

  /**
   * 검색 조건을 초기화합니다.
   */
  const reset = () => {
    positionCd.value = 'TOTAL';
    orderCd.value = 'TOTAL';
    orderStartDate.value = '';
    orderEndDate.value = '';
    selectedPeriod.value = 'today';
  };

  return {
    positionCd,
    orderCd,
    orderStartDate,
    orderEndDate,
    selectedPeriod,
    setPositionCd,
    setOrderCd,
    setOrderPeriod,
    reset,
  };
});
