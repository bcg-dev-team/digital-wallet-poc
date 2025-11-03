<template>
  <div class="gap-size-36 flex flex-col">
    <div class="w-[1000px]">
      <LabelContent label="요약" size="lg">
        <template #content>
          <div class="default-table">
            <!-- 데이터 그리드 -->
            <BaseDataGrid
              :column-defs="profitAndLossSummaryColumns"
              :row-data="summaryDataArray"
              :sortable="false"
              :filterable="false"
              :pagination="false"
              :resizable="false"
            />
          </div>
        </template>
      </LabelContent>
    </div>
    <div>
      <LabelContent label="상세내역" size="lg">
        <template #content>
          <div class="default-table">
            <!-- 데이터 그리드 -->
            <BaseDataGrid
              :column-defs="profitAndLossDetailColumns"
              :row-data="props.detailData"
              :sortable="false"
              :filterable="false"
              :pagination="false"
              :resizable="false"
              customColumnWidths
            />
          </div>
        </template>
      </LabelContent>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  profitAndLossSummaryColumns,
  profitAndLossDetailColumns,
} from '@/components/transaction/constants/tableColumnDefs';
import type { CloseOutSummary, CloseOutDetail } from '@template/api';
import LabelContent from '@/components/common/LabelContent.vue';
import { BaseDataGrid } from '@template/ui';
import { onMounted, computed } from 'vue';

const emits = defineEmits<{
  (e: 'loadInitialData'): void;
}>();

const props = defineProps<{
  summaryData: CloseOutSummary;
  detailData: CloseOutDetail[];
}>();

/**
 * 요약 데이터를 LONG/SHORT 타입별로 분리하여 배열로 변환
 */
const summaryDataArray = computed(() => {
  const { summaryData } = props;

  const longData = {
    type: 'LONG',
    acquisitionPrice: summaryData.longAcquisitionPrice, // LONG 취득금액($)
    liquidationPrice: summaryData.longCloseOutPrice, // LONG 청산금액($)
    liquidationProfitLoss: summaryData.longCloseOutProfitLoss, // LONG 청산손익($)
    liquidationProfitPercent: summaryData.longCloseOutProfitPercent, // LONG 청산수익율
    swapCharge: summaryData.longSwapCharge, // LONG 스왑수수료($)
    executionCharge: summaryData.longExecutionCharge, // LONG 체결수수료($)
    liquidationNetProfitLoss: summaryData.longCloseOutNetProfitLoss, // LONG 청산순손익($)
    liquidationNetProfitPercent: summaryData.longCloseOutNetProfitPercent, // LONG 청산순수익율
  };

  const shortData = {
    type: 'SHORT',
    acquisitionPrice: summaryData.shortAcquisitionPrice, // SHORT 취득금액($)
    liquidationPrice: summaryData.shortCloseOutPrice, // SHORT 청산금액($)
    liquidationProfitLoss: summaryData.shortCloseOutProfitLoss, // SHORT 청산손익($)
    liquidationProfitPercent: summaryData.shortCloseOutProfitPercent, // SHORT 청산수익율
    swapCharge: summaryData.shortSwapCharge, // SHORT 스왑수수료($)
    executionCharge: summaryData.shortExecutionCharge, // SHORT 체결수수료($)
    liquidationNetProfitLoss: summaryData.shortCloseOutNetProfitLoss, // SHORT 청산순손익($)
    liquidationNetProfitPercent: summaryData.shortCloseOutNetProfitPercent, // SHORT 청산순수익율
  };

  return [longData, shortData];
});

onMounted(() => {
  emits('loadInitialData');
});
</script>
