<template>
  <div class="gap-size-8 pt-padding-24 flex items-end">
    <div class="gap-size-36 flex items-end">
      <div>
        <BaseRadioGroup
          v-model="positionCd"
          label="L / S"
          size="md"
          :options="[
            { value: 'TOTAL', label: '전체' },
            { value: 'LONG', label: 'LONG' },
            { value: 'SHORT', label: 'SHORT' },
          ]"
        />
      </div>
      <div>
        <BaseRadioGroup
          v-model="orderCd"
          label="구분"
          size="md"
          :options="[
            { value: 'TOTAL', label: '전체' },
            { value: 'PURCHASE', label: '매입' },
            { value: 'CLOSE_OUT', label: '청산' },
          ]"
        />
      </div>
      <div>
        <PeriodSelect title="주문일자" @period-change="handlePeriodChange" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PeriodSelect from '@/components/transaction/common/PeriodSelect.vue';
import { useTradeSearchStore } from '@/stores/useTradeSearchStore';
import { BaseRadioGroup } from '@template/ui';
import { storeToRefs } from 'pinia';

const tradeSearchStore = useTradeSearchStore();
const { positionCd, orderCd } = storeToRefs(tradeSearchStore);

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
