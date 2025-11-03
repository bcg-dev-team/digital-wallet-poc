<template>
  <div class="default-table">
    <BaseDataGrid
      :columnDefs="columnDefs"
      :rowData="props.rowData"
      :gridOptions="gridOptions"
      :sortable="true"
      :filterable="false"
      :pagination="false"
      :resizable="false"
      :disalbeColumnAutoSize="false"
      customColumnWidths
    />
  </div>
</template>
<script setup lang="ts">
import {
  predefinedStyles,
  padDecimalPlaces,
  getDecimalPlaces,
  formatNumber,
} from '@template/utils';
import { BaseDataGrid, BaseChip, type ColDef, type GridOptions } from '@template/ui';
import { h, ref, render, computed, onMounted, onUnmounted, watch } from 'vue';
import { selectedSymbolInstance } from '@/composables/useSelectedSymbol';
import { useMarketDataStore } from '@/stores/useMarketDataStore';
import { useMetadataStore } from '@/stores/useMetadataStore';
import { EnumLabelMapper } from '@template/api';
import type { AssetOrder } from '@template/api';
const metadataStore = useMetadataStore();
const marketDataStore = useMarketDataStore();
const { addVisibleSymbols } = selectedSymbolInstance;
const props = defineProps<{
  rowData: AssetOrder[];
}>();

// 그리드 옵션
const gridOptions = ref<GridOptions>({
  suppressRowClickSelection: false, // deprecated 속성 제거
  suppressMenuHide: true, // 유효하지 않은 속성 제거
  suppressCellFocus: true, // 셀 클릭 시 포커스 테두리 제거
});

// 실시간 시세 데이터 변경 감지
const marketDataTrigger = computed(() => {
  // 테이블에 표시되는 종목들의 시세 데이터 변경을 감지
  const symbols = props.rowData.map((item) => item.stockCd);
  return symbols.map((symbol) => marketDataStore.getSymbolDataBySymbol(symbol)?.price || 0);
});

// 컬럼 정의
const columnDefs = computed<ColDef[]>(() => {
  const _ = marketDataTrigger.value; // 시세 데이터 변경 감지

  return [
    {
      headerName: '종목코드',
      field: 'stockCd',
      sortable: true,
      width: 160,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
    },

    {
      headerName: 'L / S',
      field: 'positionCd',
      sortable: true,
      width: 277,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        const vnode = h(BaseChip, {
          variant: params.value === 'LONG' ? 'red' : 'blue',
          size: 'sm',
          label: EnumLabelMapper.getPositionCodeShort(params.value),
        });
        render(vnode, container);
        return container;
      },
    },
    {
      headerName: '구분',
      field: 'sideCd',
      sortable: true,
      width: 277,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
      valueFormatter: (params: any) => EnumLabelMapper.getSideCodeLabel(params.value),
    },
    {
      headerName: '주문수량',
      field: 'orderQuantity',
      sortable: true,
      width: 277,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        return padDecimalPlaces(params.value, 2);
      },
    },
    {
      headerName: '배리어가격',
      field: 'barrierPrice',
      sortable: true,
      width: 277,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        const metadata = metadataStore.getMetadata(params.data.stockCd);
        return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
      },
    },
    {
      headerName: '주문가격',
      field: 'orderPrice',
      sortable: true,
      width: 277,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        const metadata = metadataStore.getMetadata(params.data.stockCd);
        return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
      },
    },

    {
      headerName: '주문증거금($)',
      field: 'orderDepositPrice',
      sortable: true,
      width: 277,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => padDecimalPlaces(params.value, 2),
    },
  ];
});

// 테이블에 표시되는 종목들 구독 관리
const subscribeToTableSymbols = () => {
  const symbols = props.rowData.map((item) => item.stockCd);
  if (symbols.length > 0) {
    addVisibleSymbols('OrderTableContent', symbols);
  }
};

// 테이블 종목 구독 해제
const unsubscribeFromTableSymbols = () => {
  // 구독 해제는 전역적으로 관리되므로 별도 처리 불필요
};

// 데이터 변경 시 종목 구독 업데이트
watch(
  () => props.rowData,
  () => {
    subscribeToTableSymbols();
  },
  { deep: true }
);

onMounted(() => {
  subscribeToTableSymbols();
});

onUnmounted(() => {
  unsubscribeFromTableSymbols();
});
</script>
