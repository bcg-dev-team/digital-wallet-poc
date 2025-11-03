/**
 * 날짜 범위 관리 Composable
 * 주문/청산 탭에서 사용하는 날짜 선택 로직을 관리합니다.
 */

import { format, subWeeks, subMonths } from 'date-fns';
import { ref, computed, watch } from 'vue';

export function useDateRange() {
  // 날짜 관련 상태
  const datePeriod = ref('weeks');
  const dateStartDate = ref('');
  const dateEndDate = ref('');

  // 직접입력 여부 computed
  const isCustomDatePeriod = computed(() => datePeriod.value === 'custom');

  /**
   * 날짜 범위 계산 (주문/청산 탭 공통)
   */
  const calculateDateRange = () => {
    const today = new Date();
    const dateFormat = 'yyyy-MM-dd';

    switch (datePeriod.value) {
      case 'today':
        dateStartDate.value = format(today, dateFormat);
        dateEndDate.value = format(today, dateFormat);
        break;
      case 'weeks':
        dateStartDate.value = format(subWeeks(today, 1), dateFormat);
        dateEndDate.value = format(today, dateFormat);
        break;
      case 'months':
        dateStartDate.value = format(subMonths(today, 1), dateFormat);
        dateEndDate.value = format(today, dateFormat);
        break;
      case 'custom':
        if (!dateStartDate.value || !dateEndDate.value) {
          dateStartDate.value = format(today, dateFormat);
          dateEndDate.value = format(today, dateFormat);
        }
        break;
    }
  };

  /**
   * 날짜 범위 초기화
   */
  const initializeDateRange = () => {
    calculateDateRange();
  };

  /**
   * 날짜 범위 리셋
   */
  const resetDateRange = () => {
    datePeriod.value = 'weeks';
    dateStartDate.value = '';
    dateEndDate.value = '';
    calculateDateRange();
  };

  // 날짜 변경 감지
  watch(datePeriod, () => {
    calculateDateRange();
  });

  return {
    // 상태
    datePeriod,
    dateStartDate,
    dateEndDate,
    isCustomDatePeriod,

    // 함수들
    calculateDateRange,
    initializeDateRange,
    resetDateRange,
  };
}
