<template>
  <div class="gap-size-8 pt-padding-24 flex items-end">
    <div class="gap-size-36 flex items-end">
      <div>
        <PeriodSelect title="청산일자" @period-change="handlePeriodChange" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PeriodSelect from '@/components/transaction/common/PeriodSelect.vue';
import { useTradeSearchStore } from '@/stores/useTradeSearchStore';

const tradeSearchStore = useTradeSearchStore();

/**
 * 기간 변경 시 스토어에 시작/종료일과 기간 타입을 저장합니다.
 * @param startDate - 시작 날짜(yyyy-MM-dd)
 * @param endDate - 종료 날짜(yyyy-MM-dd)
 * @param periodType - 선택된 기간 타입
 */
const handlePeriodChange = (
  startDate: string,
  endDate: string,
  periodType: 'today' | 'weeks' | 'months'
) => {
  tradeSearchStore.setOrderPeriod(startDate, endDate, periodType);
};
</script>
