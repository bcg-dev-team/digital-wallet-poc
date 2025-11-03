<template>
  <div class="gap-size-36 flex flex-col">
    <div class="w-[1000px]">
      <LabelContent label="요약" size="lg">
        <template #content>
          <div class="order-summary-table">
            <BaseDataGrid
              :column-defs="summaryColumnDefs"
              :row-data="props.summaryData"
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
    <div>
      <LabelContent label="상세내역" size="lg">
        <template #content>
          <!-- <div class="default-table">
            <div class="table-container"> -->
          <!-- 데이터 그리드 -->
          <div class="default-table">
            <BaseDataGrid
              :column-defs="allColumns"
              :row-data="props.detailData"
              :sortable="false"
              :filterable="false"
              :pagination="false"
              :resizable="false"
              customColumnWidths
            />
          </div>
          <!-- 스크롤 컨트롤 버튼들 (주문일자 뒤에 위치) -->
          <!-- <div class="scroll-controls">
                <GridWidthButton
                  :hidden="!canScrollLeft"
                  direction="left"
                  @click="scrollTable('left')"
                />
                <GridWidthButton
                  :hidden="!canScrollRight"
                  direction="right"
                  @click="scrollTable('right')"
                />
              </div>
            </div>
          </div> -->
        </template>
      </LabelContent>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  orderDetailColumns,
  orderSummaryColumns,
} from '@/components/transaction/constants/tableColumnDefs';
import GridWidthButton from '@/components/transaction/common/GridWidthButton.vue';
import LabelContent from '@/components/common/LabelContent.vue';

import type {
  DetailsOrderExecution as OrderDetail,
  SummaryOrderExecution as OrderSummary,
} from '@template/api';
import type { ColDef } from 'ag-grid-community';
import { computed, onMounted, ref } from 'vue';
import { BaseDataGrid } from '@template/ui';

const emits = defineEmits<{
  (e: 'loadInitialData'): void;
}>();

const props = defineProps<{
  summaryData: OrderSummary[];
  detailData: OrderDetail[];
}>();

// 컬럼 정의 (전체)
const allColumns: ColDef[] = orderDetailColumns;

// 시작 인덱스 (몇 번째 컬럼부터 보여줄지) - 고정 컬럼 제외
const startIndex = ref(0);
const visibleColumnCount = 15; // 화면에 보여줄 컬럼 수 고정 (고정 컬럼 제외)

// 동적으로 보여질 컬럼들 계산 (고정 컬럼 + 스크롤 가능한 컬럼들)
const detailColumnDefs = computed((): ColDef[] => {
  const pinnedColumns = allColumns.filter((col) => col.pinned === 'left');
  const scrollableColumns = allColumns.filter((col) => !col.pinned);
  const visibleScrollableColumns = scrollableColumns.slice(
    startIndex.value,
    startIndex.value + visibleColumnCount
  );

  return [...pinnedColumns, ...visibleScrollableColumns];
});

// 컬럼 가시성 제어
const scrollTable = (direction: 'left' | 'right') => {
  const scrollableColumns = allColumns.filter((col) => !col.pinned);

  if (direction === 'left') {
    // 왼쪽 버튼: 시작 인덱스 감소 (최소 0)
    startIndex.value = Math.max(0, startIndex.value - 1);
  } else {
    // 오른쪽 버튼: 시작 인덱스 증가 (최대 스크롤 가능한 컬럼 수 - 보여줄 컬럼 수)
    startIndex.value = Math.min(
      scrollableColumns.length - visibleColumnCount,
      startIndex.value + 1
    );
  }
};

// 버튼 활성화 상태 계산 (고정 컬럼 제외한 스크롤 가능한 컬럼 기준)
const canScrollLeft = computed(() => startIndex.value > 0);
const canScrollRight = computed(() => {
  const scrollableColumns = allColumns.filter((col) => !col.pinned);
  return startIndex.value < scrollableColumns.length - visibleColumnCount;
});

const summaryColumnDefs = computed((): ColDef[] => orderSummaryColumns);

onMounted(() => {
  emits('loadInitialData');
});
</script>

<style lang="scss" scoped>
/* ordersummary 클래스에만 적용되는 AG-Grid 스타일 */
.order-summary-table {
  /* AG-Grid 전체 테두리와 radius 제거 */
  :deep(.ag-root-wrapper) {
    border: none !important;
    border-radius: 0 !important;
  }

  /* AG-Grid 헤더 전체 가운데 정렬 */
  :deep(.ag-header-cell-label),
  :deep(.ag-header-group-cell-label) {
    justify-content: center !important;
    text-align: center !important;
    display: flex !important;
    align-items: center !important;
    width: 100% !important;
  }

  /* 헤더 셀 전체 가운데 정렬 */
  :deep(.ag-header-cell),
  :deep(.ag-header-group-cell) {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
    font-family: 'Pretendard GOV', sans-serif !important;
    font-size: 12px;
    font-weight: 500;
    color: var(--font-color-default);
  }

  /* 매수/매도 그룹 헤더 특별 처리 */
  :deep(.buy-header),
  :deep(.sell-header) {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
  }

  /* 매수 헤더 스타일 (연분홍 배경) */
  :deep(.buy-header) {
    background-color: var(--table-bg-red) !important;
  }

  /* 매도 헤더 스타일 (연한 파란색 배경) */
  :deep(.sell-header) {
    background-color: var(--table-bg-blue) !important;
  }

  /* 통화 헤더 스타일 */
  :deep(.summary-header) {
    background-color: var(--table-type2-header-bg) !important;
  }

  /* 데이터 영역 글자색 */
  :deep(.ag-cell) {
    color: var(--font-color-default) !important;
  }

  :deep(.ag-row .ag-cell) {
    background-color: var(--table-type2-body-bg) !important;
    color: var(--font-color-default) !important;
  }

  /* AG-Grid body viewport 배경색 */
  :deep(.ag-body-viewport) {
    color: var(--font-color-default) !important;
    background-color: var(--background-bg-default) !important;
  }

  /* No Rows Overlay 텍스트 색상 */
  :deep(.ag-overlay-no-rows-center) {
    color: var(--font-color-default) !important;
  }
}
</style>
